import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-casebar',
    templateUrl: './identity-bar.component.html',
    styleUrls: ['./identity-bar.component.scss']
})
export class IdentityBarComponent {

    @Input() case: any;

    constructor() {}

}
