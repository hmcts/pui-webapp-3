import axios, { AxiosInstance } from 'axios'
import * as express from 'express'
import * as log4js from 'log4js'
import { config } from '../config'
import { CaseList } from '../lib/model'
import { process } from '../lib/processors'
import { templates } from '../lib/templates'
import * as sscsCaseListTemplate from '../lib/templates/sscs/benefit'

const logger = log4js.getLogger('auth')
logger.level = 'info'

let http: AxiosInstance

const CORJuristiction = 'SSCS'

export interface EnhancedRequest extends express.Request {
    auth?: {
        token: string
        userId: string
    }
}

async function getCases(userId: string): Promise<CaseList[]> {
    const caseLists: CaseList[] = []

    config.jurisdictions.forEach(async jurisdiction => {
        caseLists.push(
            CaseList.create(
                await http.get(
                    `${config.ccd.dataApi}/caseworkers/${userId}
            /jurisdictions/${jurisdiction.jur}/case-types/${jurisdiction.caseType}
            /cases?sortDirection=DESC${jurisdiction.filter}`
                )
            )
        )
    })

    return caseLists
}

async function getCOR(casesData) {
    const caseIds = casesData.map(caseRow => 'case_id=' + caseRow.id).join('&')

    if (casesData[0].jurisdiction === CORJuristiction) {
        const hearings: any = await http.get(`${config.coh.corApi}/continuous-online-hearings/?${caseIds}`)
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

                    if (new Date(caseRow.last_modified) < new Date(state.state_datetime)) {
                        caseRow.last_modified = state.state_datetime
                    }
                }
            })
        }
    }

    return casesData
}

function rawCasesReducer(cases, columns) {
    return cases.map(caseRow => {
        return {
            case_fields: columns.reduce((row, column) => {
                row[column.case_field_id] = process(column.value, caseRow)
                return row
            }, {}),
            case_id: caseRow.id,
            case_jurisdiction: caseRow.jurisdiction,
            case_type_id: caseRow.case_type_id,
        }
    })
}

async function processCaseList(caseList: CaseList) {
    let results: any = []

    if (caseList) {
        const casesData = await getCOR(caseList)
        const jurisdiction = casesData[0].jurisdiction
        const caseType = casesData[0].case_type_id
        const template = templates(jurisdiction, caseType)
        results = rawCasesReducer(casesData, template.columns).filter(row => !!row.case_fields.case_ref)
    }

    return results
}

function sortResults(a: CaseList, b: CaseList) {
    const dateA: any = new Date(a.caseFields.dateOfLastAction)
    const dateB: any = new Date(a.caseFields.dateOfLastAction)
    return dateA - dateB
}

export async function get(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    console.log(req.headers)
    console.log('####################')
    http = axios.create({
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            'Content-Type': 'application/json',
            ServiceAuthorization: req.headers.ServiceAuthorization,
        },
    })
    try {
        const caseLists: CaseList[] = await getCases(req.auth.userId)
        if (caseLists) {
            const results = []
                .concat(caseLists.map(async caseList => await processCaseList(caseList)))
                .sort(sortResults)

            const aggregatedData = { ...sscsCaseListTemplate, results }

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('content-type', 'application/json')
            res.status(200).send(JSON.stringify(aggregatedData))
        }
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || 500).send(error)
    }
}
