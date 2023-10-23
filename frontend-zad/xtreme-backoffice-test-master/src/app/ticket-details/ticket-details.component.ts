import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.model';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import { TransactionFilterShareService } from '../services/transaction-filter-share.service';
import { PermissionCheckComponent } from '../permission-check/permission-check.component';
import { LinkAuthService } from '../services/link-auth-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent extends PermissionCheckComponent implements OnInit {

  ticket: Ticket;
  transactions: Transaction[];

  constructor(private location: Location, private route: ActivatedRoute,
     private ticketService: TicketService, private transactionService: TransactionService, 
     private transactionFilterService: TransactionFilterShareService,
      linkService: LinkAuthService, userService: UserService) {
        super(linkService, userService)
      }

  ngOnInit(): void {
    this.getTicket();
  }

  goBack(): void {
    this.location.back();
  }

  getTicket(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicket(id).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }

  getTransactions(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransactions({}).subscribe((transactions) => {
      this.transactions = transactions.filter((transaction: Transaction) => {
        return transaction.externalId === id;
      })
    })
  }

  applyFilter(): void {
    this.transactionFilterService.setFilter({externalId: this.ticket?.id});
  }
 
}
