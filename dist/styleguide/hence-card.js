(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/**
 * @module consoler
 */

/**
 * A basic ES6 console fail safe wrapper
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
var consoler = {
  /*************
   * Params
   ************/
  enabled: !!window.console,
  /*************
   * Private
   ************/
  _msg: function _msg(type, args) {
    // If console isn't available, or no args were sent, or call type is missing, bypass
    if (!this.enabled || !args.length || typeof window.console[type] !== 'function') {
      return;
    }

    window.console[type].apply(window.console, args);
  },
  /*************
   * Public
   ************/
  log: function log() {
    this._msg('log', arguments);
  },
  warn: function warn() {
    this._msg('warn', arguments);
  },
  error: function error() {
    this._msg('error', arguments);
  },
  trace: function trace() {
    this._msg('trace', arguments);
  },
  group: function group(label) {
    if (this.enabled && typeof window.console.groupEnd == 'function') {
      window.console.groupCollapsed(label);
    }
  },
  groupEnd: function groupEnd() {
    if (this.enabled && typeof console.groupEnd == 'function') {
      window.console.groupEnd();
    }
  }
};

exports['default'] = consoler;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
/*!
 * docReady v1.0.3
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false, require: false, module: false */

( function( window ) {

'use strict';

var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function init( event ) {
  // bail if IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }
  docReady.isReady = true;

  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  eventie.bind( document, 'DOMContentLoaded', init );
  eventie.bind( document, 'readystatechange', init );
  eventie.bind( window, 'load', init );

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  // if RequireJS, then doc is already ready
  docReady.isReady = typeof requirejs === 'function';
  define( [ 'eventie/eventie' ], defineDocReady );
} else if ( typeof exports === 'object' ) {
  module.exports = defineDocReady( require('eventie') );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( window );

},{"eventie":3}],3:[function(require,module,exports){
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

},{}],4:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

# Hence Component Framework

>

## About

Hence Component Framework is built on top of Polymer, designed to provide some essential standards to
the types of components to be based off of, and other essential helpers and tools to build better components.

The Component Framework is built in ES6 to leverage the latest benefits of native javascript, providing a streamlined
way to create and utilize Polymer components, sanitizing them to make sure they're sound, and allow for easier
debugging as required.

*/

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _libModel = require('./lib/model');

var _libSchema = require('./lib/schema');

var _libUi = require('./lib/ui');

var _libHook = require('./lib/hook');

var Hence = {
  Model: _libModel.HenceModel,
  Schema: _libSchema.HenceSchema,
  Ui: _libUi.HenceUi,
  hook: _libHook.HenceHook
};

exports.HenceModel = _libModel.HenceModel;
exports.HenceSchema = _libSchema.HenceSchema;
exports.HenceUi = _libUi.HenceUi;
exports.HenceHook = _libHook.HenceHook;
exports['default'] = Hence;

},{"./lib/hook":7,"./lib/model":8,"./lib/schema":10,"./lib/ui":11}],5:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-behaviour
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polymerIntegrity = require('./polymerIntegrity');

var _consoler = require('consoler');

/**
 * A core behaviour to allow any component to be passed in a props attribute with a full/partial set of properties
 * for the given component.
 *
 * Example:
 * ```
 * <api-comp url="...endpoint.json" results="{{customProps}}"></api-comp>
 * <my-ui props={{customProps}}></my-ui>
 * ```
 *
 * This allows other components to effortlessly passing a range of settings to render the child component, leaving it
 * to do it's own magic. The example above allows the ```api-comp``` to dump results in to the ```customProps```
 * variable, which feeds and then dispalys the ```my-ui``` component.
 *
 * In practical cases, the data would be transformed vs. being passed in raw to the ui component.  See the
 * HenceModel object for reference on this.
 *
 * @type {{properties: {props: {type: Object, notify: boolean}}, attached, _initializeProps}}
 */

var _consoler2 = _interopRequireDefault(_consoler);

var HenceBehaviour = {
  properties: {
    props: {
      type: Object
    }
  },

  /**
   * Will auto fill in this components properties if passed in as an object through the constructor.
   */
  attached: function attached() {
    this._initializeProps();
  },

  /**
   * If this element was created on the DOM, and was passed in a props property, use that object to populate this
   * components properties now, in one fell swoop.
   *
   * @private
   */
  _initializeProps: function _initializeProps() {
    var self = this;
    var config = self.props;

    try {
      //console.log('should check props?', !!config, config, self._propList);

      if (config && self._propList) {
        self._propList.forEach(function (propertyName) {
          if (config[propertyName]) {
            self.set(propertyName, config[propertyName]);
          }
        });
      }
    } catch (e) {
      _consoler2['default'].error('HenceBehaviour::_initializeProps failure', self, e);
    }
  }
};

/*******************************************************************************************************************
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 ******************************************************************************************************************/
(0, _polymerIntegrity.polymerIntegrity)(HenceBehaviour, 'HenceBehaviour');

exports.HenceBehaviour = HenceBehaviour;

},{"./polymerIntegrity":9,"consoler":12}],6:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

### HenceComp

HenceComp is the base object in which all Hence Components are derived from to help address some common
 functionality that is not present in Polymer, such as simplifying component instantiation through DOM or
 dynamic creation, and methods to snap components to new DOM elements with ease.

A critical addition to this is a integrity checker to ensure properties and methods you add to your object do not
conflict with Polymer, prevent disastrous errors which go unchecked by Polymer, so you can address them promptly
during development.

*/
/**
 * @module hence-comp
 */
/**
 * @external Polymer
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polymerIntegrity = require('./polymerIntegrity');

var _behaviour = require('./behaviour');

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashObjectExtend = require('lodash/object/extend');

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _lodashObjectDefaults = require('lodash/object/defaults');

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _lodashObjectHas = require('lodash/object/has');

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _lodashLangCloneDeep = require('lodash/lang/cloneDeep');

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var _lodashLangIsArray = require('lodash/lang/isArray');

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component and Polymer initialization/binding controls.
 */

var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);

var HenceComp = function HenceComp(original) {
  var comp = (0, _lodashLangCloneDeep2['default'])(original);
  var _polymerClass = null;
  var _polymerRegistered = null;
  var _props = (0, _lodashObjectKeys2['default'])(comp.properties || {});

  // Ensure the basics are added to the component if not already present to ensure compatibility
  (0, _lodashObjectDefaults2['default'])(comp, {
    properties: {},
    listeners: {},
    behaviors: []
  });

  /**
   * To simplify allowing to pass a single object through the DOM that overrides any/all of this components
   * properties, we'll allow a default 'props' property on the element to be access this way.
   */
  (0, _lodashObjectExtend2['default'])(comp.properties, {
    _propList: {
      type: Array,
      readOnly: true,
      value: _props
    },
    _propConfig: {
      type: Object,
      readOnly: true
    }
  });

  (0, _lodashObjectExtend2['default'])(comp, {
    /********************************************************************************************************************
     * Initialization
     ********************************************************************************************************************/

    /**
     * The factoryImpl method is only invoked when you create an element using the constructor, this.createElement or
     * it's binding functions. Instances hardcoded into html already will NOT execute this constructor. You've been
     * warned.
     *
     * @param {Object} config A set of options for configuring this component
     */
    factoryImpl: function factoryImpl(config) {
      var self = this;
      self._set_propConfig(config);

      // Must use local _props private var, as self.propList will no yet be initialized... self.propList is usable
      // in the ready/attached methods without issue however.
      _props.forEach(function (propertyName) {
        if (config[propertyName]) {
          self.set(propertyName, config[propertyName]);
        }
      });
    },

    /*******************************************************************************************************************
     * Polymer Helpers
     ******************************************************************************************************************/

    /**
     * This initialize the Polymer Class, and ensure it is only performed once, staticly storing the Polymer object to be
     * served when creating new elements, or support components already on the DOM.
     *
     * @returns {Polymer} The resulting Polymer instance, able to be leveraged once registered.
     */
    polymerClass: function polymerClass() {
      if (!_polymerClass && Polymer) {
        _polymerClass = Polymer.Class(this);
      }

      return _polymerClass;
    },

    /**
     * ### Registering Components
     * #### ```Comp.registerElement()```
     *
     * If you have your component, ```<my-element sample='great'></my-element>``` on the DOM and do not register your component in
     * Polymer, it effectively will do nothing until you do trigger ```registerElement```.
     *
     * To register the element, simply:
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * MyElement.registerElement(); // returns a Polymer object, and ensures to register it as a custom element.
     * ```
     *
     * @returns {Boolean} Whether or not the element is registered.
     */
    registerElement: function registerElement() {
      if (!_polymerRegistered && document && this.polymerClass()) {
        document.registerElement(this.is, this.polymerClass());
        _polymerRegistered = true;
      }

      return _polymerRegistered;
    },

    /**
     * ### Creating Components Dynamically
     * #### ```Comp.appendChild(props)```
     *
     * You can easily create elements to add to the DOM. The ```createElement``` falls back on running the
     * ```registerElement```, to ensure that the component you're trying to create was registered.
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * let el = MyElement.createElement(props); // lets build an element
     *
     * document.body.appendChild(el); // add our el to the end of the body now
     * ```
     *
     * This create a new element, leveraging Polymers constructor method, allowing us to pass in parameters and execute the
     * factoryImpl(...) function, which HenceComp uses to assign matching properties to your new element.
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @returns {Polymer} The resulting created DOM element,
     */
    createElement: function createElement() {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var el = undefined;

      if (this.registerElement()) {
        // ensure that the element is in fact registered
        el = new _polymerClass(opts); // Generates a new polymer component of this type
      }

      return el;
    },

    /**
     * #### Appending Components Easily
     * #### ```Comp.appendElementTo(props, target)```
     * A simple helper function to append elements is ```appendElementTo```. Passing no target defaults to ```document.body```.
     *
     * ```javascript
     * import MyElement from './my-element.js';
     *
     * MyElement.appendElementTo(props, document.querySelector('#myElement')); // lets build an element, and append it to our target
     * ```
     *
     * @param {Object} opts Options for which to configure this new dynamically generated component
     * @param {Object} target The desired DOM element to append the new component too.
     * @returns {Polymer} The resulting created DOM element,
     */
    appendElementTo: function appendElementTo() {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var target = arguments.length <= 1 || arguments[1] === undefined ? document.body : arguments[1];

      var el = this.createElement(opts);

      try {
        //console.log('adding el to', el, target, document, document.body);

        target.appendChild(el);
      } catch (e) {
        _consoler2['default'].warn('HenceComp::appendElementTo - Failure to append element', el, e);
      }

      return el;
    }
  });

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/

  // Ensure to add the default HenceBehaviour to this component. We don't want to be overriding the behaviour list,
  // just adding to it so any additional behaviours are kept.
  comp.behaviors.push(_behaviour.HenceBehaviour);

  /********************************************************************************************************************
   * Debugging
   ********************************************************************************************************************/
  (0, _lodashObjectDefaults2['default'])(comp, {

    /**
     * A simple way to debug the component by pooling it's current property values and displaying them as a JSON
     * stringify'd
     *
     * @param {Boolean} stringify Whether or not to return a string or the object
     * @returns {String|Object} JSON string output of the component
     */
    debugThis: function debugThis() {
      var stringify = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var self = this;
      var data = {};

      _props.forEach(function (propertyName) {
        data[propertyName] = self.get(propertyName);
      });

      return stringify ? JSON.stringify(data) : data;
    }
  });

  /*******************************************************************************************************************
   * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
   ******************************************************************************************************************/
  (0, _polymerIntegrity.polymerIntegrity)(comp);

  return comp;
};

exports.HenceComp = HenceComp;

},{"./behaviour":5,"./polymerIntegrity":9,"consoler":12,"lodash/lang/cloneDeep":75,"lodash/lang/isArray":77,"lodash/object/defaults":86,"lodash/object/extend":88,"lodash/object/has":89,"lodash/object/keys":90}],7:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module hence-ui
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashLangCloneDeep = require('lodash/lang/cloneDeep');

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var _lodashLangIsFunction = require('lodash/lang/isFunction');

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _lodashLangIsEqual = require('lodash/lang/isEqual');

var _lodashLangIsEqual2 = _interopRequireDefault(_lodashLangIsEqual);

var _lodashLangIsObject = require('lodash/lang/isObject');

/**
 * ### Event Hooks
 * #### ```Hence.hook(target, prepareData)```
 *
 * Provides an easy accessible hook function for the component to leverage. With accepting a object parameter which
 * contains an action method, this will provide a bindable event in the component's template, and automatically call
 * that method, passing in the targeted data model from the event.
 *
 * Optionally, before the data is sent along to the original hook, you can process the data with anything related to
 * the current component before it is sent off to be acted upon.
 *
 * Ideal use of these hooks are inside of Ui components, triggering hooks back to Models, so the Ui can handle the
 * event and model digest, and serve the Model exactly the data it needs. Additional parameters returned, the model
 * and originating event are provided should the hook be used between multiple Uis.
 *
 * @param {Object} targetModel The the intended target to hook into
 * @param {Function|Null} prepareData A callback to allow the model data to be formatted before being returned to the callee
 * @returns {Function} The event callback to allow the component to hook into too
 */

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var HenceHook = function HenceHook(targetModel) {
  var prepareData = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return function (e) {
    var model = e.model || {};
    var dataModel = (0, _lodashLangCloneDeep2['default'])(model[targetModel]);

    // If the target was not present, give developers a clear message on their flub to correct it.
    if (!dataModel || !(0, _lodashLangIsObject2['default'])(dataModel)) {
      return _consoler2['default'].error('HenceHook::Configuration - The target model, ' + targetModel + ', is NOT a valid property of the component or repeated object, or it is not an object with a valid action method to hook into.');
    }
    // If there is no action method, clearly something has gone amuck. Notify the developer with all possible
    // objects to help them debug.
    else if (!(0, _lodashLangIsFunction2['default'])(dataModel.action)) {
        return _consoler2['default'].error('HenceHook::Configuration - This hook was not properly configured or implemented. Please ensure the target model, ' + targetModel + ', has a valid action method.', {
          event: e,
          eventModel: model,
          target: targetModel,
          data: dataModel
        });
      }

    // If a preparation callback was provided, run this to sanitize the data before it is passed along.
    if ((0, _lodashLangIsFunction2['default'])(prepareData)) {
      prepareData(dataModel, model, e);
    }

    // Everything was configured and processed, and no errors were flagged, fire off the hook action now with needed
    // data.
    if (dataModel.error !== true) {
      dataModel.action(dataModel, model, e);
    }

    //console.log('HenceHook:event', e, model);
  };
};

exports.HenceHook = HenceHook;

},{"consoler":12,"lodash/lang/cloneDeep":75,"lodash/lang/isEqual":78,"lodash/lang/isFunction":79,"lodash/lang/isObject":81}],8:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

## Component Type Methodology

### Model

Model components are specialized to help bridge the UI & Schema components, taking data from Schemas, translates and
formats the results to support a dedicated UI component, and serves the results once prepared to UI.

*/
/**
 * @module hence-model
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polymerIntegrity = require('./polymerIntegrity');

var _core = require('./core');

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashObjectExtend = require('lodash/object/extend');

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _lodashObjectDefaults = require('lodash/object/defaults');

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _lodashCollectionEach = require('lodash/collection/each');

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashLangCloneDeep = require('lodash/lang/cloneDeep');

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var HenceModel = function HenceModel(original) {
  var comp = (0, _lodashLangCloneDeep2['default'])(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  (0, _lodashObjectExtend2['default'])(comp.properties, {
    query: {
      type: Object,
      value: null
    },
    processedState: {
      type: Object,
      readOnly: true,
      value: null
    },
    state: {
      type: Array,
      value: null
    }
  });

  (0, _lodashObjectExtend2['default'])(comp, {
    renderState: function renderState() {
      return this._processState();
    },

    /**
     * This method does the essential processing of the state pulled in from a given schema component, and processes
     * it via the _transforState function to couple the raw data to a friendly option set for the desired UI component.
     */
    _processState: function _processState() {
      var self = this;
      var results = [];
      var state = this.state;

      (0, _lodashCollectionEach2['default'])(state, function (entry) {
        var transform = self._transformState(entry);

        if (transform) {
          results.push(transform);
        }
      });

      // If there is 1 or none in the array, convert it to an object/undefined instead.
      if (results.length <= 1) {
        results = results[0];
      }

      self._setProcessedState(results); // read only and must be set privately here
      //console.log('processedState',self.processedState);

      return self.processedState;
    }
  });

  (0, _lodashObjectDefaults2['default'])(comp, {
    /**
     * This version is meant to be overridden by the component implementing this behaviour. Serves a console.warn
     * depicting such to notify developers of their misuse.
     *
     * @private
     */
    _transformState: function _transformState(entry) {
      _consoler2['default'].warn('HenceModel::transformEntry - Default method running! It\'s unlikely your data is rendering' + ' correctly, please consider overriding it...');
      return entry;
    }
  });

  return (0, _core.HenceComp)(comp);
};

exports.HenceModel = HenceModel;

},{"./core":6,"./polymerIntegrity":9,"consoler":12,"lodash/collection/each":17,"lodash/lang/cloneDeep":75,"lodash/object/defaults":86,"lodash/object/extend":88}],9:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

*/
/**
 * @module polymer-integrity
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _lodashObjectHas = require('lodash/object/has');

var _lodashObjectHas2 = _interopRequireDefault(_lodashObjectHas);

var _lodashArrayIntersection = require('lodash/array/intersection');

var _lodashArrayIntersection2 = _interopRequireDefault(_lodashArrayIntersection);

var _lodashArrayUnion = require('lodash/array/union');

var _lodashArrayUnion2 = _interopRequireDefault(_lodashArrayUnion);

var _lodashArrayWithout = require('lodash/array/without');

// A list of all polymer method/key names

var _lodashArrayWithout2 = _interopRequireDefault(_lodashArrayWithout);

var PolymerKeys = (0, _lodashObjectKeys2['default'])(Polymer.Base);
// A list excluding those method/key names which are allowed
var PolymerMethods = (0, _lodashArrayWithout2['default'])(PolymerKeys, 'created', 'ready', 'attached', 'detached', 'properties', 'behaviors', 'listeners', 'observers', 'is', 'attributeChanged', 'factoryImpl', 'hostAttributes');

// A list of all reserved polymer properties names; include the method/key names as it will only cause issues if used
var PolymerProperties = (0, _lodashArrayUnion2['default'])(PolymerKeys, ['root', 'isAttached', '_aboveConfig', '_config', 'id', '_nativePrototypes', '_factoryArgs', '_aggregatedAttributes', '_serializing', '_debouncers', '_template', 'dataHost', '_clients', '_clientsReadied', '_readied', '_attachedPending', 'event', 'node', '_classList', 'domApi', '_userContent', 'shadyRoot', 'textContent', '_composedChildren', '_notes', '$', '$$', 'gestures', 'info', '_twiddle', '_callbacks', 'context', 'boundComplete', 'finish', 'callback', '__data__', '_handlers', '_boundPaths', 'ruleTypes', '_encapsulateStyle', '_styles', '_scopeStyle', 'cache', '_properties', '_ownStylePropertyNames', 'customStyle', '_styleProperties', '_ownStyleProperties', '_scopeSelector', '_appliesToDocument', '_templatizerId', 'ctor', '_templatizerStatic', '_parentProps', '_rootDataHost', '_children', 'userArray', 'store', 'omap', 'pmap', '_instances', '_instanceProps', '_sortFn', '_needFullRefresh', '_observePaths', 'collection', '_splices', '_keyToInstIdx', 'selected', 'toggle', '_lastIf', '_instance', '_ready', '_setupConfigure']);

/**
 * Safety Checks - ensure that this polymer object will not be overriding important Polymer methods/properties
 * @param comp The component/behaviour being inspected
 * @param behaviour An optional name for behaviours being inspected
 */
var polymerIntegrity = function polymerIntegrity(comp) {
  var behaviour = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  // Determine any conflicting property names
  var propertyKeys = (0, _lodashObjectKeys2['default'])(comp.properties || {});
  var conflictingProps = (0, _lodashArrayIntersection2['default'])(propertyKeys, PolymerProperties);

  // Determine any conflicting method/key names
  var compKeys = (0, _lodashObjectKeys2['default'])(comp);
  var conflictingMethods = (0, _lodashArrayIntersection2['default'])(compKeys, PolymerMethods);

  if (conflictingProps.length) {
    _consoler2['default'].error('Attempted use of reversed Polymer property names found. Please revise the follow property names in your component to something else.\n      Component in conflict: ' + (comp.is || behaviour) + '\n      Properties in conflict: ' + conflictingProps.join(', '));
  }

  if (conflictingMethods.length) {
    _consoler2['default'].error('Attempted use of reversed Polymer method names found. Please revise the follow method names in your component to something else.\n    Component in conflict: ' + (comp.is || behaviour) + '\n    Methods in Conflict: ' + conflictingMethods.join(', '));
  }
};

exports.polymerIntegrity = polymerIntegrity;

},{"consoler":12,"lodash/array/intersection":13,"lodash/array/union":15,"lodash/array/without":16,"lodash/object/has":89,"lodash/object/keys":90}],10:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

## Component Type Methodology

### Schema

Schema components define and help data adhere to a strict format, field type, and validation methods for data
integrity and transport. All API interaction occurs through these components, and it helps to facilitate serving data
 to the Model components. These components have 0 consideration for UI and are utilized exclusively for their data
 management.

Because of the interoperable nature of these components, they are still able to effectively be leveraged on the
server API side of your project, if Node/iojs based, allowing the data validation methods to support front and
backend, reducing the need for divergent schemas over different parts of the project.

*/
/**
 * @module hence-schema
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polymerIntegrity = require('./polymerIntegrity');

var _core = require('./core');

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashObjectExtend = require('lodash/object/extend');

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _lodashObjectDefaults = require('lodash/object/defaults');

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _lodashCollectionEach = require('lodash/collection/each');

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashLangCloneDeep = require('lodash/lang/cloneDeep');

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var HenceSchema = function HenceSchema(original) {
  var comp = (0, _lodashLangCloneDeep2['default'])(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  (0, _lodashObjectExtend2['default'])(comp.properties, {
    executeOnLoad: {
      type: Boolean,
      value: true
    },
    action: String,
    query: {
      type: Object,
      value: function value() {
        return {};
      }
    },
    results: {
      type: Array,
      readOnly: true,
      notify: true
    }
  });

  /*******************************************************************************************************************
   * Element DOM Hooks
   ******************************************************************************************************************/
  (0, _lodashObjectExtend2['default'])(comp, {
    /**
     * When the component has loaded and is ready, auto trigger the executeQuery method, if desired.
     */
    ready: function ready() {
      var self = this;

      if (self.executeOnLoad) {
        self.executeQuery();
      }
    },

    /**
     * The public facing execute method allowing this function to be triggered manually as needed, or re-triggered at
     * will
     */
    executeQuery: function executeQuery() {
      var self = this;

      self._executeQuery(function (err, results) {
        if (err) {
          return _consoler2['default'].error('HenceSchema::_executeQuery', err);
        }

        self._setResults(results);
      });
    }
  });

  /*******************************************************************************************************************
   * Element Behaviour
   ******************************************************************************************************************/
  (0, _lodashObjectDefaults2['default'])(comp, {
    _executeQuery: function _executeQuery(done) {
      done('Default method running! Please override it.'); // return an error, since this should of been overridden
    }
  });

  return (0, _core.HenceComp)(comp);
};

exports.HenceSchema = HenceSchema;

},{"./core":6,"./polymerIntegrity":9,"consoler":12,"lodash/collection/each":17,"lodash/lang/cloneDeep":75,"lodash/object/defaults":86,"lodash/object/extend":88}],11:[function(require,module,exports){
/*
  _   _ _____ _   _  ____ _____   _
 | | | | ____| \ | |/ ___| ____| (_) ___
 | |_| |  _| |  \| | |   |  _|   | |/ _ \
 |  _  | |___| |\  | |___| |___ _| | (_) |
 |_| |_|_____|_| \_|\____|_____(_)_|\___/

## Component Type Methodology

### UI

UI components are the most diverse Hence Component type, and are derived from the base HenceComp object.

Polymers native functionally beyond this largely provides everything we need to make powerful and effective UI
components.

These components are designed to be data agnostic. Every possible piece of text, image, icons, links or more complex
elements are configurable and can be rendered by other components. Events dealing with data are hooks fired when
triggered back to the component which implemented it, while some internal events may exist in isolation to support
interaction or non-data based behaviour.

*/
/**
 * @module hence-ui
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _polymerIntegrity = require('./polymerIntegrity');

var _core = require('./core');

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _lodashObjectExtend = require('lodash/object/extend');

var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);

var _lodashObjectDefaults = require('lodash/object/defaults');

var _lodashObjectDefaults2 = _interopRequireDefault(_lodashObjectDefaults);

var _lodashCollectionEach = require('lodash/collection/each');

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _lodashLangCloneDeep = require('lodash/lang/cloneDeep');

/**
 * @constructor
 * @param {Object} original The component being defined
 * @returns {Object} The resulting component, based on HenceComp, with some added Model specific functionality.
 */

var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

var HenceUi = function HenceUi(original) {
  var comp = (0, _lodashLangCloneDeep2['default'])(original);

  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  (0, _lodashObjectExtend2['default'])(comp.properties, {});

  (0, _lodashObjectExtend2['default'])(comp, {});

  (0, _lodashObjectDefaults2['default'])(comp, {});

  return (0, _core.HenceComp)(comp);
};

exports.HenceUi = HenceUi;

},{"./core":6,"./polymerIntegrity":9,"consoler":12,"lodash/collection/each":17,"lodash/lang/cloneDeep":75,"lodash/object/defaults":86,"lodash/object/extend":88}],12:[function(require,module,exports){
'use strict';
/**
 * @module consoler
 */

/**
 * A basic ES6 console fail safe wrapper
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
var consoler = {
  /*************
   * Params
   ************/
  enabled: !!window.console,
  /*************
   * Private
   ************/
  _msg: function _msg(type, args) {
    // If console isn't available, or no args were sent, or call type is missing, bypass
    if (!this.enabled || !args.length || typeof window.console[type] !== 'function') {
      return;
    }

    window.console[type].apply(window.console, args);
  },
  /*************
   * Public
   ************/
  log: function log() {
    this._msg('log', arguments);
  },
  warn: function warn() {
    this._msg('warn', arguments);
  },
  error: function error() {
    this._msg('error', arguments);
  },
  trace: function trace() {
    this._msg('trace', arguments);
  },
  group: function group(label) {
    if (this.enabled && typeof window.console.groupEnd == 'function') {
      window.console.groupCollapsed(label);
    }
  },
  groupEnd: function groupEnd() {
    if (this.enabled && typeof console.groupEnd == 'function') {
      window.console.groupEnd();
    }
  }
};

exports['default'] = consoler;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    cacheIndexOf = require('../internal/cacheIndexOf'),
    createCache = require('../internal/createCache'),
    isArrayLike = require('../internal/isArrayLike'),
    restParam = require('../function/restParam');

/**
 * Creates an array of unique values that are included in all of the provided
 * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of shared values.
 * @example
 * _.intersection([1, 2], [4, 2], [2, 1]);
 * // => [2]
 */
var intersection = restParam(function(arrays) {
  var othLength = arrays.length,
      othIndex = othLength,
      caches = Array(length),
      indexOf = baseIndexOf,
      isCommon = true,
      result = [];

  while (othIndex--) {
    var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
    caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
  }
  var array = arrays[0],
      index = -1,
      length = array ? array.length : 0,
      seen = caches[0];

  outer:
  while (++index < length) {
    value = array[index];
    if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
      var othIndex = othLength;
      while (--othIndex) {
        var cache = caches[othIndex];
        if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(value);
      }
      result.push(value);
    }
  }
  return result;
});

module.exports = intersection;

},{"../function/restParam":19,"../internal/baseIndexOf":37,"../internal/cacheIndexOf":48,"../internal/createCache":53,"../internal/isArrayLike":65}],14:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],15:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    baseUniq = require('../internal/baseUniq'),
    restParam = require('../function/restParam');

/**
 * Creates an array of unique values, in order, from all of the provided arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([1, 2], [4, 2], [2, 1]);
 * // => [1, 2, 4]
 */
var union = restParam(function(arrays) {
  return baseUniq(baseFlatten(arrays, false, true));
});

module.exports = union;

},{"../function/restParam":19,"../internal/baseFlatten":32,"../internal/baseUniq":45}],16:[function(require,module,exports){
var baseDifference = require('../internal/baseDifference'),
    isArrayLike = require('../internal/isArrayLike'),
    restParam = require('../function/restParam');

/**
 * Creates an array excluding all provided values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to filter.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.without([1, 2, 1, 3], 1, 2);
 * // => [3]
 */
var without = restParam(function(array, values) {
  return isArrayLike(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;

},{"../function/restParam":19,"../internal/baseDifference":30,"../internal/isArrayLike":65}],17:[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":18}],18:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    createForEach = require('../internal/createForEach');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
 * (value, index|key, collection). Iteratee functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
var forEach = createForEach(arrayEach, baseEach);

module.exports = forEach;

},{"../internal/arrayEach":22,"../internal/baseEach":31,"../internal/createForEach":55}],19:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],20:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./cachePush":49,"./getNative":60}],21:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],22:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],23:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],24:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],25:[function(require,module,exports){
/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return objectValue === undefined ? sourceValue : objectValue;
}

module.exports = assignDefaults;

},{}],26:[function(require,module,exports){
var keys = require('../object/keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = assignWith;

},{"../object/keys":90}],27:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":90,"./baseCopy":29}],28:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseAssign = require('./baseAssign'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseAssign(result, value);
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return its corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":77,"../lang/isObject":81,"./arrayCopy":21,"./arrayEach":22,"./baseAssign":27,"./baseForOwn":35,"./initCloneArray":62,"./initCloneByTag":63,"./initCloneObject":64}],29:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],30:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":37,"./cacheIndexOf":48,"./createCache":53}],31:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":35,"./createBaseEach":51}],32:[function(require,module,exports){
var arrayPush = require('./arrayPush'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":76,"../lang/isArray":77,"./arrayPush":23,"./isArrayLike":65,"./isObjectLike":70}],33:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":52}],34:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":91,"./baseFor":33}],35:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":90,"./baseFor":33}],36:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":73}],37:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":61}],38:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":81,"./baseIsEqualDeep":39,"./isObjectLike":70}],39:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":77,"../lang/isTypedArray":83,"./equalArrays":56,"./equalByTag":57,"./equalObjects":58}],40:[function(require,module,exports){
var arrayEach = require('./arrayEach'),
    baseMergeDeep = require('./baseMergeDeep'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike'),
    isTypedArray = require('../lang/isTypedArray'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":77,"../lang/isObject":81,"../lang/isTypedArray":83,"../object/keys":90,"./arrayEach":22,"./baseMergeDeep":41,"./isArrayLike":65,"./isObjectLike":70}],41:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isPlainObject = require('../lang/isPlainObject'),
    isTypedArray = require('../lang/isTypedArray'),
    toPlainObject = require('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":76,"../lang/isArray":77,"../lang/isPlainObject":82,"../lang/isTypedArray":83,"../lang/toPlainObject":84,"./arrayCopy":21,"./isArrayLike":65}],42:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],43:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],44:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],45:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniq` without support for callback shorthands
 * and `this` binding.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The function invoked per iteration.
 * @returns {Array} Returns the new duplicate-value-free array.
 */
function baseUniq(array, iteratee) {
  var index = -1,
      indexOf = baseIndexOf,
      length = array.length,
      isCommon = true,
      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
      seen = isLarge ? createCache() : null,
      result = [];

  if (seen) {
    indexOf = cacheIndexOf;
    isCommon = false;
  } else {
    isLarge = false;
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value, index, array) : value;

    if (isCommon && value === value) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (indexOf(seen, computed, 0) < 0) {
      if (iteratee || isLarge) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./baseIndexOf":37,"./cacheIndexOf":48,"./createCache":53}],46:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":93}],47:[function(require,module,exports){
(function (global){
/** Native method references. */
var ArrayBuffer = global.ArrayBuffer,
    Uint8Array = global.Uint8Array;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  var result = new ArrayBuffer(buffer.byteLength),
      view = new Uint8Array(result);

  view.set(new Uint8Array(buffer));
  return result;
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],48:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":81}],49:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":81}],50:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":19,"./bindCallback":46,"./isIterateeCall":67}],51:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":59,"./isLength":69,"./toObject":73}],52:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":73}],53:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
function createCache(values) {
  return (nativeCreate && Set) ? new SetCache(values) : null;
}

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./SetCache":20,"./getNative":60}],54:[function(require,module,exports){
var restParam = require('../function/restParam');

/**
 * Creates a `_.defaults` or `_.defaultsDeep` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Function} Returns the new defaults function.
 */
function createDefaults(assigner, customizer) {
  return restParam(function(args) {
    var object = args[0];
    if (object == null) {
      return object;
    }
    args.push(customizer);
    return assigner.apply(undefined, args);
  });
}

module.exports = createDefaults;

},{"../function/restParam":19}],55:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Creates a function for `_.forEach` or `_.forEachRight`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over an array.
 * @param {Function} eachFunc The function to iterate over a collection.
 * @returns {Function} Returns the new each function.
 */
function createForEach(arrayFunc, eachFunc) {
  return function(collection, iteratee, thisArg) {
    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
      ? arrayFunc(collection, iteratee)
      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
  };
}

module.exports = createForEach;

},{"../lang/isArray":77,"./bindCallback":46}],56:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":24}],57:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],58:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":90}],59:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":42}],60:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":80}],61:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],62:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],63:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":47}],64:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],65:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":59,"./isLength":69}],66:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],67:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":81,"./isArrayLike":65,"./isIndex":66}],68:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":77,"./toObject":73}],69:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],70:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],71:[function(require,module,exports){
var merge = require('../object/merge');

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function mergeDefaults(objectValue, sourceValue) {
  return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
}

module.exports = mergeDefaults;

},{"../object/merge":92}],72:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":76,"../lang/isArray":77,"../object/keysIn":91,"./isIndex":66,"./isLength":69}],73:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":81}],74:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":77,"./baseToString":44}],75:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback');

/**
 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
 * to produce the cloned values. If `customizer` returns `undefined` cloning
 * is handled by the method instead. The `customizer` is bound to `thisArg`
 * and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the deep cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var deep = _.cloneDeep(users);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.cloneDeep(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(true);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 20
 */
function cloneDeep(value, customizer, thisArg) {
  return typeof customizer == 'function'
    ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
    : baseClone(value, true);
}

module.exports = cloneDeep;

},{"../internal/baseClone":28,"../internal/bindCallback":46}],76:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":65,"../internal/isObjectLike":70}],77:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":60,"../internal/isLength":69,"../internal/isObjectLike":70}],78:[function(require,module,exports){
var baseIsEqual = require('../internal/baseIsEqual'),
    bindCallback = require('../internal/bindCallback');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments: (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @alias eq
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize value comparisons.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"../internal/baseIsEqual":38,"../internal/bindCallback":46}],79:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":81}],80:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":70,"./isFunction":79}],81:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],82:[function(require,module,exports){
var baseForIn = require('../internal/baseForIn'),
    isArguments = require('./isArguments'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"../internal/baseForIn":34,"../internal/isObjectLike":70,"./isArguments":76}],83:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":69,"../internal/isObjectLike":70}],84:[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":29,"../object/keysIn":91}],85:[function(require,module,exports){
var assignWith = require('../internal/assignWith'),
    baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"../internal/assignWith":26,"../internal/baseAssign":27,"../internal/createAssigner":50}],86:[function(require,module,exports){
var assign = require('./assign'),
    assignDefaults = require('../internal/assignDefaults'),
    createDefaults = require('../internal/createDefaults');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var defaults = createDefaults(assign, assignDefaults);

module.exports = defaults;

},{"../internal/assignDefaults":25,"../internal/createDefaults":54,"./assign":85}],87:[function(require,module,exports){
var createDefaults = require('../internal/createDefaults'),
    merge = require('./merge'),
    mergeDefaults = require('../internal/mergeDefaults');

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
 * // => { 'user': { 'name': 'barney', 'age': 36 } }
 *
 */
var defaultsDeep = createDefaults(merge, mergeDefaults);

module.exports = defaultsDeep;

},{"../internal/createDefaults":54,"../internal/mergeDefaults":71,"./merge":92}],88:[function(require,module,exports){
module.exports = require('./assign');

},{"./assign":85}],89:[function(require,module,exports){
var baseGet = require('../internal/baseGet'),
    baseSlice = require('../internal/baseSlice'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isKey = require('../internal/isKey'),
    isLength = require('../internal/isLength'),
    last = require('../array/last'),
    toPath = require('../internal/toPath');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `path` is a direct property.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': { 'c': 3 } } };
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b.c');
 * // => true
 *
 * _.has(object, ['a', 'b', 'c']);
 * // => true
 */
function has(object, path) {
  if (object == null) {
    return false;
  }
  var result = hasOwnProperty.call(object, path);
  if (!result && !isKey(path)) {
    path = toPath(path);
    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
    if (object == null) {
      return false;
    }
    path = last(path);
    result = hasOwnProperty.call(object, path);
  }
  return result || (isLength(object.length) && isIndex(path, object.length) &&
    (isArray(object) || isArguments(object)));
}

module.exports = has;

},{"../array/last":14,"../internal/baseGet":36,"../internal/baseSlice":43,"../internal/isIndex":66,"../internal/isKey":68,"../internal/isLength":69,"../internal/toPath":74,"../lang/isArguments":76,"../lang/isArray":77}],90:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":60,"../internal/isArrayLike":65,"../internal/shimKeys":72,"../lang/isObject":81}],91:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":66,"../internal/isLength":69,"../lang/isArguments":76,"../lang/isArray":77,"../lang/isObject":81}],92:[function(require,module,exports){
var baseMerge = require('../internal/baseMerge'),
    createAssigner = require('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":40,"../internal/createAssigner":50}],93:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],94:[function(require,module,exports){
'use strict';
/**
 * @module hence-card
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _consoler = require('consoler');

var _consoler2 = _interopRequireDefault(_consoler);

var _henceComponentFramework = require('hence-component-framework');

var _henceComponentFramework2 = _interopRequireDefault(_henceComponentFramework);

var _lodashObjectDefaultsDeepJs = require('lodash/object/defaultsDeep.js');

/**
 * HenceCard Component
 * @constructor
 */

var _lodashObjectDefaultsDeepJs2 = _interopRequireDefault(_lodashObjectDefaultsDeepJs);

var HenceCard = _henceComponentFramework2['default'].Ui({
  is: 'hence-card',
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
    padded: {
      type: Boolean,
      value: false
    },
    image: {
      type: String,
      value: 'http://placehold.it/450x50'
    },
    title: {
      type: String,
      value: 'Lorem ipsum dolor sit amet'
    },
    description: {
      type: String,
      value: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam consequatur ex id iste modi natus ' + 'nostrum numquam odio porro praesentium quisquam quos, rem reprehenderit sequi unde vero vitae voluptatem?'
    },
    options: {
      type: Array,
      notify: true,
      value: null
    },
    displayOptions: {
      type: Boolean,
      value: false
    },
    callToAction: {
      type: Object,
      notify: true,
      value: null
    }
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/

  /**
   * When working with listeners, if their target element doesn’t exist on the DOM you get a very basic nonspecific
   * error 'Uncaught TypeError: Invalid value used as weak map key’!  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */

  /**
   * @param {Event} e The event executing this function
   */
  eventToggleOptions: function eventToggleOptions(e) {
    var self = this;
    // Update the property, using this.set to fire any expecting listeners
    self.set('displayOptions', !self.displayOptions);
    self.updateDisplayOptions();
  },

  /**
   * @param {Event} e The event executing this function
   */
  eventCallToAction: _henceComponentFramework2['default'].hook('callToAction123', function (data, model, e) {
    // update the data before it gets sent back through the hook
    data.input.value += ' has been processed!';
  }),

  eventOptionAction: _henceComponentFramework2['default'].hook('opt'),

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /**
   * This is called after all elements have been configured, but propagates bottom-up. This element's children are
   * ready, but parents are not. This is the point where you should make modifications to the DOM (when  necessary),
   * or kick off any processes the element wants to perform.
   */
  ready: function ready() {
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

  },

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached: function attached() {
    this._prepareData();

    this.async(function () {
      // access sibling or parent elements here
    });
  },

  _prepareData: function _prepareData() {
    var self = this;
    var $ = self.$;
    var options = self.options;
    var callToAction = self.callToAction;

    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.

    // If flagged as padded, as the style class for it
    if (self.padded) {
      $.wrapper.classList.add('padded');
    }

    // If options were added, fill in their event bindings
    if (options && options.length) {
      options.forEach(function (opt) {
        self.set('event_' + opt.action.name, opt.action);
      });
    }

    // If call to action was provided, sanitize it's input if also provided
    if (callToAction) {
      if (callToAction.align) {
        $.callToAction.classList.add(callToAction.align);
      }

      if (callToAction.input) {
        (0, _lodashObjectDefaultsDeepJs2['default'])(callToAction.input, {
          type: 'text',
          placeholder: '',
          label: ''
        });
      }

      self.set('callToAction', callToAction); // make sure to fire any watchers
    }

    self.updateDisplayOptions();

    //console.log('comp is ', self.properties);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  behaviors: [],

  updateDisplayOptions: function updateDisplayOptions() {
    var self = this;
    self.toggleClass('open', self.displayOptions, self.$$('#options'));
  }
});

exports['default'] = HenceCard;
module.exports = exports['default'];

},{"consoler":1,"hence-component-framework":4,"lodash/object/defaultsDeep.js":87}],95:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _henceCard = require('./hence-card');

var _henceCard2 = _interopRequireDefault(_henceCard);

var _docReady = require('doc-ready');

// Some common defaults

var _docReady2 = _interopRequireDefault(_docReady);

var options = [{
  label: 'Test',
  action: function action(data, model, e) {
    alert('this is my option!');
  }
}];

var callToAction = {
  label: 'Sign Up Now!',
  align: 'right', // left/center/right
  action: function action(data, model, e) {
    alert('Successful submission with: ' + data.input.value);
  },
  input: {
    label: 'Enter your email here:',
    type: 'text',
    placeholder: 'Email'
  }
};

// Ensure we're waiting for the document to actually be loaded before interacting with it.
(0, _docReady2['default'])(function () {
  // Location to bind preview components too. Use this to ensure the style guide will display these too.
  var componentPreviewBox = document.getElementById('component-previews');

  // Spawn various states of the component to preview them side by side
  _henceCard2['default'].appendElementTo({
    title: 'Padded example w/ options',
    padded: true,
    options: options,
    image: 'http://placehold.it/350x50'
  }, componentPreviewBox);
  _henceCard2['default'].appendElementTo({
    title: 'Example w/ options pre-opened',
    displayOptions: true,
    options: options
  }, componentPreviewBox);
  _henceCard2['default'].appendElementTo({
    title: 'Example w/ call to action',
    callToAction: callToAction
  }, componentPreviewBox);
  _henceCard2['default'].appendElementTo({
    title: 'Kitchen Sink',
    displayOptions: true,
    options: options,
    callToAction: callToAction
  }, componentPreviewBox);
});

},{"./hence-card":94,"doc-ready":2}]},{},[95])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvU2Vhbi9zaXRlcy9oZW5jZS9oZW5jZS1jYXJkL25vZGVfbW9kdWxlcy9jb25zb2xlci9jb25zb2xlci5qcyIsIm5vZGVfbW9kdWxlcy9kb2MtcmVhZHkvZG9jLXJlYWR5LmpzIiwibm9kZV9tb2R1bGVzL2RvYy1yZWFkeS9ub2RlX21vZHVsZXMvZXZlbnRpZS9ldmVudGllLmpzIiwiL1VzZXJzL1NlYW4vc2l0ZXMvaGVuY2UvaGVuY2UtY2FyZC9ub2RlX21vZHVsZXMvaGVuY2UtY29tcG9uZW50LWZyYW1ld29yay9pbmRleC5qcyIsIi9Vc2Vycy9TZWFuL3NpdGVzL2hlbmNlL2hlbmNlLWNhcmQvbm9kZV9tb2R1bGVzL2hlbmNlLWNvbXBvbmVudC1mcmFtZXdvcmsvbGliL2JlaGF2aW91ci5qcyIsIi9Vc2Vycy9TZWFuL3NpdGVzL2hlbmNlL2hlbmNlLWNhcmQvbm9kZV9tb2R1bGVzL2hlbmNlLWNvbXBvbmVudC1mcmFtZXdvcmsvbGliL2NvcmUuanMiLCIvVXNlcnMvU2Vhbi9zaXRlcy9oZW5jZS9oZW5jZS1jYXJkL25vZGVfbW9kdWxlcy9oZW5jZS1jb21wb25lbnQtZnJhbWV3b3JrL2xpYi9ob29rLmpzIiwiL1VzZXJzL1NlYW4vc2l0ZXMvaGVuY2UvaGVuY2UtY2FyZC9ub2RlX21vZHVsZXMvaGVuY2UtY29tcG9uZW50LWZyYW1ld29yay9saWIvbW9kZWwuanMiLCIvVXNlcnMvU2Vhbi9zaXRlcy9oZW5jZS9oZW5jZS1jYXJkL25vZGVfbW9kdWxlcy9oZW5jZS1jb21wb25lbnQtZnJhbWV3b3JrL2xpYi9wb2x5bWVySW50ZWdyaXR5LmpzIiwiL1VzZXJzL1NlYW4vc2l0ZXMvaGVuY2UvaGVuY2UtY2FyZC9ub2RlX21vZHVsZXMvaGVuY2UtY29tcG9uZW50LWZyYW1ld29yay9saWIvc2NoZW1hLmpzIiwiL1VzZXJzL1NlYW4vc2l0ZXMvaGVuY2UvaGVuY2UtY2FyZC9ub2RlX21vZHVsZXMvaGVuY2UtY29tcG9uZW50LWZyYW1ld29yay9saWIvdWkuanMiLCIvVXNlcnMvU2Vhbi9zaXRlcy9oZW5jZS9oZW5jZS1jYXJkL25vZGVfbW9kdWxlcy9oZW5jZS1jb21wb25lbnQtZnJhbWV3b3JrL25vZGVfbW9kdWxlcy9jb25zb2xlci9jb25zb2xlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvYXJyYXkvaW50ZXJzZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9hcnJheS9sYXN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9hcnJheS91bmlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvYXJyYXkvd2l0aG91dC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29sbGVjdGlvbi9lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9jb2xsZWN0aW9uL2ZvckVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2Z1bmN0aW9uL3Jlc3RQYXJhbS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvU2V0Q2FjaGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hcnJheVB1c2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2FycmF5U29tZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXNzaWduRGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Fzc2lnbldpdGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VBc3NpZ24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VDbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VEaWZmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUluZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VJc0VxdWFsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlSXNFcXVhbERlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlU2xpY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVVuaXEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2JpbmRDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYnVmZmVyQ2xvbmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NhY2hlSW5kZXhPZi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvY2FjaGVQdXNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQmFzZUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NyZWF0ZUJhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NyZWF0ZUNhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVEZWZhdWx0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlRm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvZXF1YWxBcnJheXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsQnlUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvZ2V0TGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2luZGV4T2ZOYU4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2luaXRDbG9uZUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pbml0Q2xvbmVCeVRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaW5pdENsb25lT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0FycmF5TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzS2V5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9tZXJnZURlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltS2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvdG9PYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvUGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9jbG9uZURlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc0VxdWFsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZGVmYXVsdHNEZWVwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZXh0ZW5kLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvaGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwiL1VzZXJzL1NlYW4vc2l0ZXMvaGVuY2UvaGVuY2UtY2FyZC9zcmMvaGVuY2UtY2FyZC5qcyIsIi9Vc2Vycy9TZWFuL3NpdGVzL2hlbmNlL2hlbmNlLWNhcmQvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7OztBQVFiLElBQUksUUFBUSxHQUFHOzs7O0FBSWIsU0FBTyxFQUFFLENBQUMsQ0FBRSxNQUFNLENBQUMsT0FBTyxBQUFDOzs7O0FBSXpCLE1BQUksRUFBQSxjQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7O0FBRWpCLFFBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQy9FLGFBQU87S0FDUjs7QUFFRCxVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ2xEOzs7O0FBSUMsS0FBRyxFQUFBLGVBQUc7QUFDTixRQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztHQUM3QjtBQUNELE1BQUksRUFBQSxnQkFBRztBQUNMLFFBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0dBQzlCO0FBQ0QsT0FBSyxFQUFBLGlCQUFHO0FBQ04sUUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDL0I7QUFDRCxPQUFLLEVBQUEsaUJBQUc7QUFDTixRQUFJLENBQUMsSUFB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QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUUsMkJBQTJCO0FBQ2xDLGdCQUFZLEVBQUUsWUFBWTtHQUMzQixFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDeEIsYUFBQSxDQUFBLFNBQUEsQ0FBQSxDQUFVLGVBQWUsQ0FBQztBQUN4QixTQUFLLEVBQUUsY0FBYztBQUNyQixrQkFBYyxFQUFFLElBQUk7QUFDcEIsV0FBTyxFQUFFLE9BQU87QUFDaEIsZ0JBQVksRUFBRSxZQUFZO0dBQzNCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztDQUN6QixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBAbW9kdWxlIGNvbnNvbGVyXG4gKi9cblxuLyoqXG4gKiBBIGJhc2ljIEVTNiBjb25zb2xlIGZhaWwgc2FmZSB3cmFwcGVyXG4gKi9cbmxldCBjb25zb2xlciA9IHtcbiAgLyoqKioqKioqKioqKipcbiAgICogUGFyYW1zXG4gICAqKioqKioqKioqKiovXG4gIGVuYWJsZWQ6ICEhKHdpbmRvdy5jb25zb2xlKSxcbiAgLyoqKioqKioqKioqKipcbiAgICogUHJpdmF0ZVxuICAgKioqKioqKioqKioqL1xuICAgIF9tc2codHlwZSwgYXJncykge1xuICAgIC8vIElmIGNvbnNvbGUgaXNuJ3QgYXZhaWxhYmxlLCBvciBubyBhcmdzIHdlcmUgc2VudCwgb3IgY2FsbCB0eXBlIGlzIG1pc3NpbmcsIGJ5cGFzc1xuICAgIGlmICghdGhpcy5lbmFibGVkIHx8ICFhcmdzLmxlbmd0aCB8fCB0eXBlb2Ygd2luZG93LmNvbnNvbGVbdHlwZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cuY29uc29sZVt0eXBlXS5hcHBseSh3aW5kb3cuY29uc29sZSwgYXJncyk7XG4gIH0sXG4gIC8qKioqKioqKioqKioqXG4gICAqIFB1YmxpY1xuICAgKioqKioqKioqKioqL1xuICAgIGxvZygpIHtcbiAgICB0aGlzLl9tc2coJ2xvZycsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHdhcm4oKSB7XG4gICAgdGhpcy5fbXNnKCd3YXJuJywgYXJndW1lbnRzKTtcbiAgfSxcbiAgZXJyb3IoKSB7XG4gICAgdGhpcy5fbXNnKCdlcnJvcicsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHRyYWNlKCkge1xuICAgIHRoaXMuX21zZygndHJhY2UnLCBhcmd1bWVudHMpO1xuICB9LFxuICBncm91cChsYWJlbCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQgJiYgdHlwZW9mIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwQ29sbGFwc2VkKGxhYmVsKTtcbiAgICB9XG4gIH0sXG4gIGdyb3VwRW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCAmJiB0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uc29sZXI7XG4iLCIvKiFcbiAqIGRvY1JlYWR5IHYxLjAuM1xuICogQ3Jvc3MgYnJvd3NlciBET01Db250ZW50TG9hZGVkIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIHJlcXVpcmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4vLyBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0byBiZSB0cmlnZ2VyZWQgb24gcmVhZHlcbnZhciBxdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiBkb2NSZWFkeSggZm4gKSB7XG4gIC8vIHRocm93IG91dCBub24tZnVuY3Rpb25zXG4gIGlmICggdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSApIHtcbiAgICAvLyByZWFkeSBub3csIGhpdCBpdFxuICAgIGZuKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcXVldWUgZnVuY3Rpb24gd2hlbiByZWFkeVxuICAgIHF1ZXVlLnB1c2goIGZuICk7XG4gIH1cbn1cblxuZG9jUmVhZHkuaXNSZWFkeSA9IGZhbHNlO1xuXG4vLyB0cmlnZ2VyZWQgb24gdmFyaW91cyBkb2MgcmVhZHkgZXZlbnRzXG5mdW5jdGlvbiBpbml0KCBldmVudCApIHtcbiAgLy8gYmFpbCBpZiBJRTggZG9jdW1lbnQgaXMgbm90IHJlYWR5IGp1c3QgeWV0XG4gIHZhciBpc0lFOE5vdFJlYWR5ID0gZXZlbnQudHlwZSA9PT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZSc7XG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSB8fCBpc0lFOE5vdFJlYWR5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICBkb2NSZWFkeS5pc1JlYWR5ID0gdHJ1ZTtcblxuICAvLyBwcm9jZXNzIHF1ZXVlXG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHF1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2ldO1xuICAgIGZuKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lRG9jUmVhZHkoIGV2ZW50aWUgKSB7XG4gIGV2ZW50aWUuYmluZCggZG9jdW1lbnQsICdET01Db250ZW50TG9hZGVkJywgaW5pdCApO1xuICBldmVudGllLmJpbmQoIGRvY3VtZW50LCAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQgKTtcbiAgZXZlbnRpZS5iaW5kKCB3aW5kb3csICdsb2FkJywgaW5pdCApO1xuXG4gIHJldHVybiBkb2NSZWFkeTtcbn1cblxuLy8gdHJhbnNwb3J0XG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIC8vIGlmIFJlcXVpcmVKUywgdGhlbiBkb2MgaXMgYWxyZWFkeSByZWFkeVxuICBkb2NSZWFkeS5pc1JlYWR5ID0gdHlwZW9mIHJlcXVpcmVqcyA9PT0gJ2Z1bmN0aW9uJztcbiAgZGVmaW5lKCBbICdldmVudGllL2V2ZW50aWUnIF0sIGRlZmluZURvY1JlYWR5ICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGVmaW5lRG9jUmVhZHkoIHJlcXVpcmUoJ2V2ZW50aWUnKSApO1xufSBlbHNlIHtcbiAgLy8gYnJvd3NlciBnbG9iYWxcbiAgd2luZG93LmRvY1JlYWR5ID0gZGVmaW5lRG9jUmVhZHkoIHdpbmRvdy5ldmVudGllICk7XG59XG5cbn0pKCB3aW5kb3cgKTtcbiIsIi8qIVxuICogZXZlbnRpZSB2MS4wLjZcbiAqIGV2ZW50IGJpbmRpbmcgaGVscGVyXG4gKiAgIGV2ZW50aWUuYmluZCggZWxlbSwgJ2NsaWNrJywgbXlGbiApXG4gKiAgIGV2ZW50aWUudW5iaW5kKCBlbGVtLCAnY2xpY2snLCBteUZuIClcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbnZhciBiaW5kID0gZnVuY3Rpb24oKSB7fTtcblxuZnVuY3Rpb24gZ2V0SUVFdmVudCggb2JqICkge1xuICB2YXIgZXZlbnQgPSB3aW5kb3cuZXZlbnQ7XG4gIC8vIGFkZCBldmVudC50YXJnZXRcbiAgZXZlbnQudGFyZ2V0ID0gZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQgfHwgb2JqO1xuICByZXR1cm4gZXZlbnQ7XG59XG5cbmlmICggZG9jRWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuICBiaW5kID0gZnVuY3Rpb24oIG9iaiwgdHlwZSwgZm4gKSB7XG4gICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGZuLCBmYWxzZSApO1xuICB9O1xufSBlbHNlIGlmICggZG9jRWxlbS5hdHRhY2hFdmVudCApIHtcbiAgYmluZCA9IGZ1bmN0aW9uKCBvYmosIHR5cGUsIGZuICkge1xuICAgIG9ialsgdHlwZSArIGZuIF0gPSBmbi5oYW5kbGVFdmVudCA/XG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZ2V0SUVFdmVudCggb2JqICk7XG4gICAgICAgIGZuLmhhbmRsZUV2ZW50LmNhbGwoIGZuLCBldmVudCApO1xuICAgICAgfSA6XG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZ2V0SUVFdmVudCggb2JqICk7XG4gICAgICAgIGZuLmNhbGwoIG9iaiwgZXZlbnQgKTtcbiAgICAgIH07XG4gICAgb2JqLmF0dGFjaEV2ZW50KCBcIm9uXCIgKyB0eXBlLCBvYmpbIHR5cGUgKyBmbiBdICk7XG4gIH07XG59XG5cbnZhciB1bmJpbmQgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAoIGRvY0VsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcbiAgdW5iaW5kID0gZnVuY3Rpb24oIG9iaiwgdHlwZSwgZm4gKSB7XG4gICAgb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGZuLCBmYWxzZSApO1xuICB9O1xufSBlbHNlIGlmICggZG9jRWxlbS5kZXRhY2hFdmVudCApIHtcbiAgdW5iaW5kID0gZnVuY3Rpb24oIG9iaiwgdHlwZSwgZm4gKSB7XG4gICAgb2JqLmRldGFjaEV2ZW50KCBcIm9uXCIgKyB0eXBlLCBvYmpbIHR5cGUgKyBmbiBdICk7XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSBvYmpbIHR5cGUgKyBmbiBdO1xuICAgIH0gY2F0Y2ggKCBlcnIgKSB7XG4gICAgICAvLyBjYW4ndCBkZWxldGUgd2luZG93IG9iamVjdCBwcm9wZXJ0aWVzXG4gICAgICBvYmpbIHR5cGUgKyBmbiBdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIGV2ZW50aWUgPSB7XG4gIGJpbmQ6IGJpbmQsXG4gIHVuYmluZDogdW5iaW5kXG59O1xuXG4vLyAtLS0tLSBtb2R1bGUgZGVmaW5pdGlvbiAtLS0tLSAvL1xuXG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIGRlZmluZSggZXZlbnRpZSApO1xufSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuICAvLyBDb21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGV2ZW50aWU7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuZXZlbnRpZSA9IGV2ZW50aWU7XG59XG5cbn0pKCB3aW5kb3cgKTtcbiIsIi8qXG4gIF8gICBfIF9fX19fIF8gICBfICBfX19fIF9fX19fICAgX1xuIHwgfCB8IHwgX19fX3wgXFwgfCB8LyBfX198IF9fX198IChfKSBfX19cbiB8IHxffCB8ICBffCB8ICBcXHwgfCB8ICAgfCAgX3wgICB8IHwvIF8gXFxcbiB8ICBfICB8IHxfX198IHxcXCAgfCB8X19ffCB8X19fIF98IHwgKF8pIHxcbiB8X3wgfF98X19fX198X3wgXFxffFxcX19fX3xfX19fXyhfKV98XFxfX18vXG5cbiMgSGVuY2UgQ29tcG9uZW50IEZyYW1ld29ya1xuXG4+XG5cbiMjIEFib3V0XG5cbkhlbmNlIENvbXBvbmVudCBGcmFtZXdvcmsgaXMgYnVpbHQgb24gdG9wIG9mIFBvbHltZXIsIGRlc2lnbmVkIHRvIHByb3ZpZGUgc29tZSBlc3NlbnRpYWwgc3RhbmRhcmRzIHRvXG50aGUgdHlwZXMgb2YgY29tcG9uZW50cyB0byBiZSBiYXNlZCBvZmYgb2YsIGFuZCBvdGhlciBlc3NlbnRpYWwgaGVscGVycyBhbmQgdG9vbHMgdG8gYnVpbGQgYmV0dGVyIGNvbXBvbmVudHMuXG5cblRoZSBDb21wb25lbnQgRnJhbWV3b3JrIGlzIGJ1aWx0IGluIEVTNiB0byBsZXZlcmFnZSB0aGUgbGF0ZXN0IGJlbmVmaXRzIG9mIG5hdGl2ZSBqYXZhc2NyaXB0LCBwcm92aWRpbmcgYSBzdHJlYW1saW5lZFxud2F5IHRvIGNyZWF0ZSBhbmQgdXRpbGl6ZSBQb2x5bWVyIGNvbXBvbmVudHMsIHNhbml0aXppbmcgdGhlbSB0byBtYWtlIHN1cmUgdGhleSdyZSBzb3VuZCwgYW5kIGFsbG93IGZvciBlYXNpZXJcbmRlYnVnZ2luZyBhcyByZXF1aXJlZC5cblxuKi9cblxuaW1wb3J0IHtIZW5jZU1vZGVsfSBmcm9tICcuL2xpYi9tb2RlbCc7XG5pbXBvcnQge0hlbmNlU2NoZW1hfSBmcm9tICcuL2xpYi9zY2hlbWEnO1xuaW1wb3J0IHtIZW5jZVVpfSBmcm9tICcuL2xpYi91aSc7XG5pbXBvcnQge0hlbmNlSG9va30gZnJvbSAnLi9saWIvaG9vayc7XG5cbmxldCBIZW5jZSA9IHtcbiAgTW9kZWw6IEhlbmNlTW9kZWwsXG4gIFNjaGVtYTogSGVuY2VTY2hlbWEsXG4gIFVpOiBIZW5jZVVpLFxuICBob29rOiBIZW5jZUhvb2tcbn07XG5cbmV4cG9ydCB7SGVuY2VNb2RlbCxIZW5jZVNjaGVtYSxIZW5jZVVpLEhlbmNlSG9va31cbmV4cG9ydCBkZWZhdWx0IEhlbmNlO1xuIiwiLypcbiAgXyAgIF8gX19fX18gXyAgIF8gIF9fX18gX19fX18gICBfXG4gfCB8IHwgfCBfX19ffCBcXCB8IHwvIF9fX3wgX19fX3wgKF8pIF9fX1xuIHwgfF98IHwgIF98IHwgIFxcfCB8IHwgICB8ICBffCAgIHwgfC8gXyBcXFxuIHwgIF8gIHwgfF9fX3wgfFxcICB8IHxfX198IHxfX18gX3wgfCAoXykgfFxuIHxffCB8X3xfX19fX3xffCBcXF98XFxfX19ffF9fX19fKF8pX3xcXF9fXy9cblxuKi9cbi8qKlxuICogQG1vZHVsZSBoZW5jZS1iZWhhdmlvdXJcbiAqL1xuXG5pbXBvcnQge3BvbHltZXJJbnRlZ3JpdHl9IGZyb20gJy4vcG9seW1lckludGVncml0eSc7XG5cbmltcG9ydCBjb25zb2xlIGZyb20gJ2NvbnNvbGVyJztcblxuLyoqXG4gKiBBIGNvcmUgYmVoYXZpb3VyIHRvIGFsbG93IGFueSBjb21wb25lbnQgdG8gYmUgcGFzc2VkIGluIGEgcHJvcHMgYXR0cmlidXRlIHdpdGggYSBmdWxsL3BhcnRpYWwgc2V0IG9mIHByb3BlcnRpZXNcbiAqIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGBcbiAqIDxhcGktY29tcCB1cmw9XCIuLi5lbmRwb2ludC5qc29uXCIgcmVzdWx0cz1cInt7Y3VzdG9tUHJvcHN9fVwiPjwvYXBpLWNvbXA+XG4gKiA8bXktdWkgcHJvcHM9e3tjdXN0b21Qcm9wc319PjwvbXktdWk+XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGFsbG93cyBvdGhlciBjb21wb25lbnRzIHRvIGVmZm9ydGxlc3NseSBwYXNzaW5nIGEgcmFuZ2Ugb2Ygc2V0dGluZ3MgdG8gcmVuZGVyIHRoZSBjaGlsZCBjb21wb25lbnQsIGxlYXZpbmcgaXRcbiAqIHRvIGRvIGl0J3Mgb3duIG1hZ2ljLiBUaGUgZXhhbXBsZSBhYm92ZSBhbGxvd3MgdGhlIGBgYGFwaS1jb21wYGBgIHRvIGR1bXAgcmVzdWx0cyBpbiB0byB0aGUgYGBgY3VzdG9tUHJvcHNgYGBcbiAqIHZhcmlhYmxlLCB3aGljaCBmZWVkcyBhbmQgdGhlbiBkaXNwYWx5cyB0aGUgYGBgbXktdWlgYGAgY29tcG9uZW50LlxuICpcbiAqIEluIHByYWN0aWNhbCBjYXNlcywgdGhlIGRhdGEgd291bGQgYmUgdHJhbnNmb3JtZWQgdnMuIGJlaW5nIHBhc3NlZCBpbiByYXcgdG8gdGhlIHVpIGNvbXBvbmVudC4gIFNlZSB0aGVcbiAqIEhlbmNlTW9kZWwgb2JqZWN0IGZvciByZWZlcmVuY2Ugb24gdGhpcy5cbiAqXG4gKiBAdHlwZSB7e3Byb3BlcnRpZXM6IHtwcm9wczoge3R5cGU6IE9iamVjdCwgbm90aWZ5OiBib29sZWFufX0sIGF0dGFjaGVkLCBfaW5pdGlhbGl6ZVByb3BzfX1cbiAqL1xubGV0IEhlbmNlQmVoYXZpb3VyID0ge1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIHR5cGU6IE9iamVjdFxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogV2lsbCBhdXRvIGZpbGwgaW4gdGhpcyBjb21wb25lbnRzIHByb3BlcnRpZXMgaWYgcGFzc2VkIGluIGFzIGFuIG9iamVjdCB0aHJvdWdoIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVByb3BzKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIElmIHRoaXMgZWxlbWVudCB3YXMgY3JlYXRlZCBvbiB0aGUgRE9NLCBhbmQgd2FzIHBhc3NlZCBpbiBhIHByb3BzIHByb3BlcnR5LCB1c2UgdGhhdCBvYmplY3QgdG8gcG9wdWxhdGUgdGhpc1xuICAgKiBjb21wb25lbnRzIHByb3BlcnRpZXMgbm93LCBpbiBvbmUgZmVsbCBzd29vcC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gICAgX2luaXRpYWxpemVQcm9wcygpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGNvbmZpZyA9IHNlbGYucHJvcHM7XG5cbiAgICB0cnkge1xuICAgICAgLy9jb25zb2xlLmxvZygnc2hvdWxkIGNoZWNrIHByb3BzPycsICEhY29uZmlnLCBjb25maWcsIHNlbGYuX3Byb3BMaXN0KTtcblxuICAgICAgaWYgKGNvbmZpZyAmJiBzZWxmLl9wcm9wTGlzdCkge1xuICAgICAgICBzZWxmLl9wcm9wTGlzdC5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpPT4ge1xuICAgICAgICAgIGlmIChjb25maWdbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICAgICAgc2VsZi5zZXQocHJvcGVydHlOYW1lLCBjb25maWdbcHJvcGVydHlOYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdIZW5jZUJlaGF2aW91cjo6X2luaXRpYWxpemVQcm9wcyBmYWlsdXJlJywgc2VsZiwgZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogU2FmZXR5IENoZWNrcyAtIGVuc3VyZSB0aGF0IHRoaXMgcG9seW1lciBvYmplY3Qgd2lsbCBub3QgYmUgb3ZlcnJpZGluZyBpbXBvcnRhbnQgUG9seW1lciBtZXRob2RzL3Byb3BlcnRpZXNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5wb2x5bWVySW50ZWdyaXR5KEhlbmNlQmVoYXZpb3VyLCAnSGVuY2VCZWhhdmlvdXInKTtcblxuZXhwb3J0IHtIZW5jZUJlaGF2aW91cn07XG4iLCIvKlxuICBfICAgXyBfX19fXyBfICAgXyAgX19fXyBfX19fXyAgIF9cbiB8IHwgfCB8IF9fX198IFxcIHwgfC8gX19ffCBfX19ffCAoXykgX19fXG4gfCB8X3wgfCAgX3wgfCAgXFx8IHwgfCAgIHwgIF98ICAgfCB8LyBfIFxcXG4gfCAgXyAgfCB8X19ffCB8XFwgIHwgfF9fX3wgfF9fXyBffCB8IChfKSB8XG4gfF98IHxffF9fX19ffF98IFxcX3xcXF9fX198X19fX18oXylffFxcX19fL1xuXG4jIyMgSGVuY2VDb21wXG5cbkhlbmNlQ29tcCBpcyB0aGUgYmFzZSBvYmplY3QgaW4gd2hpY2ggYWxsIEhlbmNlIENvbXBvbmVudHMgYXJlIGRlcml2ZWQgZnJvbSB0byBoZWxwIGFkZHJlc3Mgc29tZSBjb21tb25cbiBmdW5jdGlvbmFsaXR5IHRoYXQgaXMgbm90IHByZXNlbnQgaW4gUG9seW1lciwgc3VjaCBhcyBzaW1wbGlmeWluZyBjb21wb25lbnQgaW5zdGFudGlhdGlvbiB0aHJvdWdoIERPTSBvclxuIGR5bmFtaWMgY3JlYXRpb24sIGFuZCBtZXRob2RzIHRvIHNuYXAgY29tcG9uZW50cyB0byBuZXcgRE9NIGVsZW1lbnRzIHdpdGggZWFzZS5cblxuQSBjcml0aWNhbCBhZGRpdGlvbiB0byB0aGlzIGlzIGEgaW50ZWdyaXR5IGNoZWNrZXIgdG8gZW5zdXJlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgeW91IGFkZCB0byB5b3VyIG9iamVjdCBkbyBub3RcbmNvbmZsaWN0IHdpdGggUG9seW1lciwgcHJldmVudCBkaXNhc3Ryb3VzIGVycm9ycyB3aGljaCBnbyB1bmNoZWNrZWQgYnkgUG9seW1lciwgc28geW91IGNhbiBhZGRyZXNzIHRoZW0gcHJvbXB0bHlcbmR1cmluZyBkZXZlbG9wbWVudC5cblxuKi9cbi8qKlxuICogQG1vZHVsZSBoZW5jZS1jb21wXG4gKi9cbi8qKlxuICogQGV4dGVybmFsIFBvbHltZXJcbiAqL1xuXG5pbXBvcnQge3BvbHltZXJJbnRlZ3JpdHl9IGZyb20gJy4vcG9seW1lckludGVncml0eSc7XG5pbXBvcnQge0hlbmNlQmVoYXZpb3VyfSBmcm9tICcuL2JlaGF2aW91cic7XG5cbmltcG9ydCBjb25zb2xlIGZyb20gJ2NvbnNvbGVyJztcblxuaW1wb3J0IF9leHRlbmQgZnJvbSAnbG9kYXNoL29iamVjdC9leHRlbmQnO1xuaW1wb3J0IF9kZWZhdWx0cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2RlZmF1bHRzJztcbmltcG9ydCBfa2V5cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2tleXMnO1xuaW1wb3J0IF9oYXMgZnJvbSAnbG9kYXNoL29iamVjdC9oYXMnO1xuaW1wb3J0IF9jbG9uZSBmcm9tICdsb2Rhc2gvbGFuZy9jbG9uZURlZXAnO1xuaW1wb3J0IF9pc0FycmF5IGZyb20gJ2xvZGFzaC9sYW5nL2lzQXJyYXknO1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsIFRoZSBjb21wb25lbnQgYmVpbmcgZGVmaW5lZFxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyBjb21wb25lbnQgYW5kIFBvbHltZXIgaW5pdGlhbGl6YXRpb24vYmluZGluZyBjb250cm9scy5cbiAqL1xubGV0IEhlbmNlQ29tcCA9IChvcmlnaW5hbCk9PiB7XG4gIGxldCBjb21wID0gX2Nsb25lKG9yaWdpbmFsKTtcbiAgbGV0IF9wb2x5bWVyQ2xhc3MgPSBudWxsO1xuICBsZXQgX3BvbHltZXJSZWdpc3RlcmVkID0gbnVsbDtcbiAgbGV0IF9wcm9wcyA9IF9rZXlzKGNvbXAucHJvcGVydGllcyB8fCB7fSk7XG5cbiAgLy8gRW5zdXJlIHRoZSBiYXNpY3MgYXJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnQgaWYgbm90IGFscmVhZHkgcHJlc2VudCB0byBlbnN1cmUgY29tcGF0aWJpbGl0eVxuICBfZGVmYXVsdHMoY29tcCwge1xuICAgIHByb3BlcnRpZXM6IHt9LFxuICAgIGxpc3RlbmVyczoge30sXG4gICAgYmVoYXZpb3JzOiBbXVxuICB9KTtcblxuICAvKipcbiAgICogVG8gc2ltcGxpZnkgYWxsb3dpbmcgdG8gcGFzcyBhIHNpbmdsZSBvYmplY3QgdGhyb3VnaCB0aGUgRE9NIHRoYXQgb3ZlcnJpZGVzIGFueS9hbGwgb2YgdGhpcyBjb21wb25lbnRzXG4gICAqIHByb3BlcnRpZXMsIHdlJ2xsIGFsbG93IGEgZGVmYXVsdCAncHJvcHMnIHByb3BlcnR5IG9uIHRoZSBlbGVtZW50IHRvIGJlIGFjY2VzcyB0aGlzIHdheS5cbiAgICovXG4gIF9leHRlbmQoY29tcC5wcm9wZXJ0aWVzLCB7XG4gICAgX3Byb3BMaXN0OiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgdmFsdWU6IF9wcm9wc1xuICAgIH0sXG4gICAgX3Byb3BDb25maWc6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgfVxuICB9KTtcblxuICBfZXh0ZW5kKGNvbXAsIHtcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJbml0aWFsaXphdGlvblxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIFRoZSBmYWN0b3J5SW1wbCBtZXRob2QgaXMgb25seSBpbnZva2VkIHdoZW4geW91IGNyZWF0ZSBhbiBlbGVtZW50IHVzaW5nIHRoZSBjb25zdHJ1Y3RvciwgdGhpcy5jcmVhdGVFbGVtZW50IG9yXG4gICAgICogaXQncyBiaW5kaW5nIGZ1bmN0aW9ucy4gSW5zdGFuY2VzIGhhcmRjb2RlZCBpbnRvIGh0bWwgYWxyZWFkeSB3aWxsIE5PVCBleGVjdXRlIHRoaXMgY29uc3RydWN0b3IuIFlvdSd2ZSBiZWVuXG4gICAgICogd2FybmVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBBIHNldCBvZiBvcHRpb25zIGZvciBjb25maWd1cmluZyB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgICAgZmFjdG9yeUltcGwoY29uZmlnKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBzZWxmLl9zZXRfcHJvcENvbmZpZyhjb25maWcpO1xuXG4gICAgICAvLyBNdXN0IHVzZSBsb2NhbCBfcHJvcHMgcHJpdmF0ZSB2YXIsIGFzIHNlbGYucHJvcExpc3Qgd2lsbCBubyB5ZXQgYmUgaW5pdGlhbGl6ZWQuLi4gc2VsZi5wcm9wTGlzdCBpcyB1c2FibGVcbiAgICAgIC8vIGluIHRoZSByZWFkeS9hdHRhY2hlZCBtZXRob2RzIHdpdGhvdXQgaXNzdWUgaG93ZXZlci5cbiAgICAgIF9wcm9wcy5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpPT4ge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICBzZWxmLnNldChwcm9wZXJ0eU5hbWUsIGNvbmZpZ1twcm9wZXJ0eU5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogUG9seW1lciBIZWxwZXJzXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIFRoaXMgaW5pdGlhbGl6ZSB0aGUgUG9seW1lciBDbGFzcywgYW5kIGVuc3VyZSBpdCBpcyBvbmx5IHBlcmZvcm1lZCBvbmNlLCBzdGF0aWNseSBzdG9yaW5nIHRoZSBQb2x5bWVyIG9iamVjdCB0byBiZVxuICAgICAqIHNlcnZlZCB3aGVuIGNyZWF0aW5nIG5ldyBlbGVtZW50cywgb3Igc3VwcG9ydCBjb21wb25lbnRzIGFscmVhZHkgb24gdGhlIERPTS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQb2x5bWVyfSBUaGUgcmVzdWx0aW5nIFBvbHltZXIgaW5zdGFuY2UsIGFibGUgdG8gYmUgbGV2ZXJhZ2VkIG9uY2UgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICAgIHBvbHltZXJDbGFzcygpIHtcbiAgICAgIGlmICghX3BvbHltZXJDbGFzcyAmJiBQb2x5bWVyKSB7XG4gICAgICAgIF9wb2x5bWVyQ2xhc3MgPSBQb2x5bWVyLkNsYXNzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX3BvbHltZXJDbGFzcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogIyMjIFJlZ2lzdGVyaW5nIENvbXBvbmVudHNcbiAgICAgKiAjIyMjIGBgYENvbXAucmVnaXN0ZXJFbGVtZW50KClgYGBcbiAgICAgKlxuICAgICAqIElmIHlvdSBoYXZlIHlvdXIgY29tcG9uZW50LCBgYGA8bXktZWxlbWVudCBzYW1wbGU9J2dyZWF0Jz48L215LWVsZW1lbnQ+YGBgIG9uIHRoZSBET00gYW5kIGRvIG5vdCByZWdpc3RlciB5b3VyIGNvbXBvbmVudCBpblxuICAgICAqIFBvbHltZXIsIGl0IGVmZmVjdGl2ZWx5IHdpbGwgZG8gbm90aGluZyB1bnRpbCB5b3UgZG8gdHJpZ2dlciBgYGByZWdpc3RlckVsZW1lbnRgYGAuXG4gICAgICpcbiAgICAgKiBUbyByZWdpc3RlciB0aGUgZWxlbWVudCwgc2ltcGx5OlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGltcG9ydCBNeUVsZW1lbnQgZnJvbSAnLi9teS1lbGVtZW50LmpzJztcbiAgICAgKlxuICAgICAqIE15RWxlbWVudC5yZWdpc3RlckVsZW1lbnQoKTsgLy8gcmV0dXJucyBhIFBvbHltZXIgb2JqZWN0LCBhbmQgZW5zdXJlcyB0byByZWdpc3RlciBpdCBhcyBhIGN1c3RvbSBlbGVtZW50LlxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBlbGVtZW50IGlzIHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgICByZWdpc3RlckVsZW1lbnQoKSB7XG4gICAgICBpZiAoIV9wb2x5bWVyUmVnaXN0ZXJlZCAmJiBkb2N1bWVudCAmJiB0aGlzLnBvbHltZXJDbGFzcygpKSB7XG4gICAgICAgIGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCh0aGlzLmlzLCB0aGlzLnBvbHltZXJDbGFzcygpKTtcbiAgICAgICAgX3BvbHltZXJSZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9wb2x5bWVyUmVnaXN0ZXJlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogIyMjIENyZWF0aW5nIENvbXBvbmVudHMgRHluYW1pY2FsbHlcbiAgICAgKiAjIyMjIGBgYENvbXAuYXBwZW5kQ2hpbGQocHJvcHMpYGBgXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGVhc2lseSBjcmVhdGUgZWxlbWVudHMgdG8gYWRkIHRvIHRoZSBET00uIFRoZSBgYGBjcmVhdGVFbGVtZW50YGBgIGZhbGxzIGJhY2sgb24gcnVubmluZyB0aGVcbiAgICAgKiBgYGByZWdpc3RlckVsZW1lbnRgYGAsIHRvIGVuc3VyZSB0aGF0IHRoZSBjb21wb25lbnQgeW91J3JlIHRyeWluZyB0byBjcmVhdGUgd2FzIHJlZ2lzdGVyZWQuXG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogaW1wb3J0IE15RWxlbWVudCBmcm9tICcuL215LWVsZW1lbnQuanMnO1xuICAgICAqXG4gICAgICogbGV0IGVsID0gTXlFbGVtZW50LmNyZWF0ZUVsZW1lbnQocHJvcHMpOyAvLyBsZXRzIGJ1aWxkIGFuIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpOyAvLyBhZGQgb3VyIGVsIHRvIHRoZSBlbmQgb2YgdGhlIGJvZHkgbm93XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBUaGlzIGNyZWF0ZSBhIG5ldyBlbGVtZW50LCBsZXZlcmFnaW5nIFBvbHltZXJzIGNvbnN0cnVjdG9yIG1ldGhvZCwgYWxsb3dpbmcgdXMgdG8gcGFzcyBpbiBwYXJhbWV0ZXJzIGFuZCBleGVjdXRlIHRoZVxuICAgICAqIGZhY3RvcnlJbXBsKC4uLikgZnVuY3Rpb24sIHdoaWNoIEhlbmNlQ29tcCB1c2VzIHRvIGFzc2lnbiBtYXRjaGluZyBwcm9wZXJ0aWVzIHRvIHlvdXIgbmV3IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25zIGZvciB3aGljaCB0byBjb25maWd1cmUgdGhpcyBuZXcgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbXBvbmVudFxuICAgICAqIEByZXR1cm5zIHtQb2x5bWVyfSBUaGUgcmVzdWx0aW5nIGNyZWF0ZWQgRE9NIGVsZW1lbnQsXG4gICAgICovXG4gICAgICBjcmVhdGVFbGVtZW50KG9wdHMgPSB7fSkge1xuICAgICAgbGV0IGVsO1xuXG4gICAgICBpZiAodGhpcy5yZWdpc3RlckVsZW1lbnQoKSkgeyAvLyBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBpbiBmYWN0IHJlZ2lzdGVyZWRcbiAgICAgICAgZWwgPSBuZXcgX3BvbHltZXJDbGFzcyhvcHRzKTsgLy8gR2VuZXJhdGVzIGEgbmV3IHBvbHltZXIgY29tcG9uZW50IG9mIHRoaXMgdHlwZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZWw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICMjIyMgQXBwZW5kaW5nIENvbXBvbmVudHMgRWFzaWx5XG4gICAgICogIyMjIyBgYGBDb21wLmFwcGVuZEVsZW1lbnRUbyhwcm9wcywgdGFyZ2V0KWBgYFxuICAgICAqIEEgc2ltcGxlIGhlbHBlciBmdW5jdGlvbiB0byBhcHBlbmQgZWxlbWVudHMgaXMgYGBgYXBwZW5kRWxlbWVudFRvYGBgLiBQYXNzaW5nIG5vIHRhcmdldCBkZWZhdWx0cyB0byBgYGBkb2N1bWVudC5ib2R5YGBgLlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGltcG9ydCBNeUVsZW1lbnQgZnJvbSAnLi9teS1lbGVtZW50LmpzJztcbiAgICAgKlxuICAgICAqIE15RWxlbWVudC5hcHBlbmRFbGVtZW50VG8ocHJvcHMsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNteUVsZW1lbnQnKSk7IC8vIGxldHMgYnVpbGQgYW4gZWxlbWVudCwgYW5kIGFwcGVuZCBpdCB0byBvdXIgdGFyZ2V0XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25zIGZvciB3aGljaCB0byBjb25maWd1cmUgdGhpcyBuZXcgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGhlIGRlc2lyZWQgRE9NIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSBuZXcgY29tcG9uZW50IHRvby5cbiAgICAgKiBAcmV0dXJucyB7UG9seW1lcn0gVGhlIHJlc3VsdGluZyBjcmVhdGVkIERPTSBlbGVtZW50LFxuICAgICAqL1xuICAgICAgYXBwZW5kRWxlbWVudFRvKG9wdHMgPSB7fSwgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgbGV0IGVsID0gdGhpcy5jcmVhdGVFbGVtZW50KG9wdHMpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdhZGRpbmcgZWwgdG8nLCBlbCwgdGFyZ2V0LCBkb2N1bWVudCwgZG9jdW1lbnQuYm9keSk7XG5cbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdIZW5jZUNvbXA6OmFwcGVuZEVsZW1lbnRUbyAtIEZhaWx1cmUgdG8gYXBwZW5kIGVsZW1lbnQnLCBlbCwgZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbDtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEVsZW1lbnQgQmVoYXZpb3VyXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvLyBFbnN1cmUgdG8gYWRkIHRoZSBkZWZhdWx0IEhlbmNlQmVoYXZpb3VyIHRvIHRoaXMgY29tcG9uZW50LiBXZSBkb24ndCB3YW50IHRvIGJlIG92ZXJyaWRpbmcgdGhlIGJlaGF2aW91ciBsaXN0LFxuICAgIC8vIGp1c3QgYWRkaW5nIHRvIGl0IHNvIGFueSBhZGRpdGlvbmFsIGJlaGF2aW91cnMgYXJlIGtlcHQuXG4gIGNvbXAuYmVoYXZpb3JzLnB1c2goSGVuY2VCZWhhdmlvdXIpO1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBEZWJ1Z2dpbmdcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBfZGVmYXVsdHMoY29tcCwge1xuXG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgd2F5IHRvIGRlYnVnIHRoZSBjb21wb25lbnQgYnkgcG9vbGluZyBpdCdzIGN1cnJlbnQgcHJvcGVydHkgdmFsdWVzIGFuZCBkaXNwbGF5aW5nIHRoZW0gYXMgYSBKU09OXG4gICAgICogc3RyaW5naWZ5J2RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RyaW5naWZ5IFdoZXRoZXIgb3Igbm90IHRvIHJldHVybiBhIHN0cmluZyBvciB0aGUgb2JqZWN0XG4gICAgICogQHJldHVybnMge1N0cmluZ3xPYmplY3R9IEpTT04gc3RyaW5nIG91dHB1dCBvZiB0aGUgY29tcG9uZW50XG4gICAgICovXG4gICAgICBkZWJ1Z1RoaXMoc3RyaW5naWZ5ID0gZmFsc2UpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGxldCBkYXRhID0ge307XG5cbiAgICAgIF9wcm9wcy5mb3JFYWNoKChwcm9wZXJ0eU5hbWUpPT4ge1xuICAgICAgICBkYXRhW3Byb3BlcnR5TmFtZV0gPSBzZWxmLmdldChwcm9wZXJ0eU5hbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzdHJpbmdpZnkgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGE7XG4gICAgfVxuICB9KTtcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBTYWZldHkgQ2hlY2tzIC0gZW5zdXJlIHRoYXQgdGhpcyBwb2x5bWVyIG9iamVjdCB3aWxsIG5vdCBiZSBvdmVycmlkaW5nIGltcG9ydGFudCBQb2x5bWVyIG1ldGhvZHMvcHJvcGVydGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBwb2x5bWVySW50ZWdyaXR5KGNvbXApO1xuXG4gIHJldHVybiBjb21wO1xufTtcblxuZXhwb3J0IHtIZW5jZUNvbXB9O1xuIiwiLypcbiAgXyAgIF8gX19fX18gXyAgIF8gIF9fX18gX19fX18gICBfXG4gfCB8IHwgfCBfX19ffCBcXCB8IHwvIF9fX3wgX19fX3wgKF8pIF9fX1xuIHwgfF98IHwgIF98IHwgIFxcfCB8IHwgICB8ICBffCAgIHwgfC8gXyBcXFxuIHwgIF8gIHwgfF9fX3wgfFxcICB8IHxfX198IHxfX18gX3wgfCAoXykgfFxuIHxffCB8X3xfX19fX3xffCBcXF98XFxfX19ffF9fX19fKF8pX3xcXF9fXy9cblxuKi9cbi8qKlxuICogQG1vZHVsZSBoZW5jZS11aVxuICovXG5cbmltcG9ydCBjb25zb2xlIGZyb20gJ2NvbnNvbGVyJztcblxuaW1wb3J0IF9jbG9uZSBmcm9tICdsb2Rhc2gvbGFuZy9jbG9uZURlZXAnO1xuaW1wb3J0IF9pc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nO1xuaW1wb3J0IF9pc0VxdWFsIGZyb20gJ2xvZGFzaC9sYW5nL2lzRXF1YWwnO1xuaW1wb3J0IF9pc09iamVjdCBmcm9tICdsb2Rhc2gvbGFuZy9pc09iamVjdCc7XG5cbi8qKlxuICogIyMjIEV2ZW50IEhvb2tzXG4gKiAjIyMjIGBgYEhlbmNlLmhvb2sodGFyZ2V0LCBwcmVwYXJlRGF0YSlgYGBcbiAqXG4gKiBQcm92aWRlcyBhbiBlYXN5IGFjY2Vzc2libGUgaG9vayBmdW5jdGlvbiBmb3IgdGhlIGNvbXBvbmVudCB0byBsZXZlcmFnZS4gV2l0aCBhY2NlcHRpbmcgYSBvYmplY3QgcGFyYW1ldGVyIHdoaWNoXG4gKiBjb250YWlucyBhbiBhY3Rpb24gbWV0aG9kLCB0aGlzIHdpbGwgcHJvdmlkZSBhIGJpbmRhYmxlIGV2ZW50IGluIHRoZSBjb21wb25lbnQncyB0ZW1wbGF0ZSwgYW5kIGF1dG9tYXRpY2FsbHkgY2FsbFxuICogdGhhdCBtZXRob2QsIHBhc3NpbmcgaW4gdGhlIHRhcmdldGVkIGRhdGEgbW9kZWwgZnJvbSB0aGUgZXZlbnQuXG4gKlxuICogT3B0aW9uYWxseSwgYmVmb3JlIHRoZSBkYXRhIGlzIHNlbnQgYWxvbmcgdG8gdGhlIG9yaWdpbmFsIGhvb2ssIHlvdSBjYW4gcHJvY2VzcyB0aGUgZGF0YSB3aXRoIGFueXRoaW5nIHJlbGF0ZWQgdG9cbiAqIHRoZSBjdXJyZW50IGNvbXBvbmVudCBiZWZvcmUgaXQgaXMgc2VudCBvZmYgdG8gYmUgYWN0ZWQgdXBvbi5cbiAqXG4gKiBJZGVhbCB1c2Ugb2YgdGhlc2UgaG9va3MgYXJlIGluc2lkZSBvZiBVaSBjb21wb25lbnRzLCB0cmlnZ2VyaW5nIGhvb2tzIGJhY2sgdG8gTW9kZWxzLCBzbyB0aGUgVWkgY2FuIGhhbmRsZSB0aGVcbiAqIGV2ZW50IGFuZCBtb2RlbCBkaWdlc3QsIGFuZCBzZXJ2ZSB0aGUgTW9kZWwgZXhhY3RseSB0aGUgZGF0YSBpdCBuZWVkcy4gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHJldHVybmVkLCB0aGUgbW9kZWxcbiAqIGFuZCBvcmlnaW5hdGluZyBldmVudCBhcmUgcHJvdmlkZWQgc2hvdWxkIHRoZSBob29rIGJlIHVzZWQgYmV0d2VlbiBtdWx0aXBsZSBVaXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldE1vZGVsIFRoZSB0aGUgaW50ZW5kZWQgdGFyZ2V0IHRvIGhvb2sgaW50b1xuICogQHBhcmFtIHtGdW5jdGlvbnxOdWxsfSBwcmVwYXJlRGF0YSBBIGNhbGxiYWNrIHRvIGFsbG93IHRoZSBtb2RlbCBkYXRhIHRvIGJlIGZvcm1hdHRlZCBiZWZvcmUgYmVpbmcgcmV0dXJuZWQgdG8gdGhlIGNhbGxlZVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgZXZlbnQgY2FsbGJhY2sgdG8gYWxsb3cgdGhlIGNvbXBvbmVudCB0byBob29rIGludG8gdG9vXG4gKi9cbmxldCBIZW5jZUhvb2sgPSAodGFyZ2V0TW9kZWwsIHByZXBhcmVEYXRhID0gbnVsbCk9PiB7XG4gIHJldHVybiAoZSk9PiB7XG4gICAgbGV0IG1vZGVsID0gZS5tb2RlbCB8fCB7fTtcbiAgICBsZXQgZGF0YU1vZGVsID0gX2Nsb25lKG1vZGVsW3RhcmdldE1vZGVsXSk7XG5cbiAgICAvLyBJZiB0aGUgdGFyZ2V0IHdhcyBub3QgcHJlc2VudCwgZ2l2ZSBkZXZlbG9wZXJzIGEgY2xlYXIgbWVzc2FnZSBvbiB0aGVpciBmbHViIHRvIGNvcnJlY3QgaXQuXG4gICAgaWYgKCFkYXRhTW9kZWwgfHwgIV9pc09iamVjdChkYXRhTW9kZWwpKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcihgSGVuY2VIb29rOjpDb25maWd1cmF0aW9uIC0gVGhlIHRhcmdldCBtb2RlbCwgJHt0YXJnZXRNb2RlbH0sIGlzIE5PVCBhIHZhbGlkIHByb3BlcnR5IG9mIHRoZSBjb21wb25lbnQgb3IgcmVwZWF0ZWQgb2JqZWN0LCBvciBpdCBpcyBub3QgYW4gb2JqZWN0IHdpdGggYSB2YWxpZCBhY3Rpb24gbWV0aG9kIHRvIGhvb2sgaW50by5gKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gYWN0aW9uIG1ldGhvZCwgY2xlYXJseSBzb21ldGhpbmcgaGFzIGdvbmUgYW11Y2suIE5vdGlmeSB0aGUgZGV2ZWxvcGVyIHdpdGggYWxsIHBvc3NpYmxlXG4gICAgLy8gb2JqZWN0cyB0byBoZWxwIHRoZW0gZGVidWcuXG4gICAgZWxzZSBpZiAoIV9pc0Z1bmN0aW9uKGRhdGFNb2RlbC5hY3Rpb24pKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5lcnJvcihgSGVuY2VIb29rOjpDb25maWd1cmF0aW9uIC0gVGhpcyBob29rIHdhcyBub3QgcHJvcGVybHkgY29uZmlndXJlZCBvciBpbXBsZW1lbnRlZC4gUGxlYXNlIGVuc3VyZSB0aGUgdGFyZ2V0IG1vZGVsLCAke3RhcmdldE1vZGVsfSwgaGFzIGEgdmFsaWQgYWN0aW9uIG1ldGhvZC5gLCB7XG4gICAgICAgIGV2ZW50OiBlLFxuICAgICAgICBldmVudE1vZGVsOiBtb2RlbCxcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXRNb2RlbCxcbiAgICAgICAgZGF0YTogZGF0YU1vZGVsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHByZXBhcmF0aW9uIGNhbGxiYWNrIHdhcyBwcm92aWRlZCwgcnVuIHRoaXMgdG8gc2FuaXRpemUgdGhlIGRhdGEgYmVmb3JlIGl0IGlzIHBhc3NlZCBhbG9uZy5cbiAgICBpZiAoX2lzRnVuY3Rpb24ocHJlcGFyZURhdGEpKSB7XG4gICAgICBwcmVwYXJlRGF0YShkYXRhTW9kZWwsIG1vZGVsLCBlKTtcbiAgICB9XG5cbiAgICAvLyBFdmVyeXRoaW5nIHdhcyBjb25maWd1cmVkIGFuZCBwcm9jZXNzZWQsIGFuZCBubyBlcnJvcnMgd2VyZSBmbGFnZ2VkLCBmaXJlIG9mZiB0aGUgaG9vayBhY3Rpb24gbm93IHdpdGggbmVlZGVkXG4gICAgLy8gZGF0YS5cbiAgICBpZiAoZGF0YU1vZGVsLmVycm9yICE9PSB0cnVlKSB7XG4gICAgICBkYXRhTW9kZWwuYWN0aW9uKGRhdGFNb2RlbCwgbW9kZWwsIGUpO1xuICAgIH1cblxuICAgIC8vY29uc29sZS5sb2coJ0hlbmNlSG9vazpldmVudCcsIGUsIG1vZGVsKTtcbiAgfVxufTtcblxuZXhwb3J0IHtIZW5jZUhvb2t9O1xuIiwiLypcbiAgXyAgIF8gX19fX18gXyAgIF8gIF9fX18gX19fX18gICBfXG4gfCB8IHwgfCBfX19ffCBcXCB8IHwvIF9fX3wgX19fX3wgKF8pIF9fX1xuIHwgfF98IHwgIF98IHwgIFxcfCB8IHwgICB8ICBffCAgIHwgfC8gXyBcXFxuIHwgIF8gIHwgfF9fX3wgfFxcICB8IHxfX198IHxfX18gX3wgfCAoXykgfFxuIHxffCB8X3xfX19fX3xffCBcXF98XFxfX19ffF9fX19fKF8pX3xcXF9fXy9cblxuIyMgQ29tcG9uZW50IFR5cGUgTWV0aG9kb2xvZ3lcblxuIyMjIE1vZGVsXG5cbk1vZGVsIGNvbXBvbmVudHMgYXJlIHNwZWNpYWxpemVkIHRvIGhlbHAgYnJpZGdlIHRoZSBVSSAmIFNjaGVtYSBjb21wb25lbnRzLCB0YWtpbmcgZGF0YSBmcm9tIFNjaGVtYXMsIHRyYW5zbGF0ZXMgYW5kXG5mb3JtYXRzIHRoZSByZXN1bHRzIHRvIHN1cHBvcnQgYSBkZWRpY2F0ZWQgVUkgY29tcG9uZW50LCBhbmQgc2VydmVzIHRoZSByZXN1bHRzIG9uY2UgcHJlcGFyZWQgdG8gVUkuXG5cbiovXG4vKipcbiAqIEBtb2R1bGUgaGVuY2UtbW9kZWxcbiAqL1xuXG5pbXBvcnQge3BvbHltZXJJbnRlZ3JpdHl9IGZyb20gJy4vcG9seW1lckludGVncml0eSc7XG5pbXBvcnQge0hlbmNlQ29tcH0gZnJvbSAnLi9jb3JlJztcblxuaW1wb3J0IGNvbnNvbGUgZnJvbSAnY29uc29sZXInO1xuXG5pbXBvcnQgX2V4dGVuZCBmcm9tICdsb2Rhc2gvb2JqZWN0L2V4dGVuZCc7XG5pbXBvcnQgX2RlZmF1bHRzIGZyb20gJ2xvZGFzaC9vYmplY3QvZGVmYXVsdHMnO1xuaW1wb3J0IF9lYWNoIGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uL2VhY2gnO1xuaW1wb3J0IF9jbG9uZSBmcm9tICdsb2Rhc2gvbGFuZy9jbG9uZURlZXAnO1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsIFRoZSBjb21wb25lbnQgYmVpbmcgZGVmaW5lZFxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyBjb21wb25lbnQsIGJhc2VkIG9uIEhlbmNlQ29tcCwgd2l0aCBzb21lIGFkZGVkIE1vZGVsIHNwZWNpZmljIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmxldCBIZW5jZU1vZGVsID0gKG9yaWdpbmFsKT0+IHtcbiAgbGV0IGNvbXAgPSBfY2xvbmUob3JpZ2luYWwpO1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBJbml0aWFsaXphdGlvblxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIF9leHRlbmQoY29tcC5wcm9wZXJ0aWVzLCB7XG4gICAgcXVlcnk6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIHZhbHVlOiBudWxsXG4gICAgfSxcbiAgICBwcm9jZXNzZWRTdGF0ZToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICB2YWx1ZTogbnVsbFxuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9XG4gIH0pO1xuXG4gIF9leHRlbmQoY29tcCwge1xuICAgIHJlbmRlclN0YXRlKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBkb2VzIHRoZSBlc3NlbnRpYWwgcHJvY2Vzc2luZyBvZiB0aGUgc3RhdGUgcHVsbGVkIGluIGZyb20gYSBnaXZlbiBzY2hlbWEgY29tcG9uZW50LCBhbmQgcHJvY2Vzc2VzXG4gICAgICogaXQgdmlhIHRoZSBfdHJhbnNmb3JTdGF0ZSBmdW5jdGlvbiB0byBjb3VwbGUgdGhlIHJhdyBkYXRhIHRvIGEgZnJpZW5kbHkgb3B0aW9uIHNldCBmb3IgdGhlIGRlc2lyZWQgVUkgY29tcG9uZW50LlxuICAgICAqL1xuICAgIF9wcm9jZXNzU3RhdGUoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgX2VhY2goc3RhdGUsIChlbnRyeSk9PiB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSBzZWxmLl90cmFuc2Zvcm1TdGF0ZShlbnRyeSk7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh0cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgMSBvciBub25lIGluIHRoZSBhcnJheSwgY29udmVydCBpdCB0byBhbiBvYmplY3QvdW5kZWZpbmVkIGluc3RlYWQuXG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPD0gMSkge1xuICAgICAgICByZXN1bHRzID0gcmVzdWx0c1swXTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fc2V0UHJvY2Vzc2VkU3RhdGUocmVzdWx0cyk7IC8vIHJlYWQgb25seSBhbmQgbXVzdCBiZSBzZXQgcHJpdmF0ZWx5IGhlcmVcbiAgICAgIC8vY29uc29sZS5sb2coJ3Byb2Nlc3NlZFN0YXRlJyxzZWxmLnByb2Nlc3NlZFN0YXRlKTtcblxuICAgICAgcmV0dXJuIHNlbGYucHJvY2Vzc2VkU3RhdGU7XG4gICAgfVxuICB9KTtcblxuICBfZGVmYXVsdHMoY29tcCwge1xuICAgIC8qKlxuICAgICAqIFRoaXMgdmVyc2lvbiBpcyBtZWFudCB0byBiZSBvdmVycmlkZGVuIGJ5IHRoZSBjb21wb25lbnQgaW1wbGVtZW50aW5nIHRoaXMgYmVoYXZpb3VyLiBTZXJ2ZXMgYSBjb25zb2xlLndhcm5cbiAgICAgKiBkZXBpY3Rpbmcgc3VjaCB0byBub3RpZnkgZGV2ZWxvcGVycyBvZiB0aGVpciBtaXN1c2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmFuc2Zvcm1TdGF0ZShlbnRyeSkge1xuICAgICAgY29uc29sZS53YXJuKCdIZW5jZU1vZGVsOjp0cmFuc2Zvcm1FbnRyeSAtIERlZmF1bHQgbWV0aG9kIHJ1bm5pbmchIEl0XFwncyB1bmxpa2VseSB5b3VyIGRhdGEgaXMgcmVuZGVyaW5nJyArXG4gICAgICAgICcgY29ycmVjdGx5LCBwbGVhc2UgY29uc2lkZXIgb3ZlcnJpZGluZyBpdC4uLicpO1xuICAgICAgcmV0dXJuIGVudHJ5O1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEhlbmNlQ29tcChjb21wKTtcbn07XG5cbmV4cG9ydCB7SGVuY2VNb2RlbH07XG4iLCIvKlxuICBfICAgXyBfX19fXyBfICAgXyAgX19fXyBfX19fXyAgIF9cbiB8IHwgfCB8IF9fX198IFxcIHwgfC8gX19ffCBfX19ffCAoXykgX19fXG4gfCB8X3wgfCAgX3wgfCAgXFx8IHwgfCAgIHwgIF98ICAgfCB8LyBfIFxcXG4gfCAgXyAgfCB8X19ffCB8XFwgIHwgfF9fX3wgfF9fXyBffCB8IChfKSB8XG4gfF98IHxffF9fX19ffF98IFxcX3xcXF9fX198X19fX18oXylffFxcX19fL1xuXG4qL1xuLyoqXG4gKiBAbW9kdWxlIHBvbHltZXItaW50ZWdyaXR5XG4gKi9cblxuaW1wb3J0IGNvbnNvbGUgZnJvbSAnY29uc29sZXInO1xuXG5pbXBvcnQgX2tleXMgZnJvbSAnbG9kYXNoL29iamVjdC9rZXlzJztcbmltcG9ydCBfaGFzIGZyb20gJ2xvZGFzaC9vYmplY3QvaGFzJztcbmltcG9ydCBfaW50ZXJzZWN0aW9uIGZyb20gJ2xvZGFzaC9hcnJheS9pbnRlcnNlY3Rpb24nO1xuaW1wb3J0IF91bmlvbiBmcm9tICdsb2Rhc2gvYXJyYXkvdW5pb24nO1xuaW1wb3J0IF93aXRob3V0IGZyb20gJ2xvZGFzaC9hcnJheS93aXRob3V0JztcblxuXG4vLyBBIGxpc3Qgb2YgYWxsIHBvbHltZXIgbWV0aG9kL2tleSBuYW1lc1xubGV0IFBvbHltZXJLZXlzID0gX2tleXMoUG9seW1lci5CYXNlKTtcbi8vIEEgbGlzdCBleGNsdWRpbmcgdGhvc2UgbWV0aG9kL2tleSBuYW1lcyB3aGljaCBhcmUgYWxsb3dlZFxubGV0IFBvbHltZXJNZXRob2RzID0gX3dpdGhvdXQoUG9seW1lcktleXMsXG4gICdjcmVhdGVkJywgJ3JlYWR5JywgJ2F0dGFjaGVkJywgJ2RldGFjaGVkJywgJ3Byb3BlcnRpZXMnLCAnYmVoYXZpb3JzJywgJ2xpc3RlbmVycycsICdvYnNlcnZlcnMnLCAnaXMnLFxuICAnYXR0cmlidXRlQ2hhbmdlZCcsICdmYWN0b3J5SW1wbCcsICdob3N0QXR0cmlidXRlcydcbik7XG5cbi8vIEEgbGlzdCBvZiBhbGwgcmVzZXJ2ZWQgcG9seW1lciBwcm9wZXJ0aWVzIG5hbWVzOyBpbmNsdWRlIHRoZSBtZXRob2Qva2V5IG5hbWVzIGFzIGl0IHdpbGwgb25seSBjYXVzZSBpc3N1ZXMgaWYgdXNlZFxubGV0IFBvbHltZXJQcm9wZXJ0aWVzID0gX3VuaW9uKFBvbHltZXJLZXlzLCBbXG4gICdyb290JywgJ2lzQXR0YWNoZWQnLCAnX2Fib3ZlQ29uZmlnJywgJ19jb25maWcnLCAnaWQnLCAnX25hdGl2ZVByb3RvdHlwZXMnLCAnX2ZhY3RvcnlBcmdzJywgJ19hZ2dyZWdhdGVkQXR0cmlidXRlcycsXG4gICdfc2VyaWFsaXppbmcnLCAnX2RlYm91bmNlcnMnLCAnX3RlbXBsYXRlJywgJ2RhdGFIb3N0JywgJ19jbGllbnRzJywgJ19jbGllbnRzUmVhZGllZCcsICdfcmVhZGllZCcsICdfYXR0YWNoZWRQZW5kaW5nJyxcbiAgJ2V2ZW50JywgJ25vZGUnLCAnX2NsYXNzTGlzdCcsICdkb21BcGknLCAnX3VzZXJDb250ZW50JywgJ3NoYWR5Um9vdCcsICd0ZXh0Q29udGVudCcsICdfY29tcG9zZWRDaGlsZHJlbicsICdfbm90ZXMnLFxuICAnJCcsICckJCcsICdnZXN0dXJlcycsICdpbmZvJywgJ190d2lkZGxlJywgJ19jYWxsYmFja3MnLCAnY29udGV4dCcsICdib3VuZENvbXBsZXRlJywgJ2ZpbmlzaCcsICdjYWxsYmFjaycsICdfX2RhdGFfXycsXG4gICdfaGFuZGxlcnMnLCAnX2JvdW5kUGF0aHMnLCAncnVsZVR5cGVzJywgJ19lbmNhcHN1bGF0ZVN0eWxlJywgJ19zdHlsZXMnLCAnX3Njb3BlU3R5bGUnLCAnY2FjaGUnLCAnX3Byb3BlcnRpZXMnLFxuICAnX293blN0eWxlUHJvcGVydHlOYW1lcycsICdjdXN0b21TdHlsZScsICdfc3R5bGVQcm9wZXJ0aWVzJywgJ19vd25TdHlsZVByb3BlcnRpZXMnLCAnX3Njb3BlU2VsZWN0b3InLFxuICAnX2FwcGxpZXNUb0RvY3VtZW50JywgJ190ZW1wbGF0aXplcklkJywgJ2N0b3InLCAnX3RlbXBsYXRpemVyU3RhdGljJywgJ19wYXJlbnRQcm9wcycsICdfcm9vdERhdGFIb3N0JywgJ19jaGlsZHJlbicsXG4gICd1c2VyQXJyYXknLCAnc3RvcmUnLCAnb21hcCcsICdwbWFwJywgJ19pbnN0YW5jZXMnLCAnX2luc3RhbmNlUHJvcHMnLCAnX3NvcnRGbicsICdfbmVlZEZ1bGxSZWZyZXNoJywgJ19vYnNlcnZlUGF0aHMnLFxuICAnY29sbGVjdGlvbicsICdfc3BsaWNlcycsICdfa2V5VG9JbnN0SWR4JywgJ3NlbGVjdGVkJywgJ3RvZ2dsZScsICdfbGFzdElmJywgJ19pbnN0YW5jZScsICdfcmVhZHknLCAnX3NldHVwQ29uZmlndXJlJ1xuXSk7XG5cbi8qKlxuICogU2FmZXR5IENoZWNrcyAtIGVuc3VyZSB0aGF0IHRoaXMgcG9seW1lciBvYmplY3Qgd2lsbCBub3QgYmUgb3ZlcnJpZGluZyBpbXBvcnRhbnQgUG9seW1lciBtZXRob2RzL3Byb3BlcnRpZXNcbiAqIEBwYXJhbSBjb21wIFRoZSBjb21wb25lbnQvYmVoYXZpb3VyIGJlaW5nIGluc3BlY3RlZFxuICogQHBhcmFtIGJlaGF2aW91ciBBbiBvcHRpb25hbCBuYW1lIGZvciBiZWhhdmlvdXJzIGJlaW5nIGluc3BlY3RlZFxuICovXG5sZXQgcG9seW1lckludGVncml0eSA9IChjb21wLCBiZWhhdmlvdXIgPSAnJyk9PiB7XG4gIC8vIERldGVybWluZSBhbnkgY29uZmxpY3RpbmcgcHJvcGVydHkgbmFtZXNcbiAgdmFyIHByb3BlcnR5S2V5cyA9IF9rZXlzKGNvbXAucHJvcGVydGllcyB8fCB7fSk7XG4gIGxldCBjb25mbGljdGluZ1Byb3BzID0gX2ludGVyc2VjdGlvbihwcm9wZXJ0eUtleXMsIFBvbHltZXJQcm9wZXJ0aWVzKTtcblxuICAvLyBEZXRlcm1pbmUgYW55IGNvbmZsaWN0aW5nIG1ldGhvZC9rZXkgbmFtZXNcbiAgdmFyIGNvbXBLZXlzID0gX2tleXMoY29tcCk7XG4gIGxldCBjb25mbGljdGluZ01ldGhvZHMgPSBfaW50ZXJzZWN0aW9uKGNvbXBLZXlzLCBQb2x5bWVyTWV0aG9kcyk7XG5cbiAgaWYgKGNvbmZsaWN0aW5nUHJvcHMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcihgQXR0ZW1wdGVkIHVzZSBvZiByZXZlcnNlZCBQb2x5bWVyIHByb3BlcnR5IG5hbWVzIGZvdW5kLiBQbGVhc2UgcmV2aXNlIHRoZSBmb2xsb3cgcHJvcGVydHkgbmFtZXMgaW4geW91ciBjb21wb25lbnQgdG8gc29tZXRoaW5nIGVsc2UuXG4gICAgICBDb21wb25lbnQgaW4gY29uZmxpY3Q6ICR7Y29tcC5pcyB8fCBiZWhhdmlvdXJ9XG4gICAgICBQcm9wZXJ0aWVzIGluIGNvbmZsaWN0OiAke2NvbmZsaWN0aW5nUHJvcHMuam9pbignLCAnKX1gKTtcbiAgfVxuXG4gIGlmIChjb25mbGljdGluZ01ldGhvZHMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcihgQXR0ZW1wdGVkIHVzZSBvZiByZXZlcnNlZCBQb2x5bWVyIG1ldGhvZCBuYW1lcyBmb3VuZC4gUGxlYXNlIHJldmlzZSB0aGUgZm9sbG93IG1ldGhvZCBuYW1lcyBpbiB5b3VyIGNvbXBvbmVudCB0byBzb21ldGhpbmcgZWxzZS5cbiAgICBDb21wb25lbnQgaW4gY29uZmxpY3Q6ICR7Y29tcC5pcyB8fCBiZWhhdmlvdXJ9XG4gICAgTWV0aG9kcyBpbiBDb25mbGljdDogJHtjb25mbGljdGluZ01ldGhvZHMuam9pbignLCAnKX1gKTtcbiAgfVxufTtcblxuZXhwb3J0IHtwb2x5bWVySW50ZWdyaXR5fTtcbiIsIi8qXG4gIF8gICBfIF9fX19fIF8gICBfICBfX19fIF9fX19fICAgX1xuIHwgfCB8IHwgX19fX3wgXFwgfCB8LyBfX198IF9fX198IChfKSBfX19cbiB8IHxffCB8ICBffCB8ICBcXHwgfCB8ICAgfCAgX3wgICB8IHwvIF8gXFxcbiB8ICBfICB8IHxfX198IHxcXCAgfCB8X19ffCB8X19fIF98IHwgKF8pIHxcbiB8X3wgfF98X19fX198X3wgXFxffFxcX19fX3xfX19fXyhfKV98XFxfX18vXG5cbiMjIENvbXBvbmVudCBUeXBlIE1ldGhvZG9sb2d5XG5cbiMjIyBTY2hlbWFcblxuU2NoZW1hIGNvbXBvbmVudHMgZGVmaW5lIGFuZCBoZWxwIGRhdGEgYWRoZXJlIHRvIGEgc3RyaWN0IGZvcm1hdCwgZmllbGQgdHlwZSwgYW5kIHZhbGlkYXRpb24gbWV0aG9kcyBmb3IgZGF0YVxuaW50ZWdyaXR5IGFuZCB0cmFuc3BvcnQuIEFsbCBBUEkgaW50ZXJhY3Rpb24gb2NjdXJzIHRocm91Z2ggdGhlc2UgY29tcG9uZW50cywgYW5kIGl0IGhlbHBzIHRvIGZhY2lsaXRhdGUgc2VydmluZyBkYXRhXG4gdG8gdGhlIE1vZGVsIGNvbXBvbmVudHMuIFRoZXNlIGNvbXBvbmVudHMgaGF2ZSAwIGNvbnNpZGVyYXRpb24gZm9yIFVJIGFuZCBhcmUgdXRpbGl6ZWQgZXhjbHVzaXZlbHkgZm9yIHRoZWlyIGRhdGFcbiBtYW5hZ2VtZW50LlxuXG5CZWNhdXNlIG9mIHRoZSBpbnRlcm9wZXJhYmxlIG5hdHVyZSBvZiB0aGVzZSBjb21wb25lbnRzLCB0aGV5IGFyZSBzdGlsbCBhYmxlIHRvIGVmZmVjdGl2ZWx5IGJlIGxldmVyYWdlZCBvbiB0aGVcbnNlcnZlciBBUEkgc2lkZSBvZiB5b3VyIHByb2plY3QsIGlmIE5vZGUvaW9qcyBiYXNlZCwgYWxsb3dpbmcgdGhlIGRhdGEgdmFsaWRhdGlvbiBtZXRob2RzIHRvIHN1cHBvcnQgZnJvbnQgYW5kXG5iYWNrZW5kLCByZWR1Y2luZyB0aGUgbmVlZCBmb3IgZGl2ZXJnZW50IHNjaGVtYXMgb3ZlciBkaWZmZXJlbnQgcGFydHMgb2YgdGhlIHByb2plY3QuXG5cbiovXG4vKipcbiAqIEBtb2R1bGUgaGVuY2Utc2NoZW1hXG4gKi9cblxuaW1wb3J0IHtwb2x5bWVySW50ZWdyaXR5fSBmcm9tICcuL3BvbHltZXJJbnRlZ3JpdHknO1xuaW1wb3J0IHtIZW5jZUNvbXB9IGZyb20gJy4vY29yZSc7XG5cbmltcG9ydCBjb25zb2xlIGZyb20gJ2NvbnNvbGVyJztcblxuaW1wb3J0IF9leHRlbmQgZnJvbSAnbG9kYXNoL29iamVjdC9leHRlbmQnO1xuaW1wb3J0IF9kZWZhdWx0cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2RlZmF1bHRzJztcbmltcG9ydCBfZWFjaCBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbi9lYWNoJztcbmltcG9ydCBfY2xvbmUgZnJvbSAnbG9kYXNoL2xhbmcvY2xvbmVEZWVwJztcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbCBUaGUgY29tcG9uZW50IGJlaW5nIGRlZmluZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgY29tcG9uZW50LCBiYXNlZCBvbiBIZW5jZUNvbXAsIHdpdGggc29tZSBhZGRlZCBNb2RlbCBzcGVjaWZpYyBmdW5jdGlvbmFsaXR5LlxuICovXG5sZXQgSGVuY2VTY2hlbWEgPSAob3JpZ2luYWwpPT4ge1xuICBsZXQgY29tcCA9IF9jbG9uZShvcmlnaW5hbCk7XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEluaXRpYWxpemF0aW9uXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgX2V4dGVuZChjb21wLnByb3BlcnRpZXMsIHtcbiAgICBleGVjdXRlT25Mb2FkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIGFjdGlvbjogU3RyaW5nLFxuICAgIHF1ZXJ5OiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICB2YWx1ZTogKCk9PiB7IHJldHVybiB7fTsgfVxuICAgIH0sXG4gICAgcmVzdWx0czoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgIG5vdGlmeTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogRWxlbWVudCBET00gSG9va3NcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgX2V4dGVuZChjb21wLCB7XG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgY29tcG9uZW50IGhhcyBsb2FkZWQgYW5kIGlzIHJlYWR5LCBhdXRvIHRyaWdnZXIgdGhlIGV4ZWN1dGVRdWVyeSBtZXRob2QsIGlmIGRlc2lyZWQuXG4gICAgICovXG4gICAgICByZWFkeSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHNlbGYuZXhlY3V0ZU9uTG9hZCkge1xuICAgICAgICBzZWxmLmV4ZWN1dGVRdWVyeSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHVibGljIGZhY2luZyBleGVjdXRlIG1ldGhvZCBhbGxvd2luZyB0aGlzIGZ1bmN0aW9uIHRvIGJlIHRyaWdnZXJlZCBtYW51YWxseSBhcyBuZWVkZWQsIG9yIHJlLXRyaWdnZXJlZCBhdFxuICAgICAqIHdpbGxcbiAgICAgKi9cbiAgICAgIGV4ZWN1dGVRdWVyeSgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgc2VsZi5fZXhlY3V0ZVF1ZXJ5KChlcnIsIHJlc3VsdHMpPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ0hlbmNlU2NoZW1hOjpfZXhlY3V0ZVF1ZXJ5JywgZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuX3NldFJlc3VsdHMocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEVsZW1lbnQgQmVoYXZpb3VyXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIF9kZWZhdWx0cyhjb21wLCB7XG4gICAgX2V4ZWN1dGVRdWVyeShkb25lKSB7XG4gICAgICBkb25lKCdEZWZhdWx0IG1ldGhvZCBydW5uaW5nISBQbGVhc2Ugb3ZlcnJpZGUgaXQuJyk7IC8vIHJldHVybiBhbiBlcnJvciwgc2luY2UgdGhpcyBzaG91bGQgb2YgYmVlbiBvdmVycmlkZGVuXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gSGVuY2VDb21wKGNvbXApO1xufTtcblxuZXhwb3J0IHtIZW5jZVNjaGVtYX07XG4iLCIvKlxuICBfICAgXyBfX19fXyBfICAgXyAgX19fXyBfX19fXyAgIF9cbiB8IHwgfCB8IF9fX198IFxcIHwgfC8gX19ffCBfX19ffCAoXykgX19fXG4gfCB8X3wgfCAgX3wgfCAgXFx8IHwgfCAgIHwgIF98ICAgfCB8LyBfIFxcXG4gfCAgXyAgfCB8X19ffCB8XFwgIHwgfF9fX3wgfF9fXyBffCB8IChfKSB8XG4gfF98IHxffF9fX19ffF98IFxcX3xcXF9fX198X19fX18oXylffFxcX19fL1xuXG4jIyBDb21wb25lbnQgVHlwZSBNZXRob2RvbG9neVxuXG4jIyMgVUlcblxuVUkgY29tcG9uZW50cyBhcmUgdGhlIG1vc3QgZGl2ZXJzZSBIZW5jZSBDb21wb25lbnQgdHlwZSwgYW5kIGFyZSBkZXJpdmVkIGZyb20gdGhlIGJhc2UgSGVuY2VDb21wIG9iamVjdC5cblxuUG9seW1lcnMgbmF0aXZlIGZ1bmN0aW9uYWxseSBiZXlvbmQgdGhpcyBsYXJnZWx5IHByb3ZpZGVzIGV2ZXJ5dGhpbmcgd2UgbmVlZCB0byBtYWtlIHBvd2VyZnVsIGFuZCBlZmZlY3RpdmUgVUlcbmNvbXBvbmVudHMuXG5cblRoZXNlIGNvbXBvbmVudHMgYXJlIGRlc2lnbmVkIHRvIGJlIGRhdGEgYWdub3N0aWMuIEV2ZXJ5IHBvc3NpYmxlIHBpZWNlIG9mIHRleHQsIGltYWdlLCBpY29ucywgbGlua3Mgb3IgbW9yZSBjb21wbGV4XG5lbGVtZW50cyBhcmUgY29uZmlndXJhYmxlIGFuZCBjYW4gYmUgcmVuZGVyZWQgYnkgb3RoZXIgY29tcG9uZW50cy4gRXZlbnRzIGRlYWxpbmcgd2l0aCBkYXRhIGFyZSBob29rcyBmaXJlZCB3aGVuXG50cmlnZ2VyZWQgYmFjayB0byB0aGUgY29tcG9uZW50IHdoaWNoIGltcGxlbWVudGVkIGl0LCB3aGlsZSBzb21lIGludGVybmFsIGV2ZW50cyBtYXkgZXhpc3QgaW4gaXNvbGF0aW9uIHRvIHN1cHBvcnRcbmludGVyYWN0aW9uIG9yIG5vbi1kYXRhIGJhc2VkIGJlaGF2aW91ci5cblxuKi9cbi8qKlxuICogQG1vZHVsZSBoZW5jZS11aVxuICovXG5cbmltcG9ydCB7cG9seW1lckludGVncml0eX0gZnJvbSAnLi9wb2x5bWVySW50ZWdyaXR5JztcbmltcG9ydCB7SGVuY2VDb21wfSBmcm9tICcuL2NvcmUnO1xuXG5pbXBvcnQgY29uc29sZSBmcm9tICdjb25zb2xlcic7XG5cbmltcG9ydCBfZXh0ZW5kIGZyb20gJ2xvZGFzaC9vYmplY3QvZXh0ZW5kJztcbmltcG9ydCBfZGVmYXVsdHMgZnJvbSAnbG9kYXNoL29iamVjdC9kZWZhdWx0cyc7XG5pbXBvcnQgX2VhY2ggZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vZWFjaCc7XG5pbXBvcnQgX2Nsb25lIGZyb20gJ2xvZGFzaC9sYW5nL2Nsb25lRGVlcCc7XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3JpZ2luYWwgVGhlIGNvbXBvbmVudCBiZWluZyBkZWZpbmVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIGNvbXBvbmVudCwgYmFzZWQgb24gSGVuY2VDb21wLCB3aXRoIHNvbWUgYWRkZWQgTW9kZWwgc3BlY2lmaWMgZnVuY3Rpb25hbGl0eS5cbiAqL1xubGV0IEhlbmNlVWkgPSAob3JpZ2luYWwpPT4ge1xuICBsZXQgY29tcCA9IF9jbG9uZShvcmlnaW5hbCk7XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEluaXRpYWxpemF0aW9uXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgX2V4dGVuZChjb21wLnByb3BlcnRpZXMsIHtcbiAgfSk7XG5cbiAgX2V4dGVuZChjb21wLCB7XG4gIH0pO1xuXG4gIF9kZWZhdWx0cyhjb21wLCB7XG4gIH0pO1xuXG4gIHJldHVybiBIZW5jZUNvbXAoY29tcCk7XG59O1xuXG5leHBvcnQge0hlbmNlVWl9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBAbW9kdWxlIGNvbnNvbGVyXG4gKi9cblxuLyoqXG4gKiBBIGJhc2ljIEVTNiBjb25zb2xlIGZhaWwgc2FmZSB3cmFwcGVyXG4gKi9cbmxldCBjb25zb2xlciA9IHtcbiAgLyoqKioqKioqKioqKipcbiAgICogUGFyYW1zXG4gICAqKioqKioqKioqKiovXG4gIGVuYWJsZWQ6ICEhKHdpbmRvdy5jb25zb2xlKSxcbiAgLyoqKioqKioqKioqKipcbiAgICogUHJpdmF0ZVxuICAgKioqKioqKioqKioqL1xuICAgIF9tc2codHlwZSwgYXJncykge1xuICAgIC8vIElmIGNvbnNvbGUgaXNuJ3QgYXZhaWxhYmxlLCBvciBubyBhcmdzIHdlcmUgc2VudCwgb3IgY2FsbCB0eXBlIGlzIG1pc3NpbmcsIGJ5cGFzc1xuICAgIGlmICghdGhpcy5lbmFibGVkIHx8ICFhcmdzLmxlbmd0aCB8fCB0eXBlb2Ygd2luZG93LmNvbnNvbGVbdHlwZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3aW5kb3cuY29uc29sZVt0eXBlXS5hcHBseSh3aW5kb3cuY29uc29sZSwgYXJncyk7XG4gIH0sXG4gIC8qKioqKioqKioqKioqXG4gICAqIFB1YmxpY1xuICAgKioqKioqKioqKioqL1xuICAgIGxvZygpIHtcbiAgICB0aGlzLl9tc2coJ2xvZycsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHdhcm4oKSB7XG4gICAgdGhpcy5fbXNnKCd3YXJuJywgYXJndW1lbnRzKTtcbiAgfSxcbiAgZXJyb3IoKSB7XG4gICAgdGhpcy5fbXNnKCdlcnJvcicsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHRyYWNlKCkge1xuICAgIHRoaXMuX21zZygndHJhY2UnLCBhcmd1bWVudHMpO1xuICB9LFxuICBncm91cChsYWJlbCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQgJiYgdHlwZW9mIHdpbmRvdy5jb25zb2xlLmdyb3VwRW5kID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmdyb3VwQ29sbGFwc2VkKGxhYmVsKTtcbiAgICB9XG4gIH0sXG4gIGdyb3VwRW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCAmJiB0eXBlb2YgY29uc29sZS5ncm91cEVuZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3aW5kb3cuY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uc29sZXI7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlSW5kZXhPZicpLFxuICAgIGNhY2hlSW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NhY2hlSW5kZXhPZicpLFxuICAgIGNyZWF0ZUNhY2hlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQ2FjaGUnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vcmVzdFBhcmFtJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB1bmlxdWUgdmFsdWVzIHRoYXQgYXJlIGluY2x1ZGVkIGluIGFsbCBvZiB0aGUgcHJvdmlkZWRcbiAqIGFycmF5cyB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHNoYXJlZCB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICogXy5pbnRlcnNlY3Rpb24oWzEsIDJdLCBbNCwgMl0sIFsyLCAxXSk7XG4gKiAvLyA9PiBbMl1cbiAqL1xudmFyIGludGVyc2VjdGlvbiA9IHJlc3RQYXJhbShmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIG90aExlbmd0aCA9IGFycmF5cy5sZW5ndGgsXG4gICAgICBvdGhJbmRleCA9IG90aExlbmd0aCxcbiAgICAgIGNhY2hlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5c1tvdGhJbmRleF0gPSBpc0FycmF5TGlrZSh2YWx1ZSA9IGFycmF5c1tvdGhJbmRleF0pID8gdmFsdWUgOiBbXTtcbiAgICBjYWNoZXNbb3RoSW5kZXhdID0gKGlzQ29tbW9uICYmIHZhbHVlLmxlbmd0aCA+PSAxMjApID8gY3JlYXRlQ2FjaGUob3RoSW5kZXggJiYgdmFsdWUpIDogbnVsbDtcbiAgfVxuICB2YXIgYXJyYXkgPSBhcnJheXNbMF0sXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgc2VlbiA9IGNhY2hlc1swXTtcblxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoKHNlZW4gPyBjYWNoZUluZGV4T2Yoc2VlbiwgdmFsdWUpIDogaW5kZXhPZihyZXN1bHQsIHZhbHVlLCAwKSkgPCAwKSB7XG4gICAgICB2YXIgb3RoSW5kZXggPSBvdGhMZW5ndGg7XG4gICAgICB3aGlsZSAoLS1vdGhJbmRleCkge1xuICAgICAgICB2YXIgY2FjaGUgPSBjYWNoZXNbb3RoSW5kZXhdO1xuICAgICAgICBpZiAoKGNhY2hlID8gY2FjaGVJbmRleE9mKGNhY2hlLCB2YWx1ZSkgOiBpbmRleE9mKGFycmF5c1tvdGhJbmRleF0sIHZhbHVlLCAwKSkgPCAwKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZWVuKSB7XG4gICAgICAgIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3Rpb247XG4iLCIvKipcbiAqIEdldHMgdGhlIGxhc3QgZWxlbWVudCBvZiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5sYXN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAzXG4gKi9cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGFycmF5W2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxhc3Q7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRmxhdHRlbicpLFxuICAgIGJhc2VVbmlxID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVVuaXEnKSxcbiAgICByZXN0UGFyYW0gPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9yZXN0UGFyYW0nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMsIGluIG9yZGVyLCBmcm9tIGFsbCBvZiB0aGUgcHJvdmlkZWQgYXJyYXlzXG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgQXJyYXlcbiAqIEBwYXJhbSB7Li4uQXJyYXl9IFthcnJheXNdIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGNvbWJpbmVkIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51bmlvbihbMSwgMl0sIFs0LCAyXSwgWzIsIDFdKTtcbiAqIC8vID0+IFsxLCAyLCA0XVxuICovXG52YXIgdW5pb24gPSByZXN0UGFyYW0oZnVuY3Rpb24oYXJyYXlzKSB7XG4gIHJldHVybiBiYXNlVW5pcShiYXNlRmxhdHRlbihhcnJheXMsIGZhbHNlLCB0cnVlKSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmlvbjtcbiIsInZhciBiYXNlRGlmZmVyZW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VEaWZmZXJlbmNlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIHJlc3RQYXJhbSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9uL3Jlc3RQYXJhbScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgZXhjbHVkaW5nIGFsbCBwcm92aWRlZCB2YWx1ZXMgdXNpbmdcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZpbHRlci5cbiAqIEBwYXJhbSB7Li4uKn0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLndpdGhvdXQoWzEsIDIsIDEsIDNdLCAxLCAyKTtcbiAqIC8vID0+IFszXVxuICovXG52YXIgd2l0aG91dCA9IHJlc3RQYXJhbShmdW5jdGlvbihhcnJheSwgdmFsdWVzKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShhcnJheSlcbiAgICA/IGJhc2VEaWZmZXJlbmNlKGFycmF5LCB2YWx1ZXMpXG4gICAgOiBbXTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdpdGhvdXQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZm9yRWFjaCcpO1xuIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5RWFjaCcpLFxuICAgIGJhc2VFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUVhY2gnKSxcbiAgICBjcmVhdGVGb3JFYWNoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlRm9yRWFjaCcpO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gIGludm9raW5nIGBpdGVyYXRlZWAgZm9yIGVhY2ggZWxlbWVudC5cbiAqIFRoZSBgaXRlcmF0ZWVgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czpcbiAqICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseVxuICogYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIiBwcm9wZXJ0eVxuICogYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIGBfLmZvckluYCBvciBgXy5mb3JPd25gXG4gKiBtYXkgYmUgdXNlZCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGl0ZXJhdGVlYC5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8c3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24obikge1xuICogICBjb25zb2xlLmxvZyhuKTtcbiAqIH0pLnZhbHVlKCk7XG4gKiAvLyA9PiBsb2dzIGVhY2ggdmFsdWUgZnJvbSBsZWZ0IHRvIHJpZ2h0IGFuZCByZXR1cm5zIHRoZSBhcnJheVxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKG4sIGtleSkge1xuICogICBjb25zb2xlLmxvZyhuLCBrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzIGVhY2ggdmFsdWUta2V5IHBhaXIgYW5kIHJldHVybnMgdGhlIG9iamVjdCAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG52YXIgZm9yRWFjaCA9IGNyZWF0ZUZvckVhY2goYXJyYXlFYWNoLCBiYXNlRWFjaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcbiIsIi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICogY3JlYXRlZCBmdW5jdGlvbiBhbmQgYXJndW1lbnRzIGZyb20gYHN0YXJ0YCBhbmQgYmV5b25kIHByb3ZpZGVkIGFzIGFuIGFycmF5LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBiYXNlZCBvbiB0aGUgW3Jlc3QgcGFyYW1ldGVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9GdW5jdGlvbnMvcmVzdF9wYXJhbWV0ZXJzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBzYXkgPSBfLnJlc3RQYXJhbShmdW5jdGlvbih3aGF0LCBuYW1lcykge1xuICogICByZXR1cm4gd2hhdCArICcgJyArIF8uaW5pdGlhbChuYW1lcykuam9pbignLCAnKSArXG4gKiAgICAgKF8uc2l6ZShuYW1lcykgPiAxID8gJywgJiAnIDogJycpICsgXy5sYXN0KG5hbWVzKTtcbiAqIH0pO1xuICpcbiAqIHNheSgnaGVsbG8nLCAnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcycpO1xuICogLy8gPT4gJ2hlbGxvIGZyZWQsIGJhcm5leSwgJiBwZWJibGVzJ1xuICovXG5mdW5jdGlvbiByZXN0UGFyYW0oZnVuYywgc3RhcnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogKCtzdGFydCB8fCAwKSwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN0W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIHN3aXRjaCAoc3RhcnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCByZXN0KTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCByZXN0KTtcbiAgICB9XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgaW5kZXggPSAtMTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSByZXN0O1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzdFBhcmFtO1xuIiwidmFyIGNhY2hlUHVzaCA9IHJlcXVpcmUoJy4vY2FjaGVQdXNoJyksXG4gICAgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9nZXROYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUoZ2xvYmFsLCAnU2V0Jyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGEgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgbGVuZ3RoID0gdmFsdWVzID8gdmFsdWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5kYXRhID0geyAnaGFzaCc6IG5hdGl2ZUNyZWF0ZShudWxsKSwgJ3NldCc6IG5ldyBTZXQgfTtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdGhpcy5wdXNoKHZhbHVlc1tsZW5ndGhdKTtcbiAgfVxufVxuXG4vLyBBZGQgZnVuY3Rpb25zIHRvIHRoZSBgU2V0YCBjYWNoZS5cblNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gY2FjaGVQdXNoO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldENhY2hlO1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUNvcHkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlDb3B5O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheVB1c2g7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5U29tZTtcbiIsIi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25gIHVzZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBvYmplY3RWYWx1ZSBUaGUgZGVzdGluYXRpb24gb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHBhcmFtIHsqfSBzb3VyY2VWYWx1ZSBUaGUgc291cmNlIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdHMob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RWYWx1ZSA9PT0gdW5kZWZpbmVkID8gc291cmNlVmFsdWUgOiBvYmplY3RWYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25EZWZhdWx0cztcbiIsInZhciBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uYXNzaWduYCBmb3IgY3VzdG9taXppbmcgYXNzaWduZWQgdmFsdWVzIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLCBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgXG4gKiBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYXNzaWduV2l0aChvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHByb3BzID0ga2V5cyhzb3VyY2UpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplcih2YWx1ZSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuXG4gICAgaWYgKChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSB8fFxuICAgICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduV2l0aDtcbiIsInZhciBiYXNlQ29weSA9IHJlcXVpcmUoJy4vYmFzZUNvcHknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIHNvdXJjZSA9PSBudWxsXG4gICAgPyBvYmplY3RcbiAgICA6IGJhc2VDb3B5KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi9hcnJheUNvcHknKSxcbiAgICBhcnJheUVhY2ggPSByZXF1aXJlKCcuL2FycmF5RWFjaCcpLFxuICAgIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuL2Jhc2VBc3NpZ24nKSxcbiAgICBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9iYXNlRm9yT3duJyksXG4gICAgaW5pdENsb25lQXJyYXkgPSByZXF1aXJlKCcuL2luaXRDbG9uZUFycmF5JyksXG4gICAgaW5pdENsb25lQnlUYWcgPSByZXF1aXJlKCcuL2luaXRDbG9uZUJ5VGFnJyksXG4gICAgaW5pdENsb25lT2JqZWN0ID0gcmVxdWlyZSgnLi9pbml0Q2xvbmVPYmplY3QnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2Jvb2xUYWddID1cbmNsb25lYWJsZVRhZ3NbZGF0ZVRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQ2NFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDhUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nXG4gKiBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgYHZhbHVlYCBiZWxvbmdzIHRvLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgY2xvbmVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICByZXN1bHQgPSBvYmplY3QgPyBjdXN0b21pemVyKHZhbHVlLCBrZXksIG9iamVjdCkgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBhcnJheUNvcHkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWc7XG5cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNsb25lYWJsZVRhZ3NbdGFnXVxuICAgICAgICA/IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGlzRGVlcClcbiAgICAgICAgOiAob2JqZWN0ID8gdmFsdWUgOiB7fSk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgY2xvbmUuXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF07XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlIGl0IHdpdGggaXRzIGNsb25lLlxuICBzdGFja0EucHVzaCh2YWx1ZSk7XG4gIHN0YWNrQi5wdXNoKHJlc3VsdCk7XG5cbiAgLy8gUmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgKGlzQXJyID8gYXJyYXlFYWNoIDogYmFzZUZvck93bikodmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRba2V5XSA9IGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBjdXN0b21pemVyLCBrZXksIHZhbHVlLCBzdGFja0EsIHN0YWNrQik7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDbG9uZTtcbiIsIi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBwcm9wcywgb2JqZWN0KSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL2Jhc2VJbmRleE9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnLi9jYWNoZUluZGV4T2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJy4vY3JlYXRlQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5kaWZmZXJlbmNlYCB3aGljaCBhY2NlcHRzIGEgc2luZ2xlIGFycmF5XG4gKiBvZiB2YWx1ZXMgdG8gZXhjbHVkZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBleGNsdWRlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgZmlsdGVyZWQgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlRGlmZmVyZW5jZShhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBpZiAoIWxlbmd0aCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpbmRleE9mID0gYmFzZUluZGV4T2YsXG4gICAgICBpc0NvbW1vbiA9IHRydWUsXG4gICAgICBjYWNoZSA9IChpc0NvbW1vbiAmJiB2YWx1ZXMubGVuZ3RoID49IExBUkdFX0FSUkFZX1NJWkUpID8gY3JlYXRlQ2FjaGUodmFsdWVzKSA6IG51bGwsXG4gICAgICB2YWx1ZXNMZW5ndGggPSB2YWx1ZXMubGVuZ3RoO1xuXG4gIGlmIChjYWNoZSkge1xuICAgIGluZGV4T2YgPSBjYWNoZUluZGV4T2Y7XG4gICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB2YWx1ZXMgPSBjYWNoZTtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICBpZiAoaXNDb21tb24gJiYgdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWVzSW5kZXggPSB2YWx1ZXNMZW5ndGg7XG4gICAgICB3aGlsZSAodmFsdWVzSW5kZXgtLSkge1xuICAgICAgICBpZiAodmFsdWVzW3ZhbHVlc0luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleE9mKHZhbHVlcywgdmFsdWUsIDApIDwgMCkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VEaWZmZXJlbmNlO1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL2Jhc2VGb3JPd24nKSxcbiAgICBjcmVhdGVCYXNlRWFjaCA9IHJlcXVpcmUoJy4vY3JlYXRlQmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFYWNoO1xuIiwidmFyIGFycmF5UHVzaCA9IHJlcXVpcmUoJy4vYXJyYXlQdXNoJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBhZGRlZCBzdXBwb3J0IGZvciByZXN0cmljdGluZ1xuICogZmxhdHRlbmluZyBhbmQgc3BlY2lmeWluZyB0aGUgc3RhcnQgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IGZsYXR0ZW5pbmcgdG8gYXJyYXlzLWxpa2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtyZXN1bHQ9W11dIFRoZSBpbml0aWFsIHJlc3VsdCB2YWx1ZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGlzRGVlcCwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICAgICAgKGlzU3RyaWN0IHx8IGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgYmFzZUZsYXR0ZW4odmFsdWUsIGlzRGVlcCwgaXNTdHJpY3QsIHJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheVB1c2gocmVzdWx0LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNTdHJpY3QpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGbGF0dGVuO1xuIiwidmFyIGNyZWF0ZUJhc2VGb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0cmluZyBwYXRoc1xuICogYW5kIGRlZmF1bHQgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gW3BhdGhLZXldIFRoZSBrZXkgcmVwcmVzZW50YXRpb24gb2YgcGF0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgsIHBhdGhLZXkpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXRoS2V5ICE9PSB1bmRlZmluZWQgJiYgcGF0aEtleSBpbiB0b09iamVjdChvYmplY3QpKSB7XG4gICAgcGF0aCA9IFtwYXRoS2V5XTtcbiAgfVxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3BhdGhbaW5kZXgrK11dO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0O1xuIiwidmFyIGluZGV4T2ZOYU4gPSByZXF1aXJlKCcuL2luZGV4T2ZOYU4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pbmRleE9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGJpbmFyeSBzZWFyY2hlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gaW5kZXhPZk5hTihhcnJheSwgZnJvbUluZGV4KTtcbiAgfVxuICB2YXIgaW5kZXggPSBmcm9tSW5kZXggLSAxLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJbmRleE9mO1xuIiwidmFyIGJhc2VJc0VxdWFsRGVlcCA9IHJlcXVpcmUoJy4vYmFzZUlzRXF1YWxEZWVwJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwidmFyIGVxdWFsQXJyYXlzID0gcmVxdWlyZSgnLi9lcXVhbEFycmF5cycpLFxuICAgIGVxdWFsQnlUYWcgPSByZXF1aXJlKCcuL2VxdWFsQnlUYWcnKSxcbiAgICBlcXVhbE9iamVjdHMgPSByZXF1aXJlKCcuL2VxdWFsT2JqZWN0cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IG9ialRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICBpZiAob2JqVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG9ialRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG9ialRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG9iaklzQXJyID0gaXNUeXBlZEFycmF5KG9iamVjdCk7XG4gICAgfVxuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG90aGVyKTtcbiAgICBpZiAob3RoVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG90aFRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG90aFRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG90aElzQXJyID0gaXNUeXBlZEFycmF5KG90aGVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhKG9iaklzQXJyIHx8IG9iaklzT2JqKSkge1xuICAgIHJldHVybiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZyk7XG4gIH1cbiAgaWYgKCFpc0xvb3NlKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gZGV0ZWN0aW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgc2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jSk8uXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IG90aGVyO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYG9iamVjdGAgYW5kIGBvdGhlcmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBzdGFja0EucHVzaChvYmplY3QpO1xuICBzdGFja0IucHVzaChvdGhlcik7XG5cbiAgdmFyIHJlc3VsdCA9IChvYmpJc0FyciA/IGVxdWFsQXJyYXlzIDogZXF1YWxPYmplY3RzKShvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcblxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcbiIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL2FycmF5RWFjaCcpLFxuICAgIGJhc2VNZXJnZURlZXAgPSByZXF1aXJlKCcuL2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgdmFsdWVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICB2YXIgaXNTcmNBcnIgPSBpc0FycmF5TGlrZShzb3VyY2UpICYmIChpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpLFxuICAgICAgcHJvcHMgPSBpc1NyY0FyciA/IHVuZGVmaW5lZCA6IGtleXMoc291cmNlKTtcblxuICBhcnJheUVhY2gocHJvcHMgfHwgc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzcmNWYWx1ZTtcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc09iamVjdExpa2Uoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgICAgIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpIDogdW5kZWZpbmVkLFxuICAgICAgICAgIGlzQ29tbW9uID0gcmVzdWx0ID09PSB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChpc0NvbW1vbikge1xuICAgICAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICgocmVzdWx0ICE9PSB1bmRlZmluZWQgfHwgKGlzU3JjQXJyICYmICEoa2V5IGluIG9iamVjdCkpKSAmJlxuICAgICAgICAgIChpc0NvbW1vbiB8fCAocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkpKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlO1xuIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4vYXJyYXlDb3B5JyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gc3JjVmFsdWUpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc3RhY2tCW2xlbmd0aF07XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGlzQ29tbW9uID0gcmVzdWx0ID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXlMaWtlKHNyY1ZhbHVlKSAmJiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiAoaXNBcnJheUxpa2UodmFsdWUpID8gYXJyYXlDb3B5KHZhbHVlKSA6IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSBpc0FyZ3VtZW50cyh2YWx1ZSlcbiAgICAgICAgPyB0b1BsYWluT2JqZWN0KHZhbHVlKVxuICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlXG4gIC8vIGl0IHdpdGggaXRzIG1lcmdlZCB2YWx1ZS5cbiAgc3RhY2tBLnB1c2goc3JjVmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG9iamVjdFtrZXldID0gbWVyZ2VGdW5jKHJlc3VsdCwgc3JjVmFsdWUsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IHJlc3VsdCA/IChyZXN1bHQgIT09IHZhbHVlKSA6ICh2YWx1ZSA9PT0gdmFsdWUpKSB7XG4gICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2VEZWVwO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlUHJvcGVydHk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgc3RhcnQgPSBzdGFydCA9PSBudWxsID8gMCA6ICgrc3RhcnQgfHwgMCk7XG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiBsZW5ndGgpID8gbGVuZ3RoIDogKCtlbmQgfHwgMCk7XG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlbmd0aDtcbiAgfVxuICBsZW5ndGggPSBzdGFydCA+IGVuZCA/IDAgOiAoKGVuZCAtIHN0YXJ0KSA+Pj4gMCk7XG4gIHN0YXJ0ID4+Pj0gMDtcblxuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2xpY2U7XG4iLCIvKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCJ2YXIgYmFzZUluZGV4T2YgPSByZXF1aXJlKCcuL2Jhc2VJbmRleE9mJyksXG4gICAgY2FjaGVJbmRleE9mID0gcmVxdWlyZSgnLi9jYWNoZUluZGV4T2YnKSxcbiAgICBjcmVhdGVDYWNoZSA9IHJlcXVpcmUoJy4vY3JlYXRlQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmlxYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrIHNob3J0aGFuZHNcbiAqIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBkdXBsaWNhdGUtdmFsdWUtZnJlZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuaXEoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaW5kZXhPZiA9IGJhc2VJbmRleE9mLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaXNDb21tb24gPSB0cnVlLFxuICAgICAgaXNMYXJnZSA9IGlzQ29tbW9uICYmIGxlbmd0aCA+PSBMQVJHRV9BUlJBWV9TSVpFLFxuICAgICAgc2VlbiA9IGlzTGFyZ2UgPyBjcmVhdGVDYWNoZSgpIDogbnVsbCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGlmIChzZWVuKSB7XG4gICAgaW5kZXhPZiA9IGNhY2hlSW5kZXhPZjtcbiAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlzTGFyZ2UgPSBmYWxzZTtcbiAgICBzZWVuID0gaXRlcmF0ZWUgPyBbXSA6IHJlc3VsdDtcbiAgfVxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgaWYgKGlzQ29tbW9uICYmIHZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgdmFyIHNlZW5JbmRleCA9IHNlZW4ubGVuZ3RoO1xuICAgICAgd2hpbGUgKHNlZW5JbmRleC0tKSB7XG4gICAgICAgIGlmIChzZWVuW3NlZW5JbmRleF0gPT09IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbmRleE9mKHNlZW4sIGNvbXB1dGVkLCAwKSA8IDApIHtcbiAgICAgIGlmIChpdGVyYXRlZSB8fCBpc0xhcmdlKSB7XG4gICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuaXE7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodGhpc0FyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIiwiLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBBcnJheUJ1ZmZlciA9IGdsb2JhbC5BcnJheUJ1ZmZlcixcbiAgICBVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBnaXZlbiBhcnJheSBidWZmZXIuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBidWZmZXJDbG9uZShidWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXIuYnl0ZUxlbmd0aCksXG4gICAgICB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcblxuICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWZmZXJDbG9uZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiBgY2FjaGVgIG1pbWlja2luZyB0aGUgcmV0dXJuIHNpZ25hdHVyZSBvZlxuICogYF8uaW5kZXhPZmAgYnkgcmV0dXJuaW5nIGAwYCBpZiB0aGUgdmFsdWUgaXMgZm91bmQsIGVsc2UgYC0xYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBzZWFyY2guXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgMGAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBjYWNoZUluZGV4T2YoY2FjaGUsIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gY2FjaGUuZGF0YSxcbiAgICAgIHJlc3VsdCA9ICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNPYmplY3QodmFsdWUpKSA/IGRhdGEuc2V0Lmhhcyh2YWx1ZSkgOiBkYXRhLmhhc2hbdmFsdWVdO1xuXG4gIHJldHVybiByZXN1bHQgPyAwIDogLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVJbmRleE9mO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byB0aGUgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHB1c2hcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIGNhY2hlUHVzaCh2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICBkYXRhLnNldC5hZGQodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGEuaGFzaFt2YWx1ZV0gPSB0cnVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FjaGVQdXNoO1xuIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL2lzSXRlcmF0ZWVDYWxsJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnLi4vZnVuY3Rpb24vcmVzdFBhcmFtJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBfLmFzc2lnbmAsIGBfLmRlZmF1bHRzYCwgb3IgYF8ubWVyZ2VgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gcmVzdFBhcmFtKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzW2xlbmd0aCAtIDJdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkLFxuICAgICAgICB0aGlzQXJnID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCA1KTtcbiAgICAgIGxlbmd0aCAtPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXN0b21pemVyID0gdHlwZW9mIHRoaXNBcmcgPT0gJ2Z1bmN0aW9uJyA/IHRoaXNBcmcgOiB1bmRlZmluZWQ7XG4gICAgICBsZW5ndGggLT0gKGN1c3RvbWl6ZXIgPyAxIDogMCk7XG4gICAgfVxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG4iLCJ2YXIgZ2V0TGVuZ3RoID0gcmVxdWlyZSgnLi9nZXRMZW5ndGgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pIDogMDtcbiAgICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRWFjaDtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgYF8uZm9ySW5gIG9yIGBfLmZvckluUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJhc2VGb3I7XG4iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL1NldENhY2hlJyksXG4gICAgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9nZXROYXRpdmUnKTtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUoZ2xvYmFsLCAnU2V0Jyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBgU2V0YCBjYWNoZSBvYmplY3QgdG8gb3B0aW1pemUgbGluZWFyIHNlYXJjaGVzIG9mIGxhcmdlIGFycmF5cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtudWxsfE9iamVjdH0gUmV0dXJucyB0aGUgbmV3IGNhY2hlIG9iamVjdCBpZiBgU2V0YCBpcyBzdXBwb3J0ZWQsIGVsc2UgYG51bGxgLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDYWNoZSh2YWx1ZXMpIHtcbiAgcmV0dXJuIChuYXRpdmVDcmVhdGUgJiYgU2V0KSA/IG5ldyBTZXRDYWNoZSh2YWx1ZXMpIDogbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDYWNoZTtcbiIsInZhciByZXN0UGFyYW0gPSByZXF1aXJlKCcuLi9mdW5jdGlvbi9yZXN0UGFyYW0nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYF8uZGVmYXVsdHNgIG9yIGBfLmRlZmF1bHRzRGVlcGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlZmF1bHRzIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0cyhhc3NpZ25lciwgY3VzdG9taXplcikge1xuICByZXR1cm4gcmVzdFBhcmFtKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICB2YXIgb2JqZWN0ID0gYXJnc1swXTtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGFyZ3MucHVzaChjdXN0b21pemVyKTtcbiAgICByZXR1cm4gYXNzaWduZXIuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVmYXVsdHM7XG4iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGZvciBgXy5mb3JFYWNoYCBvciBgXy5mb3JFYWNoUmlnaHRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhcnJheUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhbiBhcnJheS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZWFjaCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRm9yRWFjaChhcnJheUZ1bmMsIGVhY2hGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSwgdGhpc0FyZykge1xuICAgIHJldHVybiAodHlwZW9mIGl0ZXJhdGVlID09ICdmdW5jdGlvbicgJiYgdGhpc0FyZyA9PT0gdW5kZWZpbmVkICYmIGlzQXJyYXkoY29sbGVjdGlvbikpXG4gICAgICA/IGFycmF5RnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSlcbiAgICAgIDogZWFjaEZ1bmMoY29sbGVjdGlvbiwgYmluZENhbGxiYWNrKGl0ZXJhdGVlLCB0aGlzQXJnLCAzKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRm9yRWFjaDtcbiIsInZhciBhcnJheVNvbWUgPSByZXF1aXJlKCcuL2FycmF5U29tZScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBhcnJheXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc0xvb3NlICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKGlzTG9vc2UgPyBvdGhWYWx1ZSA6IGFyclZhbHVlLCBpc0xvb3NlID8gYXJyVmFsdWUgOiBvdGhWYWx1ZSwgaW5kZXgpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChpc0xvb3NlKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iLCIvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcpIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAvLyB0byBgMWAgb3IgYDBgIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWwuXG4gICAgICByZXR1cm4gK29iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdClcbiAgICAgICAgPyBvdGhlciAhPSArb3RoZXJcbiAgICAgICAgOiBvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzIHByaW1pdGl2ZXMgYW5kIHN0cmluZ1xuICAgICAgLy8gb2JqZWN0cyBhcyBlcXVhbC4gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjEwLjYuNCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG4iLCJ2YXIga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNMb29zZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc0xvb3NlID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgdmFyIHNraXBDdG9yID0gaXNMb29zZTtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIoaXNMb29zZSA/IG90aFZhbHVlIDogb2JqVmFsdWUsIGlzTG9vc2U/IG9ialZhbHVlIDogb3RoVmFsdWUsIGtleSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZCA/IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSA6IHJlc3VsdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmICghc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxPYmplY3RzO1xuIiwidmFyIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vYmFzZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TGVuZ3RoO1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYE5hTmAgaXMgZm91bmQgaW4gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCBgTmFOYCwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBpbmRleE9mTmFOKGFycmF5LCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMCA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIHZhciBvdGhlciA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAob3RoZXIgIT09IG90aGVyKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmRleE9mTmFOO1xuIiwiLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBuZXcgYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgYXJyYXkgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lQXJyYXk7XG4iLCJ2YXIgYnVmZmVyQ2xvbmUgPSByZXF1aXJlKCcuL2J1ZmZlckNsb25lJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQnlUYWcob2JqZWN0LCB0YWcsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGJ1ZmZlckNsb25lKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICB2YXIgYnVmZmVyID0gb2JqZWN0LmJ1ZmZlcjtcbiAgICAgIHJldHVybiBuZXcgQ3Rvcihpc0RlZXAgPyBidWZmZXJDbG9uZShidWZmZXIpIDogYnVmZmVyLCBvYmplY3QuYnl0ZU9mZnNldCwgb2JqZWN0Lmxlbmd0aCk7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IEN0b3Iob2JqZWN0LnNvdXJjZSwgcmVGbGFncy5leGVjKG9iamVjdCkpO1xuICAgICAgcmVzdWx0Lmxhc3RJbmRleCA9IG9iamVjdC5sYXN0SW5kZXg7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0Q2xvbmVCeVRhZztcbiIsIi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCEodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvcikpIHtcbiAgICBDdG9yID0gT2JqZWN0O1xuICB9XG4gIHJldHVybiBuZXcgQ3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbml0Q2xvbmVPYmplY3Q7XG4iLCJ2YXIgZ2V0TGVuZ3RoID0gcmVxdWlyZSgnLi9nZXRMZW5ndGgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheUxpa2U7XG4iLCIvKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gKHZhbHVlID09PSBvdGhlcikgOiAob3RoZXIgIT09IG90aGVyKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCJ2YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxuXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lIGFuZCBub3QgYSBwcm9wZXJ0eSBwYXRoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5IGtleXMgb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXkodmFsdWUsIG9iamVjdCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKCh0eXBlID09ICdzdHJpbmcnICYmIHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkpIHx8IHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSk7XG4gIHJldHVybiByZXN1bHQgfHwgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIHRvT2JqZWN0KG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzS2V5O1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgbWVyZ2UgPSByZXF1aXJlKCcuLi9vYmplY3QvbWVyZ2UnKTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmRlZmF1bHRzRGVlcGAgdG8gY3VzdG9taXplIGl0cyBgXy5tZXJnZWAgdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9iamVjdFZhbHVlIFRoZSBkZXN0aW5hdGlvbiBvYmplY3QgcHJvcGVydHkgdmFsdWUuXG4gKiBAcGFyYW0geyp9IHNvdXJjZVZhbHVlIFRoZSBzb3VyY2Ugb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBtZXJnZURlZmF1bHRzKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVZhbHVlIDogbWVyZ2Uob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBtZXJnZURlZmF1bHRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZURlZmF1bHRzO1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b09iamVjdDtcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuL2Jhc2VUb1N0cmluZycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxuXFxcXF18XFxcXC4pKj8pXFwyKVxcXS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIHByb3BlcnR5IHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiB0b1BhdGgodmFsdWUpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgYmFzZVRvU3RyaW5nKHZhbHVlKS5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvUGF0aDtcbiIsInZhciBiYXNlQ2xvbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ2xvbmUnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iaW5kQ2FsbGJhY2snKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiBgdmFsdWVgLiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZFxuICogdG8gcHJvZHVjZSB0aGUgY2xvbmVkIHZhbHVlcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgY2xvbmluZ1xuICogaXMgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgXG4gKiBhbmQgaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudDsgKHZhbHVlIFssIGluZGV4fGtleSwgb2JqZWN0XSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb24gdGhlXG4gKiBbc3RydWN0dXJlZCBjbG9uZSBhbGdvcml0aG1dKGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2luZnJhc3RydWN0dXJlLmh0bWwjaW50ZXJuYWwtc3RydWN0dXJlZC1jbG9uaW5nLWFsZ29yaXRobSkuXG4gKiBUaGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGBhcmd1bWVudHNgIG9iamVjdHMgYW5kIG9iamVjdHMgY3JlYXRlZCBieVxuICogY29uc3RydWN0b3JzIG90aGVyIHRoYW4gYE9iamVjdGAgYXJlIGNsb25lZCB0byBwbGFpbiBgT2JqZWN0YCBvYmplY3RzLiBBblxuICogZW1wdHkgb2JqZWN0IGlzIHJldHVybmVkIGZvciB1bmNsb25lYWJsZSB2YWx1ZXMgc3VjaCBhcyBmdW5jdGlvbnMsIERPTSBub2RlcyxcbiAqIE1hcHMsIFNldHMsIGFuZCBXZWFrTWFwcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZGVlcCBjbG9uZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcgfVxuICogXTtcbiAqXG4gKiB2YXIgZGVlcCA9IF8uY2xvbmVEZWVwKHVzZXJzKTtcbiAqIGRlZXBbMF0gPT09IHVzZXJzWzBdO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBlbCA9IF8uY2xvbmVEZWVwKGRvY3VtZW50LmJvZHksIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGlmIChfLmlzRWxlbWVudCh2YWx1ZSkpIHtcbiAqICAgICByZXR1cm4gdmFsdWUuY2xvbmVOb2RlKHRydWUpO1xuICogICB9XG4gKiB9KTtcbiAqXG4gKiBlbCA9PT0gZG9jdW1lbnQuYm9keVxuICogLy8gPT4gZmFsc2VcbiAqIGVsLm5vZGVOYW1lXG4gKiAvLyA9PiBCT0RZXG4gKiBlbC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAqIC8vID0+IDIwXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGVlcCh2YWx1ZSwgY3VzdG9taXplciwgdGhpc0FyZykge1xuICByZXR1cm4gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJ1xuICAgID8gYmFzZUNsb25lKHZhbHVlLCB0cnVlLCBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgMSkpXG4gICAgOiBiYXNlQ2xvbmUodmFsdWUsIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lRGVlcDtcbiIsInZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzQXJyYXlMaWtlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmXG4gICAgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gZ2V0TmF0aXZlKEFycmF5LCAnaXNBcnJheScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUlzRXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iaW5kQ2FsbGJhY2snKTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAqIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIGNvbXBhcmlzb25zIGFyZSBoYW5kbGVkIGJ5IHRoZSBtZXRob2RcbiAqIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBvdGhlciBbLCBpbmRleHxrZXldKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYm9vbGVhbnMsIGBEYXRlYCBvYmplY3RzLFxuICogbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcywgYW5kIHN0cmluZ3MuIE9iamVjdHMgYXJlIGNvbXBhcmVkIGJ5XG4gKiB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET00gbm9kZXNcbiAqIGFyZSAqKm5vdCoqIHN1cHBvcnRlZC4gUHJvdmlkZSBhIGN1c3RvbWl6ZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHN1cHBvcnRcbiAqIGZvciBjb21wYXJpbmcgb3RoZXIgdmFsdWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXFcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHZhbHVlIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgb3RoZXIgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogb2JqZWN0ID09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgYXJyYXkgPSBbJ2hlbGxvJywgJ2dvb2RieWUnXTtcbiAqIHZhciBvdGhlciA9IFsnaGknLCAnZ29vZGJ5ZSddO1xuICpcbiAqIF8uaXNFcXVhbChhcnJheSwgb3RoZXIsIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICBpZiAoXy5ldmVyeShbdmFsdWUsIG90aGVyXSwgUmVnRXhwLnByb3RvdHlwZS50ZXN0LCAvXmgoPzppfGVsbG8pJC8pKSB7XG4gKiAgICAgcmV0dXJuIHRydWU7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgdGhpc0FyZykge1xuICBjdXN0b21pemVyID0gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJyA/IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCAzKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBvdGhlcikgOiB1bmRlZmluZWQ7XG4gIHJldHVybiAgcmVzdWx0ID09PSB1bmRlZmluZWQgPyBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIpIDogISFyZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IGVxdWl2YWxlbnRzIHdoaWNoIHJldHVybiAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gaXNPYmplY3QodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRm9ySW4nKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZyAmJiAhaXNBcmd1bWVudHModmFsdWUpKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJiAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsInZhciBiYXNlQ29weSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VDb3B5JyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZVxuICogcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gYmFzZUNvcHkodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvUGxhaW5PYmplY3Q7XG4iLCJ2YXIgYXNzaWduV2l0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Fzc2lnbldpdGgnKSxcbiAgICBiYXNlQXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUFzc2lnbicpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50czpcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgIGFuZCBpcyBiYXNlZCBvblxuICogW2BPYmplY3QuYXNzaWduYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtb2JqZWN0LmFzc2lnbikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uYXNzaWduKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiA0MCB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgcmV0dXJuIF8uaXNVbmRlZmluZWQodmFsdWUpID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgcmV0dXJuIGN1c3RvbWl6ZXJcbiAgICA/IGFzc2lnbldpdGgob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpXG4gICAgOiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsInZhciBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpLFxuICAgIGFzc2lnbkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXNzaWduRGVmYXVsdHMnKSxcbiAgICBjcmVhdGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZURlZmF1bHRzJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gT25jZSBhXG4gKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgdmFsdWVzIG9mIHRoZSBzYW1lIHByb3BlcnR5IGFyZSBpZ25vcmVkLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBkZWZhdWx0cyA9IGNyZWF0ZURlZmF1bHRzKGFzc2lnbiwgYXNzaWduRGVmYXVsdHMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwidmFyIGNyZWF0ZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlRGVmYXVsdHMnKSxcbiAgICBtZXJnZSA9IHJlcXVpcmUoJy4vbWVyZ2UnKSxcbiAgICBtZXJnZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvbWVyZ2VEZWZhdWx0cycpO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uZGVmYXVsdHNgIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IGFzc2lnbnNcbiAqIGRlZmF1bHQgcHJvcGVydGllcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmF1bHRzRGVlcCh7ICd1c2VyJzogeyAnbmFtZSc6ICdiYXJuZXknIH0gfSwgeyAndXNlcic6IHsgJ25hbWUnOiAnZnJlZCcsICdhZ2UnOiAzNiB9IH0pO1xuICogLy8gPT4geyAndXNlcic6IHsgJ25hbWUnOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0gfVxuICpcbiAqL1xudmFyIGRlZmF1bHRzRGVlcCA9IGNyZWF0ZURlZmF1bHRzKG1lcmdlLCBtZXJnZURlZmF1bHRzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0c0RlZXA7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG4iLCJ2YXIgYmFzZUdldCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VHZXQnKSxcbiAgICBiYXNlU2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlU2xpY2UnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzSW5kZXgnKSxcbiAgICBpc0tleSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzS2V5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGxhc3QgPSByZXF1aXJlKCcuLi9hcnJheS9sYXN0JyksXG4gICAgdG9QYXRoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvdG9QYXRoJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3QgcHJvcGVydHkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBpcyBhIGRpcmVjdCBwcm9wZXJ0eSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IHsgJ2InOiB7ICdjJzogMyB9IH0gfTtcbiAqXG4gKiBfLmhhcyhvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXMob2JqZWN0LCAnYS5iLmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhcyhvYmplY3QsIFsnYScsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGhhcyhvYmplY3QsIHBhdGgpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcGF0aCk7XG4gIGlmICghcmVzdWx0ICYmICFpc0tleShwYXRoKSkge1xuICAgIHBhdGggPSB0b1BhdGgocGF0aCk7XG4gICAgb2JqZWN0ID0gcGF0aC5sZW5ndGggPT0gMSA/IG9iamVjdCA6IGJhc2VHZXQob2JqZWN0LCBiYXNlU2xpY2UocGF0aCwgMCwgLTEpKTtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcGF0aCA9IGxhc3QocGF0aCk7XG4gICAgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHBhdGgpO1xuICB9XG4gIHJldHVybiByZXN1bHQgfHwgKGlzTGVuZ3RoKG9iamVjdC5sZW5ndGgpICYmIGlzSW5kZXgocGF0aCwgb2JqZWN0Lmxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXM7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZ2V0TmF0aXZlJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHNoaW1LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUtleXMnKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0KHMpLCB0aGF0XG4gKiBkb24ndCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzXG4gKiBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy4gSWYgYGN1c3RvbWl6ZXJgIGlzXG4gKiBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uIGFuZFxuICogc291cmNlIHByb3BlcnRpZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIG1lcmdpbmcgaXMgaGFuZGxlZFxuICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCBmaXZlIGFyZ3VtZW50czogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYXBwbGUnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyLCBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkoYSkpIHtcbiAqICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4geyAnZnJ1aXRzJzogWydhcHBsZScsICdiYW5hbmEnXSwgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnLCAnY2Fycm90J10gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihiYXNlTWVyZ2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBAbW9kdWxlIGhlbmNlLWNhcmRcbiAqL1xuaW1wb3J0IGNvbnNvbGUgZnJvbSAnY29uc29sZXInO1xuaW1wb3J0IEhlbmNlIGZyb20gJ2hlbmNlLWNvbXBvbmVudC1mcmFtZXdvcmsnO1xuaW1wb3J0IF9kZWZhdWx0cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2RlZmF1bHRzRGVlcC5qcyc7XG5cbi8qKlxuICogSGVuY2VDYXJkIENvbXBvbmVudFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmxldCBIZW5jZUNhcmQgPSBIZW5jZS5VaSh7XG4gIGlzOiAnaGVuY2UtY2FyZCcsXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBJbml0aWFsaXphdGlvblxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHByb3BlcnRpZXM6IHtcbiAgICBwYWRkZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGltYWdlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvNDUweDUwJ1xuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQnXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gQWIgYWxpcXVhbSBjb25zZXF1YXR1ciBleCBpZCBpc3RlIG1vZGkgbmF0dXMgJyArXG4gICAgICAnbm9zdHJ1bSBudW1xdWFtIG9kaW8gcG9ycm8gcHJhZXNlbnRpdW0gcXVpc3F1YW0gcXVvcywgcmVtIHJlcHJlaGVuZGVyaXQgc2VxdWkgdW5kZSB2ZXJvIHZpdGFlIHZvbHVwdGF0ZW0/J1xuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICBub3RpZnk6IHRydWUsXG4gICAgICB2YWx1ZTogbnVsbFxuICAgIH0sXG4gICAgZGlzcGxheU9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGNhbGxUb0FjdGlvbjoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgbm90aWZ5OiB0cnVlLFxuICAgICAgdmFsdWU6IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBFdmVudCBMaXN0ZW5lcnNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBXaGVuIHdvcmtpbmcgd2l0aCBsaXN0ZW5lcnMsIGlmIHRoZWlyIHRhcmdldCBlbGVtZW50IGRvZXNu4oCZdCBleGlzdCBvbiB0aGUgRE9NIHlvdSBnZXQgYSB2ZXJ5IGJhc2ljIG5vbnNwZWNpZmljXG4gICAqIGVycm9yICdVbmNhdWdodCBUeXBlRXJyb3I6IEludmFsaWQgdmFsdWUgdXNlZCBhcyB3ZWFrIG1hcCBrZXnigJkhICBNYWtlIHN1cmUgdG8gcmV2aWV3IHRoZSBsaXN0ZW5lcnMgeW91IHNldCB1cFxuICAgKiBhZ2FpbnN0IHlvdSBET00gZWxlbWVudHMuIEJ5IGRlZmF1bHQgbGlzdGVuZXJzIGxvb2sgZm9yIElEcyBvbiBlbGVtZW50cyBzbyDigJhteUJ1dHRvbi50YXDigJkgd2lsbCB3YXRjaCBjbGljay90b3VjaGVzXG4gICAqIG9uIGEgI215QnV0dG9uIGVsZW1lbnQgaW4gdGhlIGNvbXBvbmVudFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlIFRoZSBldmVudCBleGVjdXRpbmcgdGhpcyBmdW5jdGlvblxuICAgKi9cbiAgICBldmVudFRvZ2dsZU9wdGlvbnMoZSkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAvLyBVcGRhdGUgdGhlIHByb3BlcnR5LCB1c2luZyB0aGlzLnNldCB0byBmaXJlIGFueSBleHBlY3RpbmcgbGlzdGVuZXJzXG4gICAgc2VsZi5zZXQoJ2Rpc3BsYXlPcHRpb25zJywgIXNlbGYuZGlzcGxheU9wdGlvbnMpO1xuICAgIHNlbGYudXBkYXRlRGlzcGxheU9wdGlvbnMoKTtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudH0gZSBUaGUgZXZlbnQgZXhlY3V0aW5nIHRoaXMgZnVuY3Rpb25cbiAgICovXG4gIGV2ZW50Q2FsbFRvQWN0aW9uOiBIZW5jZS5ob29rKCdjYWxsVG9BY3Rpb24xMjMnLCAoZGF0YSwgbW9kZWwsIGUpPT4ge1xuICAgIC8vIHVwZGF0ZSB0aGUgZGF0YSBiZWZvcmUgaXQgZ2V0cyBzZW50IGJhY2sgdGhyb3VnaCB0aGUgaG9va1xuICAgIGRhdGEuaW5wdXQudmFsdWUgKz0gJyBoYXMgYmVlbiBwcm9jZXNzZWQhJztcbiAgfSksXG5cbiAgZXZlbnRPcHRpb25BY3Rpb246IEhlbmNlLmhvb2soJ29wdCcpLFxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogRWxlbWVudCBET00gSG9va3NcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciBhbGwgZWxlbWVudHMgaGF2ZSBiZWVuIGNvbmZpZ3VyZWQsIGJ1dCBwcm9wYWdhdGVzIGJvdHRvbS11cC4gVGhpcyBlbGVtZW50J3MgY2hpbGRyZW4gYXJlXG4gICAqIHJlYWR5LCBidXQgcGFyZW50cyBhcmUgbm90LiBUaGlzIGlzIHRoZSBwb2ludCB3aGVyZSB5b3Ugc2hvdWxkIG1ha2UgbW9kaWZpY2F0aW9ucyB0byB0aGUgRE9NICh3aGVuICBuZWNlc3NhcnkpLFxuICAgKiBvciBraWNrIG9mZiBhbnkgcHJvY2Vzc2VzIHRoZSBlbGVtZW50IHdhbnRzIHRvIHBlcmZvcm0uXG4gICAqL1xuICAgIHJlYWR5KCkge1xuICAgIC8vIFdBUk5JTkcsIHVwZGF0aW5nIERPTSBlbGVtZW50cyBIRVJFIG1heSBvdmVycmlkZSB2YXJpYWJsZSByZXZpc2lvbnMgaW4gdGhlIGZhY3RvcnlJbXBsIGZ1bmN0aW9uIGlmIGNyZWF0ZWRcbiAgICAvLyB3aXRoIHRoZSBjcmVhdGVFbGVtZW50IGZ1bmN0aW9uLGxldmVyYWdpbmcgdGhlIGNvbXBvbmVudHMgZGVmYXVsdHMgaW5zdGVhZC4gSWYgdGhlIGVsZW1lbnQgaXMgZW1iZWRkZWQsIG5vIGlzc3VlLlxuXG4gIH0sXG5cbiAgLyoqXG4gICAqIGBhdHRhY2hlZGAgZmlyZXMgb25jZSB0aGUgZWxlbWVudCBhbmQgaXRzIHBhcmVudHMgaGF2ZSBiZWVuIGluc2VydGVkICBpbnRvIGEgZG9jdW1lbnQuIFRoaXMgaXMgYSBnb29kIHBsYWNlIHRvXG4gICAqIHBlcmZvcm0gYW55IHdvcmsgcmVsYXRlZCB0byB5b3VyIGVsZW1lbnQncyB2aXN1YWwgc3RhdGUgb3IgYWN0aXZlIGJlaGF2aW9yIChtZWFzdXJpbmcgc2l6ZXMsIGJlZ2lubmluZyBhbmltYXRpb25zLFxuICAgKiBsb2FkaW5nIHJlc291cmNlcywgZXRjKS5cbiAgICovXG4gICAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5fcHJlcGFyZURhdGEoKTtcblxuICAgIHRoaXMuYXN5bmMoKCk9PiB7XG4gICAgICAvLyBhY2Nlc3Mgc2libGluZyBvciBwYXJlbnQgZWxlbWVudHMgaGVyZVxuICAgIH0pO1xuICB9LFxuXG4gIF9wcmVwYXJlRGF0YSgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgbGV0ICQgPSBzZWxmLiQ7XG4gICAgbGV0IG9wdGlvbnMgPSBzZWxmLm9wdGlvbnM7XG4gICAgbGV0IGNhbGxUb0FjdGlvbiA9IHNlbGYuY2FsbFRvQWN0aW9uO1xuXG4gICAgLy8gV0FSTklORywgdXBkYXRpbmcgRE9NIGVsZW1lbnRzIEhFUkUgbWF5IG92ZXJyaWRlIHZhcmlhYmxlIHJldmlzaW9ucyBpbiB0aGUgZmFjdG9yeUltcGwgZnVuY3Rpb24gaWYgY3JlYXRlZFxuICAgIC8vIHdpdGggdGhlIGNyZWF0ZUVsZW1lbnQgZnVuY3Rpb24sbGV2ZXJhZ2luZyB0aGUgY29tcG9uZW50cyBkZWZhdWx0cyBpbnN0ZWFkLiBJZiB0aGUgZWxlbWVudCBpcyBlbWJlZGRlZCwgbm8gaXNzdWUuXG5cbiAgICAvLyBJZiBmbGFnZ2VkIGFzIHBhZGRlZCwgYXMgdGhlIHN0eWxlIGNsYXNzIGZvciBpdFxuICAgIGlmIChzZWxmLnBhZGRlZCkge1xuICAgICAgJC53cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3BhZGRlZCcpO1xuICAgIH1cblxuICAgIC8vIElmIG9wdGlvbnMgd2VyZSBhZGRlZCwgZmlsbCBpbiB0aGVpciBldmVudCBiaW5kaW5nc1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICBvcHRpb25zLmZvckVhY2goKG9wdCk9PiB7XG4gICAgICAgIHNlbGYuc2V0KGBldmVudF8ke29wdC5hY3Rpb24ubmFtZX1gLCBvcHQuYWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIElmIGNhbGwgdG8gYWN0aW9uIHdhcyBwcm92aWRlZCwgc2FuaXRpemUgaXQncyBpbnB1dCBpZiBhbHNvIHByb3ZpZGVkXG4gICAgaWYgKGNhbGxUb0FjdGlvbikge1xuICAgICAgaWYgKGNhbGxUb0FjdGlvbi5hbGlnbikge1xuICAgICAgICAkLmNhbGxUb0FjdGlvbi5jbGFzc0xpc3QuYWRkKGNhbGxUb0FjdGlvbi5hbGlnbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsVG9BY3Rpb24uaW5wdXQpIHtcbiAgICAgICAgX2RlZmF1bHRzKGNhbGxUb0FjdGlvbi5pbnB1dCwge1xuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgICAgbGFiZWw6ICcnXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnNldCgnY2FsbFRvQWN0aW9uJywgY2FsbFRvQWN0aW9uKTsgLy8gbWFrZSBzdXJlIHRvIGZpcmUgYW55IHdhdGNoZXJzXG4gICAgfVxuXG4gICAgc2VsZi51cGRhdGVEaXNwbGF5T3B0aW9ucygpO1xuXG4gICAgLy9jb25zb2xlLmxvZygnY29tcCBpcyAnLCBzZWxmLnByb3BlcnRpZXMpO1xuICB9LFxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogRWxlbWVudCBCZWhhdmlvdXJcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIGJlaGF2aW9yczogW10sXG5cbiAgdXBkYXRlRGlzcGxheU9wdGlvbnMoKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHNlbGYudG9nZ2xlQ2xhc3MoJ29wZW4nLCBzZWxmLmRpc3BsYXlPcHRpb25zLCBzZWxmLiQkKCcjb3B0aW9ucycpKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlbmNlQ2FyZDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEhlbmNlQ2FyZCBmcm9tICcuL2hlbmNlLWNhcmQnO1xuaW1wb3J0IGRvY1JlYWR5IGZyb20gJ2RvYy1yZWFkeSc7XG5cbi8vIFNvbWUgY29tbW9uIGRlZmF1bHRzXG5sZXQgb3B0aW9ucyA9IFtcbiAge1xuICAgIGxhYmVsOiAnVGVzdCcsXG4gICAgYWN0aW9uOiAoZGF0YSwgbW9kZWwsIGUpPT4ge1xuICAgICAgYWxlcnQoJ3RoaXMgaXMgbXkgb3B0aW9uIScpO1xuICAgIH1cbiAgfVxuXTtcblxubGV0IGNhbGxUb0FjdGlvbiA9IHtcbiAgbGFiZWw6ICdTaWduIFVwIE5vdyEnLFxuICBhbGlnbjogJ3JpZ2h0JywgLy8gbGVmdC9jZW50ZXIvcmlnaHRcbiAgYWN0aW9uOiAoZGF0YSwgbW9kZWwsIGUpPT4ge1xuICAgIGFsZXJ0KGBTdWNjZXNzZnVsIHN1Ym1pc3Npb24gd2l0aDogJHtkYXRhLmlucHV0LnZhbHVlfWApO1xuICB9LFxuICBpbnB1dDoge1xuICAgIGxhYmVsOiAnRW50ZXIgeW91ciBlbWFpbCBoZXJlOicsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBsYWNlaG9sZGVyOiAnRW1haWwnXG4gIH1cbn07XG5cbi8vIEVuc3VyZSB3ZSdyZSB3YWl0aW5nIGZvciB0aGUgZG9jdW1lbnQgdG8gYWN0dWFsbHkgYmUgbG9hZGVkIGJlZm9yZSBpbnRlcmFjdGluZyB3aXRoIGl0LlxuZG9jUmVhZHkoKCk9PiB7XG4gIC8vIExvY2F0aW9uIHRvIGJpbmQgcHJldmlldyBjb21wb25lbnRzIHRvby4gVXNlIHRoaXMgdG8gZW5zdXJlIHRoZSBzdHlsZSBndWlkZSB3aWxsIGRpc3BsYXkgdGhlc2UgdG9vLlxuICBsZXQgY29tcG9uZW50UHJldmlld0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wb25lbnQtcHJldmlld3MnKTtcblxuICAvLyBTcGF3biB2YXJpb3VzIHN0YXRlcyBvZiB0aGUgY29tcG9uZW50IHRvIHByZXZpZXcgdGhlbSBzaWRlIGJ5IHNpZGVcbiAgSGVuY2VDYXJkLmFwcGVuZEVsZW1lbnRUbyh7XG4gICAgdGl0bGU6ICdQYWRkZWQgZXhhbXBsZSB3LyBvcHRpb25zJyxcbiAgICBwYWRkZWQ6IHRydWUsXG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBpbWFnZTogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvMzUweDUwJ1xuICB9LCBjb21wb25lbnRQcmV2aWV3Qm94KTtcbiAgSGVuY2VDYXJkLmFwcGVuZEVsZW1lbnRUbyh7XG4gICAgdGl0bGU6ICdFeGFtcGxlIHcvIG9wdGlvbnMgcHJlLW9wZW5lZCcsXG4gICAgZGlzcGxheU9wdGlvbnM6IHRydWUsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9LCBjb21wb25lbnRQcmV2aWV3Qm94KTtcbiAgSGVuY2VDYXJkLmFwcGVuZEVsZW1lbnRUbyh7XG4gICAgdGl0bGU6ICdFeGFtcGxlIHcvIGNhbGwgdG8gYWN0aW9uJyxcbiAgICBjYWxsVG9BY3Rpb246IGNhbGxUb0FjdGlvblxuICB9LCBjb21wb25lbnRQcmV2aWV3Qm94KTtcbiAgSGVuY2VDYXJkLmFwcGVuZEVsZW1lbnRUbyh7XG4gICAgdGl0bGU6ICdLaXRjaGVuIFNpbmsnLFxuICAgIGRpc3BsYXlPcHRpb25zOiB0cnVlLFxuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgY2FsbFRvQWN0aW9uOiBjYWxsVG9BY3Rpb25cbiAgfSwgY29tcG9uZW50UHJldmlld0JveCk7XG59KTtcbiJdfQ==
