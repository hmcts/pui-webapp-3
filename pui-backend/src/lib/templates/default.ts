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
