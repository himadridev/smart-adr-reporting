// Write your package code here!



(function() {
  'use strict';
  var _sentiment = Npm.require("sentiment");
  var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global || this;

  var Sentiment = {
    get: function(txt) {
      return _sentiment(txt);
    }
  };

  if (typeof exports != 'undefined') {
    if (typeof module != 'undefined' && module.exports) {
      exports = module.exports = Sentiment;
    }
    exports.Sentiment = Sentiment;
  } else {
    root.Sentiment = Sentiment;
  }

}());