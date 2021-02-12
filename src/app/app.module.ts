import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { AddressFormComponent } from "./address-form/address-form.component";
import { ReactiveComponentModule } from "@ngrx/component";
import { SendLabelComponent } from './send-label/send-label.component';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, ReactiveComponentModule],
  declarations: [AppComponent, HelloComponent, AddressFormComponent, SendLabelComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
