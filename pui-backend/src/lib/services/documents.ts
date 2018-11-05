import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as exceptionFormatter from 'exception-formatter'
import * as express from 'express'
import * as log4js from 'log4js'
import * as moment from 'moment'
import { map } from 'p-iteration'
import * as striptags from 'striptags'
import { config } from '../../config'
import { EnhancedRequest } from '../../lib/models'
import { JurisdictionObject } from '../models'
import * as coh from './coh'

const logger = log4js.getLogger('auth')
logger.level = config.logging

let http: AxiosInstance

const url = config.services.documents.api

export function getIds(documents) {
    return (documents || []).map(document => {
        const splitDocLink = document.document_url.split('/')
        return splitDocLink[splitDocLink.length - 1]
    })
}

export async function getDocument(docId: string, userRoles: any[]) {
    http = axios.create({
        headers: {
            'user-roles': userRoles,
        },
    })

    const response = await http.get(`${url}/documents/${docId}`)
    const splitURL = response.data._links.self.href.split('/')
    response.data.id = splitURL[splitURL.length - 1]
    return response.data
}

export async function getDocuments(documentIds = [], userRoles: any[] = []) {
    const documents = []
    map(documentIds, async (docId: string) => {
        return await getDocument(docId, userRoles)
    })

    return documents
}
