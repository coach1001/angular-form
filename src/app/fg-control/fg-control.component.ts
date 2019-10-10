import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fg-control',
  templateUrl: './fg-control.component.html',
  styleUrls: ['./fg-control.component.scss']
})
export class FgControlComponent implements OnInit {
  @Input()
  controlIn: FormControl;
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();

  isVisible = true;
  
  private _destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.parentCleared$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      if (this.controlIn.value != null) {
        this.controlIn.patchValue(null);
      }
    });
  }

  get error() {
    let error = null;
    if (this.controlIn.errors != null) {
      Object.keys(this.controlIn.errors).forEach(key => {
        error = error != null ? error : {
          key: key,
          value: this.controlIn.errors[key]
        }
      });
    }
    return error != null ? this.getValidationMessage(error) : '';
  }

  getValidationMessage(error) {
    switch(error.key) {
      case 'required': error = `This field is required`;break;
      case 'email': error = `Not a valid email address`;break;
      case 'min': error = `Minimum is ${error.value.min}`;break;
      case 'max': error = `Maximum is ${error.value.max}`;break;
      case 'mustMatch': error = `Does not match - ${error.value.value}`;break;
      default: break;
    }
    return error;
  }

  
}
