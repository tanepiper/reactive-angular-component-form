import { Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, Validators } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

export interface BasicAddress {
    address1: string;
    address2: string;
    city: string;
    country: string;
    postcode: string;
}

@Component({
    selector: "app-address-form",
    templateUrl: "./address-form.component.html",
    styleUrls: ["./address-form.component.scss"]
})
export class AddressFormComponent implements OnChanges {
    constructor(private readonly fb: FormBuilder) {
    }

    public formData = this.fb.group({
        address1: ["", [Validators.required, Validators.maxLength(50)]],
        address2: ["", [Validators.maxLength(50)]],
        city: ["", [Validators.required, Validators.maxLength(50)]],
        country: ["", [Validators.required]],
        postcode: ["", [Validators.required, Validators.maxLength(10)]]
    });

    public fieldStates$ = this.formData.valueChanges.pipe(
        map(() => this.getValidationState(this.formData.controls)),
        startWith(this.getValidationState(this.formData.controls))
    );

    @Input() address: BasicAddress;

    @Output() formValid$ = this.formData.statusChanges.pipe(
        map(value => value === "VALID")
    );

    @Output() formValue$ = this.formData.valueChanges;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.address.currentValue) {
            this.formData.patchValue(changes.address.currentValue);
        }
    }

    private getValidationState(controls: Record<string, AbstractControl>) {
        return Object.entries(controls)
            .map(([key, control]) => ({
                [key]: control.dirty && control.invalid
            }))
            .reduce((a, b) => ({...a, ...b}))
    }
}
