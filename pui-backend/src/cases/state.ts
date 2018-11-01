import * as log4js from 'log4js'
import { config } from '../config'
import { stateTransition } from '../config/refStateTransition'
import { stateRegister } from '../lib/stateRegister'

const logger = log4js.getLogger('state')
logger.level = config.logging

export function process(param) {
    const jud = stateTransition[param.jurisdiction.toLowerCase()]
    const conditionsList = jud ? jud[param.caseType.toLowerCase()] : ['default']

    const context = {
        caseData: param,
        outcome: {},
        stop: false,
    }

    conditionsList.forEach(condition => {
        logger.info('Processing condition', condition)
        if (!context.stop) {
            const result = stateRegister[condition].when(context)
            if (result) {
                stateRegister[condition].then(context)
            }
        }
    })

    return context.outcome
}
