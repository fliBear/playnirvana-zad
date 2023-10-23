import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionCheckComponent } from './permission-check/permission-check.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TransactionDetailsComponent,
    TransactionsComponent,
    TicketsComponent,
    TicketDetailsComponent,
    DashboardComponent,
    PermissionCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
