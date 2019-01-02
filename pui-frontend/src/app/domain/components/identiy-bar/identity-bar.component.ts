import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-casebar',
    templateUrl: './identity-bar.component.html',
    styleUrls: ['./identity-bar.component.scss']
})
export class IdentityBarComponent implements OnInit{

    @Input() case: any; // todo add this to menuitems
    menuItems: {[id: string]: string}[];

    constructor() {}

    ngOnInit(): void {
        this.menuItems = [
            {
                action: '../decision/create',
                text: 'Make decision',
                type: 'link'
            },
            {   action: '../hearing/list',
                text: 'List for hearing',
                classes: 'hmcts-button--secondary',
                type: 'link'
            },
            {   action: '../hearing/list',
                text: 'List for hearing',
                classes: 'hmcts-button--secondary',
                type: 'dropdown'
            }
        ]
    }

    onButtonSubmit(payload): void {
        console.log(payload)
    }

}
