import * as jp from 'jsonpath'

export function documentProcessor(documents, caseData) {
    if (!Array.isArray(documents)) {
        documents = [documents]
    }

    documents = documents.map(doc => {
        const splitURL = doc.document_url.split('/')
        doc.id = splitURL[splitURL.length - 1]
        return doc
    })

    caseData.documents = caseData.documents || []
    caseData.documents = caseData.documents.concat(documents)

    return documents
}

export function process(lookup, caseData) {
    if (typeof lookup === 'string') {
        const splitLookup = lookup.split('|')
        let value = splitLookup[0]
        const processor = splitLookup.length > 1 ? splitLookup[1] : null

        // Run jsonpath if it begins with an A take the full result else just take the 1st value.
        if (value.startsWith('A')) {
            value = value.substring(1)
            value = jp.query(caseData, value)
        } else if (value.startsWith('$')) {
            value = jp.query(caseData, value)[0]
        }

        // Processors
        if (value && processor && processor === 'document_processor') {
            value = documentProcessor(value, caseData)
        }

        return value
    } else if (typeof lookup === 'number') {
        return lookup
    } else if (Array.isArray(lookup)) {
        return lookup.map(part => process(part, caseData)).join(' ')
    }
    throw new Error('lookup is neither a string or an array.')
}
