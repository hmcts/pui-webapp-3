import axios, { AxiosInstance } from 'axios'
import * as moment from 'moment'
import * as coh from '../lib/services/coh'

const http: AxiosInstance = axios.create({})

function countStates(questions: any[], state: any): number {
    return questions.map(question => question.current_question_state.state_name).filter(s => s === state).length
}

function getExpirationDate(questions: any[]): any[] {
    return (
        questions
            .map(question => question.deadline_expiry_date)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || null
    )
}

function formatQuestions(questions: any[]): any[] {
    return questions.map(question => {
        return {
            id: question.question_id,
            rounds: question.question_round,
            header: question.question_header_text,
            body: question.question_body_text,
            owner_reference: question.owner_reference,
            state_datetime: question.current_question_state.state_datetime,
            state: question.current_question_state.state_name,
        }
    })
}

function formatRounds(rounds: any[]): any[] {
    return rounds.map(round => {
        const expireDate = round.question_references ? moment(getExpirationDate(round.question_references)) : null
        let expires = null
        if (expireDate) {
            const dateUtc = expireDate.utc().format()
            const date = expireDate.format('D MMM YYYY')
            const time = expireDate.format('HH:mma')
            expires = { dateUtc, date, time }
        }

        const numberQuestion = round.question_references ? round.question_references.length : 0
        const numberQuestionAnswer = round.question_references ? countStates(round.question_references, 'question_answered') : 0

        const questionDeadlineExpired = expireDate < moment()

        return {
            question_round_number: round.question_round_number,
            state: round.question_round_state.state_name,
            expires,
            number_question: numberQuestion,
            number_question_answer: numberQuestionAnswer,
            question_deadline_expired: questionDeadlineExpired,
            deadline_extension_count: round.deadline_extension_count,
            questions: round.question_references ? formatQuestions(round.question_references) : [],
        }
    })
}

export async function getQuestionsByCase(caseId: string, userId: string): Promise<any[]> {
    let hearingId

    let hearing = await coh.getHearing(caseId)
    if (hearing) {
        hearingId = hearing.online_hearings[0] ? hearing.online_hearings[0].online_hearing_id : null
    } else {
        hearingId = await coh.createHearing(caseId, userId)
    }

    const response = await http.get(`${coh.url}/continuous-online-hearings/${hearingId}/questionrounds/`)
    return response.data ? formatRounds(response.data.question_rounds) : response.data
}
