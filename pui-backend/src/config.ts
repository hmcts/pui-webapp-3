export const config = {
    ccd: {
        dataApi: 'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
    },
    coh: {
        corApi: 'http://coh-cor-aat.service.core-compute-aat.internal',
    },
    cookies: {
        token: '__auth__',
        userId: '__userid__',
    },
    idam: {
        idamApiUrl: 'https://preprod-idamapi.reform.hmcts.net:3511',
        idamClientID: 'juiwebapp',
        idamLoginUrl: 'https://idam.preprod.ccidam.reform.hmcts.net/login',
        indexUrl: '/',
        oauthCallbackUrl: '/oauth2/callback',
    },
    indexUrl: '/',
    jurisdictions: [
        {
            caseType: 'DIVORCE',
            filter: '',
            jur: 'DIVORCE',
        },
        {
            caseType: 'Benefit',
            filter: '&state=appealCreated&case.appeal.benefitType.code=PIP',
            jur: 'SSCS',
        },
        {
            caseType: 'FinancialRemedyMVP2',
            filter: '',
            jur: 'DIVORCE',
        },
    ],
    microservice: 'jui_webapp',
    port: 3000,
    protocol: 'http',

    proxy: {
        host: '172.16.0.7',
        port: 8080,
    },
    s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
    secureCookie: false, // this needs to be 'true' in prod and needs https encryption to be used
    sessionSecret: 's3cretSauc3',
}
