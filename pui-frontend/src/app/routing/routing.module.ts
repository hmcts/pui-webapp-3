import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { HmctsModule } from '../hmcts/hmcts.module'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

import { AuthService } from '../auth/auth.service'

import { HeaderComponent } from '../domain/components/header/header.component'

import { DomainModule } from '../domain/domain.module'
import { CaseResolve } from './resolve/case.resolve'
import { ViewCaseComponent } from './pages/view-case/view-case.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { CreateCaseComponent } from './pages/create-case/create-case.component'
import { routing as caseEditRouting } from '@hmcts/ccd-case-ui-toolkit'

import {
    CaseUIToolkitModule,
    DraftService,
    AlertService,
    HttpService,
    AuthService as CCDAuthService,
    CasesService,
    HttpErrorService,
    AbstractAppConfig,
    CaseEditWizardGuard,
    RouterHelperService,
    LabelSubstitutionService,
    DocumentManagementService,
    PageValidationService
} from '@hmcts/ccd-case-ui-toolkit'
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to'
// import { CaseProgressConsumerComponent } from './case-progress-consumer.component';
import { AppConfig } from '../app.config'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material'
import { HttpModule } from '@angular/http'
import { CaseProgressComponent } from './pages/case-progress/case-progress.component'
import { StatusComponent } from './pages/status/status.component'

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthService],
        data: { roles: ['caseworker-probatex'] }
    },

    {
        path: 'create-case',
        component: CreateCaseComponent,
        canActivate: [AuthService],
        children: caseEditRouting
    },
    {
        path: 'case-progress/:caseId',
        component: CaseProgressComponent,
        canActivate: [AuthService],
        children: caseEditRouting
    },

    {
        path: 'jurisdiction/:jur/casetype/:casetype/viewcase/:case_id',
        resolve: {
            caseData: CaseResolve
        },
        children: [
            {
                path: ':section',
                component: ViewCaseComponent
            },
            {
                path: ':section/:section_item_id',
                component: ViewCaseComponent
            },
            {
                path: '',
                component: ViewCaseComponent
            }
        ]
    },

    {
        path: 'status',
        component: StatusComponent,
        canActivate: [AuthService]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
        CaseUIToolkitModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HmctsModule,
        DomainModule,
        HttpModule
    ],
    declarations: [DashboardComponent, ViewCaseComponent, CreateCaseComponent, CaseProgressComponent, StatusComponent],
    providers: [
        CaseResolve,
        CasesService,
        CCDAuthService,
        HttpService,
        HttpErrorService,
        AlertService,
        DraftService,
        LabelSubstitutionService,
        PageValidationService,
        CaseEditWizardGuard,
        RouterHelperService,
        DocumentManagementService,
        ScrollToService,
        AppConfig,
        {
            provide: AbstractAppConfig,
            useExisting: AppConfig
        }
    ],
    exports: [RouterModule]
})
export class RoutingModule {}
