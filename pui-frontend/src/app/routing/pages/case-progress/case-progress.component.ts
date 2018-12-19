import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-case-progress',
    templateUrl: './case-progress.component.html',
    styleUrls: ['./case-progress.component.scss']
})
export class CaseProgressComponent implements OnInit {
    caseId: string
    eventTriggerId = 'solicitorUpdate'




    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.caseId = params.caseId
        })
    }

    submit(event: any): void {
        console.log('CaseProgressConsumerComponent submit event=', event)
    }

    cancel(event: any): void {
        console.log('CaseProgressConsumerComponent cancel event=', event)
    }


}
