// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


// "api_url": "http://localhost:3454/aggregated",
// "case_data_url": "http://localhost:3454/data",
// "document_management_url": "http://localhost:3454/documents",
// "login_url": "https://localhost:3501/login",
// "logout_url": "http://localhost:3454/logout",
// "oauth2_token_endpoint_url": "http://localhost:3454/oauth2",
// "oauth2_client_id": "ccd_gateway",
// "postcode_lookup_url": "http://localhost:3454/addresses?postcode=${postcode}",
// "remote_document_management_url": "http://localhost:4603/documents",
// "remote_print_service_url": "https://return-case-doc.dev.ccd.reform.hmcts.net"




export const environment = {
    cookies: {
        token: '__auth__',
        userId: '__userid__'
    },
    microservice: 'jui_webapp',
    idam_client: 'juiwebapp',
    oauth_callback_url: 'oauth2/callback',
    protocol: 'https',
    production: false,
    services: {
        ccdComponent: {
            api_url: '/api/ccd/aggregated',
            case_data_url: '/api/ccd/data',
            document_management_url: 'api/ccd/documents',
            postcode_lookup_url: '/api/ccd/addresses?postcode=${postcode}',
            login_url: 'http://idam.preprod.ccidam.reform.hmcts.net',
            oauth2_client_id: 'ccd_gateway',
            payments_url: '/api/ccd/payments',
            remote_document_management_url: 'http://localhost:4603/documents'
        },
        ccd_data_api: 'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        idam_api: 'https://preprod-idamapi.reform.hmcts.net:3511',
        idam_web: 'http://idam.preprod.ccidam.reform.hmcts.net',
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        dm_store_api: 'http://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal',
        em_redact_api: 'http://em-redact-aat.service.core-compute-aat.internal',
        coh_cor_api: 'http://coh-cor-aat.service.core-compute-aat.internal'
    },

    // tslint:disable-next-line:max-line-length
    tempdb: {
        columns: [
            {
                label: 'Case Reference',
                case_field_id: 'case_ref',
                value: '$.case_data.caseReference',
                oldValue: '$.id'
            },
            {
                label: 'Parties',
                case_field_id: 'parties',
                value: [
                    '$.case_data.appeal.appellant.name.firstName',
                    ' ',
                    '$.case_data.appeal.appellant.name.lastName',
                    ' ',
                    'v',
                    ' ',
                    'DWP'
                ]
            },
            { label: 'Type', case_field_id: 'type', value: '$.case_data.appeal.benefitType.code' },
            { label: 'Status', case_field_id: 'status', value: '$.state' },
            { label: 'Start date', case_field_id: 'caseStartDate', value: '$.created_date', date_format: 'd MMM yyyy' },
            {
                label: 'Date of last event',
                case_field_id: 'dateOfLastAction',
                value: '$.last_modified',
                date_format: 'd MMM yyyy'
            }
        ],
        results: [
            {
                case_id: 1535470684531004,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535470684531004,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'awaitingPaymentResponse',
                    caseStartDate: '2018-08-28T15:38:04.507',
                    dateOfLastAction: '2018-08-28T15:38:56.091'
                }
            },
            {
                case_id: 1535980139692888,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535980139692888,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'awaitingHWFDecision',
                    caseStartDate: '2018-09-03T13:08:59.644',
                    dateOfLastAction: '2018-09-03T13:09:45.371'
                }
            },
            {
                case_id: 1535980529322419,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535980529322419,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'awaitingHWFDecision',
                    caseStartDate: '2018-09-03T13:15:29.379',
                    dateOfLastAction: '2018-09-03T13:16:17.53'
                }
            },
            {
                case_id: 1535980800446002,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535980800446002,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'consentOrderApproved',
                    caseStartDate: '2018-09-03T13:20:00.488',
                    dateOfLastAction: '2018-09-03T13:22:54.995'
                }
            },
            {
                case_id: 1535981782165180,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535981782165180,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-03T13:36:22.118',
                    dateOfLastAction: '2018-09-03T13:36:22.118'
                }
            },
            {
                case_id: 1535982327844503,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1535982327844503,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'consentOrderApproved',
                    caseStartDate: '2018-09-03T13:45:27.891',
                    dateOfLastAction: '2018-09-03T13:47:41.184'
                }
            },
            {
                case_id: 1536068251109995,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536068251109995,
                    parties: 'test and tester setty v test test1',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-04T13:37:31.116',
                    dateOfLastAction: '2018-09-04T15:35:12.744'
                }
            },
            {
                case_id: 1536142046308905,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536142046308905,
                    parties: 'test and tester1 setty1 v ROOPA12 RAMISETTY2',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-05T10:07:26.336',
                    dateOfLastAction: '2018-09-05T10:44:46.398'
                }
            },
            {
                case_id: 1536243685930569,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536243685930569,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'consentOrderApproved',
                    caseStartDate: '2018-09-06T14:21:25.9',
                    dateOfLastAction: '2018-09-06T14:23:29.181'
                }
            },
            {
                case_id: 1536577824150765,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536577824150765,
                    parties: 'test_23 setty v test23 test56',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-10T11:10:24.102',
                    dateOfLastAction: '2018-09-10T11:10:24.102'
                }
            },
            {
                case_id: 1536669055006715,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536669055006715,
                    parties: 'karuna rao v michael rao',
                    type: 'Financial remedy',
                    status: 'consentOrderApproved',
                    caseStartDate: '2018-09-11T12:30:55.045',
                    dateOfLastAction: '2018-09-11T13:24:59.06'
                }
            },
            {
                case_id: 1536669376088988,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536669376088988,
                    parties: 'kiran kher v meera kher',
                    type: 'Financial remedy',
                    status: 'referredToJudge',
                    caseStartDate: '2018-09-11T12:36:16.091',
                    dateOfLastAction: '2018-09-11T13:38:49.233'
                }
            },
            {
                case_id: 1536759715944593,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536759715944593,
                    parties: 'george ruther v elizabeth ruther',
                    type: 'Financial remedy',
                    status: 'referredToJudge',
                    caseStartDate: '2018-09-12T13:41:55.964',
                    dateOfLastAction: '2018-09-12T13:55:09.122'
                }
            },
            {
                case_id: 1536939452447626,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1536939452447626,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'applicationIssued',
                    caseStartDate: '2018-09-14T15:37:32.469',
                    dateOfLastAction: '2018-09-14T15:41:29.812'
                }
            },
            {
                case_id: 1537135650138054,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537135650138054,
                    parties: 'test test v test test',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-16T22:07:30.116',
                    dateOfLastAction: '2018-09-16T22:07:30.116'
                }
            },
            {
                case_id: 1537175209209485,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537175209209485,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-17T09:06:49.252',
                    dateOfLastAction: '2018-09-17T09:06:49.252'
                }
            },
            {
                case_id: 1537176019321080,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537176019321080,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-17T09:20:19.328',
                    dateOfLastAction: '2018-09-17T09:20:19.328'
                }
            },
            {
                case_id: 1537260925231284,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537260925231284,
                    parties: 'Jane Smith v Peter Smith',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-18T08:55:25.204',
                    dateOfLastAction: '2018-09-18T08:55:25.204'
                }
            },
            {
                case_id: 1537263491620401,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537263491620401,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-18T09:38:11.698',
                    dateOfLastAction: '2018-09-18T09:38:11.698'
                }
            },
            {
                case_id: 1537277791206315,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537277791206315,
                    parties: 'viv div v viv resp',
                    type: 'Financial remedy',
                    status: 'referredToJudge',
                    caseStartDate: '2018-09-18T13:36:31.286',
                    dateOfLastAction: '2018-09-18T14:12:33.826'
                }
            },
            {
                case_id: 1537359166599308,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537359166599308,
                    parties: 'test case 1 test v lsr test test',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-19T12:12:46.586',
                    dateOfLastAction: '2018-09-19T12:15:28.901'
                }
            },
            {
                case_id: 1537360000809192,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537360000809192,
                    parties: 'father rao v mother rao',
                    type: 'Financial remedy',
                    status: 'referredToJudge',
                    caseStartDate: '2018-09-19T12:26:40.839',
                    dateOfLastAction: '2018-09-19T12:30:07.364'
                }
            },
            {
                case_id: 1537536825377438,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537536825377438,
                    parties: 'mukesh khiladi v ragini khiladi',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-21T13:33:45.391',
                    dateOfLastAction: '2018-09-21T13:33:45.391'
                }
            },
            {
                case_id: 1537561816049952,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537561816049952,
                    parties: 'test FR test ROO v DEV ETTY',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-21T20:30:16.079',
                    dateOfLastAction: '2018-09-21T20:30:16.079'
                }
            },
            {
                case_id: 1537782964901931,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'FinancialRemedyMVP2',
                case_fields: {
                    case_ref: 1537782964901931,
                    parties: 'test and tester setty v ROOPA test',
                    type: 'Financial remedy',
                    status: 'caseAdded',
                    caseStartDate: '2018-09-24T09:56:04.96',
                    dateOfLastAction: '2018-09-24T09:56:04.96'
                }
            },
            {
                case_id: 1537802137157169,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC003/01/31421',
                    parties: 'C September_131421 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T15:15:37.183',
                    dateOfLastAction: '2018-09-24T15:15:37.183'
                }
            },
            {
                case_id: 1537802137434121,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC004/09/39047',
                    parties: 'D September_939047 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T15:15:37.475',
                    dateOfLastAction: '2018-09-24T15:15:37.475'
                }
            },
            {
                case_id: 1537815865807813,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC001/04/85766',
                    parties: 'A September_485766 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:04:25.84',
                    dateOfLastAction: '2018-09-24T19:04:25.84'
                }
            },
            {
                case_id: 1537815866192033,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC002/03/71383',
                    parties: 'B September_371383 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:04:26.197',
                    dateOfLastAction: '2018-09-24T19:04:26.197'
                }
            },
            {
                case_id: 1537815866436141,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC003/02/53528',
                    parties: 'C September_253528 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:04:26.418',
                    dateOfLastAction: '2018-09-24T19:04:26.418'
                }
            },
            {
                case_id: 1537815866620074,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC004/02/53528',
                    parties: 'D September_253528 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:04:26.65',
                    dateOfLastAction: '2018-09-24T19:04:26.65'
                }
            },
            {
                case_id: 1537815866925655,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC005/08/68779',
                    parties: 'E September_868779 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:04:26.903',
                    dateOfLastAction: '2018-09-24T19:04:26.903'
                }
            },
            {
                case_id: 1537818180013521,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC001/05/65153',
                    parties: 'A September_565153 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:43:00.013',
                    dateOfLastAction: '2018-09-24T19:43:00.013'
                }
            },
            {
                case_id: 1537818180202298,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC002/01/00678',
                    parties: 'B September_100678 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:43:00.291',
                    dateOfLastAction: '2018-09-24T19:43:00.291'
                }
            },
            {
                case_id: 1537818180536489,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC003/06/77801',
                    parties: 'C September_677801 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:43:00.544',
                    dateOfLastAction: '2018-09-24T19:43:00.544'
                }
            },
            {
                case_id: 1537818180799103,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC004/04/85426',
                    parties: 'D September_485426 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:43:00.759',
                    dateOfLastAction: '2018-09-24T19:43:00.759'
                }
            },
            {
                case_id: 1537818180953445,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC005/09/08303',
                    parties: 'E September_908303 v DWP',
                    type: 'PIP',
                    status: 'appealCreated',
                    caseStartDate: '2018-09-24T19:43:00.997',
                    dateOfLastAction: '2018-09-24T19:43:00.997'
                }
            },
            {
                case_id: 1537802136341095,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC001/02/45805',
                    parties: 'A September_245805 v DWP',
                    type: 'PIP',
                    status: 'Continuous online hearing started',
                    caseStartDate: '2018-09-24T15:15:36.339',
                    dateOfLastAction: '2018-09-24T19:02:15Z'
                }
            },
            {
                case_id: 1537802137743679,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC005/03/61924',
                    parties: 'E September_361924 v DWP',
                    type: 'PIP',
                    status: 'Continuous online hearing started',
                    caseStartDate: '2018-09-24T15:15:37.792',
                    dateOfLastAction: '2018-09-24T19:02:39Z'
                }
            },
            {
                case_id: 1537864962535539,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864962535539,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:42:42.508',
                    dateOfLastAction: '2018-09-25T08:42:42.508'
                }
            },
            {
                case_id: 1537864966060864,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864966060864,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:42:46.086',
                    dateOfLastAction: '2018-09-25T08:42:46.508'
                }
            },
            {
                case_id: 1537864968934959,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864968934959,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:42:48.902',
                    dateOfLastAction: '2018-09-25T08:42:48.902'
                }
            },
            {
                case_id: 1537864970660550,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864970660550,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:42:50.666',
                    dateOfLastAction: '2018-09-25T08:42:50.666'
                }
            },
            {
                case_id: 1537864972506082,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864972506082,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:42:52.519',
                    dateOfLastAction: '2018-09-25T08:42:53.659'
                }
            },
            {
                case_id: 1537864975735043,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864975735043,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:42:55.715',
                    dateOfLastAction: '2018-09-25T08:42:55.956'
                }
            },
            {
                case_id: 1537864979450458,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864979450458,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:42:59.419',
                    dateOfLastAction: '2018-09-25T08:42:59.419'
                }
            },
            {
                case_id: 1537864983065144,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864983065144,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosStarted',
                    caseStartDate: '2018-09-25T08:43:03.078',
                    dateOfLastAction: '2018-09-25T08:43:03.328'
                }
            },
            {
                case_id: 1537864983687384,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864983687384,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosStarted',
                    caseStartDate: '2018-09-25T08:43:03.69',
                    dateOfLastAction: '2018-09-25T08:43:03.909'
                }
            },
            {
                case_id: 1537864985962546,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864985962546,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosStarted',
                    caseStartDate: '2018-09-25T08:43:05.937',
                    dateOfLastAction: '2018-09-25T08:43:06.234'
                }
            },
            {
                case_id: 1537864988178579,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864988178579,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosCompleted',
                    caseStartDate: '2018-09-25T08:43:08.127',
                    dateOfLastAction: '2018-09-25T08:43:08.346'
                }
            },
            {
                case_id: 1537864988688734,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864988688734,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosCompleted',
                    caseStartDate: '2018-09-25T08:43:08.612',
                    dateOfLastAction: '2018-09-25T08:43:09.002'
                }
            },
            {
                case_id: 1537864990922790,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864990922790,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:43:10.925',
                    dateOfLastAction: '2018-09-25T08:43:10.925'
                }
            },
            {
                case_id: 1537864991264424,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864991264424,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosCompleted',
                    caseStartDate: '2018-09-25T08:43:11.253',
                    dateOfLastAction: '2018-09-25T08:43:11.637'
                }
            },
            {
                case_id: 1537864991928713,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864991928713,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosCompleted',
                    caseStartDate: '2018-09-25T08:43:11.903',
                    dateOfLastAction: '2018-09-25T08:43:12.121'
                }
            },
            {
                case_id: 1537864994326444,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537864994326444,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AosCompleted',
                    caseStartDate: '2018-09-25T08:43:14.319',
                    dateOfLastAction: '2018-09-25T08:43:14.602'
                }
            },
            {
                case_id: 1537865006147694,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865006147694,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:43:26.184',
                    dateOfLastAction: '2018-09-25T08:43:26.184'
                }
            },
            {
                case_id: 1537865006527770,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865006527770,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:43:26.574',
                    dateOfLastAction: '2018-09-25T08:43:26.574'
                }
            },
            {
                case_id: 1537865015152461,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865015152461,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:43:35.153',
                    dateOfLastAction: '2018-09-25T08:43:35.458'
                }
            },
            {
                case_id: 1537865017618378,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865017618378,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:43:37.642',
                    dateOfLastAction: '2018-09-25T08:43:37.876'
                }
            },
            {
                case_id: 1537865018649737,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865018649737,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:43:38.659',
                    dateOfLastAction: '2018-09-25T08:43:39.033'
                }
            },
            {
                case_id: 1537865021541749,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865021541749,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:43:41.569',
                    dateOfLastAction: '2018-09-25T08:43:41.569'
                }
            },
            {
                case_id: 1537865025764065,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865025764065,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'AwaitingPayment',
                    caseStartDate: '2018-09-25T08:43:45.74',
                    dateOfLastAction: '2018-09-25T08:43:45.74'
                }
            },
            {
                case_id: 1537865026079935,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865026079935,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:43:46.021',
                    dateOfLastAction: '2018-09-25T08:43:46.24'
                }
            },
            {
                case_id: 1537865026626750,
                case_jurisdiction: 'DIVORCE',
                case_type_id: 'DIVORCE',
                case_fields: {
                    case_ref: 1537865026626750,
                    parties: 'John Smith v Jane Jamed',
                    type: 'Divorce',
                    status: 'Submitted',
                    caseStartDate: '2018-09-25T08:43:46.693',
                    dateOfLastAction: '2018-09-25T08:43:46.912'
                }
            },
            {
                case_id: 1537802136883716,
                case_jurisdiction: 'SSCS',
                case_type_id: 'Benefit',
                case_fields: {
                    case_ref: 'SC002/02/85668',
                    parties: 'B September_285668 v DWP',
                    type: 'PIP',
                    status: 'Continuous online hearing started',
                    caseStartDate: '2018-09-24T15:15:36.882',
                    dateOfLastAction: '2018-09-25T08:26:55Z'
                }
            }
        ]
    }
}
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
