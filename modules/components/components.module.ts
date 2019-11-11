import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './date-picker/datepicker.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DayOffComponent } from './day-off/day-off.component';



@NgModule({
  declarations: [TextInputComponent, ButtonComponent, DatepickerComponent, DayOffComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
  ],
  exports: [
    TextInputComponent,
    ButtonComponent,
    DatepickerComponent,
    DayOffComponent
  ]
})
export class ComponentsModule { 

}
