import { TemplatePair } from '../models/templates'

/*tslint:disable */
export const grantOfRepresentationTemplate: TemplatePair = {
    detail: {
        details: {
            fields: [
                { value: '$.id' },
                {
                    value: ['$.case_data.deceasedForenames', ' ', '$.case_data.deceasedSurname'],
                },
            ],
        },
        sections: [
            {
                id: 'summary',
                name: 'Summary',
                type: 'page',
                sections: [
                    {
                        name: 'Summary',
                        type: 'summary-panel',
                        sections: [
                            {
                                name: 'Case details',
                                type: 'data-list',
                                fields: [
                                    {
                                        name: 'Recent events',
                                        type: 'timeline',
                                        fields: [{ value: '$.events' }],
                                    },
                                    {
                                        name: 'Action on',
                                        type: 'case-action-alert',
                                        fields: [{ value: '$.state|case_status_processor' }],
                                    },
                                    {
                                        label: 'Parties',
                                        value: ['$.case_data.deceasedForenames', ' ', '$.case_data.deceasedSurname'],
                                    },
                                    {
                                        label: 'Case type',
                                        value: 'Grant of representation',
                                    },
                                    {
                                        label: 'Case number',
                                        value: '$.id',
                                    },
                                ],
                            },
                            {
                                name: '',
                                type: 'data-list',
                                fields: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'casefile',
                name: 'Case file',
                type: 'page',
                sections: [
                    {
                        id: 'documents',
                        name: 'Case file',
                        type: 'document-panel',
                        fields: [],
                    },
                ],
            },
            {
                id: 'timeline',
                name: 'Timeline',
                type: 'page',
                sections: [
                    {
                        id: 'events',
                        name: 'Timeline',
                        type: 'timeline-panel',
                        fields: [{ value: '$.events' }],
                    },
                ],
            },
        ],
        decision: {
            id: 'decision',
            name: 'Make a decision',
            type: 'decision-page',
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
        },
    },
    list: {
        columns: [
            {
                label: 'Case Reference',
                case_field_id: 'caseRef',
                value: '$.id',
            },
            {
                label: 'Parties',
                case_field_id: 'parties',
                value: ['$.caseData.deceasedForenames', ' ', '$.caseData.deceasedSurname'],
            },
            {
                label: 'Type',
                case_field_id: 'type',
                value: 'Grant of Representation',
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
                value: '$.lastModified',
                date_format: 'd MMM yyyy',
            },
        ],
    },
}
