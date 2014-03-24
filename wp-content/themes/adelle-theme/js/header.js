(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('browsernizr/test/css/rgba');
require('browsernizr/test/css/backgroundsize');
require('browsernizr/test/css/backgroundposition-xy');
require('browsernizr/test/css/fontface');
require('browsernizr/test/css/transforms');
require('browsernizr/test/css/transforms3d');
require('browsernizr/test/css/transitions');
require('browsernizr/test/event/deviceorientation-motion');
require('browsernizr/test/url/data-uri');

require('browsernizr/test/canvas');
require('browsernizr/test/geolocation');
require('browsernizr/test/history');
require('browsernizr/test/json');
require('browsernizr/test/requestanimationframe');
require('browsernizr/test/touchevents');
require('browsernizr/test/webanimations');
require('browsernizr/test/video');

var Modernizr = require('browsernizr');
},{"browsernizr":2,"browsernizr/test/canvas":33,"browsernizr/test/css/backgroundposition-xy":34,"browsernizr/test/css/backgroundsize":35,"browsernizr/test/css/fontface":36,"browsernizr/test/css/rgba":37,"browsernizr/test/css/transforms":38,"browsernizr/test/css/transforms3d":39,"browsernizr/test/css/transitions":40,"browsernizr/test/event/deviceorientation-motion":41,"browsernizr/test/geolocation":42,"browsernizr/test/history":43,"browsernizr/test/json":44,"browsernizr/test/requestanimationframe":45,"browsernizr/test/touchevents":46,"browsernizr/test/url/data-uri":47,"browsernizr/test/video":48,"browsernizr/test/webanimations":49}],2:[function(require,module,exports){
var Modernizr = require('./lib/Modernizr'),
    ModernizrProto = require('./lib/ModernizrProto'),
    classes = require('./lib/classes'),
    testRunner = require('./lib/testRunner'),
    setClasses = require('./lib/setClasses');

// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
  Modernizr._q[i]();
}

module.exports = Modernizr;

},{"./lib/Modernizr":3,"./lib/ModernizrProto":4,"./lib/classes":6,"./lib/setClasses":24,"./lib/testRunner":30}],3:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // Fake some of Object.create
  // so we can force non test results
  // to be non "own" properties.
  var Modernizr = function(){};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it
  // rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  

module.exports = Modernizr;
},{"./ModernizrProto":4}],4:[function(require,module,exports){
var tests = require('./tests');


  var ModernizrProto = {
    // The current version, dummy
    _version: 'v3.0.0pre',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      classPrefix : '',
      enableClasses : true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function( test, cb ) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for
      // actual async tests. This is in case people listen to
      // synchronous tests. I would leave it out, but the code
      // to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      setTimeout(function() {
        cb(this[test]);
      }, 0);
    },

    addTest: function( name, fn, options ) {
      tests.push({name : name, fn : fn, options : options });
    },

    addAsyncTest: function (fn) {
      tests.push({name : null, fn : fn});
    }
  };

  

module.exports = ModernizrProto;
},{"./tests":32}],5:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var Modernizr = require('./Modernizr');
var hasOwnProp = require('./hasOwnProp');
var setClasses = require('./setClasses');


  // As far as I can think of, we shouldn't need or
  // allow 'on' for non-async tests, and you can't do
  // async tests without this 'addTest' module.

  // Listeners for async or post-run tests
  ModernizrProto._l = {};

  // 'addTest' implies a test after the core runloop,
  // So we'll add in the events
  ModernizrProto.on = function( test, cb ) {
    // Create the list of listeners if it doesn't exist
    if (!this._l[test]) {
      this._l[test] = [];
    }

    // Push this test on to the listener list
    this._l[test].push(cb);

    // If it's already been resolved, trigger it on next tick
    if (Modernizr.hasOwnProperty(test)) {
      // Next Tick
      setTimeout(function() {
        Modernizr._trigger(test, Modernizr[test]);
      }, 0);
    }
  };

  ModernizrProto._trigger = function( test, res ) {
    if (!this._l[test]) {
      return;
    }

    var cbs = this._l[test];

    // Force async
    setTimeout(function() {
      var i, cb;
      for (i = 0; i < cbs.length; i++) {
        cb = cbs[i];
        cb(res);
      }
    },0);

    // Don't trigger these again
    delete this._l[test];
  };

  /**
   * addTest allows the user to define their own feature tests
   * the result will be added onto the Modernizr object,
   * as well as an appropriate className set on the html element
   *
   * @param feature - String naming the feature
   * @param test - Function returning true if feature is supported, false if not
   */
  function addTest( feature, test ) {
    if ( typeof feature == 'object' ) {
      for ( var key in feature ) {
        if ( hasOwnProp( feature, key ) ) {
          addTest( key, feature[ key ] );
        }
      }
    } else {

      feature = feature.toLowerCase();
      var featureSplit = feature.split('.');
      var last = Modernizr[featureSplit[0]];

      // Again, we don't check for parent test existence. Get that right, though.
      if (featureSplit.length == 2) {
        last = last[featureSplit[1]];
      }

      if ( typeof last != 'undefined' ) {
        // we're going to quit if you're trying to overwrite an existing test
        // if we were to allow it, we'd do this:
        //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
        //   docElement.className = docElement.className.replace( re, '' );
        // but, no rly, stuff 'em.
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      // Set the value (this is the magic, right here).
      if (featureSplit.length == 1) {
        Modernizr[featureSplit[0]] = test;
      }
      else if (featureSplit.length == 2) {
        Modernizr[featureSplit[0]][featureSplit[1]] = test;
      }

      // Set a single class (either `feature` or `no-feature`)
      setClasses([(test ? '' : 'no-') + featureSplit.join('-')]);

      // Trigger the event
      Modernizr._trigger(feature, test);
    }

    return Modernizr; // allow chaining.
  }

  // After all the tests are run, add self
  // to the Modernizr prototype
  Modernizr._q.push(function() {
    ModernizrProto.addTest = addTest;
  });

  

module.exports = addTest;
},{"./Modernizr":3,"./ModernizrProto":4,"./hasOwnProp":15,"./setClasses":24}],6:[function(require,module,exports){

  var classes = [];
  
module.exports = classes;
},{}],7:[function(require,module,exports){

  /**
   * contains returns a boolean for if substr is found within str.
   */
  function contains( str, substr ) {
    return !!~('' + str).indexOf(substr);
  }

  
module.exports = contains;
},{}],8:[function(require,module,exports){

  var createElement = function() {
    return document.createElement.apply(document, arguments);
  };
  
module.exports = createElement;
},{}],9:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var omPrefixes = require('./omPrefixes');


  var cssomPrefixes = omPrefixes.split(' ');
  ModernizrProto._cssomPrefixes = cssomPrefixes;
  

module.exports = cssomPrefixes;
},{"./ModernizrProto":4,"./omPrefixes":21}],10:[function(require,module,exports){

  var docElement = document.documentElement;
  
module.exports = docElement;
},{}],11:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var omPrefixes = require('./omPrefixes');


  var domPrefixes = omPrefixes.toLowerCase().split(' ');
  ModernizrProto._domPrefixes = domPrefixes;
  

module.exports = domPrefixes;
},{"./ModernizrProto":4,"./omPrefixes":21}],12:[function(require,module,exports){

    // Helper function for e.g. boxSizing -> box-sizing
    function domToHyphenated( name ) {
        return name.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
    }
    
module.exports = domToHyphenated;
},{}],13:[function(require,module,exports){
var slice = require('./slice');


  // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
  // es5.github.com/#x15.3.4.5

  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind(that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1);
      var bound = function() {

        if (this instanceof bound) {

          var F = function(){};
          F.prototype = target.prototype;
          var self = new F();

          var result = target.apply(
            self,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return self;

        } else {

          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );

        }

      };

      return bound;
    };
  }

  

module.exports = Function.prototype.bind;
},{"./slice":25}],14:[function(require,module,exports){
var createElement = require('./createElement');


  function getBody() {
    // After page load injecting a fake body doesn't work so check if body exists
    var body = document.body;

    if(!body) {
      // Can't use the real body create a fake one.
      body = createElement('body');
      body.fake = true;
    }

    return body;
  }

  

module.exports = getBody;
},{"./createElement":8}],15:[function(require,module,exports){
var is = require('./is');


  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var hasOwnProp;

  (function() {
    var _hasOwnProperty = ({}).hasOwnProperty;
    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }
  })();

  

module.exports = hasOwnProp;
},{"./is":17}],16:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var docElement = require('./docElement');
var createElement = require('./createElement');
var getBody = require('./getBody');


  // Inject element with style element and some CSS rules
  function injectElementWithStyles( rule, callback, nodes, testnames ) {
    var mod = 'modernizr';
    var style;
    var ret;
    var node;
    var docOverflow;
    var div = createElement('div');
    var body = getBody();

    if ( parseInt(nodes, 10) ) {
      // In order not to give false positives we create a node for each test
      // This also allows the method to scale for unspecified uses
      while ( nodes-- ) {
        node = createElement('div');
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
        div.appendChild(node);
      }
    }

    // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
    // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
    // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
    // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
    // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
    style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
    div.id = mod;
    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
    (!body.fake ? div : body).innerHTML += style;
    body.appendChild(div);
    if ( body.fake ) {
      //avoid crashing IE8, if background image is used
      body.style.background = '';
      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
      body.style.overflow = 'hidden';
      docOverflow = docElement.style.overflow;
      docElement.style.overflow = 'hidden';
      docElement.appendChild(body);
    }

    ret = callback(div, rule);
    // If this is done after page load we don't want to remove the body so check if body exists
    if ( body.fake ) {
      body.parentNode.removeChild(body);
      docElement.style.overflow = docOverflow;
      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
      docElement.offsetHeight;
    } else {
      div.parentNode.removeChild(div);
    }

    return !!ret;

  }

  

module.exports = injectElementWithStyles;
},{"./ModernizrProto":4,"./createElement":8,"./docElement":10,"./getBody":14}],17:[function(require,module,exports){

  /**
   * is returns a boolean for if typeof obj is exactly type.
   */
  function is( obj, type ) {
    return typeof obj === type;
  }
  
module.exports = is;
},{}],18:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var modElem = require('./modElem');


  var mStyle = {
    style : modElem.elem.style
  };

  // kill ref for gc, must happen before
  // mod.elem is removed, so we unshift on to
  // the front of the queue.
  Modernizr._q.unshift(function() {
    delete mStyle.style;
  });

  

module.exports = mStyle;
},{"./Modernizr":3,"./modElem":19}],19:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var createElement = require('./createElement');


  /**
   * Create our "modernizr" element that we do most feature tests on.
   */
  var modElem = {
    elem : createElement('modernizr')
  };

  // Clean up this element
  Modernizr._q.push(function() {
    delete modElem.elem;
  });

  

module.exports = modElem;
},{"./Modernizr":3,"./createElement":8}],20:[function(require,module,exports){
var injectElementWithStyles = require('./injectElementWithStyles');
var domToHyphenated = require('./domToHyphenated');


    // Function to allow us to use native feature detection functionality if available.
    // Accepts a list of property names and a single value
    // Returns `undefined` if native detection not available
    function nativeTestProps ( props, value ) {
        var i = props.length;
        // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
        if ('CSS' in window && 'supports' in window.CSS) {
            // Try every prefixed variant of the property
            while (i--) {
                if (window.CSS.supports(domToHyphenated(props[i]), value)) {
                    return true;
                }
            }
            return false;
        }
        // Otherwise fall back to at-rule (for FF 17 and Opera 12.x)
        else if ('CSSSupportsRule' in window) {
            // Build a condition string for every prefixed variant
            var conditionText = [];
            while (i--) {
                conditionText.push('(' + domToHyphenated(props[i]) + ':' + value + ')');
            }
            conditionText = conditionText.join(' or ');
            return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function( node ) {
                return (window.getComputedStyle ?
                        getComputedStyle(node, null) :
                        node.currentStyle)['position'] == 'absolute';
            });
        }
        return undefined;
    }
    

module.exports = nativeTestProps;
},{"./domToHyphenated":12,"./injectElementWithStyles":16}],21:[function(require,module,exports){

  // Following spec is to expose vendor-specific style properties as:
  //   elem.style.WebkitBorderRadius
  // and the following would be incorrect:
  //   elem.style.webkitBorderRadius

  // Webkit ghosts their properties in lowercase but Opera & Moz do not.
  // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
  //   erik.eae.net/archives/2008/03/10/21.48.10/

  // More here: github.com/Modernizr/Modernizr/issues/issue/21
  var omPrefixes = 'Webkit Moz O ms';
  
module.exports = omPrefixes;
},{}],22:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var testPropsAll = require('./testPropsAll');


  // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
  // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

  // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
  // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
  //
  //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

  // If you're trying to ascertain which transition end event to bind to, you might do something like...
  //
  //     var transEndEventNames = {
  //         'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
  //         'MozTransition'    : 'transitionend',      // only for FF < 15
  //         'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  //     },
  //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

  var prefixed = ModernizrProto.prefixed = function( prop, obj, elem ) {
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
      return testPropsAll(prop, obj, elem);
    }
  };

  

module.exports = prefixed;
},{"./ModernizrProto":4,"./testPropsAll":29}],23:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');


  // List of property values to set for css tests. See ticket #21
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

  // expose these for the plugin API. Look in the source for how to join() them against your input
  ModernizrProto._prefixes = prefixes;

  

module.exports = prefixes;
},{"./ModernizrProto":4}],24:[function(require,module,exports){
var Modernizr = require('./Modernizr');
var docElement = require('./docElement');


  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses( classes ) {
    var className = docElement.className;
    var regex;
    var classPrefix = Modernizr._config.classPrefix || '';

    // Change `no-js` to `js` (we do this regardles of the `enableClasses`
    // option)
    // Handle classPrefix on this too
    var reJS = new RegExp('(^|\\s)'+classPrefix+'no-js(\\s|$)');
    className = className.replace(reJS, '$1'+classPrefix+'js$2');

    if(Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      docElement.className = className;
    }

  }

  

module.exports = setClasses;
},{"./Modernizr":3,"./docElement":10}],25:[function(require,module,exports){
var classes = require('./classes');


  var slice = classes.slice;
  

module.exports = slice;
},{"./classes":6}],26:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var testPropsAll = require('./testPropsAll');


  /**
   * testAllProps determines whether a given CSS property, in some prefixed
   * form, is supported by the browser. It can optionally be given a value; in
   * which case testAllProps will only return true if the browser supports that
   * value for the named property; this latter case will use native detection
   * (via window.CSS.supports) if available. A boolean can be passed as a 3rd
   * parameter to skip the value check when native detection isn't available,
   * to improve performance when simply testing for support of a property.
   *
   * @param prop - String naming the property to test
   * @param value - [optional] String of the value to test
   * @param skipValueTest - [optional] Whether to skip testing that the value
   *                        is supported when using non-native detection
   *                        (default: false)
   */
    function testAllProps (prop, value, skipValueTest) {
        return testPropsAll(prop, undefined, undefined, value, skipValueTest);
    }
    ModernizrProto.testAllProps = testAllProps;
    

module.exports = testAllProps;
},{"./ModernizrProto":4,"./testPropsAll":29}],27:[function(require,module,exports){
var is = require('./is');
require('./fnBind');


  /**
   * testDOMProps is a generic DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   */
  function testDOMProps( props, obj, elem ) {
    var item;

    for ( var i in props ) {
      if ( props[i] in obj ) {

        // return the property name as a string
        if (elem === false) return props[i];

        item = obj[props[i]];

        // let's bind a function (and it has a bind method -- certain native objects that report that they are a
        // function don't [such as webkitAudioContext])
        if (is(item, 'function') && 'bind' in item){
          // default to autobind unless override
          return item.bind(elem || obj);
        }

        // return the unbound function or obj or value
        return item;
      }
    }
    return false;
  }

  

module.exports = testDOMProps;
},{"./fnBind":13,"./is":17}],28:[function(require,module,exports){
var contains = require('./contains');
var mStyle = require('./mStyle');
var createElement = require('./createElement');
var nativeTestProps = require('./nativeTestProps');
var is = require('./is');


  // testProps is a generic CSS / DOM property test.

  // In testing support for a given CSS property, it's legit to test:
  //    `elem.style[styleName] !== undefined`
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.

  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.

  // Because the testing of the CSS property names (with "-", as
  // opposed to the camelCase DOM properties) is non-portable and
  // non-standard but works in WebKit and IE (but not Gecko or Opera),
  // we explicitly reject properties with dashes so that authors
  // developing in WebKit or IE first don't end up with
  // browser-specific content by accident.

  function testProps( props, prefixed, value, skipValueTest ) {
    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

    // Try native detect first
    if (!is(value, 'undefined')) {
      var result = nativeTestProps(props, value);
      if(!is(result, 'undefined')) {
        return result;
      }
    }

    // Otherwise do it properly
    var afterInit, i, j, prop, before;

    // If we don't have a style element, that means
    // we're running async or after the core tests,
    // so we'll need to create our own elements to use
    if ( !mStyle.style ) {
      afterInit = true;
      mStyle.modElem = createElement('modernizr');
      mStyle.style = mStyle.modElem.style;
    }

    // Delete the objects if we
    // we created them.
    function cleanElems() {
      if (afterInit) {
        delete mStyle.style;
        delete mStyle.modElem;
      }
    }

    for ( i in props ) {
      prop = props[i];
      before = mStyle.style[prop];

      if ( !contains(prop, "-") && mStyle.style[prop] !== undefined ) {

        // If value to test has been passed in, do a set-and-check test.
        // 0 (integer) is a valid property value, so check that `value` isn't
        // undefined, rather than just checking it's truthy.
        if (!skipValueTest && !is(value, 'undefined')) {

          // Needs a try catch block because of old IE. This is slow, but will
          // be avoided in most cases because `skipValueTest` will be used.
          try {
            mStyle.style[prop] = value;
          } catch (e) {}

          // If the property value has changed, we assume the value used is
          // supported. If `value` is empty string, it'll fail here (because
          // it hasn't changed), which matches how browsers have implemented
          // CSS.supports()
          if (mStyle.style[prop] != before) {
            cleanElems();
            return prefixed == 'pfx' ? prop : true;
          }
        }
        // Otherwise just return true, or the property name if this is a
        // `prefixed()` call
        else {
          cleanElems();
          return prefixed == 'pfx' ? prop : true;
        }
      }
    }
    cleanElems();
    return false;
  }

  

module.exports = testProps;
},{"./contains":7,"./createElement":8,"./is":17,"./mStyle":18,"./nativeTestProps":20}],29:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var cssomPrefixes = require('./cssomPrefixes');
var is = require('./is');
var testProps = require('./testProps');
var domPrefixes = require('./domPrefixes');
var testDOMProps = require('./testDOMProps');
var prefixes = require('./prefixes');


    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *     We specify literally ALL possible (known and/or likely) properties on
     *     the element including the non-vendor prefixed one, for forward-
     *     compatibility.
     */
    function testPropsAll( prop, prefixed, elem, value, skipValueTest ) {

        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed, value, skipValueTest);

            // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }

    // Modernizr.testAllProps() investigates whether a given style property,
    //     or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    ModernizrProto.testAllProps = testPropsAll;

    

module.exports = testPropsAll;
},{"./ModernizrProto":4,"./cssomPrefixes":9,"./domPrefixes":11,"./is":17,"./prefixes":23,"./testDOMProps":27,"./testProps":28}],30:[function(require,module,exports){
var tests = require('./tests');
var Modernizr = require('./Modernizr');
var classes = require('./classes');
var is = require('./is');


  // Run through all tests and detect their support in the current UA.
  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;
    var modernizrProp;
    var mPropCount;

    for ( var featureIdx in tests ) {
      featureNames = [];
      feature = tests[featureIdx];
      // run the test, throw the return value into the Modernizr,
      //   then based on that boolean, define an appropriate className
      //   and push it into an array of classes we'll join later.
      //
      //   If there is no name, it's an 'async' test that is run,
      //   but not directly added to the object. That should
      //   be done with a post-run addTest call.
      if ( feature.name ) {
        featureNames.push(feature.name.toLowerCase());

        if (feature.options && feature.options.aliases && feature.options.aliases.length) {
          // Add all the aliases into the names list
          for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
            featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
          }
        }
      }

      // Run the test, or use the raw value if it's not a function
      result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


      // Set each of the names on the Modernizr object
      for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
        featureName = featureNames[nameIdx];
        // Support dot properties as sub tests. We don't do checking to make sure
        // that the implied parent tests have been added. You must call them in
        // order (either in the test, or make the parent test a dependency).
        //
        // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
        // hashtag famous last words
        featureNameSplit = featureName.split('.');

        if (featureNameSplit.length === 1) {
          Modernizr[featureNameSplit[0]] = result;
        }
        else if (featureNameSplit.length === 2) {
          Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
        }

        classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
      }
    }
  }

  

module.exports = testRunner;
},{"./Modernizr":3,"./classes":6,"./is":17,"./tests":32}],31:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto');
var injectElementWithStyles = require('./injectElementWithStyles');


  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;
  

module.exports = testStyles;
},{"./ModernizrProto":4,"./injectElementWithStyles":16}],32:[function(require,module,exports){

  var tests = [];
  
module.exports = tests;
},{}],33:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');
var createElement = require('./../lib/createElement');

/*!
{
  "name": "Canvas",
  "property": "canvas",
  "caniuse": "canvas",
  "tags": ["canvas", "graphics"],
  "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
}
!*/
/* DOC

Detects support for the `<canvas>` element for 2D drawing.

*/

  // On the S60 and BB Storm, getContext exists, but always returns undefined
  // so we actually have to call getContext() to verify
  // github.com/Modernizr/Modernizr/issues/issue/97/
  Modernizr.addTest('canvas', function() {
    var elem = createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  });


},{"./../lib/Modernizr":3,"./../lib/createElement":8}],34:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');

/*!
{
  "name": "Background Position XY",
  "property": "bgpositionxy",
  "tags": ["css"],
  "authors": ["Allan Lei", "Brandom Aaron"],
  "notes": [{
    "name": "Demo",
    "href": "http://jsfiddle.net/allanlei/R8AYS/"
  }, {
    "name": "Adapted From",
    "href": "https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js"
  }]
}
!*/

  Modernizr.addTest('bgpositionxy', function () {
    return testAllProps('backgroundPositionX', '3px', true) && testAllProps('backgroundPositionY', '5px', true);
  });


},{"./../../lib/Modernizr":3,"./../../lib/testAllProps":26}],35:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');

/*!
{
  "name": "Background Size",
  "property": "backgroundsize",
  "tags": ["css"],
  "knownBugs": ["This will false positive in Opera Mini - http://github.com/Modernizr/Modernizr/issues/396"],
  "notes": [{
    "name": "Related Issue",
    "href": "http://github.com/Modernizr/Modernizr/issues/396"
  }]
}
!*/

  Modernizr.addTest('backgroundsize', testAllProps('backgroundSize', '100%', true));


},{"./../../lib/Modernizr":3,"./../../lib/testAllProps":26}],36:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testStyles = require('./../../lib/testStyles');

/*!
{
  "name": "@font-face",
  "property": "fontface",
  "authors": ["Diego Perini"],
  "tags": ["css"],
  "knownBugs": [
    "False Positive: WebOS http://github.com/Modernizr/Modernizr/issues/342",
    "False Postive: WP7 http://github.com/Modernizr/Modernizr/issues/538"
  ],
  "notes": [{
    "name": "@font-face detection routine by Diego Perini",
    "href": "http://javascript.nwbox.com/CSSSupport/"
  }]
}
!*/

  testStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
    var style = document.getElementById('smodernizr');
    var sheet = style.sheet || style.styleSheet;
    var cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';
    var bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;

    Modernizr.addTest('fontface', bool);
  });


},{"./../../lib/Modernizr":3,"./../../lib/testStyles":31}],37:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var createElement = require('./../../lib/createElement');

/*!
{
  "name": "CSS rgba",
  "caniuse": "css3-colors",
  "property": "rgba",
  "tags": ["css"],
  "notes": [{
    "name": "CSSTricks Tutorial",
    "href": "http://css-tricks.com/rgba-browser-support/"
  }]
}
!*/

  Modernizr.addTest('rgba', function() {
    var elem = createElement('div');
    var style = elem.style;
    style.cssText = 'background-color:rgba(150,255,150,.5)';

    return ('' + style.backgroundColor).indexOf('rgba') > -1;
  });


},{"./../../lib/Modernizr":3,"./../../lib/createElement":8}],38:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');

/*!
{
  "name": "CSS Transforms",
  "property": "csstransforms",
  "caniuse": "transforms2d",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransforms', testAllProps('transform', 'scale(1)', true));


},{"./../../lib/Modernizr":3,"./../../lib/testAllProps":26}],39:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');
var testStyles = require('./../../lib/testStyles');
var docElement = require('./../../lib/docElement');

/*!
{
  "name": "CSS Transforms 3D",
  "property": "csstransforms3d",
  "caniuse": "transforms3d",
  "tags": ["css"],
  "warnings": [
    "Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
  ]
}
!*/

  Modernizr.addTest('csstransforms3d', function() {
    var ret = !!testAllProps('perspective', '1px', true);

    // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
    //   some conditions. As a result, Webkit typically recognizes the syntax but
    //   will sometimes throw a false positive, thus we must do a more thorough check:
    if ( ret && 'webkitPerspective' in docElement.style ) {

      // Webkit allows this media query to succeed only if the feature is enabled.
      // `@media (transform-3d),(-webkit-transform-3d){ ... }`
      // If loaded inside the body tag and the test element inherits any padding, margin or borders it will fail #740
      testStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:5px;margin:0;padding:0;border:0}}', function( node, rule ) {
        ret = node.offsetLeft === 9 && node.offsetHeight === 5;
      });
    }

    return ret;
  });


},{"./../../lib/Modernizr":3,"./../../lib/docElement":10,"./../../lib/testAllProps":26,"./../../lib/testStyles":31}],40:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var testAllProps = require('./../../lib/testAllProps');

/*!
{
  "name": "CSS Transitions",
  "property": "csstransitions",
  "caniuse": "css-transitions",
  "tags": ["css"]
}
!*/

  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));


},{"./../../lib/Modernizr":3,"./../../lib/testAllProps":26}],41:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');

/*!
{
  "name": "Device Orientation and Motion Events",
  "property": ["devicemotion", "deviceorientation"],
  "caniuse": "deviceorientation",
  "notes": [{
    "name": "W3C Editor's Draft",
    "href": "http://dev.w3.org/geo/api/spec-source-orientation.html"
  },{
    "name": "Implementation by iOS Safari (Orientation)",
    "href": "http://goo.gl/fhce3"
  },{
    "name": "Implementation by iOS Safari (Motion)",
    "href": "http://goo.gl/rLKz8"
  }],
  "authors": ["Shi Chuan"],
  "tags": ["event"]
}
!*/
/* DOC

Part of Device Access aspect of HTML5, same category as geolocation.

`devicemotion` tests for Device Motion Event support, returns boolean value true/false.

`deviceorientation` tests for Device Orientation Event support, returns boolean value true/false

*/

  Modernizr.addTest('devicemotion', 'DeviceMotionEvent' in window);
  Modernizr.addTest('deviceorientation', 'DeviceOrientationEvent' in window);


},{"./../../lib/Modernizr":3}],42:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');

/*!
{
  "name": "Geolocation API",
  "property": "geolocation",
  "caniuse": "geolocation",
  "tags": ["media"],
  "notes": [{
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"
  }],
  "polyfills": [
    "joshuabell-polyfill",
    "webshims",
    "geolocationshim",
    "geo-location-javascript",
    "geolocation-api-polyfill"
  ]
}
!*/
/* DOC

Detects support for the Geolocation API for users to provide their location to web applications.

*/

  // geolocation is often considered a trivial feature detect...
  // Turns out, it's quite tricky to get right:
  //
  // Using !!navigator.geolocation does two things we don't want. It:
  //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
  //   2. Disables page caching in WebKit: webk.it/43956
  //
  // Meanwhile, in Firefox < 8, an about:config setting could expose
  // a false positive that would throw an exception: bugzil.la/688158

  Modernizr.addTest('geolocation', 'geolocation' in navigator);


},{"./../lib/Modernizr":3}],43:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');

/*!
{
  "name": "History API",
  "property": "history",
  "caniuse": "history",
  "tags": ["history"],
  "authors": ["Hay Kranen", "Alexander Farkas"],
  "notes": [{
    "name": "W3C Spec",
    "href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
  }],
  "polyfills": ["historyjs", "html5historyapi"]
}
!*/
/* DOC

Detects support for the History API for manipulating the browser session history.

*/

  Modernizr.addTest('history', function() {
    // Issue #733
    // The stock browser on Android 2.2 & 2.3 returns positive on history support
    // Unfortunately support is really buggy and there is no clean way to detect
    // these bugs, so we fall back to a user agent sniff :(
    var ua = navigator.userAgent;

    // We only want Android 2, stock browser, and not Chrome which identifies
    // itself as 'Mobile Safari' as well
    if (ua.indexOf('Android 2') !== -1 &&
        ua.indexOf('Mobile Safari') !== -1 &&
          ua.indexOf('Chrome') === -1) {
      return false;
    }

    // Return the regular check
    return (window.history && 'pushState' in window.history);
  });


},{"./../lib/Modernizr":3}],44:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');

/*!
{
  "name": "JSON",
  "property": "json",
  "caniuse": "json",
  "notes": [{
    "name": "MDN documentation",
    "href": "http://developer.mozilla.org/en/JSON"
  }],
  "polyfills": ["json2"]
}
!*/
/* DOC

Detects native support for JSON handling functions.

*/

  // this will also succeed if you've loaded the JSON2.js polyfill ahead of time
  //   ... but that should be obvious. :)

  Modernizr.addTest('json', 'JSON' in window && 'parse' in JSON);


},{"./../lib/Modernizr":3}],45:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');
var prefixed = require('./../lib/prefixed');

/*!
{
  "name": "requestAnimationFrame",
  "property": "requestanimationframe",
  "aliases": ["raf"],
  "caniuse": "requestanimationframe",
  "tags": ["animation"],
  "authors": ["Addy Osmani"],
  "notes": [{
    "name": "W3C spec",
    "href": "http://www.w3.org/TR/animation-timing/"
  }],
  "polyfills": ["raf"]
}
!*/
/* DOC

Detects support for the `window.requestAnimationFrame` API, for offloading animation repainting to the browser for optimized performance.

*/

  Modernizr.addTest('requestanimationframe', !!prefixed('requestAnimationFrame', window), { aliases: ['raf'] });


},{"./../lib/Modernizr":3,"./../lib/prefixed":22}],46:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');
var prefixes = require('./../lib/prefixes');
var testStyles = require('./../lib/testStyles');

/*!
{
  "name": "Touch Events",
  "property": "touchevents",
  "caniuse" : "touch",
  "tags": ["media", "attribute"],
  "notes": [{
    "name": "Touch Events spec",
    "href": "http://www.w3.org/TR/2013/WD-touch-events-20130124/"
  }],
  "warnings": [
    "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
  ],
  "knownBugs": [
    "False-positive on some configurations of Nokia N900",
    "False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
  ]
}
!*/
/* DOC

Indicates if the browser supports the W3C Touch Events API.

This *does not* necessarily reflect a touchscreen device:

* Older touchscreen devices only emulate mouse events
* Modern IE touch devices implement the Pointer Events API instead: use `Modernizr.pointerevents` to detect support for that
* Some browsers & OS setups may enable touch APIs when no touchscreen is connected
* Future browsers may implement other event models for touch interactions

See this article: [You Can't Detect A Touchscreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/).

It's recommended to bind both mouse and touch/pointer events simultaneously – see [this HTML5 Rocks tutorial](http://www.html5rocks.com/en/mobile/touchandmouse/).

This test will also return `true` for Firefox 4 Multitouch support.

*/

  // Chrome (desktop) used to lie about its support on this, but that has since been rectified: http://crbug.com/36415
  Modernizr.addTest('touchevents', function() {
    var bool;
    if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    } else {
      var query = ['@media (',prefixes.join('touch-enabled),('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join('');
      testStyles(query, function( node ) {
        bool = node.offsetTop === 9;
      });
    }
    return bool;
  });


},{"./../lib/Modernizr":3,"./../lib/prefixes":23,"./../lib/testStyles":31}],47:[function(require,module,exports){
var Modernizr = require('./../../lib/Modernizr');
var addTest = require('./../../lib/addTest');

/*!
{
  "name": "Data URI",
  "property": "datauri",
  "caniuse": "datauri",
  "tags": ["url"],
  "async": true,
  "notes": [{
    "name": "Wikipedia article",
    "href": "http://en.wikipedia.org/wiki/Data_URI_scheme"
  }],
  "warnings": ["Support in Internet Explorer 8 is limited to images and linked resources like CSS files, not HTML files"]
}
!*/
/* DOC

Detects support for data URIs. Provides a subproperty to report support for data URIs over 32kb in size:

```javascript
Modernizr.datauri           // true
Modernizr.datauri.over32kb  // false in IE8
```

*/

  // https://github.com/Modernizr/Modernizr/issues/14
  Modernizr.addAsyncTest(function() {
    /* jshint -W053 */

    // IE7 throw a mixed content warning on HTTPS for this test, so we'll
    // just blacklist it (we know it doesn't support data URIs anyway)
    // https://github.com/Modernizr/Modernizr/issues/362
    if(navigator.userAgent.indexOf('MSIE 7.') !== -1) {
      // Keep the test async
      setTimeout(function () {
        addTest('datauri', false);
      }, 10);
    }

    var datauri = new Image();

    datauri.onerror = function() {
      addTest('datauri', false);
    };
    datauri.onload = function() {
      if(datauri.width == 1 && datauri.height == 1) {
        testOver32kb();
      }
      else {
        addTest('datauri', false);
      }
    };

    datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

    // Once we have datauri, let's check to see if we can use data URIs over
    // 32kb (IE8 can't). https://github.com/Modernizr/Modernizr/issues/321
    function testOver32kb(){

      var datauriBig = new Image();

      datauriBig.onerror = function() {
          addTest('datauri', true);
          Modernizr.datauri = new Boolean(true);
          Modernizr.datauri.over32kb = false;
      };
      datauriBig.onload = function() {
          addTest('datauri', true);
          Modernizr.datauri = new Boolean(true);
          Modernizr.datauri.over32kb = (datauriBig.width == 1 && datauriBig.height == 1);
      };

      var base64str = "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      while (base64str.length < 33000) {
        base64str = "\r\n" + base64str;
      }
      datauriBig.src= "data:image/gif;base64," + base64str;
    }

  });


},{"./../../lib/Modernizr":3,"./../../lib/addTest":5}],48:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');
var createElement = require('./../lib/createElement');

/*!
{
  "name": "HTML5 Video",
  "property": "video",
  "caniuse": "video",
  "tags": ["html5"],
  "knownBugs": [
    "Without QuickTime, `Modernizr.video.h264` will be `undefined`; http://github.com/Modernizr/Modernizr/issues/546"
  ],
  "polyfills": [
    "html5media",
    "mediaelementjs",
    "sublimevideo",
    "videojs",
    "leanbackplayer",
    "videoforeverybody"
  ]
}
!*/
/* DOC

Detects support for the video element, as well as testing what types of content it supports.

Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:

```javascript
Modernizr.video         // true
Modernizr.video.ogg     // 'probably'
```

*/

  // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
  //                     thx to NielsLeenheer and zcorpan

  // Note: in some older browsers, "no" was a return value instead of empty string.
  //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
  //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

  Modernizr.addTest('video', function() {
    /* jshint -W053 */
    var elem = createElement('video');
    var bool = false;

    // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
    try {
      if ( bool = !!elem.canPlayType ) {
        bool = new Boolean(bool);
        bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');

        // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
        bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

        bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
      }
    } catch(e){}

    return bool;
  });


},{"./../lib/Modernizr":3,"./../lib/createElement":8}],49:[function(require,module,exports){
var Modernizr = require('./../lib/Modernizr');

/*!
{
  "name": "Web Animation API",
  "property": "animation",
  "tags": ["webanimations"],
  "polyfills": ["webanimationsjs"],
  "notes": {
    "name": "Introducing Web Animations",
    "href": "http://brian.sol1.net/svg/2013/06/26/introducing-web-animations/"
  }
}
!*/
/* DOC

Detects support for the Web Animation API, a way to create css animations in js

*/

  Modernizr.addTest('webanimations', 'Animation' in window);


},{"./../lib/Modernizr":3}]},{},[1])