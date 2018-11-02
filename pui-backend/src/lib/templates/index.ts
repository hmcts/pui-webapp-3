import { divorce } from './divorce/divorce'
import { financialRemedy } from './divorce/financialRemedy'

import * as cmcList from './cmc/moneyclaimcaseList'
import * as defaultListTemplate from './defaultList'

import * as financialRemedyList from './divorce/financialList'
import * as probateList from './probate/grantofrepresentationList'
import * as sscsBenefitList from './sscs/benefitList'

import * as cmc from './cmc/moneyclaimcase'
import * as defaultTemplate from './default'

import * as probate from './probate/grantofrepresentation'
import * as sscsBenefit from './sscs/benefit'

const map = {
    cmc: {
        moneyclaimcase: cmcList,
    },
    divorce: {
        divorce: {
            detail: divorce.detail,
            list: divorce.list,
        },
        financialRemedymvp2: {
            detail: divorce.detail,
            list: divorce.list,
        },
    },
    sscs: {
        benefit: sscsBenefitList,
    },

    probate: {
        grantofrepresentation: probateList,
    },
}

function template(jud, jurisdiction, caseType, defaultTemplate, node: string) {
    return jud ? jud[caseType.toLowerCase()][node] : defaultTemplate
}

export function listTemplates(jurisdiction, caseType) {
    const jud = map[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultListTemplate.default, 'list')
}

export function templates(jurisdiction, caseType) {
    const jud = map[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultTemplate.default, 'detail')
}
