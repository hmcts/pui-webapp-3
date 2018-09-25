import { Inject, Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import * as jwtDecode from 'jwt-decode'
import { environment as config } from '../../environments/environment'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    COOKIE_KEYS
    api_base_url

    constructor(private cookieService: CookieService, private router: Router) {
        this.COOKIE_KEYS = {
            TOKEN: config.cookies.token,
            USER: config.cookies.userId
        }
        this.api_base_url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
    }

    canActivate(): boolean {
        console.log('reached can activate')
        if (!this.isAuthenticated()) {
            this.loginRedirect()
            return false
        }
        return true
    }

    generateLoginUrl() {
        const base = config.services.idam_web
        const clientId = config.idam_client
        const callback = `${this.api_base_url}/${config.oauth_callback_url}`
        return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}`
    }

    getAuthHeaders() {
        interface HeaderObject {
            [key: string]: string
        }
        const headers: HeaderObject = {
            Authorization: this.cookieService.get(this.COOKIE_KEYS.TOKEN),
            [this.COOKIE_KEYS.USER]: this.cookieService.get(this.COOKIE_KEYS.USER)
        }
        return headers
    }

    loginRedirect() {
        console.log('Redirecting to ', this.generateLoginUrl())
        window.location.href = this.generateLoginUrl()
    }

    decodeJwt(jwt) {
        return jwtDecode(jwt)
    }

    isAuthenticated(): boolean {
        const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN)
        if (!jwt) {
            return false
        }
        const jwtData = this.decodeJwt(jwt)
        const expired = jwtData.exp > new Date().getTime()
        // do stuff!!
        return !expired
    }
}
