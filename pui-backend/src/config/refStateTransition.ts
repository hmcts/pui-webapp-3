export const stateTransition = {
    cmc: {
        moneyclaimcase: ['default'],
    },
    divorce: {
        divorce: ['default'],
        financialremedymvp2: ['default', 'referredToJudge'],
    },
    probate: {
        grantofrepresentation: ['default'],
    },
    sscs: {
        benefit: [
            'default',
            'cohDecisionState',
            'cohRelistState',
            'cohState',
            'deadlineExtensionExpired',
            'deadlineElapsed',
            'questionState',
        ],
    },
}
