import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input() items: {[id: string]: string}[];
    @Output() onButtonSubmit = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {

    }

    onActionSubmit(payload): void {
        this.onButtonSubmit.emit(payload.action);
    }

}
