import axios, { AxiosInstance } from 'axios'
import * as moment from 'moment'
import { map } from 'p-iteration'
import { config } from '../../config'

const http: AxiosInstance = axios.create({})
const url = config.services.coh.corApi

function convertDateTime(dateObj) {
    const conDateTime = moment(dateObj)
    const dateUtc = conDateTime.utc().format()
    const date = conDateTime.format('D MMMM YYYY')
    const time = conDateTime.format('h:mma')

    return { date, dateUtc, time }
}

function mergeCohEvents(eventsJson: any): any[] {
    const history = eventsJson.online_hearing.history
    const questionHistory = eventsJson.online_hearing.questions
        ? eventsJson.online_hearing.questions
              .map(arr => arr.history)
              .reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const answersHistory = eventsJson.online_hearing.answers
        ? eventsJson.online_hearing.answers
              .map(arr => arr.history)
              .reduce((historyArray, item) => historyArray.concat(item), [])
        : []

    const decisionHistory = eventsJson.online_hearing.decision ? eventsJson.online_hearing.decision.history : []
    return [...history, ...questionHistory, ...answersHistory, ...decisionHistory]
}

async function createHearing(caseId: string, userId: string, jurisdictionId: string = 'SSCS'): Promise<string> {
    const response = await http.post(`${url}/continuous-online-hearings`, {
        case_id: caseId,
        jurisdiction: jurisdictionId,
        panel: [{ identity_token: 'string', name: userId }],
        start_date: new Date().toISOString(),
    })

    return response.data.online_heading_id
}

export async function getHearing(caseId: string, userId: string): Promise<string> {
    const response = await http.get(`${url}/continuous-online-hearings?case_id=${caseId}`)
    return response.data.online_hearings[0] ? response.data.online_hearings[0].online_hearing_id : null
}

export async function getEvents(caseId: string, userId: string): Promise<any[]> {
    let hearingId = await getHearing(caseId, userId)
    if (!hearingId) {
        hearingId = await createHearing(caseId, userId)
    }

    const response = await http.get(`${url}/continuous-online-hearings/${hearingId}/conversations`)

    return mergeCohEvents(response.data).map(event => {
        const dateObj = convertDateTime(event.state_datetime)
        const dateUtc = dateObj.dateUtc
        const date = dateObj.date
        const time = dateObj.time

        return {
            by: 'coh',
            date,
            dateUtc,
            documents: [],
            time,
            title: event.state_desc,
        }
    })
}
