import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    case: any;
    caseid: string;
    links = [];
    sectionId: string;
    targetSection: any;

    constructor(public router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.sectionId = params.section || null
            console.log('params', params)
            console.log('from constructor - this.sectionId', this.sectionId)
        });
    }

    clearFocus(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        target.blur();
    }

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
        console.log('this.case', this.case)

        if (this.case) {
            this.links = this.case.sections.map(section => {
                return {
                    href: `/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/viewcase/${this.case.id}/${section.id}`,
                    text: section.name,
                    label: section.name,
                    id: section.id,
                    active: this.sectionId === section.id
                };
            });
        }


        this.targetSection = (this.case) ? this.case.sections.find(section => section.id === this.sectionId) : null;
        console.log('cond 1', this.targetSection)
        console.log('cond 2', !this.targetSection)
        console.log(this.links)
        if (!this.targetSection) {
            if (this.links[0]) {
                console.log('navigating...')
                this.router.navigate([this.links[0].id], { relativeTo: this.route })
                    .catch(err => {
                        console.error(err);
                        this.router.navigate(['']);
                    }
                    );
            } else {
                this.router.navigate(['']);
            }
        }


    }

}
