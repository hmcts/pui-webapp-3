import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as exceptionFormatter from 'exception-formatter'
import * as express from 'express'
import * as log4js from 'log4js'
import * as moment from 'moment'
import * as striptags from 'striptags'
import { config } from '../../config'
import { EnhancedRequest } from '../../lib/models'
import { JurisdictionObject } from '../models'
import * as coh from './coh'

const logger = log4js.getLogger('auth')
logger.level = config.logging

const http: AxiosInstance = axios.create({})
const apiUrl = config.services.ccd.dataApi

function sortEvents(result1: any, result2: any): number {
    return moment.duration(moment(result2.dateUtc).diff(moment(result1.dateUtc))).asMilliseconds()
}

export async function get(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')
    logger.info(`GET to ${config.services.ccd.componentApi}${url}`)

    try {
        const response = await http.get(`${config.services.ccd.componentApi}${url}`)

        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        logger.error('Error on GET', exceptionFormatter(e, config.exceptionOptions))
        res.status(e.response.status)
        res.send()
    }
}

export async function put(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')

    logger.info(`PUT to ${config.services.ccd.componentApi}${url}`)

    try {
        const response = await http.put(`${config.services.ccd.componentApi}${url}`, req.body)
        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        logger.error('Error on PUT', exceptionFormatter(e, config.exceptionOptions))
        res.status(e.response.status)
        res.send()
    }
}

export async function post(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')

    logger.info(`POST to ${config.services.ccd.componentApi}${url}`)

    try {
        const response = await http.post(`${config.services.ccd.componentApi}${url}`, req.body)
        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        logger.error('Error on POST', exceptionFormatter(e, config.exceptionOptions))
        res.status(e.response.status)
        res.send()
    }
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
