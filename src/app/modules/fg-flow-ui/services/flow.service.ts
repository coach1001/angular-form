import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestModule } from '../../../test-flow';

interface FlowDefinition {
  flow: any;
  flowStarted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  public moduleDefinitions$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public currentFlow$: BehaviorSubject<FlowDefinition> = new BehaviorSubject(null);
  public currentStep$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentStepIndex$: BehaviorSubject<number> = new BehaviorSubject(null);
  public system = 'portal';

  public routeRegistration: Array<any> = [];

  constructor() {
  }

  fetchModule(module: string): void {
    const currentModuleDefinitions = this.moduleDefinitions$.value;
    const moduleDefintion = currentModuleDefinitions.find(value => value.module === module);
    if (!moduleDefintion) {
      const newModule = TestModule;
      this.moduleDefinitions$.next([...currentModuleDefinitions, newModule]);
    }
  }

  registerRoute(route: string, flow: string, startUrl: string) {
    this.routeRegistration.push({
      route,
      flow,
      startUrl
    });
  }

  checkIfRouteRegistered(route: string, flow: string): string {
    const registered = this.routeRegistration
      .find(value => value.route === route && value.flow === flow);
    if (registered != null) {
      return registered.startUrl;
    } else {
      return null;
    }
  }

  startFlow(module: string, flow: string): void {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === this.system && m.module === module)
    if (!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if (!flowDefinition) return;
    if (!this.currentFlow$.value || !this.currentFlow$.value.flowStarted) {
      this.currentFlow$.next({ flow: flowDefinition, flowStarted: true });
      this.currentStepIndex$.next(0);
      this.currentStep$.next(this.currentFlow$.value.flow.steps[this.currentStepIndex$.value]);
    }
  }

}
