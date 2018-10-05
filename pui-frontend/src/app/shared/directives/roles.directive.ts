import {
  Directive, ViewContainerRef, TemplateRef, Input, OnInit
} from "@angular/core";


import { environment as roleService } from '../../../environments/environment'
import { AuthService } from "../../auth/auth.service";

@Directive({
  selector: "[roleAccess]"
})
export class RolesDirective implements OnInit {
  @Input() roleAccess: string;
  isVisible = false;
  user: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private auth: AuthService
  ) { }

  ngOnInit() {
    let authorised
    console.log('reached role directive')
    this.auth.getUser().subscribe(user => {
      this.user = user
      console.log('from api:', this.user.roles)
      authorised = this.checkRoleisValid();
      if (authorised)
        this.viewContainerRef.createEmbeddedView(this.templateRef);

      else
        this.viewContainerRef.clear();
    })


  }


  checkRoleisValid() {
    return this.user.roles.some(r => this.roleAccess.split(',').includes(r))
  }
}
