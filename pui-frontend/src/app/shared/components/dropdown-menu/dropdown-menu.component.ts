import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MenuConfigModel} from "../../../models/menu-config.model";
import {MenuItemsModel} from "../../../models/menu-items.model";

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
    @Input() items: MenuItemsModel;
    @Input() config: MenuConfigModel;
    @ViewChild('optionsDropdown') optionsDropdown: ElementRef;
    styles = {display: 'none'};

    constructor() { }

    @HostListener('document: click', ['$event.target'])
    onClick(target) {
        if (target.className === 'govuk-button hmcts-menu__toggle-button' ) {
            if (this.optionsDropdown.nativeElement.offsetParent === null) {
                this.styles.display = 'block'
            } else {
                this.styles.display = 'none'
            }
        } else {
            this.styles.display = 'none'
        }
    }

    ngOnInit(): void {

    }


}
