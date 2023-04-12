# M1 dataLayer mapping to Tealium
For APP iOS Swift integration, [please read this guide](APP_README.md).

This document provides an integration guide for developers to implement events for Tealium collection. The `m1-data-layer-mapping` project contains Tealium scripts located in `/src/extensions`, which are loaded via Tealium, and unit tests located in `/src/__tests__`. This Tealium extension listens for updates to the `window.dataLayer` object, watching for the `push` method. It then executes relevant Tealium methods, either `utag.link` or `utag.view`, depending on the event name (value of the `event` key). This script supports both SPA and non-SPA integration.

## Installing project and running unit tests project
Run `npm install` first. To run unit tests, please run `npm run test`.

## Integration to Tealium
The integration is accomplished via Tealium extensions. The script located in `/src/extensions` is ready to be copied and pasted to the extension module in Tealium iQ. 

## Installation on the site
Use the `dataLayer` push event to trigger a page view event on page load or when a page URL changes. Populate the event with `emailHash` and `emailToken` values when available. If these values are not available, trigger the event with a null value (string) `"null"`.


### Custom Page view events syntax
At each point where a page change occurs (page refresh, page load, or history change), execute the following code snippet. The variable key-value pairs shown below are only examples.

```
// Example code
dataLayer.push({
    event: 'Pageview',
    emailHash: '694-hdjsadhjs',
    emailToken: 'eouyi-77777247',
    pagePath: '/promotions/simo-promotions'
});
```

### Object description
```typescript
interface PageViewObject {
  event: 'Pageview' | 'historyChange'
  emailHash: string | 'null'
  emailToken: string | 'null'
  pagePath: string
}

const pageView: PageViewObject = {
    event: 'Pageview',
    emailHash: '<email-hashed-value>',
    emailToken: '<email-tokenized-value>',
    pagePath: '<current-page-path>'
}

dataLayer.push(pageView);
```

#### `pagePath` - Current page path
Please send the current `window.pathname` or revelant path indicating current page URL without the `window.hostname` value. 

#### `event` - The event name
In additional to standard `dataLayer` events please add a new event to trigger when page updates. You can trigger `Pageview` or `HistoryChange` depending. Both events trigger `utag.view`. 

#### `emailToken` - Email ID Token (Salesforce/Mulesoft-generated)
This field returns the tokenized output value of the user's email address. Tokenization is done in Mulesoft/Salesforce. The value to populate here should be the tokenized email address value only, without any prefixes or suffixes. If the user is not logged in, populate the variable with the null value (string): `"null"`.

#### `emailHash` -	Email ID Hash
This field returns the hashed output value of the user's email address, using the same hashing algorithm as the Salesforce account (SHA-256). The value to populate here should be the SHA-256 hashed email address value only, without any prefixes or suffixes. If the user is not logged in, populate the variable with the null value (string): `"null"`.




 