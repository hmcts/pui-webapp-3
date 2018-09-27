import axios, { AxiosInstance } from 'axios'
import * as jwtDecode from 'jwt-decode'
import * as otp from 'otp'
import { config } from '../config'

const microservice = config.microservice
const secret = process.env.JUI_S2S_SECRET

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
    console.log('generating from secret  :', { secret })
    const oneTimePassword = otp({ secret }).totp()
    http = axios.create({})

    try {
        const response = await http.post(`${config.s2s}/lease`, {
            microservice,
            oneTimePassword,
        })

        const tokenData = jwtDecode(response.data)
        cache[microservice] = {
            expiresAt: tokenData.exp,
            token: response.data,
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
