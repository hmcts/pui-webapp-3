/*tslint:disable */
export default {
    details: {
        fields: [
            {
                value: '$.case_data.caseReference',
            },
            {
                value: [
                    '$.case_data.appeal.appellant.name.firstName',
                    '$.case_data.appeal.appellant.name.lastName',
                    'v',
                    'DWP',
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
                                        '$.case_data.appeal.appellant.name.firstName',
                                        '$.case_data.appeal.appellant.name.lastName',
                                        'v',
                                        'DWP',
                                    ],
                                },
                                {
                                    label: 'Case type',
                                    value: 'Benefit',
                                },
                                {
                                    label: 'Benefit type',
                                    value: '$.case_data.appeal.benefitType.code',
                                },
                                {
                                    label: 'Case number',
                                    value: '$.id',
                                },
                                {
                                    label: 'GAPS2 Case number',
                                    value: '$.case_data.caseReference',
                                },
                            ],
                        },
                        {
                            name: 'Panel members',
                            type: 'data-list',
                            fields: [
                                {
                                    label: 'Judge',
                                    value: '$.case_data.panel.assignedTo',
                                },
                                {
                                    label: 'Medical Member',
                                    value: '$.case_data.panel.medicalMember',
                                },
                                {
                                    label: 'Disability qualified member',
                                    value: '$.case_data.panel.disabilityQualifiedMember',
                                },
                            ],
                        },
                        {
                            name: 'Recent events',
                            type: 'timeline',
                            fields: [
                                {
                                    value: '$.events',
                                },
                            ],
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
                            id: 'appellant',
                            name: 'Appellant',
                            type: 'tab',
                            fields: [
                                {
                                    label: 'Full name',
                                    value: [
                                        '$.case_data.appeal.appellant.name.firstName',
                                        '$.case_data.appeal.appellant.name.lastName',
                                    ],
                                },
                                { label: 'Date of birth', value: '$.case_data.appeal.appellant.identity.dob' },
                                { label: 'Address', value: '' },
                                { label: 'Phone', value: '$.case_data.appeal.appellant.contact.phone' },
                                { label: 'Email', value: '$.case_data.appeal.appellant.contact.email' },
                                { label: 'Representative', value: '' },
                                {
                                    label: 'National Insurances No.',
                                    value: '$.case_data.appeal.appellant.identity.nino',
                                },
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
                            value: '$.case_data.sscsDocument[:1].value.documentLink|document_processor',
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
                    fields: [
                        {
                            value: '$.events',
                        },
                    ],
                },
            ],
        },
        {
            id: 'questions',
            name: 'Questions',
            type: 'page',
            sections: [
                {
                    name: 'Questions',
                    type: 'questions-panel',
                    fields: [
                        {
                            value: '$.questions',
                        },
                    ],
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
                id: 'appeal-upheld',
                name: 'Appeal upheld',
            },
            {
                id: 'appeal-denied',
                name: 'Appeal denied',
            },
        ],
    },
}
/*tslint:enable */
