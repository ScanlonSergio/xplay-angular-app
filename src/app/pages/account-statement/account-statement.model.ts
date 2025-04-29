export interface AccountStatement {
    id: number;
    date: string;
    total: number;
    balance: number;
    dc: 'D' | 'C';
    description: string;
    details: string;
}