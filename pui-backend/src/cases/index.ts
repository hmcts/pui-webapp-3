import * as exceptionFormatter from 'exception-formatter'
import * as express from 'express'
import * as log4js from 'log4js'
import * as striptags from 'striptags'
import { config } from '../config'
import { Case, EnhancedRequest, SimpleCase } from '../lib/model'
import { process } from '../lib/processors'
import * as ccd from '../lib/services/ccd'
import * as coh from '../lib/services/coh'
import { templates } from '../lib/templates'
import { valueOrNull } from '../lib/util'
import * as caseList from './list'
import * as questions from './questions'
import * as state from './state'

const logger = log4js.getLogger('case')
logger.level = config.logging

export function replaceSectionValues(section: any, details: any): any {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, details)
        })
    } else {
        section.fields.forEach(field => {
            field.value = process(field.value, details)
        })
    }
}

export async function getSchema(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    logger.info('Getting case details', userId, jurisdiction, caseType, caseId)
    const details = await ccd.getCase(userId, jurisdiction, caseType, caseId)
    logger.info('Getting case events')
    const events = await ccd.getEvents(userId, jurisdiction, caseType, caseId)

    let caseQuestions = []
    let hearing
    if (jurisdiction === 'SSCS') {
        caseQuestions = await questions.getQuestionsByCase(caseId, userId)
        hearing = coh.getHearing(caseId)
    }

    details.events = events
    details.questions = caseQuestions
        ? caseQuestions.sort((a, b) => {
              return b.question_round_number - a.question_round_number
          })
        : []

    details.state = state.process({
        caseType,
        ccdState: details.state,
        consentOrder: valueOrNull(details, 'details.case_data.consentOrder'),
        hearingData: valueOrNull(hearing, 'online_hearings[0]'),
        hearingType: valueOrNull(details, 'case_data.appeal.hearingType'),
        jurisdiction,
        questionRoundData: valueOrNull(details, 'questions'),
    })

    const schema = JSON.parse(JSON.stringify(templates(details.jurisdiction, details.case_type_id)))

    if (schema.details) {
        replaceSectionValues(schema.details, details)
    }

    schema.sections.forEach(section => replaceSectionValues(section, details))
    schema.id = details.id
    schema.case_jurisdiction = details.jurisdiction
    schema.case_type_id = details.case_type_id

    // getDocuments(getDocIdList(caseData.documents), getOptionsDoc(req))
    // .then(appendDocIdToDocument)
    // .then(documents => {
    //   {
    // schema.documents = documents;

    return schema
}

export async function getCase(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    try {
        const data = await getSchema(
            req.auth.userId,
            striptags(req.params.jur),
            striptags(req.params.caseType),
            striptags(req.params.caseId)
        )

        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(data))
    } catch (err) {
        logger.error('Error getting case data', exceptionFormatter(err, config.exceptionOptions))
        res.status(err.statusCode || 500).send(err)
    }
}

export async function getCases(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    return caseList.list(req, res, next)
}
