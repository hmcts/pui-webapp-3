import { AuthService } from './../../../auth/auth.service'

import { Component, OnInit } from '@angular/core'
import { CaseService } from '../../services/case.service'

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
    data$: Object
    error: string
    user: Object

    constructor(private caseService: CaseService, private auth: AuthService) { }

    ngOnInit() {
        this.data$ = this.caseService.search()
        // his.user = this.caseService.user
        // this.auth.getUser().subscribe(user => (this.user = user))

        this.auth.getUser().subscribe(user => {
            this.user = user
            console.log(this.user)
        })
    }
}
