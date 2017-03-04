import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoanComponent } from './loan';
import { TableComponent } from './table';
import { StartComponent } from './start';

const appRoutes: Routes = [
    { path: 'loan', component: LoanComponent },
    { path: 'table', component: TableComponent },
    { path: '', component: LoanComponent }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }