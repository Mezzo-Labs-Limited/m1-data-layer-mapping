# App: Data Layer Requirements - React Native
This document will focus on the creation of a data layer object (within screens on the native app React Native 2.x), as well as the declaration of variables to sit inside that data layer object.

## Install
Install the library with NPM: `yarn install tealium-react-native`

## Initialize
```JavaScript
import Tealium from 'tealium-react-native';
import { TealiumConfig, TealiumView, TealiumEvent, ConsentCategories, Dispatchers, Collectors, ConsentPolicy, Expiry, ConsentExpiry, TimeUnit, ConsentStatus, TealiumEnvironment } from 'tealium-react-native/common';

let config: TealiumConfig = {
	account: 'ACCOUNT',
	profile: 'PROFILE',
	environment: TealiumEnvironment.dev,
	dispatchers: [Dispatchers.Collect, Dispatchers.RemoteCommands, Dispatchers.TagManagement],
	collectors: [Collectors.AppData, Collectors.DeviceData, Collectors.Lifecycle, Collectors.Connectivity],
	consentPolicy: ConsentPolicy.gdpr,
	visitorServiceEnabled: true
};
Tealium.initialize(config);
```

## Implementation
The following provides a list of variables required (and variable syntax) for ALL SCREENS on the native app platform:

#### `emailHash` -	Email ID Hash
This field returns the hashed output value of the user's email address, using the same hashing algorithm as the Salesforce account (SHA-256). The value to populate here should be the SHA-256 hashed email address value only, without any prefixes or suffixes. 
If the user is not logged in, populate the variable with the null value (string): `"null"`.

#### `mobileHash` -	Mobile number hash
This field returns the hashed output value of the user's mobile phone number, using the same hashing algorithm as the Salesforce account (SHA-256). If the user is not logged in, populate the variable with the null value (string): `"null"`.

#### React Native track view - code sample
```JavaScript
let view = new TealiumView('Pageview', {
  "emailHash": "<HASHED-VALUE> or null",
  "mobileHash", "<MOBILE-NUMBER-HASHED-VALUE> or null"
});

Tealium.track(view);
```

## Resources
- [Tealium docs - React Native](https://docs.tealium.com/platforms/react-native/install/)
