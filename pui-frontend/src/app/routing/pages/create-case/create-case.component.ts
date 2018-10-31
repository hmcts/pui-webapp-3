import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {

  jurisdictionId = 'TEST';
  caseTypeId = 'TestAddressBookCase';
  eventTriggerId = 'createCase';

  constructor() { }

  ngOnInit() {
  }



  submit(event: any): void {
    console.log('CaseCreateConsumerComponent submit event=', event);
  }

  cancel(event: any): void {
    console.log('CaseCreateConsumerComponent cancel event=', event);
  }




}
