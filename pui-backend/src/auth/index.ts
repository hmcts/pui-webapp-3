import axios, { AxiosPromise } from 'axios'
import * as express from 'express'
import * as jwtDecode from 'jwt-decode'
import * as log4js from 'log4js'
import { config } from '../config'
import { serviceTokenGenerator } from './service-token'

const secret = process.env.S2S_SECRET
const logger = log4js.getLogger('auth')
logger.level = 'info'

const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

export async function attach(req, res, next) {
    try {
        const token = await serviceTokenGenerator()
        req.headers.ServiceAuthorization = token.token
    } catch (e) {
        logger.error('Could not add S2S token header')
    }

    next()
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId]
    const jwt = req.headers.authorization || req.cookies[config.cookies.token]
    const jwtData = jwtDecode(jwt)
    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    if (expired) {
        res.status(401).send('Token expired!')
    } else {
        req.auth = jwtData
        req.auth.token = jwt
        req.auth.userId = userId
        next()
    }
}

export function getTokenFromCode(req: express.Request, res: express.Response): AxiosPromise {
    const Authorization = `Basic ${new Buffer(`${config.idam.idamClientID}:${secret}`).toString('base64')}`
    const options = {
        headers: {
            Authorization,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    logger.info('Getting Token from auth code.')

    return http.post(
        `${config.idam.idamApiUrl}/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${
            config.protocol
        }://${req.headers.host}${config.idam.oauthCallbackUrl}`,
        {},
        options
    )
}

export function getUserDetails(jwt): AxiosPromise {
    const options = {
        headers: { Authorization: `Bearer ${jwt}` },
    }
    logger.info('Getting user details.')
    return http.get(`${config.idam.idamApiUrl}/details`, options)
}

export function oauth(req: express.Request, res: express.Response, next: express.NextFunction) {
    getTokenFromCode(req, res)
        .then(response => {
            if (response.data.access_token) {
                getUserDetails(response.data.access_token)
                    .then((details: any) => {
                        logger.info(details)
                        res.cookie(config.cookies.token, response.data.access_token)
                        res.cookie(config.cookies.userId, details.id)
                        res.redirect(config.indexUrl)
                    })
                    .catch(e => {
                        logger.error('Error:', e)
                    })
            }
        })
        .catch(e => {
            logger.error('Error:', e)
            res.redirect(config.indexUrl || '/')
        })
}

// export function storeUrl(req: express.Request, res: express.Response, next: express.NextFunction) {
//     const session = req.session
//     session.url = req.path
//     next()
// }

// export function redirectUrl(req, res) {
//     const session = req.session
//     if (!session.url) {
//         res.redirect(config.indexUrl || '/')
//     } else {
//         if (req.path !== session.url) {
//             res.redirect(session.url)
//         }
//     }
// }

export function logout(req: express.Request, res: express.Response) {
    const redirect = this.config.indexUrl ? this.config.indexUrl : '/'
    res.redirect(redirect)
}
