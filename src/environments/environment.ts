// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // procureServletUrl :   'http://13.235.41.5:8080/Procure360', //65.1.225.128  65.0.148.127
  procureServletUrl: 'http://13.232.164.44:8080/procure360',
  procureServletUrlAttachment: 'http://13.232.164.44:8080/procureattach/',
  apiUrl: 'http://13.232.164.44:9191/',
  supplierAPIUrl:'http://13.232.164.44:9191/supplier/',
  tenderAPIUrl:'http://13.232.164.44:9191/tender/',
  contractAPIUrl:'http://13.232.164.44:9191/contract/',
  invoiceAPIUrl:'http://13.232.164.44:9191/invoice/',
  milestoneAPIUrl:'http://13.232.164.44:9191/completion/',
  attachmentAPIUrl:'http://13.232.164.44:9191/attachment/',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
