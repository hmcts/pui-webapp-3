import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInteceptor } from './auth-inteceptor'
import { CookieModule } from 'ngx-cookie'
import { NgModule } from '@angular/core'
import { AuthService } from './auth.service'

@NgModule({
    imports: [CookieModule.forRoot()],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInteceptor,
            multi: true
        },
        AuthService
    ]
})
export class AuthModule {}
