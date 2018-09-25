/*tslint:disable */
export default {
    details: {
        fields: [
            { value: '$.case_data.D8caseReference' },
            {
                value: [
                    '$.case_data.applicantFMName',
                    '$.case_data.applicantLName',
                    'v',
                    '$.case_data.appRespondentFMName',
                    '$.case_data.appRespondentLName',
                ],
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
                                    label: 'Parties',
                                    value: [
                                        '$.case_data.applicantFMName',
                                        '$.case_data.applicantLName',
                                        'v',
                                        '$.case_data.appRespondentFMName',
                                        '$.case_data.appRespondentLName',
                                    ],
                                },
                                {
                                    label: 'Case type',
                                    value: 'Financial Remedy',
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id',
                                },
                                {
                                    label: 'FamilyMan Case Number',
                                    value: '$.case_data.D8caseReference',
                                },
                            ],
                        },
                        {
                            name: 'Related cases',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Divorce',
                                    value: '$.case_data.divorceCaseNumber',
                                },
                            ],
                        },
                        {
                            name: 'Recent events',
                            type: 'timeline',
                            fields: [{ value: '$.events' }],
                        },
                    ],
                },
            ],
        },
        {
            id: 'parties',
            name: 'Parties',
            type: 'page',
            sections: [
                {
                    id: 'parties-tabs',
                    name: 'Parties',
                    type: 'parties-panel',
                    sections: [
                        {
                            id: 'petitioner',
                            name: 'Petitioner',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: ['$.case_data.applicantFMName', '$.case_data.applicantLName'],
                                },
                                { label: 'Date of birth', value: '' },
                                { label: 'Address', value: '' },
                                { label: 'Phone', value: '' },
                                { label: 'Email', value: '' },
                                { label: 'Representative', value: '' },
                            ],
                        },
                        {
                            id: 'petitioner-sol',
                            name: 'Petitioner Solicitor',
                            type: 'tab',
                            fields: [
                                { label: 'Reference no.', value: '$.case_data.solicitorReference' },
                                { label: 'Full name', value: '$.case_data.solicitorName' },
                                { label: 'Solicitor firm', value: '$.case_data.solicitorFirm' },
                                { label: 'Address', value: '$.case_data.solicitorAddress1' },
                                { label: 'Phone', value: '$.case_data.solicitorPhone' },
                                { label: 'Email', value: '$.case_data.solicitorEmail' },
                                { label: 'DX number', value: '$.case_data.solicitorDXnumber' },
                            ],
                        },
                        {
                            id: 'respondent',
                            name: 'Respondent',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: ['$.case_data.appRespondentFMName', '$.case_data.appRespondentLName'],
                                },
                                { label: 'Date of birth', value: '' },
                                { label: 'Address', value: '' },
                                { label: 'Phone', value: '' },
                                { label: 'Email', value: '' },
                                { label: 'Representative', value: '$.case_data.appRespondentRep' },
                            ],
                        },
                        {
                            id: 'respondent-sol',
                            name: 'Respondent Solicitor',
                            type: 'tab',
                            fields: [
                                { label: 'Reference no.', value: '$.case_data.rSolicitorReference' },
                                { label: 'Name', value: '$.case_data.rSolicitorName' },
                                { label: 'Solicitor firm', value: '$.case_data.rSolicitorFirm' },
                                { label: 'Address', value: '$.case_data.rSolicitorAddress1' },
                                { label: 'Phone', value: '$.case_data.rSolicitorPhone' },
                                { label: 'Email', value: '$.case_data.rSolicitorEmail' },
                                { label: 'DX number', value: '$.case_data.rSolicitorDXnumber' },
                            ],
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
                    fields: [
                        {
                            label: 'frDocument',
                            value: '$.case_data.frDocument|document_processor',
                        },
                        {
                            label: 'd81Joint',
                            value: '$.case_data.d81Joint|document_processor',
                        },
                        {
                            label: 'd81Applicant',
                            value: '$.case_data.d81Applicant|document_processor',
                        },
                        {
                            label: 'd81Respondent',
                            value: '$.case_data.d81Respondent|document_processor',
                        },
                        {
                            label: 'consentOrder',
                            value: '$.case_data.consentOrder|document_processor',
                        },
                        {
                            label: 'consentOrderText',
                            value: '$.case_data.consentOrderText|document_processor',
                        },
                        {
                            label: 'divorceUploadEvidence1',
                            value: '$.case_data.divorceUploadEvidence1|document_processor',
                        },
                    ],
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
                id: 'approve-consent-order',
                name: 'Approve consent order',
            },
            {
                id: 'ask-for-more-information',
                name: 'Ask for more information',
            },
            {
                id: 'send-annotated-order-to-solicitors',
                name: 'Send annotated order to solicitors',
            },
            {
                id: 'list-for-hearing',
                name: 'List for hearing',
            },
            {
                id: 'reject-consent-order',
                name: 'Reject consent order',
            },
        ],
    },
}
/*tslint:enable */
