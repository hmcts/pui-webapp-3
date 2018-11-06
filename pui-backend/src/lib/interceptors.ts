import * as log4js from 'log4js'
import { config } from '../config'
import { shorten } from '../lib/util'

const logger = log4js.getLogger('interceptor')
logger.level = config.logging

export function successInterceptor(response) {
    let url = response.config.url
    if (url.length > 80) {
        url = `${url.substring(1, config.maxLogLine)}...`
    }

    logger.info(`Success on ${response.config.method.toUpperCase()} to ${url}`)

    return response
}

export function errorInterceptor(error) {
    const url = shorten(error.config.url, config.maxLogLine)

    logger.error(`Error on ${error.config.method.toUpperCase()} to ${url}`)

    throw new Error(error.response.data.message)
}
