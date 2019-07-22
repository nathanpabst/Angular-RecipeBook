import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // allows global access to the LoggingService within the app

export class LoggingService {
    lastlog: string;

    // the following console msgs prove that we are using the same instance of LoggingService throughout the application
    // removing @Injectable from LoggingService and the AppModule file && then providing LoggingService
    // ...in the CoreModule will work in the same way because the CoreModule is also eagerly loaded.
    // providing LoggingService in AppModule--eagerly loaded && ShoppingModule--lazy loaded will return an undefined msg for lastlog
    // ...because our code has created a separate/new instance of LoggingService within the application
    // providing services via @Injectable or in the AppModule is the best practice
    printLog(message: string) {
        console.log(message); // this message will come from the app component
        console.log(this.lastlog); // this message will appear as undefined until you navigate to the shopping list
        this.lastlog = message; // this will set lastlog equal to the message from the app component
    }
}
