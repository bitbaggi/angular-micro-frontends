import {Injectable, Type} from '@angular/core';
import {ApplicationInsights} from "@microsoft/applicationinsights-web";

@Injectable({providedIn: 'platform'})
export class SharedMfe {
    private registeredMfes = new Map<string, Type<any>>();

    public registerMfe(name: string, type: Type<any>) {
        console.log(`Registering ${name}`);
        this.registeredMfes.set(name, type);
        console.log(`Total registered: ${this.registeredMfes.size}`)
    }


    // ADDED THESE LINES
    private insights: ApplicationInsights;
    public initInsights(config: { instrumentationKey: string }) {
        this.insights = new ApplicationInsights({config: {instrumentationKey: config.instrumentationKey}});
    }
    // !ADDED THESE LINES
}
