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
        this.insights = new ApplicationInsights({
            config: {instrumentationKey: config.instrumentationKey}
        });
        this.insights.loadAppInsights();
    }

    setUserId = (userId: string) => {
        this.insights.context.user.id = userId;
        this.insights.setAuthenticatedUserContext(userId);
    };

    logEvent = (trackingEvent: TrackingEvent) => this.insights.trackEvent({
        name: trackingEvent.trackingEvent,
        properties: trackingEvent.properties
    })
    // !ADDED THESE LINES
}

export class TrackingEvent implements TrackingEvent {
    trackingEvent: string;
    properties: { [propName: string]: string | number | Date | boolean };
}
