import * as express from 'express'

// NB THis is incomplete  and using this class leaves case list unfunctional
//  adding json in getCases rather than instigating new Cases by Case.create
// will work

export interface EnhancedRequest extends express.Request {
    auth?: {
        token: string
        userId: string
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
    // callbackResponseStatusCode: any
    // callbackResponseStatus: any
    seccurityClassifications: any
    state: any

    constructor(res) {
        this.id = res.id
        this.jurisdiction = res.jurisdiction
        this.caseTypeId = res.caseTypeId
        this.createDate = res.createDeflate
        this.lastModified = res.lastModified
        this.securityClassification = res.securityClassification
        this.caseData = res.caseData
        this.dataClassification = res.dataClassification
        this.securityClassification = res.securityClassification
        this.state = res.state
    }
}
