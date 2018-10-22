/*tslint:disable */
export default {
    columns: [
        {
            label: 'Case Reference',
            case_field_id: 'caseRef',
            value: '$.caseData.caseReference',
        },
        {
            label: 'Parties',
            case_field_id: 'parties',
            value: [
                '$.caseData.appeal.appellant.name.firstName',
                ' ',
                '$.caseData.appeal.appellant.name.lastName',
                ' ',
                'v',
                ' ',
                'DWP',
            ],
        },
        {
            label: 'Type',
            case_field_id: 'type',
            value: '$.caseData.appeal.benefitType.code',
        },
        {
            label: 'Decision needed on',
            case_field_id: 'status',
            value: '$.state',
        },
        {
            label: 'Start date',
            case_field_id: 'createdDate',
            value: '$.created_date',
            date_format: 'd MMM yyyy',
        },
        {
            label: 'Date of last event',
            case_field_id: 'lastModified',
            value: '$.last_modified',
            date_format: 'd MMM yyyy',
        },
    ],
}

/*tslint:enable */
