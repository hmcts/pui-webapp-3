import { AxiosResponse } from 'axios'
import { createDeflate } from 'zlib'

export interface CaseFields {
    dateOfLastAction: string
}

export class Case {
    static create(res: any) {
        return new Case(res)
    }

    caseFields: CaseFields
    id: string
    jurisdiction: string
    caseTypeId: string
    createDate: Date
    lastModified: Date
    securityClassification: string
    caseData: any
    dataClassification: any
    afterSubmitCallbackResponse: any
    // callbackResponseStatusCode: any
    // callbackResponseStatus: any
    seccurityClassifications: any

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
    }
}
