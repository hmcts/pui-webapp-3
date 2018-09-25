import * as cmc from './cmc/moneyclaimcase'
import * as defaultTemplate from './default'
import * as divorce from './divorce/divorce'
import * as financialRemedy from './divorce/financialremedy'
import * as probate from './probate/grantofrepresentation'
import * as sscsBenefit from './sscs/benefit'

const templatesMap = {
    cmc: {
        moneyclaimcase: cmc,
    },
    divorce: {
        divorce,
        financialremedymvp2: financialRemedy,
    },
    sscs: {
        benefit: sscsBenefit,
    },

    probate: {
        grantofrepresentation: probate,
    },
}

export function templates(jurisdiction, caseType) {
    const jud = templatesMap[jurisdiction.toLowerCase()]
    const template = jud ? jud[caseType.toLowerCase()] : defaultTemplate
    return template ? template : defaultTemplate
}
