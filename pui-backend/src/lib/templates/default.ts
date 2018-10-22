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
            value: [],
        },
        {
            label: 'Type',
            case_field_id: 'type',
            value: ['$.jurisdiction', ' (', '$.case_type_id', ') '],
        },
        {
            label: 'Decision needed on',
            case_field_id: 'status',
            value: '$.status',
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

/*tslint:enable */
