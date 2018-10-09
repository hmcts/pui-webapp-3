import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import * as jwtDecode from 'jwt-decode'
import { environment as config } from '../../environments/environment'
import { Router, ActivatedRouteSnapshot } from '@angular/router'

import { Observable } from 'rxjs/Observable'

//import 'rxjs/add/observable/of'
//import 'rxjs/add/operator/share'
import 'rxjs/add/operator/map'
import { of, from } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    api_base_url
    httpClient
    COOKIE_KEYS
    user
    user$
    constructor(private httpCilent: HttpClient, private cookieService: CookieService, private router: Router) {
        this.COOKIE_KEYS = {
            TOKEN: config.cookies.token,
            USER: config.cookies.userId
        }
        this.api_base_url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
        this.httpCilent = httpCilent
        this.user = null
    }

    async canActivate(route: ActivatedRouteSnapshot) {

        let guardRoles = route.data["roles"] as Array<string>

        if (!this.isAuthenticated()) {
            this.loginRedirect()
            return false //false
        }

        let ifRoleAuth = await this.isRoleAuthorised(guardRoles)
        console.log('canActivateRoute ifRoleAuth: ', ifRoleAuth)
        return ifRoleAuth;

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

    public getUser() {
        if (this.user) {
            return this.user
        } else {
            this.user = this.httpCilent.get('/api/user').map(response => {
                return response
            })
            //mock it while idam is down
            //this.user = of({ roles: ['caseworker-probatex', 'xadmin'] })
            return this.user


        }
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




    isRoleAuthorised(guardRoles: string[]) {
        return this.getUser().toPromise().then(user => {
            let roleExists = user.roles.some(r => guardRoles.includes(r))
            return roleExists;
        })

    }


}
