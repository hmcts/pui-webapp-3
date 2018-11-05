import { TemplatePair } from '../models/templates'

/*tslint:disable */
export const moneyClaimCaseTemplate: TemplatePair = {
    detail: {
        details: {
            fields: [{ value: '$.id' }, { value: '-' }],
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
                                name: '',
                                type: 'data-list',
                                fields: [],
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
    },
}
