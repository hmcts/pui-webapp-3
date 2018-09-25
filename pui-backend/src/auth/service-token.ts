import axios, { AxiosInstance } from 'axios'
import * as jwtDecode from 'jwt-decode'
import * as otp from 'otp'
import * as request from 'request-promise'
import { config } from '../config'

const microservice = config.microservice
const secret = process.env.S2S_SECRET
const cache = {}
let http: AxiosInstance

function validateCache() {
    const currentTime = Math.floor(Date.now() / 1000)
    if (!cache[microservice]) {
        return false
    }
    return currentTime < cache[microservice].expiresAt
}

function getToken() {
    return cache[microservice]
}

async function generateToken() {
    const oneTimePassword = otp({ secret }).totp()
    const options = {
        body: {
            microservice,
            oneTimePassword,
        },
        json: true,
        method: 'POST',
        url: `${config.s2s}/lease`,
    }

    return new Promise((resolve, reject) => {
        request(options)
            .then(body => {
                const tokenData = jwtDecode(body)
                _cache[microservice] = {
                    expiresAt: tokenData.exp,
                    token: body,
                }
                resolve()
            })
            .catch(e => {
                console.log('Error creating S2S token! S2S service error - ', e.message)
                reject()
            })
    })
}

async function generateTokenx() {
    console.log('generating from secret  :', { secret })
    const oneTimePassword = otp({ secret }).totp()
    http = axios.create({})

    console.log('generating token :', {})
    try {
        const response = await http
            .post(`${config.s2s}/lease`, {
                microservice,
                oneTimePassword,
            })
            .then(
                res => {
                    console.log('okay, ', res)
                },
                res => {
                    console.log('err,', res)
                }
            )

        const tokenData = jwtDecode(response)
        cache[microservice] = {
            expiresAt: tokenData.exp,
            token: response,
        }
    } catch (e) {
        console.log('Error creating S2S token! S2S service error - ', e.message)
    }
}
export async function serviceTokenGenerator() {
    try {
        if (validateCache()) {
            return getToken()
        } else {
            await generateToken()
            return getToken()
        }
    } catch (e) {
        console.log('Failed to get S2S token')
    }
}
