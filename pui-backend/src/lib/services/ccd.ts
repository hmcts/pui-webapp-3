import axios, { AxiosInstance } from 'axios'
import * as moment from 'moment'
import { config } from '../../config'
import * as coh from './coh'

const http: AxiosInstance = axios.create({})
const apiUrl = config.services.ccd.dataApi

export async function getCase(userId, jurisdiction, caseType, caseId) {
    return http.get(
        `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`
    )
}

export async function getCases(userId, jurisdiction) {
    return http.get(
        `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction.jur}/case-types/${
            jurisdiction.caseType
        }/cases?sortDirection=DESC${jurisdiction.filter}`
    )
}

function sortEvents(result1, result2) {
    return moment.duration(moment(result2.dateUtc).diff(moment(result1.dateUtc))).asMilliseconds()
}

async function getEvents(userId, jurisdiction, caseType, caseId) {
    let cohEvents = null
    const events = await http.get(
        `${apiUrl}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}/events`
    )

    cohEvents = jurisdiction === 'SSCS' ? coh.getEvents(caseId, userId) : null

    return [].concat(events, cohEvents).sort(sortEvents)
}
