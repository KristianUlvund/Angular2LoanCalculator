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
var forms_1 = require('@angular/forms');
var consumer_1 = require("./consumer");
require('rxjs/add/operator/map');
var LoanComponent = (function () {
    /**
     * Bygger en form med valideringen til hver control i formen.
     *
     * @param _http
     * @param fb
     */
    function LoanComponent(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.interest = 0.07;
        this.loanForm = fb.group({
            'personalIdentification': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(11), forms_1.Validators.pattern("[0-9]{11}")])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")])],
            'phonenumber': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{8}"), forms_1.Validators.maxLength(8)])],
            duration: ["", forms_1.Validators.pattern("[0-9]{1,2}")],
            amount: ["", forms_1.Validators.pattern("[0-9]{1,9}")]
        });
    }
    /**
     * Kjøres etter at constructoren har utført sine oppgaver.
     * Gjør en utrekning samt setter default verdier til variabler.
     */
    LoanComponent.prototype.ngOnInit = function () {
        this.loading = true;
        this.duration = 1;
        this.amount = 10000;
        this.operation = "";
        this.calculate();
    };
    /**
     * Kalles på når bruker trykker på registreringsknappen.
     * @param value
     */
    LoanComponent.prototype.onSubmit = function (value) {
        this.saveLoan();
    };
    /**
     * Lager et låneobjekt. Data sendes videre til controlleren og
     * får data tilbake etter at controlleren har utført sine oppgaver.
     */
    LoanComponent.prototype.saveLoan = function () {
        var _this = this;
        var loan = new consumer_1.Consumer();
        loan.personalIdentification = this.loanForm.value.personalIdentification;
        loan.email = this.loanForm.value.email;
        loan.phonenumber = this.loanForm.value.phonenumber;
        loan.duration = this.loanForm.value.duration;
        loan.amount = this.loanForm.value.amount;
        var body = JSON.stringify(loan);
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        this._http
            .post("api/loan", body, { headers: headers })
            .map(function (data) {
            return data;
        })
            .subscribe(function (retur) { return alert(retur.statusText); }, function (error) {
            _this.resetInput();
            alert(error.statusText);
        }, function () { return _this.resetInput(); });
    };
    ;
    /**
     * Utrekning av månedlig betaling av lån.
     */
    LoanComponent.prototype.calculate = function () {
        this.firstCalc = this.interest * this.amount;
        this.secondCalc = 1 - Math.pow(1 + this.interest, -this.duration);
        this.operation = ((this.firstCalc / this.secondCalc) / 12).toFixed(2);
    };
    /**
     * Resetter og setter default verdi i formen etter at et lån er registrert.
     */
    LoanComponent.prototype.resetInput = function () {
        this.loanForm.reset();
        this.loanForm.patchValue({ duration: this.duration = 1 });
        this.loanForm.patchValue({ amount: this.amount = 10000 });
        this.calculate();
    };
    LoanComponent = __decorate([
        core_1.Component({
            templateUrl: "./app/loan.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], LoanComponent);
    return LoanComponent;
}());
exports.LoanComponent = LoanComponent;
//# sourceMappingURL=loan.js.map