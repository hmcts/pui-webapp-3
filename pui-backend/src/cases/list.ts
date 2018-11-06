import axios, { AxiosInstance } from 'axios'
import * as express from 'express'
import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { config } from '../config'
import { jurisdictions } from '../config/refJurisdiction'
import { errorInterceptor, successInterceptor } from '../lib/interceptors'
import { Case, EnhancedRequest, SimpleCase } from '../lib/models'
import { process } from '../lib/processors'
import * as ccd from '../lib/services/ccd'
import { asyncReturnOrError } from '../lib/util'

import { listTemplates } from '../lib/templates'
import { benefitTemplate } from '../lib/templates/sscs'

const logger = log4js.getLogger('cases')
logger.level = config.logging

const http: AxiosInstance = axios.create({ timeout: 8000 })

http.interceptors.response.use(successInterceptor, errorInterceptor)

const CORJuristiction = 'SSCS'

async function getCases(userId: string): Promise<Case[][]> {
    const collection: Case[][] = await map(jurisdictions, async jurisdiction => {
        logger.info('Getting cases for ', jurisdiction.jur)

        const response = await ccd.getCases(userId, jurisdiction)

        const caseList: Case[] = response.data.map(caseJson => Case.create(caseJson))

        return caseList
    })

    return collection
}

async function getCOR(casesData: Case[]) {
    const caseIds = casesData.map(caseRow => 'case_id=' + caseRow.id).join('&')

    if (casesData[0].jurisdiction === CORJuristiction) {
        logger.info(`Getting COR`)
        const hearings: any = await http.get(`${config.services.coh.corApi}/continuous-online-hearings/?${caseIds}`)
        if (hearings.online_hearings) {
            const caseStateMap = new Map(
                hearings.online_hearings.map(hearing => [Number(hearing.case_id), hearing.current_state])
            )

            casesData.forEach(caseRow => {
                const state: any = caseStateMap.get(Number(caseRow.id))
                if (state && state.state_name) {
                    // TODO: this state should only change if CCD is the COH state else default to CCD state

                    let formattedState = state.split('_').join(' ')
                    formattedState = formattedState[0].toUpperCase() + formattedState.slice(1)

                    caseRow.state = formattedState

                    if (new Date(caseRow.lastModified) < new Date(state.state_datetime)) {
                        caseRow.lastModified = state.state_datetime
                    }
                }
            })
        }
    }

    return casesData
}

function rawCasesReducer(caseList: Case[], columns) {
    return caseList.map(caseRow => {
        return {
            caseFields: columns.reduce((row, column) => {
                row[column.case_field_id] = process(column.value, caseRow)
                return row
            }, {}),
            caseId: caseRow.id,
            caseJurisdiction: caseRow.jurisdiction,
            caseTypeId: caseRow.caseTypeId,
        }
    })
}

async function processCaseList(caseList: Case[]): Promise<SimpleCase[]> {
    let results: SimpleCase[] = []
    try {
        if (caseList) {
            const casesData = await getCOR(caseList)
            const jurisdiction = casesData[0].jurisdiction
            const caseType = casesData[0].caseTypeId
            logger.info(`Getting template ${jurisdiction}, ${caseType}`)
            const template = listTemplates(jurisdiction, caseType)
            results = rawCasesReducer(casesData, template.columns).filter(row => {
                return Boolean(row.caseFields.caseRef)
            })
        }

        return results
    } catch (e) {
        return Promise.reject(e)
    }
}

function sortResults(a: Case, b: Case) {
    const dateA: any = new Date(a.caseFields.dateOfLastAction)
    const dateB: any = new Date(a.caseFields.dateOfLastAction)
    return dateA - dateB
}

export function tidyTemplate(template: any) {
    return {
        columns: template.columns.map(column => {
            return {
                case_field_id: column.case_field_id,
                label: column.label,
            }
        }),
    }
}

export async function list(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    let caseLists: Case[][]

    logger.info('Getting cases')

    caseLists = await asyncReturnOrError(getCases(req.auth.userId), 'Error Getting cases', res, logger)

    if (caseLists) {
        logger.info('Processing cases ', caseLists.length)

        let results = await asyncReturnOrError(
            map(
                caseLists,
                async (caseList: Case[]) => {
                    return await processCaseList(caseList)
                },
                logger
            ),
            'Error Processing List',
            res,
            logger
        )

        if (results) {
            results = [].concat(...results).sort(sortResults)
            const aggregatedData = { ...tidyTemplate(benefitTemplate.list), results }
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(aggregatedData))
        }
    }
}
