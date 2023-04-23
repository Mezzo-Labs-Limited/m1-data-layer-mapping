# dataLayer mapping to Tealium
For web integration, [please read this guide](WEB_README.md).

For APP integration, [please read this guide](APP_README.md).

This document provides an integration guide for developers to implement events for Tealium collection. The `data-layer-mapping` project contains Tealium scripts located in `/src/extensions`, which are loaded via Tealium, and unit tests located in `/src/__tests__`. This Tealium extension listens for updates to the `window.dataLayer` object, watching for the `push` method. It then executes relevant Tealium methods, either `utag.link` or `utag.view`, depending on the event name (value of the `event` key). This script supports both SPA and non-SPA integration.

## Installing project and running unit tests project
Run `npm install` first. To run unit tests, please run `npm run test`.

## Integration to Tealium
The integration is accomplished via Tealium extensions. The script located in `/src/extensions` is ready to be copied and pasted to the extension module in Tealium iQ. 

