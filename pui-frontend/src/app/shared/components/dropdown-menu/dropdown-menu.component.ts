import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';


@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
    @Input() items;
    @Input() config;

    @ViewChild('optionsDropdown') optionsDropdown: ElementRef;

    styles = {display: 'none'};
    isExpanded = false;
    rank: number;

    constructor() { }

    @HostListener('document: click', ['$event.target'])
    onClick(target): void {
        if (target.className === 'govuk-button hmcts-menu__toggle-button' ) {
            if (this.optionsDropdown.nativeElement.offsetParent === null) {
                this.styles.display = 'block';
                this.isExpanded = true;
                // TODO revisit the focussing.
                this.rank = 0;
                setTimeout(() => {
                    this.optionsDropdown.nativeElement.children[this.rank].focus();
                }, 200)
            } else {
                this.styles.display = 'none';
                this.isExpanded = false;
            }
        } else {
            this.styles.display = 'none'
        }
    }

    @HostListener('keydown', ['$event'])
    browseOptionsList(event) {
        if (this.optionsDropdown.nativeElement.offsetParent !== null) {
            const nodeLength = this.optionsDropdown.nativeElement.children.length;
            if (this.rank < nodeLength - 1) {
                this.rank++;
            } else {
                this.rank = 0;
            }
            this.optionsDropdown.nativeElement.children[this.rank].focus()

        }
    }

    ngOnInit(): void {

    }


}
