import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgDuiConfigService } from '../../services/ng-dui-config.service';

export interface IFlowData {
  module: string,
  flow: string,
  flowId: string,
  updatedAt: Date;
  flowData: any;
  flowContext: any;
}

@Injectable({
  providedIn: 'root'
})
export class DuiFormDataService {

  public persistData = true;
  public allFlowData$: BehaviorSubject<Array<IFlowData>> = new BehaviorSubject(null);
  public clearFlowOnNextGet$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    @Inject(NgDuiConfigService) private _config
  ) { }

  setStepData(flowId: string, module: string, flow: string, stepName: string, data: any) {
    this.clearFlowOnNextGet$.next(false);
    const allFlowData = this.allFlowData$.value;
    if (allFlowData == null) {
      const newAllFlowData = [];
      const flowData = {};
      flowData[stepName] = data;
      newAllFlowData.push(<IFlowData>{module, flow, flowId, updatedAt: new Date(), flowData, flowContext: {} });
      this.allFlowData$.next(newAllFlowData);
    } else {
      const flowDataIndex = allFlowData.findIndex(stepData => stepData.flowId === flowId);
      if (flowDataIndex < 0) {
        const flowData = {};
        flowData[stepName] = data;
        allFlowData.push(<IFlowData>{ module, flow, flowId, updatedAt: new Date(), flowData, flowContext: {}  });
      } else {
        allFlowData[flowDataIndex].flowData[stepName] = data;
        allFlowData[flowDataIndex].updatedAt = new Date();
      }
      this.allFlowData$.next(allFlowData);
    }
    if (this.persistData) {
      if (this._config.production) {
        localStorage.setItem('fg.stepData', btoa(JSON.stringify(this.allFlowData$.value)));
      } else {
        localStorage.setItem('fg.stepData', JSON.stringify(this.allFlowData$.value));
      }
    }
  }

  getFlowData(flowId: string) {
    let allFlowData = this.allFlowData$.value;
    if (allFlowData == null) {
      if (this.persistData) {
        let persistantData = null;
        if (this._config.production) {
          persistantData = JSON.parse(atob(localStorage.getItem('fg.stepData')));
        } else {
          persistantData = JSON.parse(localStorage.getItem('fg.stepData'));
        }
        this.allFlowData$.next(persistantData);
      } else {
        return null;
      }
    }
    allFlowData = this.allFlowData$.value;
    if (allFlowData == null) return null;
    return allFlowData.find(flow => 
      flow.flowId === flowId)
  }

  getStepData(flowId: string, module: string, flow: string, stepName: string) {
    let allFlowData = this.allFlowData$.value;
    if (allFlowData == null) {
      if (this.persistData) {
        let persistantData = null;
        if (this._config.production) {
          persistantData = JSON.parse(atob(localStorage.getItem('fg.stepData')));
        } else {
          persistantData = JSON.parse(localStorage.getItem('fg.stepData'));
        }
        this.allFlowData$.next(persistantData);
      } else {
        return null;
      }
    }
    allFlowData = this.allFlowData$.value;
    if (allFlowData == null) return null;
    const flowDataIndex = allFlowData.findIndex(flowData =>
      flowData.flowId === flowId
    );
    const clearFlowData = this.clearFlowOnNextGet$.value;
    if (flowDataIndex < 0 && !clearFlowData) return null;
    if (clearFlowData) {
      this.clearFlowOnNextGet$.next(false);
      let indexesToDelete = allFlowData.filter(flowData =>
        flowData.module === module &&
        flowData.flow === flow
      ).map((_, index) => index);
      if (indexesToDelete.length < 1) return null;
      indexesToDelete = indexesToDelete.reverse();
      indexesToDelete.forEach(index => {
        allFlowData.splice(index, 1);
      });
      this.allFlowData$.next(allFlowData);
      if (this.persistData) {
        if(this._config.production) {
          localStorage.setItem('fg.stepData', btoa(JSON.stringify(this.allFlowData$.value)));
        } else {
          localStorage.setItem('fg.stepData', JSON.stringify(this.allFlowData$.value));
        }
      }
      return null;
    } else {
      this.clearFlowOnNextGet$.next(false);
      return allFlowData[flowDataIndex].flowData[stepName];
    }
  }
}
