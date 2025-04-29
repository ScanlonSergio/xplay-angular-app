import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountStatementRoutingModule } from './account-statement-routing.module';
import { AccountStatementComponent } from './account-statement.component';


@NgModule({
  declarations: [
    AccountStatementComponent
  ],
  imports: [
    CommonModule,
    AccountStatementRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountStatementModule { }
