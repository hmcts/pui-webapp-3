import { moneyClaimCaseTemplate } from './cmc'
import { defaultTemplate } from './default'
import { divorceTemplate } from './divorce/divorce'
import { financialRemedyTemplate } from './divorce/financialRemedy'
import { grantOfRepresentationTemplate } from './probate'
import { benefitTemplate } from './sscs'

const map = {
    cmc: {
        moneyclaimcase: moneyClaimCaseTemplate,
    },
    divorce: {
        divorce: divorceTemplate,
        financialremedymvp2: financialRemedyTemplate,
    },
    probate: {
        grantofrepresentation: grantOfRepresentationTemplate,
    },
    sscs: {
        benefit: benefitTemplate,
    },
}

function template(jud, jurisdiction, caseType, defaultTemplate, node: string) {
    return jud ? jud[caseType.toLowerCase()][node] : defaultTemplate
}

export function listTemplates(jurisdiction, caseType) {
    const jud = map[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultTemplate.list, 'list')
}

export function templates(jurisdiction, caseType) {
    const jud = map[jurisdiction.toLowerCase()]
    return template(jud, jurisdiction, caseType, defaultTemplate.detail, 'detail')
}
