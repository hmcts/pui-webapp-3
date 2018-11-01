import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
    caseId: string
    returnPage: string
    returnLabel: string
    message: string
    error: boolean

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.caseId = params.caseId
            this.returnPage = params.returnPage
            this.returnLabel = params.returnLabel
            this.message = params.message
            this.error = params.error
        })
    }
}
