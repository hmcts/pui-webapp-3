import * as exceptionFormatter from 'exception-formatter'
import * as express from 'express'
import * as log4js from 'log4js'
import * as striptags from 'striptags'
import { config } from '../config'
import { Case, EnhancedRequest, SimpleCase } from '../lib/models'
import { process } from '../lib/processors'
import * as ccd from '../lib/services/ccd'
import * as coh from '../lib/services/coh'
import * as docs from '../lib/services/documents'
import { templates } from '../lib/templates'
import { asyncReturnOrError, valueOrNull } from '../lib/util'
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

export async function getSchema(
    userId: string,
    jurisdiction: string,
    caseType: string,
    caseId: string,
    req: EnhancedRequest,
    res: express.Response
): Promise<any> {
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
        consentOrder: valueOrNull(details, 'case_data.consentOrder'),
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

    const documents = await asyncReturnOrError(
        docs.getDocuments(docs.getIds(details.documents), req.auth.roles),
        'Error Getting documents',
        res,
        logger
    )

    if (documents) {
        schema.documents = documents
        return schema
    } else {
        return null
    }
}

export async function getCase(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const data = await getSchema(
        req.auth.userId,
        striptags(req.params.jur),
        striptags(req.params.caseType),
        striptags(req.params.caseId),
        req,
        res
    )
    if (data) {
        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(data))
    }
}

export async function getCases(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    return caseList.list(req, res, next)
}
