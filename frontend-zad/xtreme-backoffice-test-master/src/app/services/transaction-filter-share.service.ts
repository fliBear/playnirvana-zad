import { Injectable } from '@angular/core';
import { TransactionFilter } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionFilterShareService {

  private filter: TransactionFilter;

  constructor() { }

  setFilter(filter: TransactionFilter): void {
    this.filter = filter;
  }

  getFilter(): TransactionFilter {
    return  this.filter;
  }

}
