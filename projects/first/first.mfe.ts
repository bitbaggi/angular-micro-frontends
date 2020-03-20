import {SharedMfe} from '@angular-mfe/shared';
import {Component, DoBootstrap, Injector, NgModule, getPlatform} from '@angular/core';
import {BrowserModule, platformBrowser} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

@Component({
  template: `<p>First Angular Micro Frontend</p>`
})
export class FirstMfe {
  constructor(private sharedMfe: SharedMfe) {
    sharedMfe.registerMfe('MFE-ONE', FirstMfe);
    // ONLY ADDED This LINES
    sharedMfe.initInsights({instrumentationKey: "XXXX-XXXX-XXXX"})
    //######################
  }
}

@NgModule({declarations: [FirstMfe], imports: [BrowserModule]})
export class FirstMfeModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  public ngDoBootstrap(): void {
    customElements.define('mfe-one',
      createCustomElement(FirstMfe, {injector: this.injector}))
  }
}

// If there is already a platform, reuse it, otherwise create a new one
(getPlatform() || platformBrowser()).bootstrapModule(FirstMfeModule).catch(err => console.log(err));
