import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/router";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      SweetAlert2Module,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        closeButton: true,
        progressBar: true,
      }),
      RouterModule.forRoot(routes),
    ),
  ],
});