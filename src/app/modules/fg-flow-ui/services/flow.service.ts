import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestModule } from '../../../test-flow';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  
  public moduleDefinitions$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public currentFlow$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentStep$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentStepIndex$: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor() { 
  }

  fetchModule(system: string, module: string) {    
    const currentModuleDefinitions = this.moduleDefinitions$.value;
    const newModule = TestModule;
    this.moduleDefinitions$.next([...currentModuleDefinitions, newModule]);
  }

  setFlow(system: string, module: string, flow: string) {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === system && m.module === module)
    if(!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if(!flowDefinition) return;
    this.currentFlow$.next(flowDefinition);
    this.currentStepIndex$.next(0);
    this.currentStep$.next(this.currentFlow$.value[this.currentStepIndex$.value]);
  }
  
}
