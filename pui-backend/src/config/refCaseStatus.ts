export const caseStatusMap = {
    cmc: {
        moneyclaimcase: {
            open: 'Open',
        },
    },
    divorce: {
        AwaitingHWFDecision: 'Awaiting HWF decision',
        AwaitingPayment: 'Awaiting payment',
        divorce: {
            AosAwaiting: 'Aos awaiting',
            AosCompleted: 'Aos completed',
            AosCompletedAwaitingAnswer: 'Aos completed awaiting answer',
            AosStarted: 'Aos started',
            AwaitingDecreeNisi: 'Awaiting decree nisi',
        },

        financialremedymvp2: {
            applicationIssued: 'Application issued',
            awaitingHWFDecision: 'Awaiting HWF decision',
            awaitingPaymentResponse: 'Awaiting payment response',
            caseAdded: 'Case added',
            consentOrderApproved: 'Consent order approved',
            consentOrderMade: 'Consent Order Made',
            consentOrderNotApproved: 'Consent order not approved',
            referredToJudge: 'Draft consent order',
        },
    },
    sscs: {
        benefit: {
            appealCreated: 'Appeal created',
            continuous_online_hearing_decision_issued: 'Decision issued',
            continuous_online_hearing_started: 'DWP response',
            question_answered: 'Appellant’s answers',
            question_deadline_elapsed: 'Incomplete response from appellant',
            question_deadline_extension_elapsed: 'Incomplete response from appellant',
            question_deadline_extension_granted: 'Question deadline extension granted',
            question_drafted: 'Question drafted',
            question_issued: 'Question issued',
        },
    },

    probate: {
        grantofrepresentation: {
            BOExamining: 'BO Examining',
            CaseCreated: 'Case created',
            CasePaymentFailed: 'Case payment failed',
            CasePrinted: 'Case printed',
            PAAppCreated: 'PA app created',
        },
    },
}
