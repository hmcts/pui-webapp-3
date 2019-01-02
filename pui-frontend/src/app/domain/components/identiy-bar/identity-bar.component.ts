import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {MenuConfigModel} from "../../../models/menu-config.model";
import {MenuItemsModel} from "../../../models/menu-items.model";

@Component({
    selector: 'app-casebar',
    templateUrl: './identity-bar.component.html',
    styleUrls: ['./identity-bar.component.scss']
})
export class IdentityBarComponent implements OnInit{

    @Input() case: any;
    menuItems: MenuItemsModel;
    menuConfig: MenuConfigModel;

    constructor() {}

    ngOnInit(): void {
        this.menuItems = {
            title: {
                candidate1: this.case.details.fields[0].value,
                candidate2: this.case.details.fields[1].value
            },

            items: [{
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
                type: 'link'
            }]
        };

        this.menuConfig = {
            buttonText: 'Actions',
            type: 'dropdown'
        }

    }

    onButtonSubmit(payload): void {
        console.log(payload)
    }

}
