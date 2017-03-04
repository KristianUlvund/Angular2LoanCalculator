import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Consumer } from "./consumer";

@Component({
    templateUrl: './app/table.html',
    animations: [
        trigger('tableState', [
            state('inactive', style({
                width: '*', 
                height: '*',
                padding: '*'
            })),
            transition('inactive => active', [
                animate(800, keyframes([
                    style({ height: '1%', padding: '2% 2%', offset: 0.2 }),
                    style({ height: '1%', padding: '0 2%', offset: 0.5 }),
                    style({ width: '0', padding: '0 0', offset: 1 })
                       
                ]))
            ]),
            state('active', style({
                width: '0',
                height: '1%',
                padding: '0'
            })),
            transition('active => inactive', [
                animate(800, keyframes([
                    style({ width: '0', padding: '0 0', offset: 0 }),
                    style({ width: '*', padding: '0 2%', offset: 0.7 }),
                    style({ height: '*', padding: '2% 2%', offset: 1 })   
                ]))
            ])
        ]),
        trigger('tbodyState', [
            state('inactive', style({
                opacity: 1
            })),
            state('active', style({
                opacity: 0
            })),
            transition('inactive <=> active', animate('500ms ease'))
        ])
    ]
})

export class TableComponent {

    /**
     * Funksjonen reciveConsumers() er det første som kalles på slik at tabellen med
     * alle registrerte lån er det første som dukker opp når "Admin" knappen trykkes på.
     * @param _http
     */
    constructor(private _http: Http) {
        this.reciveConsumers();
    }

    consumers: Array<Consumer>;
    state: string = 'inactive';
    stateTr: string = 'inactive';
    btnText: string = 'Skjul tabell';
    isLoading: boolean = false;

    /**
     * Endrer tilstanden på elementer og en animasjon utføres.
     */
    tableState():void {
        this.state = (this.state === 'active' ? 'inactive' : 'active');
        this.btnText = (this.btnText === 'Skjul tabell' ? 'Vis tabell' : 'Skjul tabell');
    }

    /**
     * Legger til en class på et "tr" element når bruker trykker på en rad.
     * @param c
     */
    trState(c: Consumer):void {
        c.state = (c.state === 'trSelectedRow' ? '' : 'trSelectedRow');
    }

    /**
     * Henter alle registrerte lån.
     */
    reciveConsumers(): void {
        this.isLoading = true;
        this._http.get("api/loan")
            .map(data => { return data.json(); })
            .subscribe(retur => {
                this.consumers = retur;
            },
            error => alert(error),
            () => { this.isLoading = false; }
            );
    }
}