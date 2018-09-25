import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { DomainModule } from './domain/domain.module'
import { HmctsModule } from './hmcts/hmcts.module'
import { RoutingModule } from './routing/routing.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RoutingModule, AuthModule, DomainModule, HmctsModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
