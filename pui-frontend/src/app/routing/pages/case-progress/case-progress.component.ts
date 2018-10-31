import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-progress',
  templateUrl: './case-progress.component.html',
  styleUrls: ['./case-progress.component.scss']
})
export class CaseProgressComponent implements OnInit {

  caseId = '123456789012345';
  eventTriggerId = 'enterCaseIntoLegacy';

  constructor() { }

  ngOnInit() {
  }



  submit(event: any): void {
    console.log('CaseProgressConsumerComponent submit event=', event);

  }

  cancel(event: any): void {
    console.log('CaseProgressConsumerComponent cancel event=', event);
  }



}
