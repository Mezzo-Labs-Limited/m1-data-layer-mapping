// Define a custom Array constructor function
function TealiumArray(newArray) {
  var _execute = function (useArgs) {
    // console.log(utag)
    if (typeof utag !== 'undefined' && utag.link) {
      if (Object.prototype.hasOwnProperty.call(useArgs, 'event') 
        && typeof useArgs.event === 'string' 
        && useArgs.event.toLowerCase() === 'pageview'
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
  var array = Array.prototype.slice.call(newArray);
  _iterateArray(array);
  // Define custom push method using the prototype property
  array.push = function() {
    var args = Array.prototype.slice.call(arguments);
    // Call the default push method to add new elements to the array
    Array.prototype.push.apply(this, args);
    var useArgs = Array.prototype.slice.call(arguments);
    _iterateArray(useArgs);
  }

  // Define custom pop method using the prototype property
  array.pop = function() {
    // Call the default pop method to remove the last element from the array
    var poppedElement = Array.prototype.pop.apply(this);
    return poppedElement;
  }

  // Return the custom array instance
  return array;
}

// TODO: review page view event
// event: "gtm.historyChange-v2"

// Remove this line for production
module.exports = TealiumArray