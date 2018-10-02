import * as express from 'express'

export interface EnhancedRequest extends express.Request {
    auth?: {
        roles: string[]
        token: string
        userId: string
        expires: number
    }
}

export interface Token {
    token: string
}

export interface CaseFields {
    dateOfLastAction: string
}

export interface SimpleCase {
    caseFields: any[]
    caseId: string
    caseJurisdiction: any
    caseTypeId: string
}

export class Case {
    static create(res: any) {
        console.log(res)
        return new Case(res)
    }

    caseData: any
    caseFields: CaseFields
    caseTypeId: string
    createDate: Date
    id: string
    jurisdiction: string
    lastModified: Date
    securityClassification: string

    dataClassification: any
    afterSubmitCallbackResponse: any
    seccurityClassifications: any
    state: any

    constructor(res) {
        this.id = res.id
        this.jurisdiction = res.jurisdiction
        this.caseTypeId = res.case_type_id
        this.createDate = res.created_date
        this.lastModified = res.last_modified
        this.securityClassification = res.security_classification
        this.caseData = res.case_data
        this.dataClassification = res.data_classification
        this.securityClassification = res.security_classification
        this.state = res.state
    }
}
