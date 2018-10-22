import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment as config } from '../../../environments/environment'

// import { ConfigService } from '../../config.service'

// import {makeStateKey, TransferState} from '@angular/platform-browser';
import { map } from 'rxjs/operators'
import { catchError } from 'rxjs/operators'

@Injectable()
export class CaseService {
    user
    constructor(
        private httpClient: HttpClient // private configService: ConfigService
    ) { }

    // fetch(caseId, jurisdiction, casetype): Observable<Object> {
    //     const url = `${this.configService.config.api_base_url}/api/cases/jurisdiction/${jurisdiction}/casetype/${casetype}/${caseId}`;
    //     const key = makeStateKey(url);
    //     const cache = this.state.get(key, null as any);
    //     if (cache) {
    //         return of(cache);
    //     }
    //     return this.httpClient.get(url).pipe(map(data => {
    //         this.state.set(key, data);
    //         return data;
    //     }));
    // }

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
