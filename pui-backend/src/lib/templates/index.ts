import * as cmcList from './cmc/moneyclaimcaseList'
import * as defaultListTemplate from './defaultList'
import * as divorceList from './divorce/divorceList'
import * as financialRemedyList from './divorce/financialList'
import * as probateList from './probate/grantofrepresentationList'
import * as sscsBenefitList from './sscs/benefitList'

import * as cmc from './cmc/moneyclaimcase'
import * as defaultTemplate from './default'
import * as divorce from './divorce/divorce'
import * as financialRemedy from './divorce/financialremedy'
import * as probate from './probate/grantofrepresentation'
import * as sscsBenefit from './sscs/benefit'

const listMap = {
    cmc: {
        moneyclaimcase: cmcList,
    },
    divorce: {
        divorce: divorceList,
        financialRemedymvp2: financialRemedyList,
    },
    sscs: {
        benefit: sscsBenefitList,
    },

    probate: {
        grantofrepresentation: probateList,
    },
}

const map = {
    cmc: {
        moneyclaimcase: cmc,
    },
    divorce: {
        divorce: divorce,
        financialremedymvp2: financialRemedy,
    },
    sscs: {
        benefit: sscsBenefit,
    },

    probate: {
        grantofrepresentation: probate,
    },
}

function template(jud, jurisdiction, caseType, defaultTemplate) {
    const template = jud ? jud[caseType.toLowerCase()] : defaultListTemplate
    return template ? template.default : defaultTemplate
}

export function listTemplates(jurisdiction, caseType) {
    const jud = listMap[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultListTemplate.default)
}

export function templates(jurisdiction, caseType) {
    const jud = map[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultTemplate.default)
}
