import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Consumer } from "./consumer";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: "./app/loan.html"
})
    
export class LoanComponent {

    /**
     * Bygger en form med valideringen til hver control i formen.
     *
     * @param _http
     * @param fb
     */
    constructor(private _http: Http, private fb: FormBuilder) {
        this.loanForm = fb.group({

            'personalIdentification': [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.pattern("[0-9]{11}")])],
            'email': [null, Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")])],
            'phonenumber': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{8}"), Validators.maxLength(8)])],
            duration: ["", Validators.pattern("[0-9]{1,2}")],
            amount: ["", Validators.pattern("[0-9]{1,9}")]
        });
    }

    interest: number = 0.07;
    firstCalc: number;
    secondCalc: number;
    operation: string;
    amount: number;
    duration: number;
    inputInvalid: boolean;
    loading: boolean;
    loanForm: FormGroup;

    /**
     * Kjøres etter at constructoren har utført sine oppgaver.
     * Gjør en utrekning samt setter default verdier til variabler.
     */
    ngOnInit():void {
        this.loading = true;
        this.duration = 1;
        this.amount = 10000;
        this.operation = "";
        this.calculate();
    }

    /**
     * Kalles på når bruker trykker på registreringsknappen.
     * @param value
     */
    onSubmit(value: any):void {
        this.saveLoan();
    }

    /**
     * Lager et låneobjekt. Data sendes videre til controlleren og
     * får data tilbake etter at controlleren har utført sine oppgaver.
     */
    saveLoan():void {
        var loan = new Consumer();

        loan.personalIdentification = this.loanForm.value.personalIdentification;
        loan.email = this.loanForm.value.email;
        loan.phonenumber = this.loanForm.value.phonenumber;
        loan.duration = this.loanForm.value.duration;
        loan.amount = this.loanForm.value.amount;
        var body: string = JSON.stringify(loan);
        var headers = new Headers({ "Content-Type": "application/json" })

        this._http
            .post("api/loan", body, { headers: headers })
            .map(data => {
                return data;
            })
            .subscribe(
            retur => alert(retur.statusText),
            error => {
                this.resetInput();
                alert(error.statusText);
            },
                () => this.resetInput()
            );
    };

    /**
     * Utrekning av månedlig betaling av lån.
     */
    calculate(): void {
        this.firstCalc = this.interest * this.amount;
        this.secondCalc = 1 - Math.pow(1 + this.interest, -this.duration);
        this.operation = ((this.firstCalc / this.secondCalc) / 12).toFixed(2);
    }

    /**
     * Resetter og setter default verdi i formen etter at et lån er registrert.
     */
    resetInput():void {
        this.loanForm.reset();
        this.loanForm.patchValue({ duration: this.duration = 1 });
        this.loanForm.patchValue({ amount: this.amount = 10000 });
        this.calculate();
    }
}