import { NgModule } from '@angular/core'
import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HmctsModule } from '../hmcts/hmcts.module'

import { FooterComponent } from './components/footer/footer.component'
import { TableComponent } from './components/table/table.component';
import { CaseActionsComponent } from './components/case-actions/case-actions.component';
import { CaseActionAlertComponent } from './components/case-action-alert/case-action-alert.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { GovukModule } from '../govuk/govuk.module';



@NgModule({
    imports: [
        CdkTableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        GovukModule,
        HmctsModule
    ],
    declarations: [CaseActionsComponent, CaseActionAlertComponent, DataListComponent, FooterComponent, TableComponent],
    exports: [CaseActionsComponent, CaseActionAlertComponent, DataListComponent, FooterComponent, TableComponent]
})
export class SharedModule { }
