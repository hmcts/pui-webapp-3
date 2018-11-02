import { TemplatePair } from '../../models/templates'

/*tslint:disable */
export const divorceTemplate: TemplatePair = {
    detail: {
        decision: {
            id: 'decision',
            name: 'Make a decision',
            options: [
                {
                    id: 'true',
                    name: 'True',
                },
                {
                    id: 'false',
                    name: 'False',
                },
            ],
            type: 'decision-page',
        },
        details: {
            fields: [
                { value: '$.id' },
                {
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
            ],
        },
        sections: [
            {
                id: 'summary',
                name: 'Summary',
                sections: [
                    {
                        name: 'Summary',
                        sections: [
                            {
                                fields: [{ value: '$.events' }],
                                name: 'Recent events',
                                type: 'timeline',
                            },
                            {
                                fields: [{ value: '$.state|case_status_processor' }],
                                name: 'Action on',
                                type: 'case-action-alert',
                            },
                            {
                                fields: [
                                    {
                                        label: 'Case number',
                                        value: '$.id',
                                    },
                                    {
                                        label: 'Case type',
                                        value: 'Divorce',
                                    },
                                    {
                                        label: 'Case status',
                                        value: '',
                                    },
                                    {
                                        label: 'Reason for divorce',
                                        value: '',
                                    },
                                ],
                                name: 'Case details',
                                type: 'data-list',
                            },
                            {
                                fields: [
                                    {
                                        label: 'Petitioner',
                                        value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented',
                                    },
                                    {
                                        label: 'Respondent',
                                        value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented',
                                    },
                                ],
                                name: 'Representatives',
                                type: 'data-list',
                            },
                            {
                                fields: [],
                                name: 'Linked cases',
                                type: 'data-list',
                            },
                        ],
                        type: 'summary-panel',
                    },
                ],
                type: 'page',
            },
            {
                id: 'parties',
                name: 'Parties',
                sections: [
                    {
                        id: 'parties-tabs',
                        name: 'Parties',
                        sections: [
                            {
                                fields: [
                                    {
                                        label: 'Full name',
                                        value: ['$.case_data.D8PetitionerFirstName', ' ', '$.case_data.D8PetitionerLastName'],
                                    },
                                    { label: 'Address', value: '$.case_data.D8DerivedPetitionerHomeAddress' },
                                    { label: 'Phone', value: '$.case_data.D8PetitionerPhoneNumber' },
                                    { label: 'Email', value: '$.case_data.D8PetitionerEmail' },
                                    {
                                        label: 'Representative',
                                        value: '$.case_data.PetitionerSolicitorName|if_empty_processor|Unrepresented',
                                    },
                                ],
                                id: 'petitioner',
                                name: 'Petitioner',
                                type: 'tab',
                            },
                            {
                                fields: [
                                    {
                                        label: 'Full name',
                                        value: ['$.case_data.D8RespondentFirstName', ' ', '$.case_data.D8RespondentLastName'],
                                    },
                                    { label: 'Address', value: '$.case_data.D8DerivedRespondentHomeAddress' },
                                    { label: 'Phone', value: '$.case_data.RespPhoneNumber' },
                                    { label: 'Email', value: '$.case_data.RespEmailAddress' },
                                    {
                                        label: 'Representative',
                                        value: '$.case_data.D8RespondentSolicitorName|if_empty_processor|Unrepresented',
                                    },
                                ],
                                id: 'respondent',
                                name: 'Respondent',
                                type: 'tab',
                            },
                        ],
                        type: 'parties-panel',
                    },
                ],
                type: 'page',
            },
            {
                id: 'casefile',
                name: 'Case file',
                sections: [
                    {
                        fields: [{ value: 'A$.case_data.D8DocumentsUploaded[*].value.DocumentLink|document_processor' }],
                        id: 'documents',
                        name: 'Case file',
                        type: 'document-panel',
                    },
                ],
                type: 'page',
            },
            {
                id: 'timeline',
                name: 'Timeline',
                sections: [
                    {
                        fields: [{ value: '$.events' }],
                        id: 'events',
                        name: 'Timeline',
                        type: 'timeline-panel',
                    },
                ],
                type: 'page',
            },
        ],
    },
    list: {
        columns: [
            {
                case_field_id: 'caseRef',
                label: 'Case Reference',
                value: '$.id',
            },
            {
                case_field_id: 'parties',
                label: 'Parties',
                value: [
                    '$.caseData.D8PetitionerFirstName',
                    ' ',
                    '$.caseData.D8PetitionerLastName',
                    ' ',
                    'v',
                    ' ',
                    '$.caseData.D8RespondentFirstName',
                    ' ',
                    '$.caseData.D8RespondentLastName',
                ],
            },
            {
                case_field_id: 'type',
                label: 'Type',
                value: 'Divorce',
            },
            {
                case_field_id: 'status',
                label: 'Decision needed on',
                value: '$.state',
            },
            {
                case_field_id: 'createdDate',
                date_format: 'd MMM yyyy',
                label: 'Case Start Date',
                value: '$.createdDate',
            },
            {
                case_field_id: 'lastModified',
                date_format: 'd MMM yyyy',
                label: 'Date of Last Action',
                value: '$.lastModified',
            },
        ],
    },
}

/*tslint:enable */
