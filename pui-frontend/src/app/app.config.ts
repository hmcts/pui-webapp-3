import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { AbstractAppConfig, CaseEditorConfig, CaseEventData } from '@hmcts/ccd-case-ui-toolkit'
import { environment as mainConfig } from '../environments/environment'

@Injectable()
export class AppConfig extends AbstractAppConfig {
    protected config: CaseEditorConfig = {
        ...mainConfig.services.ccdComponent
    }

    constructor(private http: Http) {
        super()
    }

    public load(): Promise<void> {
        return Promise.resolve()
    }

    public getLoginUrl(): string {
        return this.config.login_url
    }

    public getApiUrl() {
        return this.config.api_url
    }

    public getCaseDataUrl() {
        return this.config.case_data_url
    }

    public getDocumentManagementUrl() {
        return this.config.document_management_url
    }

    public getRemoteDocumentManagementUrl() {
        return this.config.remote_document_management_url
    }

    public getPostcodeLookupUrl() {
        return this.config.postcode_lookup_url
    }

    public getOAuth2ClientId() {
        return this.config.oauth2_client_id
    }

    public getPaymentsUrl() {
        return this.config.payments_url
    }

    public getCaseHistoryUrl(jurisdictionId: string, caseTypeId: string, caseId: string, eventId: string) {
        return (
            this.getApiUrl() +
            `/caseworkers/:uid` +
            `/jurisdictions/${jurisdictionId}` +
            `/case-types/${caseTypeId}` +
            `/cases/${caseId}` +
            `/events/${eventId}` +
            `/case-history`
        )
    }

    public getCreateOrUpdateDraftsUrl(jid: string, ctid: string, eventData: CaseEventData) {
        return (
            this.getCaseDataUrl() +
            `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/event-trigger/${eventData.event.id}/drafts/`
        )
    }

    public getViewOrDeleteDraftsUrl(jid: string, ctid: string, did: string) {
        return this.getCaseDataUrl() + `/caseworkers/:uid/jurisdictions/${jid}/case-types/${ctid}/drafts/${did}`
    }
}
