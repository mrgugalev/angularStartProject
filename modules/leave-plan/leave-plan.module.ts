import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavePlanComponent } from './leave-plan/leave-plan.component';
import { ComponentsModule } from 'modules/components/components.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({

  declarations: [LeavePlanComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    LeavePlanComponent
  ]
})


export class LeavePlanModule {
}