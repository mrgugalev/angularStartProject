import { Component, forwardRef, DoCheck, ChangeDetectorRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    }]
})

export class TextInputComponent implements ControlValueAccessor {
  public onChange: any = () => { };
  public onTouched: any = () => { };
  public innerValue: string;

  constructor() {

  }

  get value(): string {
    return this.innerValue;
  }

  set value(value: string) {
    this.innerValue = value;
  }

  writeValue(obj: any): void {
    // console.log('value is ' + obj);
    this.innerValue = obj;
    
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
