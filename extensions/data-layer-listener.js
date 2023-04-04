// Define a custom Array constructor function
function TealiumArray(newArray) {
  var _execute = function (useArgs) {
    if (utag && utag.link) {
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
  // Create a new array instance
  var array = Array.prototype.slice.call(newArray);
  for (var index = 0; index < array.length; index++) {
    var arrayElement = array[index];
    var useArgs = Array.prototype.slice.call(arrayElement);
    _execute(useArgs);
  }
  // Define custom push method using the prototype property
  array.push = function() {
    var args = Array.prototype.slice.call(arguments);
    // Call the default push method to add new elements to the array
    Array.prototype.push.apply(this, args);
    var useArgs = Array.prototype.slice.call(arguments);
    _execute(useArgs);
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

// Create a new instance of the custom Array constructor function
window.dataLayer = new TealiumArray(window.dataLayer || []);
