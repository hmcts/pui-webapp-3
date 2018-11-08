import * as log4js from 'log4js'
import { map } from 'p-iteration'
import { http } from '../../lib'
import { config } from '../../config'
import { errorInterceptor, successInterceptor } from '../../lib/interceptors'

const logger = log4js.getLogger('documents')
logger.level = config.logging

const url = config.services.documents.api

export function getIds(documents) {
    return (documents || []).map(document => {
        const splitDocLink = document.document_url.split('/')
        return splitDocLink[splitDocLink.length - 1]
    })
}

export async function getDocument(docId: string, userRoles: any[]) {
    logger.info(`Getting  document ${docId}`)

    const response = await http.get(`${url}/documents/${docId}`, {
        headers: {
            'user-roles': userRoles.join(),
        },
    })

    const splitURL = response.data._links.self.href.split('/')
    response.data.id = splitURL[splitURL.length - 1]
    return response.data
}

export async function getDocuments(documentIds = [], userRoles: any[] = []) {
    const documents = map(documentIds, async (docId: string) => {
        return await getDocument(docId, userRoles)
    })
    return documents
}
