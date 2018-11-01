import { state } from '../config/refState'
import { goto } from '../config/refStateGoTo'
import { valueOrNull } from '../lib/util'

function createCaseState(state, date, actionUrl, id = null) {
    return {
        ID: id,
        actionGoTo: actionUrl || goto.SUMMARY_GO_TO,
        stateDateTime: date,
        stateName: state,
    }
}

export const stateRegister = {
    cohDecisionState: {
        then: context => {
            const hearingData = context.caseData.hearingData
            context.outcome = createCaseState(
                state.COH_DECISION_ISSUED_STATE,
                hearingData.current_state.state_datetime,
                goto.SUMMARY_GO_TO
            )

            context.stop = true
        },
        when: context => {
            const hearingData = context.caseData.hearingData
            // TODO add check for ccd-state as well
            return (
                hearingData &&
                hearingData.current_state &&
                hearingData.current_state.state_name === state.COH_DECISION_ISSUED_STATE
            )
        },
    },
    cohRelistState: {
        then: context => {
            const hearingData = context.caseData.hearingData
            context.outcome = createCaseState(
                state.COH_RELISTED_STATE,
                hearingData.current_state.state_datetime,
                goto.SUMMARY_GO_TO
            )
            context.stop = true
        },
        when: context => {
            const hearingData = context.caseData.hearingData
            // TODO add check for ccd-state as well
            return valueOrNull(hearingData, 'current_state.state_name') === state.COH_RELISTED_STATE
        },
    },
    cohState: {
        then: context => {
            context.cohStateCheck = true
            const hearingData = context.caseData.hearingData
            context.outcome = createCaseState(
                state.COH_STARTED_STATE,
                hearingData.current_state.state_datetime,
                goto.CASE_FILE_GO_TO
            )
        },
        when: context => {
            const hearingData = context.caseData.hearingData
            const hearingState = hearingData ? hearingData.current_state.state_name : undefined
            return context.ccdCohStateCheck && hearingState && hearingState === state.COH_STARTED_STATE
        },
    },
    deadlineElapsed: {
        then: context => {
            const questionRound = context.caseData.questionRoundData
            context.outcome = createCaseState(
                state.COH_Q_DEADLINE_ELAPSED_STATE,
                questionRound.questions[0].state_datetime,
                goto.QUESTIONS_GO_TO
            )
            context.stop = true
        },
        when: context => {
            const questionRound = context.caseData.questionRoundData
            return context.cohStateCheck && questionRound && questionRound.state === state.COH_Q_DEADLINE_ELAPSED_STATE
        },
    },
    deadlineExtensionExpired: {
        then: context => {
            const questionRound = context.caseData.questionRoundData
            context.outcome = createCaseState(
                state.COH_Q_DEADLINE_EXT_ELAPSED_STATE,
                questionRound.questions[0].state_datetime,
                goto.QUESTIONS_GO_TO
            )
            context.stop = true
        },
        when: context => {
            const questionRound = context.caseData.questionRoundData
            const questionDeadlineElapsed =
                context.cohStateCheck && questionRound && questionRound.state === state.COH_Q_DEADLINE_ELAPSED_STATE
            return questionDeadlineElapsed && questionRound.deadline_extension_count > 0
        },
    },
    default: {
        then: context => {
            context.outcome = createCaseState(context.caseData.ccdState, null, goto.SUMMARY_GO_TO)
            context.ccdCohStateCheck = true
        },
        when: () => {
            return true
        },
    },
    questionState: {
        then: context => {
            const questionRound = context.caseData.questionRoundData
            context.outcome = createCaseState(
                questionRound.questions[0].state,
                questionRound.questions[0].state_datetime,
                goto.QUESTIONS_GO_TO
            )
        },
        when: context => {
            const hearingData = context.caseData.hearingData
            const hearingState = hearingData ? hearingData.current_state.state_name : undefined
            return context.ccdCohStateCheck && hearingState && hearingState === state.COH_STARTED_STATE
        },
    },
    referredToJudge: {
        then: context => {
            const splitURL = context.caseData.consentOrder.document_url.split('/')

            const consentOrder = context.caseData.consentOrder ? splitURL[splitURL.length - 1] : undefined
            context.outcome = createCaseState(context.caseData.ccdState, null, goto.CASE_FILE_GO_TO, consentOrder)
        },
        when: context => {
            return context.caseData.ccdState === state.FR_CCD_REFER_TO_JUDGE_STATE
        },
    },
}
