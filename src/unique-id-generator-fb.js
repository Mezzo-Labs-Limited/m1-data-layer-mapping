function setCookie(name, value, daysToExpire) {
  var date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  var expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  var match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
}

function simpleHash(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return new Uint32Array([hash])[0].toString(36);
}

function createUniqueID() {
  var timestamp = new Date().getTime();
  var random = Math.floor(Math.random() * 10000);
  return simpleHash("" + timestamp + random);
}

if (typeof module !== 'undefined') {
  module.exports = {
    createUniqueID,
    simpleHash
  }
}

if (typeof module === 'undefined') {
  var existingValue = getCookie("teal_uid");
  if (!existingValue) {
    const uniqueID = createUniqueID();
    setCookie("teal_uid", uniqueID, 365);
  }
}