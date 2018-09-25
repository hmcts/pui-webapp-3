import { NgModule } from '@angular/core'
import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HmctsModule } from '../hmcts/hmcts.module'

import { FooterComponent } from './components/footer/footer.component'
import { TableComponent } from './components/table/table.component'

@NgModule({
    imports: [
        CdkTableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // GovukModule,
        HmctsModule
    ],
    declarations: [FooterComponent, TableComponent],
    exports: [FooterComponent, TableComponent]
})
export class SharedModule {}
