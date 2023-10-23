import { Component, OnInit } from '@angular/core';
import { TransactionFilter, TransactionType, TransactionDirection, TransactionProvider, Transaction } from '../models/transaction.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { TransactionService } from '../services/transaction.service';
import { dateFilterValidator } from 'src/validators/date.validator';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransactionFilterShareService } from '../services/transaction-filter-share.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  filter: TransactionFilter = {};
  TransactionType = TransactionType;
  TransactionDirection = TransactionDirection;
  TransactionProvider = TransactionProvider;
  players: Player[] = [];
  transactions: Transaction[] =[];
  externalIDs: string[] = [];
  detailsId: string = "";

  filterForm: FormGroup = new FormGroup({
    playerId: new FormControl(""),
    externalId: new FormControl(""),
    type: new FormControl(""),
    direction: new FormControl(""),
    provider: new FormControl(""),
    createdFrom: new FormControl("", [dateFilterValidator]),
    createdTo: new FormControl("", [dateFilterValidator])
  });

  constructor(private playerService: PlayerService, private transactionService: TransactionService,
     private location: Location, private route: ActivatedRoute, private transactionFilterService: TransactionFilterShareService) {
    const filter = transactionFilterService.getFilter();
    if(filter) {
      this.filter = filter
      transactionFilterService.setFilter(null);
    } 
  }

  ngOnInit(): void {
    this.getTransactions();
    this.getPlayers();
    this.getExternalIds();
  }

  private getTransactions(): void {
    this.transactionService.getTransactions(this.filter).subscribe((transactions) => {
      this.transactions = transactions
    })
  }

  private getPlayers(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
    })
  }

  private getExternalIds(): void {
    this.transactionService.getTransactions({}).subscribe((transactions) => {
      const uniqueExternalIds = new Set<string>();

      transactions.forEach(transaction => {
        uniqueExternalIds.add(transaction.externalId);
      });

      this.externalIDs = Array.from(uniqueExternalIds);
    })
  }

  goBack(): void {
    this.location.back();
  }

  applyFilter(): void {
    this.filter.type = this.filterForm.value.type ?? "";
    this.filter.provider = this.filterForm.value.provider ?? "";
    this.filter.externalId = this.filterForm.value.externalId ?? "";
    this.filter.direction = this.filterForm.value.direction ?? "";
    this.filter.playerId = this.filterForm.value.playerId ?? "";
    this.filter.createdFrom = this.filterForm.value.createdFrom ?? "";
    this.filter.createdTo = this.filterForm.value.createdTo ?? "";
    this.getTransactions();
  }
}
