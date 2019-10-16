import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './modules/fg-flow-ui/services/form-generator.service';
import { TestModule } from './test-flow';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FlowService } from './modules/fg-flow-ui/services/flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _flow: FlowService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
