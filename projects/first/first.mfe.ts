import {Component, DoBootstrap, getPlatform, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {SharedMfe} from "@angular-mfe/shared";
import {BrowserModule, platformBrowser} from "@angular/platform-browser";

@Component({
    template: `<p>First Angular Micro Frontend</p>`
})
export class FirstMfe {
    constructor(private sharedMfe: SharedMfe) {
        sharedMfe.registerMfe('MFE-ONE', FirstMfe);
        sharedMfe.initInsights({instrumentationKey: "XXX"});
        sharedMfe.logEvent({trackingEvent: "TEST", properties: {}})
    }
}

@NgModule({declarations: [FirstMfe], imports: [BrowserModule]})
export class FirstMfeModule implements DoBootstrap {
    constructor(injector: Injector) {
        let customElement = createCustomElement(FirstMfe, {injector});
        customElements.define('mfe-one', customElement);
    }

    public ngDoBootstrap(): void {}
}

// If there is already a platform, reuse it, otherwise create a new one
(getPlatform() || platformBrowser()).bootstrapModule(FirstMfeModule).catch(err => console.log(err));
