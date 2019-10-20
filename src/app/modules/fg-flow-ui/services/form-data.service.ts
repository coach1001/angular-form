import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface StepData {
  module: string,
  flow: string,
  flowId: string,
  stepName: number;
  updatedAt: Date;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  public persistData = true;
  public stepData$: BehaviorSubject<Array<StepData>> = new BehaviorSubject(null);
  public clearOnNextGet$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  setStepData(flowId: string, module: string, flow: string, stepIndex: number, data: any) {
    this.clearOnNextGet$.next(false);
    const currentData = this.stepData$.value;
    if (currentData == null) {
      const newStepDataArray = [];
      newStepDataArray.push(<StepData>{ module, flow, stepIndex, data, flowId });
      this.stepData$.next(newStepDataArray);
    } else {
      const stepDataIndex = currentData.findIndex(stepData =>
        stepData.module === module &&
        stepData.flow === flow &&
        stepData.stepIndex === stepIndex &&
        stepData.flowId === flowId
      );
      if (stepDataIndex < 0) {
        currentData.push(<StepData>{ module, flow, stepIndex, data, flowId, updatedAt: new Date() });
      } else {
        currentData[stepDataIndex] = <StepData>{ module, flow, stepIndex, data, flowId, updatedAt: new Date() };
      }
      this.stepData$.next(currentData);
    }
    if (this.persistData) {
      localStorage.setItem('fg.stepData', JSON.stringify(this.stepData$.value));
    }
  }

  getStepData(flowId: string, module: string, flow: string, stepIndex: number) {
    let currentData = this.stepData$.value;
    if (currentData == null) {
      if (this.persistData) {
        const persistantData = JSON.parse(localStorage.getItem('fg.stepData'));
        this.stepData$.next(persistantData);
      } else {
        return null;
      }
    }
    currentData = this.stepData$.value;
    if (currentData == null) return null;
    const stepDataIndex = currentData.findIndex(stepData =>
      stepData.module === module &&
      stepData.flow === flow &&
      stepData.stepIndex == stepIndex &&
      stepData.flowId === flowId
    );
    const clearStepData = this.clearOnNextGet$.value;
    if (stepDataIndex < 0 && !clearStepData) return null;
    if (clearStepData) {
      this.clearOnNextGet$.next(false);
      let indexesToDelete = currentData.filter(stepData =>
        stepData.module === module &&
        stepData.flow === flow
      ).map(step => step.stepIndex);
      if (indexesToDelete.length < 1) return null;
      indexesToDelete = indexesToDelete.reverse();
      indexesToDelete.forEach(index => {
        currentData.splice(index, 1);
      });
      if (this.persistData) {
        localStorage.setItem('fg.stepData', JSON.stringify(this.stepData$.value));
      }
      return null;
    } else {
      this.clearOnNextGet$.next(false);
      return currentData[stepDataIndex].data;
    }
  }
}
