import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AccountStatement } from '../pages/account-statement/account-statement.model';

@Injectable({ providedIn: 'root' })
export class AccountStatementService {
  private mockData: AccountStatement[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: `2025-04-${(i % 30) + 1}`.padStart(10, '0'),
    total: Math.floor(Math.random() * 10000),
    balance: Math.floor(Math.random() * 10000),
    dc: Math.random() > 0.5 ? 'C' : 'D',
    description: `Transaction ${i + 1}`,
    details: `Details for transaction ${i + 1}`,
  }));

  getStatements(
    eventType: string,
    startDate: string,
    endDate: string,
    page: number,
    limit: number
  ): Observable<{ data: AccountStatement[]; total: number }> {
    const filtered = this.mockData.filter((item) => {
      return (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
    });

    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return of({ data: paginated, total: filtered.length }).pipe(delay(500));
  }
}

