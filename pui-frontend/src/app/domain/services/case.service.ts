import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment as config } from '../../../environments/environment'

// import {makeStateKey, TransferState} from '@angular/platform-browser';
import { map } from 'rxjs/operators'
import { catchError } from 'rxjs/operators'

@Injectable()
export class CaseService {
    apiBaseUrl
    user

    constructor(private httpClient: HttpClient) {
        this.apiBaseUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
    }

    fetch(caseId, jurisdiction, casetype): Observable<Object> {
        const url = `${this.apiBaseUrl}/api/cases/${jurisdiction}/${casetype}/${caseId}`

        return this.httpClient.get(url)
    }

    search(): Observable<Object> {
        const url = `/api/cases`
        console.log('search')
        return this.httpClient
            .get(url)
            .pipe(
                map(data => {
                    return data
                })
            )
            .pipe(
                catchError(error => {
                    const value: any = { error }
                    return of(value)
                })
            )
    }
}
