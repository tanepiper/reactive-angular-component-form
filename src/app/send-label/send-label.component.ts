import {
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { BasicAddress } from "../address-form/address-form.component";
import { combineLatest } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { toCanvas } from "qrcode";

@Component({
    selector: 'app-send-label',
    templateUrl: './send-label.component.html',
    styleUrls: ['./send-label.component.scss']
})
export class SendLabelComponent implements OnChanges {

    @ViewChild("qrCodeEl") qrCodeEl: ElementRef;

    @Input() address: BasicAddress

    @Input() deliveryInfo: any;
    

    async ngOnChanges(changes: SimpleChanges) {
        const input = Object.entries(changes?.address?.currentValue ?? {}).concat(Object.entries(changes?.deliveryInfo?.currentValue ?? {}));
        const mapped = input.map(([a, b]) => b);
        const str = mapped.join(",");
        await toCanvas(this.qrCodeEl.nativeElement, str);
    }
}
