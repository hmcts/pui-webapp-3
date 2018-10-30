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

    fetch(caseId, jurisdiction, casetype): Observable<Object> {
        // const url = `${this.configService.config.api_base_url}/api/cases/jurisdiction/${jurisdiction}/casetype/${casetype}/${caseId}`;
        // const key = makeStateKey(url);
        // const cache = this.state.get(key, null as any);
        // if (cache) {
        //     return of(cache);
        // }
        // return this.httpClient.get(url).pipe(map(data => {
        //     this.state.set(key, data);
        //     return data;
        // }));

        let temp1 = { "details": { "fields": [{}, { "value": "KK DK v Fix It" }] }, "sections": [{ "id": "summary", "name": "Summary", "type": "page", "sections": [{ "name": "Summary", "type": "summary-panel", "sections": [{ "name": "Recent events", "type": "timeline", "fields": [{ "value": [{ "title": "Update contact details", "by": "test@TEST.COM test@TEST.COM", "dateUtc": "2018-08-29T13:33:35Z", "date": "29 August 2018", "time": "1:33pm", "documents": [] }, { "title": "Apply for a divorce", "by": "test@TEST.COM test@TEST.COM", "dateUtc": "2018-08-29T13:31:55Z", "date": "29 August 2018", "time": "1:31pm", "documents": [] }] }] }, { "name": "Action on", "type": "case-action-alert", "fields": [{ "value": { "name": "Awaiting HWF decision", "actionGoTo": "" } }] }, { "name": "Case details", "type": "data-list", "fields": [{ "label": "Case number" }, { "label": "Case type", "value": "Divorce" }, { "label": "Case status", "value": "" }, { "label": "Reason for divorce", "value": "" }] }, { "name": "Representatives", "type": "data-list", "fields": [{ "label": "Petitioner", "value": "Unrepresented" }, { "label": "Respondent", "value": "Unrepresented" }] }, { "name": "Linked cases", "type": "data-list", "fields": [] }] }] }, { "id": "parties", "name": "Parties", "type": "page", "sections": [{ "id": "parties-tabs", "name": "Parties", "type": "parties-panel", "sections": [{ "id": "petitioner", "name": "Petitioner", "type": "tab", "fields": [{ "label": "Full name", "value": "KK DK" }, { "label": "Address", "value": "Sutton\nLondon\nER234DE" }, { "label": "Phone", "value": "034422444234" }, { "label": "Email", "value": "takeit@gmail.com" }, { "label": "Representative", "value": "Unrepresented" }] }, { "id": "respondent", "name": "Respondent", "type": "tab", "fields": [{ "label": "Full name", "value": "Fix It" }, { "label": "Address", "value": "45\nSwindon\nLondon\nFR313D" }, { "label": "Phone" }, { "label": "Email" }, { "label": "Representative", "value": "Unrepresented" }] }] }] }, { "id": "casefile", "name": "Case file", "type": "page", "sections": [{ "id": "documents", "name": "Case file", "type": "document-panel", "fields": [{ "value": [] }] }] }, { "id": "timeline", "name": "Timeline", "type": "page", "sections": [{ "id": "events", "name": "Timeline", "type": "timeline-panel", "fields": [{ "value": [{ "title": "Update contact details", "by": "test@TEST.COM test@TEST.COM", "dateUtc": "2018-08-29T13:33:35Z", "date": "29 August 2018", "time": "1:33pm", "documents": [] }, { "title": "Apply for a divorce", "by": "test@TEST.COM test@TEST.COM", "dateUtc": "2018-08-29T13:31:55Z", "date": "29 August 2018", "time": "1:31pm", "documents": [] }] }] }] }], "decision": { "id": "decision", "name": "Make a decision", "type": "decision-page", "options": [{ "id": "true", "name": "True" }, { "id": "false", "name": "False" }] }, "id": 1535549515764122, "case_jurisdiction": "DIVORCE", "case_type_id": "DIVORCE", "documents": [] }
        return of(temp1)
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
