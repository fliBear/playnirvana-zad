import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ticket, TicketFilter, TicketStatus } from '../models/ticket.model';
import { Player } from '../models/player.model';
import { PlayerService } from '../services/player.service';
import { TicketService } from '../services/ticket.service';
import { dateFilterValidator } from 'src/validators/date.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  filter: TicketFilter = {};
  TicketStatus = TicketStatus;
  tickets: Ticket[];
  players: Player[] = [];
  detailsId: string = "";

  filterForm: FormGroup = new FormGroup({
    playerId: new FormControl(""),
    status: new FormControl(""),
    createdFrom: new FormControl("", [dateFilterValidator]),
    createdTo: new FormControl("", [dateFilterValidator])
  });

  constructor(private playerService: PlayerService, private ticketService: TicketService, private location: Location) { }

  ngOnInit(): void {
    this.getTickets();
    this.getPlayers();
  }

  private getTickets() {
    this.ticketService.getTickets(this.filter).subscribe((tickets) => {
      this.tickets = tickets
    })
  }

  private getPlayers(): void {
    this.playerService.getPlayers().subscribe((players) => {
      this.players = players;
    })
  }

  goBack(): void {
    this.location.back();
  }

  applyFilter(): void {
    this.filter.status = this.filterForm.value.status ?? "";
    this.filter.createdTo = this.filterForm.value.createdTo ?? "";
    this.filter.createdFrom = this.filterForm.value.createdFrom ?? "";
    this.filter.playerId = this.filterForm.value.playerId ?? "";
    this.getTickets();
  }

  getPlayerById(playerId: string) {
    return this.players.find(player => player.id === playerId);
  }

}
