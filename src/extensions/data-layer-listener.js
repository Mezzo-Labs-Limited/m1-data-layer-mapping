// Define a custom Array constructor function
function TealiumArray(initialDataLayer) {
  var _execute = function (useArgs) {
    if (typeof utag !== 'undefined' && utag.link) {
      if (Object.prototype.hasOwnProperty.call(useArgs, 'event') 
        && typeof useArgs.event === 'string' 
        && useArgs.event.match(/(pageview)|(historychange)/gi) !== null
      ) {
        utag.view(useArgs);
      } else {
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
  _dataLayer.push = function() {
    var args = Array.prototype.slice.call(arguments);
    // Call the default push method to add new elements to the array
    Array.prototype.push.apply(this, args);
    var useArgs = Array.prototype.slice.call(arguments);
    _iterateArray(useArgs);
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
