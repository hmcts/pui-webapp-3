import { HttpClient } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
// import { CaseViewerModule } from './case-viewer/case-viewer.module';

import { HeaderComponent } from './components/header/header.component'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

// import {GovukModule} from '../govuk/govuk.module';

import { HmctsModule } from '../hmcts/hmcts.module'
import { CaseService } from './services/case.service'
import { SearchResultComponent } from './components/search-result/search-result.component'
import { HttpClientModule } from '@angular/common/http'
import { HmctsrolesLibModule } from 'hmctsroles-lib';
import { CaseViewerComponent } from './components/case-viewer/components/case-viewer/case-viewer.component';
import { CaseBarComponent } from './components/casebar/casebar.component';
import { SummaryPanelComponent } from './components/case-viewer/components/summary-panel/summary-panel.component';





@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule, HmctsModule, SharedModule, HttpClientModule, HmctsrolesLibModule],
    exports: [CaseBarComponent, CaseViewerComponent, HeaderComponent, SearchResultComponent],
    declarations: [CaseBarComponent, CaseViewerComponent, HeaderComponent, SearchResultComponent, SummaryPanelComponent],
    providers: [CaseService]
})
export class DomainModule { }
