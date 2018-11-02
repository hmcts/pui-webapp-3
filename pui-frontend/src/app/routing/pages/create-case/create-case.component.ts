import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-create-case',
    templateUrl: './create-case.component.html',
    styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
    jurisdictionId = 'DIVORCE'
    caseTypeId = 'DIVORCE'
    eventTriggerId = 'solicitorCreate'

    constructor(private router: Router) {}

    ngOnInit() {}

    submit(event: any): void {
        console.log('CaseCreateConsumerComponent submit event=', event)
        this.router.navigate([
            'status',
            {
                returnPage: '/',
                returnLabel: 'Back to dashboard',
                message: 'Case created',
                error: false,
                caseId: 23423423
            }
        ])
    }

    cancel(event: any): void {
        console.log('CaseCreateConsumerComponent cancel event=', event)
    }
}
