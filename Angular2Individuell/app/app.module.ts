import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { LoanComponent } from './loan';
import { TableComponent } from './table';
import { StartComponent } from './start';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routing';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        AppRoutingModule
    ],

    declarations: [
        StartComponent,
        LoanComponent,
        TableComponent
    ],

    bootstrap: [StartComponent]
})
export class AppModule { }