import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { HmctsModule } from '../hmcts/hmcts.module'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

import { AuthService } from '../auth/auth.service'

import { HeaderComponent } from '../domain/components/header/header.component'

import { DomainModule } from '../domain/domain.module'
import { CaseResolve } from './resolve/case.resolve';
import { ViewCaseComponent } from './pages/view-case/view-case.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        //canActivate: [AuthService],
        data: { roles: ['caseworker-probatex'] }
    },

    {
        path: 'jurisdiction/:jur/casetype/:casetype/viewcase/:case_id',
        resolve: {
            caseData: CaseResolve
        },
        children: [
            {
                path: ':section',
                component: ViewCaseComponent,
            },
            {
                path: ':section/:section_item_id',
                component: ViewCaseComponent,
            },
            {
                path: '',
                component: ViewCaseComponent
            }
        ]
    },

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
        HmctsModule,
        DomainModule
    ],
    declarations: [DashboardComponent, ViewCaseComponent],
    providers: [CaseResolve],
    exports: [RouterModule]
})
export class RoutingModule { }
