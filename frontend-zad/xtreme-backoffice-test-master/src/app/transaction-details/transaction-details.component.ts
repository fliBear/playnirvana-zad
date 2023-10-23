import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction, TransactionProvider } from '../models/transaction.model';
import { switchMap } from 'rxjs';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.model';
import { PermissionCheckComponent } from '../permission-check/permission-check.component';
import { LinkAuthService } from '../services/link-auth-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent extends PermissionCheckComponent implements OnInit {

  transaction: Transaction;
  player: Player;
  provider = TransactionProvider;

  constructor(private location: Location, private transactionService: TransactionService,
    private route: ActivatedRoute, private playerService: PlayerService, 
    linkService: LinkAuthService, userService: UserService) { 
      super(linkService, userService);
    } 

  ngOnInit(): void {
    this.getTransaction();
  }

  goBack(): void {
    this.location.back();
  }

  getTransaction(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(id).pipe(
      switchMap((transaction: Transaction) => {
        this.transaction = transaction;
        return this.playerService.getPlayers()
      })
    ).subscribe((players: Player[]) => {
      this.player = players.find((player) => this.transaction.playerId === player.id);
    })
  }

}
