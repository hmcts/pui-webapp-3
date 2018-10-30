/*tslint:disable */
export default {
    columns: [
        {
            label: 'Case Reference',
            case_field_id: 'caseRef',
            value: '$.id',
        },
        {
            label: 'Parties',
            case_field_id: 'parties',
            value: [
                '$.caseData.claimData.claimants[0].value.individual.name',
                'v',
                '$.caseData.claimData.defendants[0].value.individual.name',
            ],
        },
        {
            label: 'Type',
            case_field_id: 'type',
            value: 'CMC',
        },
        {
            label: 'Decision needed on',
            case_field_id: 'status',
            value: '$.state',
        },
        {
            label: 'Case Start Date',
            case_field_id: 'createdDate',
            value: '$.createdDate',
            date_format: 'd MMM yyyy',
        },
        {
            label: 'Date of Last Action',
            case_field_id: 'lastModified',
            value: '$.lastModified',
            date_format: 'd MMM yyyy',
        },
    ],
}

/*tslint:disable */