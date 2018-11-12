import axios, { AxiosResponse } from 'axios'
import * as log4js from 'log4js'
import * as moment from 'moment'
import { config } from '../../config'
import { http } from '../../lib'
import { JurisdictionObject } from '../models'

import * as coh from './coh'

const logger = log4js.getLogger('auth')
logger.level = config.logging

const apiUrl = config.services.ccd.dataApi

function sortEvents(result1: any, result2: any): number {
    return moment.duration(moment(result2.dateUtc).diff(moment(result1.dateUtc))).asMilliseconds()
}

export async function getCase(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any> {
    const response = await http.get(
        `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    )
    return response.data
}

export async function getCases(userId: string, jurisdiction: JurisdictionObject): Promise<AxiosResponse> {
    return http.get(
        `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${
            jurisdiction.caseType
        }/cases?sortDirection=DESC${jurisdiction.filter}`
    )
}

export async function getEvents(userId: string, jurisdiction: string, caseType: string, caseId: string): Promise<any[]> {
    let cohEvents = null
    try {
        const response = await http.get(
            `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
        )

        logger.info('Got case events')
        cohEvents = jurisdiction === 'SSCS' ? coh.getEvents(caseId, userId) : []

        return [].concat(response.data, cohEvents).sort(sortEvents)
    } catch (e) {
        logger.error(e)
    }
}
