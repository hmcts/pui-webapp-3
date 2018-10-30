import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HmctsGlobalHeaderComponent } from './components/hmcts-global-header/hmcts-global-header.component'
import { RouterModule } from '@angular/router'
import { HmctsPrimaryNavigationComponent } from './components/hmcts-primary-navigation/hmcts-primary-navigation.component'
import { HmctsSubNavigationComponent } from './components/hmcts-sub-navigation/hmcts-sub-navigation.component'

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        HmctsGlobalHeaderComponent,
        // HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        // HmctsTimelineComponent,
        // HmctsAlertComponent,
        // SentenceCasePipe
    ],
    exports: [
        HmctsGlobalHeaderComponent,
        // HmctsProgressBarComponent,
        HmctsPrimaryNavigationComponent,
        HmctsSubNavigationComponent,
        // HmctsTimelineComponent,
        // HmctsAlertComponent,
        // SentenceCasePipe
    ]
})
export class HmctsModule { }
