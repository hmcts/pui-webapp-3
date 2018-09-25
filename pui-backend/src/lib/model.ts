import { AxiosResponse } from 'axios'

export interface CaseFields {
    dateOfLastAction: string
}

export class CaseList {
    static create(res: AxiosResponse) {
        const json = JSON.parse(res.data)

        return new CaseList()
    }

    caseFields: CaseFields

    //constructor() {
    //}
}
