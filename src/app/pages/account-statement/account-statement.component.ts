import { Component } from '@angular/core';
import { AccountStatement } from './account-statement.model';
import { AccountStatementService } from '../../services/account-statement.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-account-statement',
    standalone: false,
    templateUrl: './account-statement.component.html',
    styleUrl: './account-statement.component.css'
})

export class AccountStatementComponent {
    filterForm!: FormGroup;
    statements: AccountStatement[] = [];
    totalItems = 0;
    currentPage = 1;
    pageSize = 10;

    constructor(
        private statementService: AccountStatementService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            eventType: ['ALL'],
            startDate: [null],
            endDate: [null]
        });
        this.fetchStatements();
    }

    fetchStatements(): void {
        const filters = this.filterForm.value;

        this.statementService.getStatements(
            filters.event_type_id,
            filters.start_date,
            filters.end_date,
            this.currentPage,
            this.pageSize
        ).subscribe((res) => {
            this.statements = res.data;
            this.totalItems = res.total;
        });
    }

    onFilterChange(): void {
        this.currentPage = 1;
        this.fetchStatements();
    }

    nextPage(): void {
        if (this.currentPage * this.pageSize < this.totalItems) {
            this.currentPage++;
            this.fetchStatements();
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.fetchStatements();
        }
    }

    onSubmit(): void {
        const filters = this.filterForm.value;
        console.log('Submitted filters:', filters);
        this.statementService.getStatements(
            filters.event_type_id,
            filters.start_date,
            filters.end_date,
            this.currentPage,
            this.pageSize
        ).subscribe((res) => {
            this.statements = res.data;
            this.totalItems = res.total;
        });
    }

    clearFilters(): void {
      this.filterForm.reset({
        eventType: 'ALL',
        startDate: null,
        endDate: null
      });
      this.currentPage = 1;
      this.fetchStatements();
    }
}
