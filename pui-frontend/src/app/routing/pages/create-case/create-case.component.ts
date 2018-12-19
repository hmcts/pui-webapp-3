import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';



@Component({
    selector: 'app-create-case',
    templateUrl: './create-case.component.html',
    styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
    // jurisdictionId = 'DIVORCE'
    // caseTypeId = 'DIVORCE'
    // eventTriggerId = 'solicitorCreate'

    caseSelected: string

    caseType: object = {
        jurisdictionId: "notselected",
        caseTypeId: "",
        eventTriggerId: ""
    }


    constructor(private router: Router) { }

    ngOnInit() { }

    submit(event: any): void {
        console.log('CaseCreateConsumerComponent submit event=', event)
        this.router.navigate([
            'status',
            {
                returnPage: '/',
                returnLabel: 'Back to dashboard',
                message: 'Case created',
                error: false,
                caseId: event.caseId
            }
        ])
    }

    cancel(event: any): void {
        console.log('CaseCreateConsumerComponent cancel event=', event)
    }



    chooseEvent() {
        this.caseType = JSON.parse(this.caseSelected)
        console.log(this.caseType)
    }
}
