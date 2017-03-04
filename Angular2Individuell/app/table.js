"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var TableComponent = (function () {
    /**
     * Funksjonen reciveConsumers() er det første som kalles på slik at tabellen med
     * alle registrerte lån er det første som dukker opp når "Admin" knappen trykkes på.
     * @param _http
     */
    function TableComponent(_http) {
        this._http = _http;
        this.state = 'inactive';
        this.stateTr = 'inactive';
        this.btnText = 'Skjul tabell';
        this.isLoading = false;
        this.reciveConsumers();
    }
    /**
     * Endrer tilstanden på elementer og en animasjon utføres.
     */
    TableComponent.prototype.tableState = function () {
        this.state = (this.state === 'active' ? 'inactive' : 'active');
        this.btnText = (this.btnText === 'Skjul tabell' ? 'Vis tabell' : 'Skjul tabell');
    };
    /**
     * Legger til en class på et "tr" element når bruker trykker på en rad.
     * @param c
     */
    TableComponent.prototype.trState = function (c) {
        c.state = (c.state === 'trSelectedRow' ? '' : 'trSelectedRow');
    };
    /**
     * Henter alle registrerte lån.
     */
    TableComponent.prototype.reciveConsumers = function () {
        var _this = this;
        this.isLoading = true;
        this._http.get("api/loan")
            .map(function (data) { return data.json(); })
            .subscribe(function (retur) {
            _this.consumers = retur;
        }, function (error) { return alert(error); }, function () { _this.isLoading = false; });
    };
    TableComponent = __decorate([
        core_1.Component({
            templateUrl: './app/table.html',
            animations: [
                core_1.trigger('tableState', [
                    core_1.state('inactive', core_1.style({
                        width: '*',
                        height: '*',
                        padding: '*'
                    })),
                    core_1.transition('inactive => active', [
                        core_1.animate(800, core_1.keyframes([
                            core_1.style({ height: '1%', padding: '2% 2%', offset: 0.2 }),
                            core_1.style({ height: '1%', padding: '0 2%', offset: 0.5 }),
                            core_1.style({ width: '0', padding: '0 0', offset: 1 })
                        ]))
                    ]),
                    core_1.state('active', core_1.style({
                        width: '0',
                        height: '1%',
                        padding: '0'
                    })),
                    core_1.transition('active => inactive', [
                        core_1.animate(800, core_1.keyframes([
                            core_1.style({ width: '0', padding: '0 0', offset: 0 }),
                            core_1.style({ width: '*', padding: '0 2%', offset: 0.7 }),
                            core_1.style({ height: '*', padding: '2% 2%', offset: 1 })
                        ]))
                    ])
                ]),
                core_1.trigger('tbodyState', [
                    core_1.state('inactive', core_1.style({
                        opacity: 1
                    })),
                    core_1.state('active', core_1.style({
                        opacity: 0
                    })),
                    core_1.transition('inactive <=> active', core_1.animate('500ms ease'))
                ])
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.js.map