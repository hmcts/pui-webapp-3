/*tslint:disable */
export default {
    columns: [
        {
            label: 'Case Reference',
            case_field_id: 'case_ref',
            value: '$.id',
        },
        {
            label: 'Parties',
            case_field_id: 'parties',
            value: [
                '$.case_data.D8PetitionerFirstName',
                ' ',
                '$.case_data.D8PetitionerLastName',
                ' ',
                'v',
                ' ',
                '$.case_data.D8RespondentFirstName',
                ' ',
                '$.case_data.D8RespondentLastName',
            ],
        },
        {
            label: 'Type',
            case_field_id: 'type',
            value: 'Divorce',
        },
        {
            label: 'Decision needed on',
            case_field_id: 'status',
            value: '$.state',
        },
        {
            label: 'Case Start Date',
            case_field_id: 'createdDate',
            value: '$.created_date',
            date_format: 'd MMM yyyy',
        },
        {
            label: 'Date of Last Action',
            case_field_id: 'lastModified',
            value: '$.last_modified',
            date_format: 'd MMM yyyy',
        },
    ],
}

/*tslint:enable */
