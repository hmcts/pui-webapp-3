import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { HmctsModule } from '../hmcts/hmcts.module'
import { RouterModule, Routes } from '@angular/router'
import { SharedModule } from '../shared/shared.module'

import { AuthService } from '../auth/auth.service'
import { DashboardComponent } from '../domain/components/dashboard/dashboard.component'
import { HeaderComponent } from '../domain/components/header/header.component'

import { DomainModule } from '../domain/domain.module'

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
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
        HmctsModule,
        DomainModule
    ],
    declarations: [DashboardComponent],
    providers: [],
    exports: [RouterModule]
})
export class RoutingModule { }
