import { Directive, ElementRef, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Directive({
  selector: "[unlessRole]"
})
export class UnlessRoleIncludesDirective implements OnInit {

  @Input() unlessRole: string;
  user: any;

  constructor(
    private elr: ElementRef,
    private auth: AuthService
  ) {

  }


  ngOnInit() {

    console.log('reached unlessroleincludes directive with input', this.unlessRole);

    let authorised
    this.auth.getUser().subscribe(user => {
      this.user = user
      authorised = this.checkRoleisValid();
      if (!authorised)
        this.elr.nativeElement.style.visibility = 'hidden'

      else
        this.elr.nativeElement.style.visibility = 'visible'
    })
  }




  checkRoleisValid() {
    return this.user.roles.some(r => this.unlessRole.split(',').includes(r))
  }

}
