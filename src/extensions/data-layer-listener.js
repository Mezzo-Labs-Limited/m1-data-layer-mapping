// Define a custom Array constructor function
function TealiumArray(initialDataLayer) {
  var _simpleStringify = function (object) {
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
  };

  var _execute = function (useArgs) {
    useArgs = JSON.parse(_simpleStringify(useArgs))
    if (typeof utag !== 'undefined' && utag.link && utag.view) {
      if (Object.prototype.hasOwnProperty.call(useArgs, 'event') 
        && typeof useArgs.event === 'string' 
        && useArgs.event.match(/(pageview)/gi) !== null
      ) {
        useArgs['tealium_event'] = 'user_enhanced'
        utag.link(useArgs);
      }
    }
  }

  var _iterateArray = function (useArray) {
    for (var index = 0; index < useArray.length; index++) {
      var arrayElement = useArray[index];
      _execute(arrayElement);
    }
  }

  // Create a new array instance
  var _dataLayer = Array.prototype.slice.call(initialDataLayer);
  // dataLayer may not be emty, make sure data gets reported
  _iterateArray(_dataLayer);

  // Define custom push method using the prototype property
  _dataLayer.push = function(val) {
    var args = Array.prototype.slice.call(arguments);
    // console.log('push', JSON.stringify(args), JSON.stringify(this))
    // Call the default push method to add new elements to the array
    Array.prototype.push.apply(this, args);
    var useArgs = Array.prototype.slice.call(arguments);
    _iterateArray(useArgs);
    return true;
  }

  // Define custom pop method using the prototype property
  _dataLayer.pop = function() {
    // Call the default pop method to remove the last element from the array
    var poppedElement = Array.prototype.pop.apply(this);
    return poppedElement;
  }

  // Return the custom array instance
  return _dataLayer;
}

window.dataLayer = new TealiumArray(window.dataLayer || []);

if (typeof module !== 'undefined') {
  module.exports = TealiumArray
}

// Sample call to dataLayer
if (typeof module === 'undefined') {
  const event = {
    emailHash: "72ea10330d1dd9071ba15ecbcde801c5c72db6715b9dd0d1f511049d5f3282cd",
    event: "Pageview",
    "gtm.uniqueEventid": 10,
    mobileHash: "null",
    pagePath: "/bespoke/devices/flexi"
  }
  // debugger
  // utag.link(event)
  // debugger
  dataLayer.push(event)
}