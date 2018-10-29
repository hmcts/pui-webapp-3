import * as log4js from 'log4js'
import * as ccd from '../lib/services/ccd'
import * as coh from '../lib/services/coh'
import * as express from 'express'
import * as striptags from 'striptags'
import { Case, EnhancedRequest, SimpleCase } from '../lib/model'
import { config } from '../config'
import * as questions from './questions'
import { process } from '../lib/processors'
import { templates } from '../lib/templates'

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

    details.hearing_data = hearing && hearing.online_hearings ? hearing.online_hearings[0] : []

    const ccdState = details.state
    const hearingData = hearing && hearing.online_hearings ? hearing.online_hearings[0] : undefined
    const questionRoundData = details.questions
    const consentOrder = details.case_data.consentOrder ? details.case_data.consentOrder : undefined
    const hearingType = details.case_data.appeal ? details.case_data.appeal.hearingType : undefined

    // const caseState = processCaseStateEngine({
    //     jurisdiction,
    //     caseType,
    //     ccdState,
    //     hearingType,
    //     hearingData,
    //     questionRoundData,
    //     consentOrder,
    // })

    //details.state = caseState;

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
        logger.error('Error getting case data')
        res.status(err.statusCode || 500).send(err)
    }
}
