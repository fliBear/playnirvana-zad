import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionDirection, TransactionProvider, TransactionType } from '../models/transaction.model';
import { PermissionCheckComponent } from '../permission-check/permission-check.component';
import { LinkAuthService } from '../services/link-auth-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends PermissionCheckComponent implements OnInit {

  transactions: Transaction[];
  revenue: number;
  providerRevenue: {[key in TransactionProvider]: number} = {
    [TransactionProvider.PaymentProvider]: 0,
    [TransactionProvider.Sport]: 0
  };

  constructor(private transactionService: TransactionService, linkService: LinkAuthService, userService: UserService) {
    super(linkService, userService)
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions(): void {
    this.transactionService.getTransactions({}).subscribe((transactions) => {
      this.transactions = transactions
      this.revenue = this.calculateRevenue(this.transactions);
      this.calculateRevenuePerProvider();
    })
  }

  calculateRevenue(transactions: Transaction[]): number {
    const payIn: number = transactions.
      filter((transaction) => {
        return transaction.direction === TransactionDirection.Deposit ||
        transaction.direction === TransactionDirection.PayIn
      }).reduce((total, transaction) => total + this.convertToEuro(transaction.amount, transaction.currency), 0);

    const payOut: number = transactions.
      filter((transaction) => {
        return transaction.direction === TransactionDirection.Withdraw ||
        transaction.direction === TransactionDirection.PayOut
      }).reduce((total, transaction) => total + this.convertToEuro(transaction.amount, transaction.currency), 0);

    return payIn - payOut;
  }

  calculateRevenuePerProvider(): void {
    for(const provider in TransactionProvider) {
      const relatedTransactions = this.transactions.filter((transaction) => provider === transaction.provider);
      this.providerRevenue[provider] = this.calculateRevenue(relatedTransactions);
    }
  }

  //Real example would include converting currencies using real time exchange data
  convertToEuro(amount: number, currency: string): number {
    return amount
  }

  getBars(b: number): any[] {
    let arr = [];
    arr.length = Math.abs(Math.floor(b / 2));
    return arr;
  }

}
