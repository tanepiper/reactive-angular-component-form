import {
    AfterContentInit,
    Component,
    ElementRef,
    VERSION,
    ViewChild
} from "@angular/core";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { BasicAddress } from "./address-form/address-form.component";
import { toCanvas } from "qrcode";
import { filter, tap } from "rxjs/operators";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterContentInit {
    private deliveryTimes = {
        Belgium: 3,
        France: 3,
        "The Netherlands": 1,
        "United Kingdom": 5
    };



    public $formValue = new BehaviorSubject<BasicAddress | undefined>(undefined);

    public valid$ = new BehaviorSubject<boolean>(false);

    public deliveryInfo$ = new BehaviorSubject<any>(undefined);

    ngAfterContentInit() {
        combineLatest([this.valid$, this.$formValue])
            .pipe(
                filter(([valid]) => valid),
                tap(async ([valid, value]) => {
                    const delivery = this.generateDeliveryDates(value.country);
                    this.deliveryInfo$.next(delivery);


                })
            )
            .subscribe();
    }

    private generateDeliveryDates(country: string) {
        const date = new Date();

        const todaysDate = [date.getFullYear(), date.getMonth(), date.getDate()];

        const deliveryDate = todaysDate
            .map(v => (v < 10 ? `0${v}` : `${v}`))
            .join("-");
        const expectedDate = todaysDate
            .map((v, index) => {
                if (index === 2) {
                    v += this.deliveryTimes[country];
                }
                return v < 10 ? `0${v}` : `${v}`;
            })
            .join("-");

        return {deliveryDate, expectedDate};
    }

    public print() {
        window.print();
    }
}
