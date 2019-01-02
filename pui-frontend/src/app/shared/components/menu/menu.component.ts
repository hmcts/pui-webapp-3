import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuConfigModel} from "../../../models/menu-config.model";
import {MenuItemsModel} from "../../../models/menu-items.model";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input() items: MenuItemsModel;
    @Input() menuConfig: MenuConfigModel;
    @Output() onButtonSubmit = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
        this.menuConfig = {
            type: this.menuConfig.type ? this.menuConfig.type : 'dropdown',
            buttonClass: this.menuConfig.buttonClass ? this.menuConfig.buttonClass : '',
            buttonText: this.menuConfig.buttonText ? this.menuConfig.buttonText : 'Actions',
            menuClass: this.menuConfig.menuClass ? this.menuConfig.menuClass : '',
            mq: this.menuConfig.mq ?  this.menuConfig.mq : 0
        }
    }

    onActionSubmit(payload): void {
        this.onButtonSubmit.emit(payload.action);
    }

}
