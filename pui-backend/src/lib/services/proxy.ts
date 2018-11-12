import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as exceptionFormatter from 'exception-formatter'
import * as express from 'express'
import * as log4js from 'log4js'
import * as moment from 'moment'
import * as striptags from 'striptags'
import { config } from '../../config'
import { errorInterceptor, successInterceptor } from '../../lib/interceptors'
import { EnhancedRequest } from '../../lib/models'
import { asyncReturnOrError } from '../../lib/util'

const logger = log4js.getLogger('proxy')
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
        res.send(e.response.data)
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
        res.send(e.response.data)
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
        res.send(e.response.data)
    }
}
