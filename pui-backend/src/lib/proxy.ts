import * as express from 'express'
import * as log4js from 'log4js'
import * as striptags from 'striptags'
import { config } from '../config'
import { http } from '../lib'
import { EnhancedRequest } from './models'

const logger = log4js.getLogger('proxy')
logger.level = config.logging

export async function get(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')

    const headers = {}
    headers['content-type'] = req.headers['content-type']
    const header = req.headers['content-type'] ? { headers } : {}

    try {
        const response = await http.get(`${config.services.ccd.componentApi}${url}`, header)

        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}

export async function put(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')

    const headers = {}
    headers['content-type'] = req.headers['content-type']
    const header = req.headers['content-type'] ? { headers } : {}

    try {
        const response = await http.put(`${config.services.ccd.componentApi}${url}`, req.body, header)
        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}

export async function post(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    const url = striptags(req.url).replace('/api/ccd', '')

    const headers = {}
    headers['content-type'] = req.headers['content-type']
    const header = req.headers['content-type'] ? { headers } : {}

    console.log(req.body)
    try {
        const response = await http.post(`${config.services.ccd.componentApi}${url}`, req.body, header)
        res.status(200)
        res.send(JSON.stringify(response.data))
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}
