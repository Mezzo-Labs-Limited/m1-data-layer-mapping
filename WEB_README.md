# dataLayer mapping to Tealium - web integration guide

## Installation on the site
Use the `dataLayer` push event to trigger a page view event on page load or when a page URL changes. Populate the event with `emailHash`, `emailToken` and `mobileHash` values when available. If these values are not available, populate the values with a null value (string) `"null"`.


### Custom Page view events syntax
At each point where a page change occurs (page refresh, page load, or history change), execute the following code snippet. The variable key-value pairs shown below are only examples.

```
// Example code
dataLayer.push({
    event: 'Pageview',
    emailHash: '694-hdjsadhjs',
    emailToken: 'eouyi-77777247',
    pagePath: '/promotions?redirectionurl=#hbbID',
    mobileHash: '677-abcddbss'
});
```

### Object description
```typescript
interface PageViewObject {
  event: 'Pageview'
  emailHash: string | 'null'
  emailToken: string | 'null'
  mobileHash: string | 'null'
  pagePath: string
}

const pageView: PageViewObject = {
    event: 'Pageview',
    emailHash: '<email-hashed-value>',
    emailToken: '<email-tokenized-value>',
    pagePath: '<current-page-path>',
    mobileHash: '<mobile-number-hashed-value>'
}

dataLayer.push(pageView);
```

#### `pagePath` - Current page path
Please send the current `window.location.pathname` and query string `window.location.search` (concatenated) or revelant path indicating current page URL. Do not include the `window.location.hostname` value.

#### `event` - The event name
In additional to standard `dataLayer` events please add a new event to trigger when page updates. Please use `Pageview` to indicate a page change. 

#### `emailToken` - Email ID token (Mulesoft generated)
This field returns the tokenized output value of the user's email address. Tokenization is done in Mulesoft. The value to populate here should be the tokenized email address value only, without any prefixes or suffixes. If the user is not logged in, populate the variable with the null value (string): `"null"`.

#### `emailHash` -	Email ID hash
This field returns the hashed output value of the user's email address, using the same hashing algorithm as the Salesforce account (SHA-256). The value to populate here should be the SHA-256 hashed email address value only, without any prefixes or suffixes. If the user is not logged in, populate the variable with the null value (string): `"null"`.

#### `mobileHash` -	Mobile number hash
This field returns the hashed output value of the user's mobile phone number, using the same hashing algorithm as the Salesforce account (SHA-256). If the user is not logged in, populate the variable with the null value (string): `"null"`.