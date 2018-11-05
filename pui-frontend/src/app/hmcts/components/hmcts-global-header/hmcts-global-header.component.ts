import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html',
    styleUrls: ['./hmcts-global-header.component.scss']
})
export class HmctsGlobalHeaderComponent {
    @Input() serviceName = {
        name: 'Service name',
        url: '#'
    };
    @Input() navigation = {
        label: 'Account navigation',
        items: [
            {
                text: 'Nav item 1',
                href: '#1'
            }, {
                text: 'Nav item 2',
                href: '#1'
            }
        ]
    };

    constructor(private auth: AuthService) { }



    signOut() {

        this.auth.signOut();

    }
}
