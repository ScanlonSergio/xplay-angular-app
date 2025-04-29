import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountStatementRoutingModule } from './account-statement-routing.module';
import { AccountStatementComponent } from './account-statement.component';


@NgModule({
  declarations: [
    AccountStatementComponent
  ],
  imports: [
    CommonModule,
    AccountStatementRoutingModule
  ]
})
export class AccountStatementModule { }
