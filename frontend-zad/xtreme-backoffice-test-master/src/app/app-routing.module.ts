import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './auth/login.guard';
import { HomeComponent } from './home/home.component';
import { Grant } from './models/user.model';
import { AuthorizationGuard } from './auth/authorization.guard';
import { TransactionsComponent } from './transactions/transactions.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketsComponent } from './tickets/tickets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate:[LoginGuard],
    children: [
      { 
        path: 'dashboard',
        component: DashboardComponent,
      },
      { 
        path: 'tickets', 
        component: TicketsComponent,
        data: {roles: [Grant.CanViewTickets]},
        canActivate: [AuthorizationGuard]
      },
      { 
        path: 'ticket/:id', 
        component: TicketDetailsComponent,
        data: {roles: [Grant.CanViewTickets]},
        canActivate: [AuthorizationGuard]
      },
      { 
        path: 'transactions', 
        component: TransactionsComponent,
        data: {roles: [Grant.CanViewTransactions]},
        canActivate: [AuthorizationGuard]
      },
      { 
        path: 'transaction/:id', 
        component: TransactionDetailsComponent,
        data: {roles: [Grant.CanViewTransactions]},
        canActivate: [AuthorizationGuard]
      },
      { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
