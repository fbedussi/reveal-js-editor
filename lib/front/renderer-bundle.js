/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _electron = __webpack_require__(1);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _redux = __webpack_require__(9);

	var _reduxThunk = __webpack_require__(30);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reactRedux = __webpack_require__(31);

	var _bgSlide = __webpack_require__(48);

	var _bgSlide2 = _interopRequireDefault(_bgSlide);

	var _editor = __webpack_require__(49);

	var _editor2 = _interopRequireDefault(_editor);

	var _file = __webpack_require__(122);

	var _file2 = _interopRequireDefault(_file);

	var _ui = __webpack_require__(123);

	var _ui2 = _interopRequireDefault(_ui);

	var _configuration = __webpack_require__(124);

	var _configuration2 = _interopRequireDefault(_configuration);

	var _fileActions = __webpack_require__(125);

	var _actions = __webpack_require__(128);

	var _App = __webpack_require__(130);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import './spellCheckerInit';

	const mainProcess = _electron.remote.require('./main'); //Electron inport


	//Reducers


	const store = (0, _redux.createStore)((0, _redux.combineReducers)({ bgSlide: _bgSlide2.default, editor: _editor2.default, file: _file2.default, ui: _ui2.default, configuration: _configuration2.default }), (0, _redux.applyMiddleware)(_reduxThunk2.default));

	function run() {
	    let state = store.getState();

	    _reactDom2.default.render(_react2.default.createElement(
	        _reactRedux.Provider,
	        { store: store },
	        _react2.default.createElement(_App2.default, null)
	    ), document.getElementById('app'));
	}

	run();
	store.subscribe(run);
	store.dispatch((0, _actions.init)());

	//Main process listeners
	_electron.ipcRenderer.on('openPreview', event => {
	    mainProcess.openPreview(_editor2.default.getHtml());
	}).on('unShuffle', (event, configuration) => {
	    _editor2.default.resetPreview().renderMd();

	    initReveal(configuration);
	});
	//
	////Open links in new window
	//document.addEventListener('click', (event) => {
	//    if (event.target.tag === 'a' && event.target.href.match(/^http/)) {
	//        event.preventDefault();
	//        shell.openExternal(event.target.href);
	//    }
	//});
	//
	////Prevent the opening of speakers note
	//document.body.addEventListener('keydown', (e) => {
	//    if (e.key === 's') {
	//        e.stopPropagation();
	//    }
	//});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory(__webpack_require__(3), __webpack_require__(8)) :
		typeof define === 'function' && define.amd ? define(['prop-types', 'preact'], factory) :
		(global.preactCompat = factory(global.PropTypes,global.preact));
	}(this, (function (PropTypes,preact) {

	PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

	var version = '15.1.0'; // trick libraries to think we are react

	var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

	var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

	var COMPONENT_WRAPPER_KEY = typeof Symbol!=='undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

	// don't autobind these methods since they already have guaranteed context.
	var AUTOBIND_BLACKLIST = {
		constructor: 1,
		render: 1,
		shouldComponentUpdate: 1,
		componentWillReceiveProps: 1,
		componentWillUpdate: 1,
		componentDidUpdate: 1,
		componentWillMount: 1,
		componentDidMount: 1,
		componentWillUnmount: 1,
		componentDidUnmount: 1
	};


	var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vert|word|writing|x)[A-Z]/;


	var BYPASS_HOOK = {};

	/*global process*/
	var DEV = typeof process==='undefined' || !process.env || ("production")!=='production';

	// a component that renders nothing. Used to replace components for unmountComponentAtNode.
	function EmptyComponent() { return null; }



	// make react think we're react.
	var VNode = preact.h('a', null).constructor;
	VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
	VNode.prototype.preactCompatUpgraded = false;
	VNode.prototype.preactCompatNormalized = false;

	Object.defineProperty(VNode.prototype, 'type', {
		get: function() { return this.nodeName; },
		set: function(v) { this.nodeName = v; },
		configurable:true
	});

	Object.defineProperty(VNode.prototype, 'props', {
		get: function() { return this.attributes; },
		set: function(v) { this.attributes = v; },
		configurable:true
	});



	var oldEventHook = preact.options.event;
	preact.options.event = function (e) {
		if (oldEventHook) { e = oldEventHook(e); }
		e.persist = Object;
		e.nativeEvent = e;
		return e;
	};


	var oldVnodeHook = preact.options.vnode;
	preact.options.vnode = function (vnode) {
		if (!vnode.preactCompatUpgraded) {
			vnode.preactCompatUpgraded = true;

			var tag = vnode.nodeName,
				attrs = vnode.attributes = extend({}, vnode.attributes);

			if (typeof tag==='function') {
				if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
					if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
					if (vnode.children) { attrs.children = vnode.children; }

					if (!vnode.preactCompatNormalized) {
						normalizeVNode(vnode);
					}
					handleComponentVNode(vnode);
				}
			}
			else {
				if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (attrs.defaultValue) {
					if (!attrs.value && attrs.value!==0) {
						attrs.value = attrs.defaultValue;
					}
					delete attrs.defaultValue;
				}

				handleElementVNode(vnode, attrs);
			}
		}

		if (oldVnodeHook) { oldVnodeHook(vnode); }
	};

	function handleComponentVNode(vnode) {
		var tag = vnode.nodeName,
			a = vnode.attributes;

		vnode.attributes = {};
		if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
		if (a) { extend(vnode.attributes, a); }
	}

	function handleElementVNode(vnode, a) {
		var shouldSanitize, attrs, i;
		if (a) {
			for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
			if (shouldSanitize) {
				attrs = vnode.attributes = {};
				for (i in a) {
					if (a.hasOwnProperty(i)) {
						attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
					}
				}
			}
		}
	}



	// proxy render() since React returns a Component reference.
	function render$1(vnode, parent, callback) {
		var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

		// ignore impossible previous renders
		if (prev && prev.parentNode!==parent) { prev = null; }

		// default to first Element child
		if (!prev) { prev = parent.children[0]; }

		// remove unaffected siblings
		for (var i=parent.childNodes.length; i--; ) {
			if (parent.childNodes[i]!==prev) {
				parent.removeChild(parent.childNodes[i]);
			}
		}

		var out = preact.render(vnode, parent, prev);
		if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
		if (typeof callback==='function') { callback(); }
		return out && out._component || out;
	}


	var ContextProvider = function () {};

	ContextProvider.prototype.getChildContext = function () {
		return this.props.context;
	};
	ContextProvider.prototype.render = function (props) {
		return props.children[0];
	};

	function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
		var wrap = preact.h(ContextProvider, { context: parentComponent.context }, vnode);
		var c = render$1(wrap, container);
		if (callback) { callback(c); }
		return c._component || c.base;
	}


	function unmountComponentAtNode(container) {
		var existing = container._preactCompatRendered && container._preactCompatRendered.base;
		if (existing && existing.parentNode===container) {
			preact.render(preact.h(EmptyComponent), container, existing);
			return true;
		}
		return false;
	}



	var ARR = [];

	// This API is completely unnecessary for Preact, so it's basically passthrough.
	var Children = {
		map: function(children, fn, ctx) {
			if (children == null) { return null; }
			children = Children.toArray(children);
			if (ctx && ctx!==children) { fn = fn.bind(ctx); }
			return children.map(fn);
		},
		forEach: function(children, fn, ctx) {
			if (children == null) { return null; }
			children = Children.toArray(children);
			if (ctx && ctx!==children) { fn = fn.bind(ctx); }
			children.forEach(fn);
		},
		count: function(children) {
			return children && children.length || 0;
		},
		only: function(children) {
			children = Children.toArray(children);
			if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
			return children[0];
		},
		toArray: function(children) {
			if (children == null) { return []; }
			return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
		}
	};


	/** Track current render() component for ref assignment */
	var currentComponent;


	function createFactory(type) {
		return createElement.bind(null, type);
	}


	var DOM = {};
	for (var i=ELEMENTS.length; i--; ) {
		DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
	}

	function upgradeToVNodes(arr, offset) {
		for (var i=offset || 0; i<arr.length; i++) {
			var obj = arr[i];
			if (Array.isArray(obj)) {
				upgradeToVNodes(obj);
			}
			else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
				arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
			}
		}
	}

	function isStatelessComponent(c) {
		return typeof c==='function' && !(c.prototype && c.prototype.render);
	}


	// wraps stateless functional components in a PropTypes validator
	function wrapStatelessComponent(WrappedComponent) {
		return createClass({
			displayName: WrappedComponent.displayName || WrappedComponent.name,
			render: function() {
				return WrappedComponent(this.props, this.context);
			}
		});
	}


	function statelessComponentHook(Ctor) {
		var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
		if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

		Wrapped = wrapStatelessComponent(Ctor);

		Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
		Wrapped.displayName = Ctor.displayName;
		Wrapped.propTypes = Ctor.propTypes;
		Wrapped.defaultProps = Ctor.defaultProps;

		Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

		return Wrapped;
	}


	function createElement() {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		upgradeToVNodes(args, 2);
		return normalizeVNode(preact.h.apply(void 0, args));
	}


	function normalizeVNode(vnode) {
		vnode.preactCompatNormalized = true;

		applyClassName(vnode);

		if (isStatelessComponent(vnode.nodeName)) {
			vnode.nodeName = statelessComponentHook(vnode.nodeName);
		}

		var ref = vnode.attributes.ref,
			type = ref && typeof ref;
		if (currentComponent && (type==='string' || type==='number')) {
			vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
		}

		applyEventNormalization(vnode);

		return vnode;
	}


	function cloneElement$1(element, props) {
		var children = [], len = arguments.length - 2;
		while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

		if (!isValidElement(element)) { return element; }
		var elementProps = element.attributes || element.props;
		var node = preact.h(
			element.nodeName || element.type,
			elementProps,
			element.children || elementProps && elementProps.children
		);
		// Only provide the 3rd argument if needed.
		// Arguments 3+ overwrite element.children in preactCloneElement
		var cloneArgs = [node, props];
		if (children && children.length) {
			cloneArgs.push(children);
		}
		else if (props && props.children) {
			cloneArgs.push(props.children);
		}
		return normalizeVNode(preact.cloneElement.apply(void 0, cloneArgs));
	}


	function isValidElement(element) {
		return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
	}


	function createStringRefProxy(name, component) {
		return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
			if (component && component.refs) {
				component.refs[name] = resolved;
				if (resolved===null) {
					delete component._refProxies[name];
					component = null;
				}
			}
		});
	}


	function applyEventNormalization(ref) {
		var nodeName = ref.nodeName;
		var attributes = ref.attributes;

		if (!attributes || typeof nodeName!=='string') { return; }
		var props = {};
		for (var i in attributes) {
			props[i.toLowerCase()] = i;
		}
		if (props.ondoubleclick) {
			attributes.ondblclick = attributes[props.ondoubleclick];
			delete attributes[props.ondoubleclick];
		}
		// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
		if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
			var normalized = props.oninput || 'oninput';
			if (!attributes[normalized]) {
				attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
				delete attributes[props.onchange];
			}
		}
	}


	function applyClassName(ref) {
		var attributes = ref.attributes;

		if (!attributes) { return; }
		var cl = attributes.className || attributes.class;
		if (cl) { attributes.className = cl; }
	}


	function extend(base, props) {
		for (var key in props) {
			if (props.hasOwnProperty(key)) {
				base[key] = props[key];
			}
		}
		return base;
	}


	function shallowDiffers(a, b) {
		for (var i in a) { if (!(i in b)) { return true; } }
		for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
		return false;
	}


	function findDOMNode(component) {
		return component && component.base || component;
	}


	function F(){}

	function createClass(obj) {
		function cl(props, context) {
			bindAll(this);
			Component$1.call(this, props, context, BYPASS_HOOK);
			newComponentHook.call(this, props, context);
		}

		obj = extend({ constructor: cl }, obj);

		// We need to apply mixins here so that getDefaultProps is correctly mixed
		if (obj.mixins) {
			applyMixins(obj, collateMixins(obj.mixins));
		}
		if (obj.statics) {
			extend(cl, obj.statics);
		}
		if (obj.propTypes) {
			cl.propTypes = obj.propTypes;
		}
		if (obj.defaultProps) {
			cl.defaultProps = obj.defaultProps;
		}
		if (obj.getDefaultProps) {
			cl.defaultProps = obj.getDefaultProps();
		}

		F.prototype = Component$1.prototype;
		cl.prototype = extend(new F(), obj);

		cl.displayName = obj.displayName || 'Component';

		return cl;
	}


	// Flatten an Array of mixins to a map of method name to mixin implementations
	function collateMixins(mixins) {
		var keyed = {};
		for (var i=0; i<mixins.length; i++) {
			var mixin = mixins[i];
			for (var key in mixin) {
				if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
					(keyed[key] || (keyed[key]=[])).push(mixin[key]);
				}
			}
		}
		return keyed;
	}


	// apply a mapping of Arrays of mixin methods to a component prototype
	function applyMixins(proto, mixins) {
		for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
			proto[key] = multihook(
				mixins[key].concat(proto[key] || ARR),
				key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
			);
		} }
	}


	function bindAll(ctx) {
		for (var i in ctx) {
			var v = ctx[i];
			if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
				(ctx[i] = v.bind(ctx)).__bound = true;
			}
		}
	}


	function callMethod(ctx, m, args) {
		if (typeof m==='string') {
			m = ctx.constructor.prototype[m];
		}
		if (typeof m==='function') {
			return m.apply(ctx, args);
		}
	}

	function multihook(hooks, skipDuplicates) {
		return function() {
			var arguments$1 = arguments;
			var this$1 = this;

			var ret;
			for (var i=0; i<hooks.length; i++) {
				var r = callMethod(this$1, hooks[i], arguments$1);

				if (skipDuplicates && r!=null) {
					if (!ret) { ret = {}; }
					for (var key in r) { if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					} }
				}
				else if (typeof r!=='undefined') { ret = r; }
			}
			return ret;
		};
	}


	function newComponentHook(props, context) {
		propsHook.call(this, props, context);
		this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
		this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
	}


	function propsHook(props, context) {
		if (!props) { return; }

		// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
		var c = props.children;
		if (c && Array.isArray(c) && c.length===1) {
			props.children = c[0];

			// but its totally still going to be an Array.
			if (props.children && typeof props.children==='object') {
				props.children.length = 1;
				props.children[0] = props.children;
			}
		}

		// add proptype checking
		if (DEV) {
			var ctor = typeof this==='function' ? this : this.constructor,
				propTypes = this.propTypes || ctor.propTypes;
			var displayName = this.displayName || ctor.name;

			if (propTypes) {
				PropTypes.checkPropTypes(propTypes, props, 'prop', displayName);
			}
		}
	}


	function beforeRender(props) {
		currentComponent = this;
	}

	function afterRender() {
		if (currentComponent===this) {
			currentComponent = null;
		}
	}



	function Component$1(props, context, opts) {
		preact.Component.call(this, props, context);
		this.state = this.getInitialState ? this.getInitialState() : {};
		this.refs = {};
		this._refProxies = {};
		if (opts!==BYPASS_HOOK) {
			newComponentHook.call(this, props, context);
		}
	}
	extend(Component$1.prototype = new preact.Component(), {
		constructor: Component$1,

		isReactComponent: {},

		replaceState: function(state, callback) {
			var this$1 = this;

			this.setState(state, callback);
			for (var i in this$1.state) {
				if (!(i in state)) {
					delete this$1.state[i];
				}
			}
		},

		getDOMNode: function() {
			return this.base;
		},

		isMounted: function() {
			return !!this.base;
		}
	});



	function PureComponent(props, context) {
		Component$1.call(this, props, context);
	}
	F.prototype = Component$1.prototype;
	PureComponent.prototype = new F();
	PureComponent.prototype.isPureReactComponent = true;
	PureComponent.prototype.shouldComponentUpdate = function(props, state) {
		return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
	};



	var index = {
		version: version,
		DOM: DOM,
		PropTypes: PropTypes,
		Children: Children,
		render: render$1,
		createClass: createClass,
		createFactory: createFactory,
		createElement: createElement,
		cloneElement: cloneElement$1,
		isValidElement: isValidElement,
		findDOMNode: findDOMNode,
		unmountComponentAtNode: unmountComponentAtNode,
		Component: Component$1,
		PureComponent: PureComponent,
		unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
	};

	return index;

	})));
	//# sourceMappingURL=preact-compat.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (false) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(4)();
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(5);
	var invariant = __webpack_require__(6);
	var ReactPropTypesSecret = __webpack_require__(7);

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    invariant(
	      false,
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (false) {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	!function() {
	    'use strict';
	    function VNode() {}
	    function h(nodeName, attributes) {
	        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
	        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
	        if (attributes && null != attributes.children) {
	            if (!stack.length) stack.push(attributes.children);
	            delete attributes.children;
	        }
	        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
	            if (child === !0 || child === !1) child = null;
	            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
	            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
	            lastSimple = simple;
	        }
	        var p = new VNode();
	        p.nodeName = nodeName;
	        p.children = children;
	        p.attributes = null == attributes ? void 0 : attributes;
	        p.key = null == attributes ? void 0 : attributes.key;
	        if (void 0 !== options.vnode) options.vnode(p);
	        return p;
	    }
	    function extend(obj, props) {
	        for (var i in props) obj[i] = props[i];
	        return obj;
	    }
	    function cloneElement(vnode, props) {
	        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
	    }
	    function enqueueRender(component) {
	        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || setTimeout)(rerender);
	    }
	    function rerender() {
	        var p, list = items;
	        items = [];
	        while (p = list.pop()) if (p.__d) renderComponent(p);
	    }
	    function isSameNodeType(node, vnode, hydrating) {
	        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
	        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
	    }
	    function isNamedNode(node, nodeName) {
	        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	    }
	    function getNodeProps(vnode) {
	        var props = extend({}, vnode.attributes);
	        props.children = vnode.children;
	        var defaultProps = vnode.nodeName.defaultProps;
	        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
	        return props;
	    }
	    function createNode(nodeName, isSvg) {
	        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	        node.__n = nodeName;
	        return node;
	    }
	    function removeNode(node) {
	        if (node.parentNode) node.parentNode.removeChild(node);
	    }
	    function setAccessor(node, name, old, value, isSvg) {
	        if ('className' === name) name = 'class';
	        if ('key' === name) ; else if ('ref' === name) {
	            if (old) old(null);
	            if (value) value(node);
	        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
	            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
	            if (value && 'object' == typeof value) {
	                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
	                for (var i in value) node.style[i] = 'number' == typeof value[i] && IS_NON_DIMENSIONAL.test(i) === !1 ? value[i] + 'px' : value[i];
	            }
	        } else if ('dangerouslySetInnerHTML' === name) {
	            if (value) node.innerHTML = value.__html || '';
	        } else if ('o' == name[0] && 'n' == name[1]) {
	            var useCapture = name !== (name = name.replace(/Capture$/, ''));
	            name = name.toLowerCase().substring(2);
	            if (value) {
	                if (!old) node.addEventListener(name, eventProxy, useCapture);
	            } else node.removeEventListener(name, eventProxy, useCapture);
	            (node.__l || (node.__l = {}))[name] = value;
	        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
	            setProperty(node, name, null == value ? '' : value);
	            if (null == value || value === !1) node.removeAttribute(name);
	        } else {
	            var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
	            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
	        }
	    }
	    function setProperty(node, name, value) {
	        try {
	            node[name] = value;
	        } catch (e) {}
	    }
	    function eventProxy(e) {
	        return this.__l[e.type](options.event && options.event(e) || e);
	    }
	    function flushMounts() {
	        var c;
	        while (c = mounts.pop()) {
	            if (options.afterMount) options.afterMount(c);
	            if (c.componentDidMount) c.componentDidMount();
	        }
	    }
	    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	        if (!diffLevel++) {
	            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
	            hydrating = null != dom && !('__preactattr_' in dom);
	        }
	        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
	        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
	        if (!--diffLevel) {
	            hydrating = !1;
	            if (!componentRoot) flushMounts();
	        }
	        return ret;
	    }
	    function idiff(dom, vnode, context, mountAll, componentRoot) {
	        var out = dom, prevSvgMode = isSvgMode;
	        if (null == vnode) vnode = '';
	        if ('string' == typeof vnode) {
	            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
	                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
	            } else {
	                out = document.createTextNode(vnode);
	                if (dom) {
	                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
	                    recollectNodeTree(dom, !0);
	                }
	            }
	            out.__preactattr_ = !0;
	            return out;
	        }
	        if ('function' == typeof vnode.nodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
	        isSvgMode = 'svg' === vnode.nodeName ? !0 : 'foreignObject' === vnode.nodeName ? !1 : isSvgMode;
	        if (!dom || !isNamedNode(dom, String(vnode.nodeName))) {
	            out = createNode(String(vnode.nodeName), isSvgMode);
	            if (dom) {
	                while (dom.firstChild) out.appendChild(dom.firstChild);
	                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
	                recollectNodeTree(dom, !0);
	            }
	        }
	        var fc = out.firstChild, props = out.__preactattr_ || (out.__preactattr_ = {}), vchildren = vnode.children;
	        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
	            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
	        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
	        diffAttributes(out, vnode.attributes, props);
	        isSvgMode = prevSvgMode;
	        return out;
	    }
	    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
	        if (0 !== len) for (var i = 0; i < len; i++) {
	            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
	            if (null != key) {
	                keyedLen++;
	                keyed[key] = _child;
	            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
	        }
	        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
	            vchild = vchildren[i];
	            child = null;
	            var key = vchild.key;
	            if (null != key) {
	                if (keyedLen && void 0 !== keyed[key]) {
	                    child = keyed[key];
	                    keyed[key] = void 0;
	                    keyedLen--;
	                }
	            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
	                child = c;
	                children[j] = void 0;
	                if (j === childrenLen - 1) childrenLen--;
	                if (j === min) min++;
	                break;
	            }
	            child = idiff(child, vchild, context, mountAll);
	            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) if (child === originalChildren[i + 1]) removeNode(originalChildren[i]); else dom.insertBefore(child, originalChildren[i] || null);
	        }
	        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
	        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var component = node._component;
	        if (component) unmountComponent(component); else {
	            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
	            if (unmountOnly === !1 || null == node.__preactattr_) removeNode(node);
	            removeChildren(node);
	        }
	    }
	    function removeChildren(node) {
	        node = node.lastChild;
	        while (node) {
	            var next = node.previousSibling;
	            recollectNodeTree(node, !0);
	            node = next;
	        }
	    }
	    function diffAttributes(dom, attrs, old) {
	        var name;
	        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
	        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name;
	        (components[name] || (components[name] = [])).push(component);
	    }
	    function createComponent(Ctor, props, context) {
	        var inst, list = components[Ctor.name];
	        if (Ctor.prototype && Ctor.prototype.render) {
	            inst = new Ctor(props, context);
	            Component.call(inst, props, context);
	        } else {
	            inst = new Component(props, context);
	            inst.constructor = Ctor;
	            inst.render = doRender;
	        }
	        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
	            inst.__b = list[i].__b;
	            list.splice(i, 1);
	            break;
	        }
	        return inst;
	    }
	    function doRender(props, state, context) {
	        return this.constructor(props, context);
	    }
	    function setComponentProps(component, props, opts, context, mountAll) {
	        if (!component.__x) {
	            component.__x = !0;
	            if (component.__r = props.ref) delete props.ref;
	            if (component.__k = props.key) delete props.key;
	            if (!component.base || mountAll) {
	                if (component.componentWillMount) component.componentWillMount();
	            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
	            if (context && context !== component.context) {
	                if (!component.__c) component.__c = component.context;
	                component.context = context;
	            }
	            if (!component.__p) component.__p = component.props;
	            component.props = props;
	            component.__x = !1;
	            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
	            if (component.__r) component.__r(component);
	        }
	    }
	    function renderComponent(component, opts, mountAll, isChild) {
	        if (!component.__x) {
	            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.__p = component.__s = component.__c = component.__b = null;
	            component.__d = !1;
	            if (!skip) {
	                rendered = component.render(props, state, context);
	                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
	                var toUnmount, base, childComponent = rendered && rendered.nodeName;
	                if ('function' == typeof childComponent) {
	                    var childProps = getNodeProps(rendered);
	                    inst = initialChildComponent;
	                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
	                        toUnmount = inst;
	                        component._component = inst = createComponent(childComponent, childProps, context);
	                        inst.__b = inst.__b || nextBase;
	                        inst.__u = component;
	                        setComponentProps(inst, childProps, 0, context, !1);
	                        renderComponent(inst, 1, mountAll, !0);
	                    }
	                    base = inst.base;
	                } else {
	                    cbase = initialBase;
	                    toUnmount = initialChildComponent;
	                    if (toUnmount) cbase = component._component = null;
	                    if (initialBase || 1 === opts) {
	                        if (cbase) cbase._component = null;
	                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
	                    }
	                }
	                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
	                    var baseParent = initialBase.parentNode;
	                    if (baseParent && base !== baseParent) {
	                        baseParent.replaceChild(base, initialBase);
	                        if (!toUnmount) {
	                            initialBase._component = null;
	                            recollectNodeTree(initialBase, !1);
	                        }
	                    }
	                }
	                if (toUnmount) unmountComponent(toUnmount);
	                component.base = base;
	                if (base && !isChild) {
	                    var componentRef = component, t = component;
	                    while (t = t.__u) (componentRef = t).base = base;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	            }
	            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
	                flushMounts();
	                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
	                if (options.afterUpdate) options.afterUpdate(component);
	            }
	            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
	            if (!diffLevel && !isChild) flushMounts();
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context, mountAll) {
	        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
	        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
	        if (c && isOwner && (!mountAll || c._component)) {
	            setComponentProps(c, props, 3, context, mountAll);
	            dom = c.base;
	        } else {
	            if (originalComponent && !isDirectOwner) {
	                unmountComponent(originalComponent);
	                dom = oldDom = null;
	            }
	            c = createComponent(vnode.nodeName, props, context);
	            if (dom && !c.__b) {
	                c.__b = dom;
	                oldDom = null;
	            }
	            setComponentProps(c, props, 1, context, mountAll);
	            dom = c.base;
	            if (oldDom && dom !== oldDom) {
	                oldDom._component = null;
	                recollectNodeTree(oldDom, !1);
	            }
	        }
	        return dom;
	    }
	    function unmountComponent(component) {
	        if (options.beforeUnmount) options.beforeUnmount(component);
	        var base = component.base;
	        component.__x = !0;
	        if (component.componentWillUnmount) component.componentWillUnmount();
	        component.base = null;
	        var inner = component._component;
	        if (inner) unmountComponent(inner); else if (base) {
	            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
	            component.__b = base;
	            removeNode(base);
	            collectComponent(component);
	            removeChildren(base);
	        }
	        if (component.__r) component.__r(null);
	    }
	    function Component(props, context) {
	        this.__d = !0;
	        this.context = context;
	        this.props = props;
	        this.state = this.state || {};
	    }
	    function render(vnode, parent, merge) {
	        return diff(merge, vnode, {}, !1, parent, !1);
	    }
	    var options = {};
	    var stack = [];
	    var EMPTY_CHILDREN = [];
	    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
	    var items = [];
	    var mounts = [];
	    var diffLevel = 0;
	    var isSvgMode = !1;
	    var hydrating = !1;
	    var components = {};
	    extend(Component.prototype, {
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.__s) this.__s = extend({}, s);
	            extend(s, 'function' == typeof state ? state(s, this.props) : state);
	            if (callback) (this.__h = this.__h || []).push(callback);
	            enqueueRender(this);
	        },
	        forceUpdate: function(callback) {
	            if (callback) (this.__h = this.__h || []).push(callback);
	            renderComponent(this, 2);
	        },
	        render: function() {}
	    });
	    var preact = {
	        h: h,
	        createElement: h,
	        cloneElement: cloneElement,
	        Component: Component,
	        render: render,
	        rerender: rerender,
	        options: options
	    };
	    if (true) module.exports = preact; else self.preact = preact;
	}();
	//# sourceMappingURL=preact.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(10);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(25);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(27);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(28);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(29);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(26);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (false) {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(21);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(12),
	    getPrototype = __webpack_require__(18),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
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
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13),
	    getRawTag = __webpack_require__(16),
	    objectToString = __webpack_require__(17);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(14);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(15);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(13);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(19);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(24);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	var _createStore = __webpack_require__(10);

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(26);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });

	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (false) {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  if (false) {
	    var unexpectedKeyCache = {};
	  }

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (false) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	var _compose = __webpack_require__(29);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch,
	        getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.connectAdvanced = exports.createProvider = exports.Provider = undefined;

	var _Provider = __webpack_require__(32);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connectAdvanced = __webpack_require__(35);

	var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

	var _connect = __webpack_require__(39);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Provider = _Provider2.default;
	exports.createProvider = _Provider.createProvider;
	exports.connectAdvanced = _connectAdvanced2.default;
	exports.connect = _connect2.default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createProvider = createProvider;

	var _react = __webpack_require__(2);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _PropTypes = __webpack_require__(33);

	var _warning = __webpack_require__(34);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;

	  (0, _warning2.default)('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	function createProvider() {
	  var _Provider$childContex;

	  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
	  var subKey = arguments[1];

	  var subscriptionKey = subKey || storeKey + 'Subscription';

	  var Provider = function (_Component) {
	    _inherits(Provider, _Component);

	    Provider.prototype.getChildContext = function getChildContext() {
	      var _ref;

	      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
	    };

	    function Provider(props, context) {
	      _classCallCheck(this, Provider);

	      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	      _this[storeKey] = props.store;
	      return _this;
	    }

	    Provider.prototype.render = function render() {
	      return _react.Children.only(this.props.children);
	    };

	    return Provider;
	  }(_react.Component);

	  if (false) {
	    Provider.prototype.componentWillReceiveProps = function (nextProps) {
	      if (this[storeKey] !== nextProps.store) {
	        warnAboutReceivingStore();
	      }
	    };
	  }

	  Provider.propTypes = {
	    store: _PropTypes.storeShape.isRequired,
	    children: _propTypes2.default.element.isRequired
	  };
	  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _PropTypes.storeShape.isRequired, _Provider$childContex[subscriptionKey] = _PropTypes.subscriptionShape, _Provider$childContex);
	  Provider.displayName = 'Provider';

	  return Provider;
	}

	exports.default = createProvider();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.storeShape = exports.subscriptionShape = undefined;

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var subscriptionShape = exports.subscriptionShape = _propTypes2.default.shape({
	  trySubscribe: _propTypes2.default.func.isRequired,
	  tryUnsubscribe: _propTypes2.default.func.isRequired,
	  notifyNestedSubs: _propTypes2.default.func.isRequired,
	  isSubscribed: _propTypes2.default.func.isRequired
	});

	var storeShape = exports.storeShape = _propTypes2.default.shape({
	  subscribe: _propTypes2.default.func.isRequired,
	  dispatch: _propTypes2.default.func.isRequired,
	  getState: _propTypes2.default.func.isRequired
	});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = connectAdvanced;

	var _hoistNonReactStatics = __webpack_require__(36);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(37);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _Subscription = __webpack_require__(38);

	var _Subscription2 = _interopRequireDefault(_Subscription);

	var _PropTypes = __webpack_require__(33);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var hotReloadingVersion = 0;
	var dummyState = {};
	function noop() {}
	function makeSelectorStateful(sourceSelector, store) {
	  // wrap the selector in an object that tracks its results between runs.
	  var selector = {
	    run: function runComponentSelector(props) {
	      try {
	        var nextProps = sourceSelector(store.getState(), props);
	        if (nextProps !== selector.props || selector.error) {
	          selector.shouldComponentUpdate = true;
	          selector.props = nextProps;
	          selector.error = null;
	        }
	      } catch (error) {
	        selector.shouldComponentUpdate = true;
	        selector.error = error;
	      }
	    }
	  };

	  return selector;
	}

	function connectAdvanced(
	/*
	  selectorFactory is a func that is responsible for returning the selector function used to
	  compute new props from state, props, and dispatch. For example:
	     export default connectAdvanced((dispatch, options) => (state, props) => ({
	      thing: state.things[props.thingId],
	      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
	    }))(YourComponent)
	   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
	  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
	  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
	   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
	  props. Do not use connectAdvanced directly without memoizing results between calls to your
	  selector, otherwise the Connect component will re-render on every state or props change.
	*/
	selectorFactory) {
	  var _contextTypes, _childContextTypes;

	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$getDisplayName = _ref.getDisplayName,
	      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
	    return 'ConnectAdvanced(' + name + ')';
	  } : _ref$getDisplayName,
	      _ref$methodName = _ref.methodName,
	      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
	      _ref$renderCountProp = _ref.renderCountProp,
	      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
	      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
	      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
	      _ref$storeKey = _ref.storeKey,
	      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
	      _ref$withRef = _ref.withRef,
	      withRef = _ref$withRef === undefined ? false : _ref$withRef,
	      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

	  var subscriptionKey = storeKey + 'Subscription';
	  var version = hotReloadingVersion++;

	  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = _PropTypes.storeShape, _contextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _contextTypes);
	  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = _PropTypes.subscriptionShape, _childContextTypes);

	  return function wrapWithConnect(WrappedComponent) {
	    (0, _invariant2.default)(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

	    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	    var displayName = getDisplayName(wrappedComponentName);

	    var selectorFactoryOptions = _extends({}, connectOptions, {
	      getDisplayName: getDisplayName,
	      methodName: methodName,
	      renderCountProp: renderCountProp,
	      shouldHandleStateChanges: shouldHandleStateChanges,
	      storeKey: storeKey,
	      withRef: withRef,
	      displayName: displayName,
	      wrappedComponentName: wrappedComponentName,
	      WrappedComponent: WrappedComponent
	    });

	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.state = {};
	        _this.renderCount = 0;
	        _this.store = props[storeKey] || context[storeKey];
	        _this.propsMode = Boolean(props[storeKey]);
	        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

	        (0, _invariant2.default)(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

	        _this.initSelector();
	        _this.initSubscription();
	        return _this;
	      }

	      Connect.prototype.getChildContext = function getChildContext() {
	        var _ref2;

	        // If this component received store from props, its subscription should be transparent
	        // to any descendants receiving store+subscription from context; it passes along
	        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
	        // Connect to control ordering of notifications to flow top-down.
	        var subscription = this.propsMode ? null : this.subscription;
	        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        if (!shouldHandleStateChanges) return;

	        // componentWillMount fires during server side rendering, but componentDidMount and
	        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
	        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
	        // To handle the case where a child component may have triggered a state change by
	        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
	        // re-render.
	        this.subscription.trySubscribe();
	        this.selector.run(this.props);
	        if (this.selector.shouldComponentUpdate) this.forceUpdate();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.selector.run(nextProps);
	      };

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return this.selector.shouldComponentUpdate;
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (this.subscription) this.subscription.tryUnsubscribe();
	        this.subscription = null;
	        this.notifyNestedSubs = noop;
	        this.store = null;
	        this.selector.run = noop;
	        this.selector.shouldComponentUpdate = false;
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2.default)(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
	        return this.wrappedInstance;
	      };

	      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
	        this.wrappedInstance = ref;
	      };

	      Connect.prototype.initSelector = function initSelector() {
	        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
	        this.selector = makeSelectorStateful(sourceSelector, this.store);
	        this.selector.run(this.props);
	      };

	      Connect.prototype.initSubscription = function initSubscription() {
	        if (!shouldHandleStateChanges) return;

	        // parentSub's source should match where store came from: props vs. context. A component
	        // connected to the store via props shouldn't use subscription from context, or vice versa.
	        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
	        this.subscription = new _Subscription2.default(this.store, parentSub, this.onStateChange.bind(this));

	        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
	        // the middle of the notification loop, where `this.subscription` will then be null. An
	        // extra null check every change can be avoided by copying the method onto `this` and then
	        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
	        // listeners logic is changed to not call listeners that have been unsubscribed in the
	        // middle of the notification loop.
	        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
	      };

	      Connect.prototype.onStateChange = function onStateChange() {
	        this.selector.run(this.props);

	        if (!this.selector.shouldComponentUpdate) {
	          this.notifyNestedSubs();
	        } else {
	          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
	          this.setState(dummyState);
	        }
	      };

	      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
	        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
	        // needs to notify nested subs. Once called, it unimplements itself until further state
	        // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
	        // a boolean check every time avoids an extra method call most of the time, resulting
	        // in some perf boost.
	        this.componentDidUpdate = undefined;
	        this.notifyNestedSubs();
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return Boolean(this.subscription) && this.subscription.isSubscribed();
	      };

	      Connect.prototype.addExtraProps = function addExtraProps(props) {
	        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
	        // make a shallow copy so that fields added don't leak to the original selector.
	        // this is especially important for 'ref' since that's a reference back to the component
	        // instance. a singleton memoized selector would then be holding a reference to the
	        // instance, preventing the instance from being garbage collected, and that would be bad
	        var withExtras = _extends({}, props);
	        if (withRef) withExtras.ref = this.setWrappedInstance;
	        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
	        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
	        return withExtras;
	      };

	      Connect.prototype.render = function render() {
	        var selector = this.selector;
	        selector.shouldComponentUpdate = false;

	        if (selector.error) {
	          throw selector.error;
	        } else {
	          return (0, _react.createElement)(WrappedComponent, this.addExtraProps(selector.props));
	        }
	      };

	      return Connect;
	    }(_react.Component);

	    Connect.WrappedComponent = WrappedComponent;
	    Connect.displayName = displayName;
	    Connect.childContextTypes = childContextTypes;
	    Connect.contextTypes = contextTypes;
	    Connect.propTypes = contextTypes;

	    if (false) {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        // We are hot reloading!
	        if (this.version !== version) {
	          this.version = version;
	          this.initSelector();

	          if (this.subscription) this.subscription.tryUnsubscribe();
	          this.initSubscription();
	          if (shouldHandleStateChanges) this.subscription.trySubscribe();
	        }
	      };
	    }

	    return (0, _hoistNonReactStatics2.default)(Connect, WrappedComponent);
	  };
	}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var NODE_ENV = ("production");

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// encapsulates the subscription logic for connecting a component to the redux store, as
	// well as nesting subscriptions of descendant components, so that we can ensure the
	// ancestor components re-render before descendants

	var CLEARED = null;
	var nullListeners = {
	  notify: function notify() {}
	};

	function createListenerCollection() {
	  // the current/next pattern is copied from redux's createStore code.
	  // TODO: refactor+expose that code to be reusable here?
	  var current = [];
	  var next = [];

	  return {
	    clear: function clear() {
	      next = CLEARED;
	      current = CLEARED;
	    },
	    notify: function notify() {
	      var listeners = current = next;
	      for (var i = 0; i < listeners.length; i++) {
	        listeners[i]();
	      }
	    },
	    subscribe: function subscribe(listener) {
	      var isSubscribed = true;
	      if (next === current) next = current.slice();
	      next.push(listener);

	      return function unsubscribe() {
	        if (!isSubscribed || current === CLEARED) return;
	        isSubscribed = false;

	        if (next === current) next = current.slice();
	        next.splice(next.indexOf(listener), 1);
	      };
	    }
	  };
	}

	var Subscription = function () {
	  function Subscription(store, parentSub, onStateChange) {
	    _classCallCheck(this, Subscription);

	    this.store = store;
	    this.parentSub = parentSub;
	    this.onStateChange = onStateChange;
	    this.unsubscribe = null;
	    this.listeners = nullListeners;
	  }

	  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
	    this.trySubscribe();
	    return this.listeners.subscribe(listener);
	  };

	  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
	    this.listeners.notify();
	  };

	  Subscription.prototype.isSubscribed = function isSubscribed() {
	    return Boolean(this.unsubscribe);
	  };

	  Subscription.prototype.trySubscribe = function trySubscribe() {
	    if (!this.unsubscribe) {
	      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

	      this.listeners = createListenerCollection();
	    }
	  };

	  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
	    if (this.unsubscribe) {
	      this.unsubscribe();
	      this.unsubscribe = null;
	      this.listeners.clear();
	      this.listeners = nullListeners;
	    }
	  };

	  return Subscription;
	}();

	exports.default = Subscription;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.createConnect = createConnect;

	var _connectAdvanced = __webpack_require__(35);

	var _connectAdvanced2 = _interopRequireDefault(_connectAdvanced);

	var _shallowEqual = __webpack_require__(40);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _mapDispatchToProps = __webpack_require__(41);

	var _mapDispatchToProps2 = _interopRequireDefault(_mapDispatchToProps);

	var _mapStateToProps = __webpack_require__(44);

	var _mapStateToProps2 = _interopRequireDefault(_mapStateToProps);

	var _mergeProps = __webpack_require__(45);

	var _mergeProps2 = _interopRequireDefault(_mergeProps);

	var _selectorFactory = __webpack_require__(46);

	var _selectorFactory2 = _interopRequireDefault(_selectorFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/*
	  connect is a facade over connectAdvanced. It turns its args into a compatible
	  selectorFactory, which has the signature:

	    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
	  
	  connect passes its args to connectAdvanced as options, which will in turn pass them to
	  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

	  selectorFactory returns a final props selector from its mapStateToProps,
	  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
	  mergePropsFactories, and pure args.

	  The resulting final props selector is called by the Connect component instance whenever
	  it receives new props or store state.
	 */

	function match(arg, factories, name) {
	  for (var i = factories.length - 1; i >= 0; i--) {
	    var result = factories[i](arg);
	    if (result) return result;
	  }

	  return function (dispatch, options) {
	    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
	  };
	}

	function strictEqual(a, b) {
	  return a === b;
	}

	// createConnect with default args builds the 'official' connect behavior. Calling it with
	// different options opens up some testing and extensibility scenarios
	function createConnect() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      _ref$connectHOC = _ref.connectHOC,
	      connectHOC = _ref$connectHOC === undefined ? _connectAdvanced2.default : _ref$connectHOC,
	      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
	      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? _mapStateToProps2.default : _ref$mapStateToPropsF,
	      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
	      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? _mapDispatchToProps2.default : _ref$mapDispatchToPro,
	      _ref$mergePropsFactor = _ref.mergePropsFactories,
	      mergePropsFactories = _ref$mergePropsFactor === undefined ? _mergeProps2.default : _ref$mergePropsFactor,
	      _ref$selectorFactory = _ref.selectorFactory,
	      selectorFactory = _ref$selectorFactory === undefined ? _selectorFactory2.default : _ref$selectorFactory;

	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
	        _ref2$pure = _ref2.pure,
	        pure = _ref2$pure === undefined ? true : _ref2$pure,
	        _ref2$areStatesEqual = _ref2.areStatesEqual,
	        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
	        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
	        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? _shallowEqual2.default : _ref2$areOwnPropsEqua,
	        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
	        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? _shallowEqual2.default : _ref2$areStatePropsEq,
	        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
	        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? _shallowEqual2.default : _ref2$areMergedPropsE,
	        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

	    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
	    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
	    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

	    return connectHOC(selectorFactory, _extends({
	      // used in error messages
	      methodName: 'connect',

	      // used to compute Connect's displayName from the wrapped component's displayName.
	      getDisplayName: function getDisplayName(name) {
	        return 'Connect(' + name + ')';
	      },

	      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
	      shouldHandleStateChanges: Boolean(mapStateToProps),

	      // passed through to selectorFactory
	      initMapStateToProps: initMapStateToProps,
	      initMapDispatchToProps: initMapDispatchToProps,
	      initMergeProps: initMergeProps,
	      pure: pure,
	      areStatesEqual: areStatesEqual,
	      areOwnPropsEqual: areOwnPropsEqual,
	      areStatePropsEqual: areStatePropsEqual,
	      areMergedPropsEqual: areMergedPropsEqual

	    }, extraOptions));
	  };
	}

	exports.default = createConnect();

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.default = shallowEqual;
	var hasOwn = Object.prototype.hasOwnProperty;

	function is(x, y) {
	  if (x === y) {
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    return x !== x && y !== y;
	  }
	}

	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) return true;

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.whenMapDispatchToPropsIsFunction = whenMapDispatchToPropsIsFunction;
	exports.whenMapDispatchToPropsIsMissing = whenMapDispatchToPropsIsMissing;
	exports.whenMapDispatchToPropsIsObject = whenMapDispatchToPropsIsObject;

	var _redux = __webpack_require__(9);

	var _wrapMapToProps = __webpack_require__(42);

	function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
	  return typeof mapDispatchToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapDispatchToProps, 'mapDispatchToProps') : undefined;
	}

	function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
	  return !mapDispatchToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return { dispatch: dispatch };
	  }) : undefined;
	}

	function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
	  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function (dispatch) {
	    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
	  }) : undefined;
	}

	exports.default = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.wrapMapToPropsConstant = wrapMapToPropsConstant;
	exports.getDependsOnOwnProps = getDependsOnOwnProps;
	exports.wrapMapToPropsFunc = wrapMapToPropsFunc;

	var _verifyPlainObject = __webpack_require__(43);

	var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function wrapMapToPropsConstant(getConstant) {
	  return function initConstantSelector(dispatch, options) {
	    var constant = getConstant(dispatch, options);

	    function constantSelector() {
	      return constant;
	    }
	    constantSelector.dependsOnOwnProps = false;
	    return constantSelector;
	  };
	}

	// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
	// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
	// whether mapToProps needs to be invoked when props have changed.
	// 
	// A length of one signals that mapToProps does not depend on props from the parent component.
	// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
	// therefore not reporting its length accurately..
	function getDependsOnOwnProps(mapToProps) {
	  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
	}

	// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
	// this function wraps mapToProps in a proxy function which does several things:
	// 
	//  * Detects whether the mapToProps function being called depends on props, which
	//    is used by selectorFactory to decide if it should reinvoke on props changes.
	//    
	//  * On first call, handles mapToProps if returns another function, and treats that
	//    new function as the true mapToProps for subsequent calls.
	//    
	//  * On first call, verifies the first result is a plain object, in order to warn
	//    the developer that their mapToProps function is not returning a valid result.
	//    
	function wrapMapToPropsFunc(mapToProps, methodName) {
	  return function initProxySelector(dispatch, _ref) {
	    var displayName = _ref.displayName;

	    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
	      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
	    };

	    // allow detectFactoryAndVerify to get ownProps
	    proxy.dependsOnOwnProps = true;

	    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
	      proxy.mapToProps = mapToProps;
	      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
	      var props = proxy(stateOrDispatch, ownProps);

	      if (typeof props === 'function') {
	        proxy.mapToProps = props;
	        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
	        props = proxy(stateOrDispatch, ownProps);
	      }

	      if (false) (0, _verifyPlainObject2.default)(props, displayName, methodName);

	      return props;
	    };

	    return proxy;
	  };
	}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = verifyPlainObject;

	var _isPlainObject = __webpack_require__(11);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(34);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function verifyPlainObject(value, displayName, methodName) {
	  if (!(0, _isPlainObject2.default)(value)) {
	    (0, _warning2.default)(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
	  }
	}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.whenMapStateToPropsIsFunction = whenMapStateToPropsIsFunction;
	exports.whenMapStateToPropsIsMissing = whenMapStateToPropsIsMissing;

	var _wrapMapToProps = __webpack_require__(42);

	function whenMapStateToPropsIsFunction(mapStateToProps) {
	  return typeof mapStateToProps === 'function' ? (0, _wrapMapToProps.wrapMapToPropsFunc)(mapStateToProps, 'mapStateToProps') : undefined;
	}

	function whenMapStateToPropsIsMissing(mapStateToProps) {
	  return !mapStateToProps ? (0, _wrapMapToProps.wrapMapToPropsConstant)(function () {
	    return {};
	  }) : undefined;
	}

	exports.default = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.defaultMergeProps = defaultMergeProps;
	exports.wrapMergePropsFunc = wrapMergePropsFunc;
	exports.whenMergePropsIsFunction = whenMergePropsIsFunction;
	exports.whenMergePropsIsOmitted = whenMergePropsIsOmitted;

	var _verifyPlainObject = __webpack_require__(43);

	var _verifyPlainObject2 = _interopRequireDefault(_verifyPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function defaultMergeProps(stateProps, dispatchProps, ownProps) {
	  return _extends({}, ownProps, stateProps, dispatchProps);
	}

	function wrapMergePropsFunc(mergeProps) {
	  return function initMergePropsProxy(dispatch, _ref) {
	    var displayName = _ref.displayName,
	        pure = _ref.pure,
	        areMergedPropsEqual = _ref.areMergedPropsEqual;

	    var hasRunOnce = false;
	    var mergedProps = void 0;

	    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
	      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

	      if (hasRunOnce) {
	        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
	      } else {
	        hasRunOnce = true;
	        mergedProps = nextMergedProps;

	        if (false) (0, _verifyPlainObject2.default)(mergedProps, displayName, 'mergeProps');
	      }

	      return mergedProps;
	    };
	  };
	}

	function whenMergePropsIsFunction(mergeProps) {
	  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
	}

	function whenMergePropsIsOmitted(mergeProps) {
	  return !mergeProps ? function () {
	    return defaultMergeProps;
	  } : undefined;
	}

	exports.default = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.impureFinalPropsSelectorFactory = impureFinalPropsSelectorFactory;
	exports.pureFinalPropsSelectorFactory = pureFinalPropsSelectorFactory;
	exports.default = finalPropsSelectorFactory;

	var _verifySubselectors = __webpack_require__(47);

	var _verifySubselectors2 = _interopRequireDefault(_verifySubselectors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
	  return function impureFinalPropsSelector(state, ownProps) {
	    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
	  };
	}

	function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
	  var areStatesEqual = _ref.areStatesEqual,
	      areOwnPropsEqual = _ref.areOwnPropsEqual,
	      areStatePropsEqual = _ref.areStatePropsEqual;

	  var hasRunAtLeastOnce = false;
	  var state = void 0;
	  var ownProps = void 0;
	  var stateProps = void 0;
	  var dispatchProps = void 0;
	  var mergedProps = void 0;

	  function handleFirstCall(firstState, firstOwnProps) {
	    state = firstState;
	    ownProps = firstOwnProps;
	    stateProps = mapStateToProps(state, ownProps);
	    dispatchProps = mapDispatchToProps(dispatch, ownProps);
	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    hasRunAtLeastOnce = true;
	    return mergedProps;
	  }

	  function handleNewPropsAndNewState() {
	    stateProps = mapStateToProps(state, ownProps);

	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }

	  function handleNewProps() {
	    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

	    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

	    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
	    return mergedProps;
	  }

	  function handleNewState() {
	    var nextStateProps = mapStateToProps(state, ownProps);
	    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
	    stateProps = nextStateProps;

	    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

	    return mergedProps;
	  }

	  function handleSubsequentCalls(nextState, nextOwnProps) {
	    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
	    var stateChanged = !areStatesEqual(nextState, state);
	    state = nextState;
	    ownProps = nextOwnProps;

	    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
	    if (propsChanged) return handleNewProps();
	    if (stateChanged) return handleNewState();
	    return mergedProps;
	  }

	  return function pureFinalPropsSelector(nextState, nextOwnProps) {
	    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
	  };
	}

	// TODO: Add more comments

	// If pure is true, the selector returned by selectorFactory will memoize its results,
	// allowing connectAdvanced's shouldComponentUpdate to return false if final
	// props have not changed. If false, the selector will always return a new
	// object and shouldComponentUpdate will always return true.

	function finalPropsSelectorFactory(dispatch, _ref2) {
	  var initMapStateToProps = _ref2.initMapStateToProps,
	      initMapDispatchToProps = _ref2.initMapDispatchToProps,
	      initMergeProps = _ref2.initMergeProps,
	      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

	  var mapStateToProps = initMapStateToProps(dispatch, options);
	  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
	  var mergeProps = initMergeProps(dispatch, options);

	  if (false) {
	    (0, _verifySubselectors2.default)(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
	  }

	  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

	  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
	}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = verifySubselectors;

	var _warning = __webpack_require__(34);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function verify(selector, methodName, displayName) {
	  if (!selector) {
	    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
	  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
	    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
	      (0, _warning2.default)('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
	    }
	  }
	}

	function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
	  verify(mapStateToProps, 'mapStateToProps', displayName);
	  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
	  verify(mergeProps, 'mergeProps', displayName);
	}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = bgSlide;
	function bgSlide(state = {}, action) {
		switch (action.type) {
			case 'OPEN_SLIDE_BG_PANEL':
				return Object.assign({}, state, { initial: action.currentSettings });

			case 'CLOSE_SLIDE_BG_PANEL':
				return Object.assign({}, state, { new: {}, initial: {} });

			case 'SET_SLIDE_BG_IMAGE':
				return Object.assign({}, state, { new: { 'background-image': action.path } });

			case 'SET_SLIDE_BG_VIDEO':
				return Object.assign({}, state, { new: { 'background-video': action.path } });

			default:
				return state;
		}
		}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = editor;

	var _mdConverter = __webpack_require__(50);

	var _mdConverter2 = _interopRequireDefault(_mdConverter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function editor(state = {
		md: '',
		selectionStart: 0,
		selectionEnd: 0,
		insert: null,
		dirty: false,
		html: ''
	}, action) {
		switch (action.type) {
			case 'MD_CHANGED':
				return Object.assign({}, state, {
					md: action.md,
					html: _mdConverter2.default.render(action.md),
					dirty: true,
					insert: null
				});

			case 'MD_LOADED':
				return Object.assign({}, state, {
					md: action.md,
					html: _mdConverter2.default.render(action.md),
					dirty: false,
					insert: null
				});

			case 'SAVE_MD_SUCCESS':
				return Object.assign({}, state, {
					dirty: false
				});

			case 'EDITOR_POS_CHANGED':
				return Object.assign({}, state, {
					selectionStart: action.payload.selectionStart,
					selectionEnd: action.payload.selectionEnd
				});

			case 'INSERT':
				return Object.assign({}, state, {
					insert: action.stringsToInsert
				});

			default:
				return state;
		}
		}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	const MarkdownIt = __webpack_require__(51);

	exports.default = new MarkdownIt({
		html: true,
		modifyToken: function (token, env) {
			switch (token.type) {
				case 'image':
					token.attrObj.src = token.attrObj.src.replace(/%5C/g, '/');
					break;
			}
		}
	}).use(__webpack_require__(118), 'slide', {
		render: function (tokens, idx) {
			var attributes = '';
			var attributesSource = tokens[idx].info.trim().replace(/slide */, '').replace(/" /g, '"!');

			if (attributesSource.length) {
				attributes = attributesSource.split('!').map(attr => {
					let prefix = attr.match(/id="/) ? '' : 'data-';
					return prefix + attr.replace('class="', 'state="').replace(/^(background-(?:image|video)=")([^"]+")/, (match, p1, p2) => p1 + p2.replace(/ /g, '%20').replace(/\\/g, '/')); //replace spaces in file name with %20
				}).join(' ');
			}

			if (tokens[idx].nesting === 1) {
				return `<section ${attributes}>\n`;
			} else {
				return '</section>\n';
			}
		}
	}).use(__webpack_require__(118), 'speakerNote', {
		render: function (tokens, idx) {
			if (tokens[idx].nesting === 1) {
				// opening tag
				return '<aside class="notes">\n';
			} else {
				// closing tag
				return '</aside>\n';
			}
		}
		}).use(__webpack_require__(119)).use(__webpack_require__(120)).use(__webpack_require__(121));

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = __webpack_require__(52);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	// Main parser class

	'use strict';


	var utils        = __webpack_require__(53);
	var helpers      = __webpack_require__(67);
	var Renderer     = __webpack_require__(71);
	var ParserCore   = __webpack_require__(72);
	var ParserBlock  = __webpack_require__(82);
	var ParserInline = __webpack_require__(97);
	var LinkifyIt    = __webpack_require__(112);
	var mdurl        = __webpack_require__(57);
	var punycode     = __webpack_require__(114);


	var config = {
	  'default': __webpack_require__(115),
	  zero: __webpack_require__(116),
	  commonmark: __webpack_require__(117)
	};

	////////////////////////////////////////////////////////////////////////////////
	//
	// This validator can prohibit more than really needed to prevent XSS. It's a
	// tradeoff to keep code simple and to be secure by default.
	//
	// If you need different setup - override validator method as you wish. Or
	// replace it with dummy function and use external sanitizer.
	//

	var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
	var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

	function validateLink(url) {
	  // url should be normalized at this point, and existing entities are decoded
	  var str = url.trim().toLowerCase();

	  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
	}

	////////////////////////////////////////////////////////////////////////////////


	var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

	function normalizeLink(url) {
	  var parsed = mdurl.parse(url, true);

	  if (parsed.hostname) {
	    // Encode hostnames in urls like:
	    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	    //
	    // We don't encode unknown schemas, because it's likely that we encode
	    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	    //
	    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	      try {
	        parsed.hostname = punycode.toASCII(parsed.hostname);
	      } catch (er) { /**/ }
	    }
	  }

	  return mdurl.encode(mdurl.format(parsed));
	}

	function normalizeLinkText(url) {
	  var parsed = mdurl.parse(url, true);

	  if (parsed.hostname) {
	    // Encode hostnames in urls like:
	    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	    //
	    // We don't encode unknown schemas, because it's likely that we encode
	    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	    //
	    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	      try {
	        parsed.hostname = punycode.toUnicode(parsed.hostname);
	      } catch (er) { /**/ }
	    }
	  }

	  return mdurl.decode(mdurl.format(parsed));
	}


	/**
	 * class MarkdownIt
	 *
	 * Main parser/renderer class.
	 *
	 * ##### Usage
	 *
	 * ```javascript
	 * // node.js, "classic" way:
	 * var MarkdownIt = require('markdown-it'),
	 *     md = new MarkdownIt();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // node.js, the same, but with sugar:
	 * var md = require('markdown-it')();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // browser without AMD, added to "window" on script load
	 * // Note, there are no dash.
	 * var md = window.markdownit();
	 * var result = md.render('# markdown-it rulezz!');
	 * ```
	 *
	 * Single line rendering, without paragraph wrap:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 * var result = md.renderInline('__markdown-it__ rulezz!');
	 * ```
	 **/

	/**
	 * new MarkdownIt([presetName, options])
	 * - presetName (String): optional, `commonmark` / `zero`
	 * - options (Object)
	 *
	 * Creates parser instanse with given config. Can be called without `new`.
	 *
	 * ##### presetName
	 *
	 * MarkdownIt provides named presets as a convenience to quickly
	 * enable/disable active syntax rules and options for common use cases.
	 *
	 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
	 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
	 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
	 *   similar to GFM, used when no preset name given. Enables all available rules,
	 *   but still without html, typographer & autolinker.
	 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
	 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
	 *   For example, when you need only `bold` and `italic` markup and nothing else.
	 *
	 * ##### options:
	 *
	 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
	 *   That's not safe! You may need external sanitizer to protect output from XSS.
	 *   It's better to extend features via plugins, instead of enabling HTML.
	 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
	 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
	 *   world you will need HTML output.
	 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
	 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
	 *   Can be useful for external highlighters.
	 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
	 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
	 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
	 *   quotes beautification (smartquotes).
	 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
	 *   pairs, when typographer enabled and smartquotes on. For example, you can
	 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
	 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
	 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
	 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
	 *   return empty string if the source was not changed and should be escaped
	 *   externaly. If result starts with <pre... internal wrapper is skipped.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * // commonmark mode
	 * var md = require('markdown-it')('commonmark');
	 *
	 * // default mode
	 * var md = require('markdown-it')();
	 *
	 * // enable everything
	 * var md = require('markdown-it')({
	 *   html: true,
	 *   linkify: true,
	 *   typographer: true
	 * });
	 * ```
	 *
	 * ##### Syntax highlighting
	 *
	 * ```js
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return hljs.highlight(lang, str, true).value;
	 *       } catch (__) {}
	 *     }
	 *
	 *     return ''; // use external default escaping
	 *   }
	 * });
	 * ```
	 *
	 * Or with full wrapper override (if you need assign class to `<pre>`):
	 *
	 * ```javascript
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * // Actual default values
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return '<pre class="hljs"><code>' +
	 *                hljs.highlight(lang, str, true).value +
	 *                '</code></pre>';
	 *       } catch (__) {}
	 *     }
	 *
	 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
	 *   }
	 * });
	 * ```
	 *
	 **/
	function MarkdownIt(presetName, options) {
	  if (!(this instanceof MarkdownIt)) {
	    return new MarkdownIt(presetName, options);
	  }

	  if (!options) {
	    if (!utils.isString(presetName)) {
	      options = presetName || {};
	      presetName = 'default';
	    }
	  }

	  /**
	   * MarkdownIt#inline -> ParserInline
	   *
	   * Instance of [[ParserInline]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.inline = new ParserInline();

	  /**
	   * MarkdownIt#block -> ParserBlock
	   *
	   * Instance of [[ParserBlock]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.block = new ParserBlock();

	  /**
	   * MarkdownIt#core -> Core
	   *
	   * Instance of [[Core]] chain executor. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/
	  this.core = new ParserCore();

	  /**
	   * MarkdownIt#renderer -> Renderer
	   *
	   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
	   * rules for new token types, generated by plugins.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * function myToken(tokens, idx, options, env, self) {
	   *   //...
	   *   return result;
	   * };
	   *
	   * md.renderer.rules['my_token'] = myToken
	   * ```
	   *
	   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
	   **/
	  this.renderer = new Renderer();

	  /**
	   * MarkdownIt#linkify -> LinkifyIt
	   *
	   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
	   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
	   * rule.
	   **/
	  this.linkify = new LinkifyIt();

	  /**
	   * MarkdownIt#validateLink(url) -> Boolean
	   *
	   * Link validation function. CommonMark allows too much in links. By default
	   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
	   * except some embedded image types.
	   *
	   * You can change this behaviour:
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   * // enable everything
	   * md.validateLink = function () { return true; }
	   * ```
	   **/
	  this.validateLink = validateLink;

	  /**
	   * MarkdownIt#normalizeLink(url) -> String
	   *
	   * Function used to encode link url to a machine-readable format,
	   * which includes url-encoding, punycode, etc.
	   **/
	  this.normalizeLink = normalizeLink;

	  /**
	   * MarkdownIt#normalizeLinkText(url) -> String
	   *
	   * Function used to decode link url to a human-readable format`
	   **/
	  this.normalizeLinkText = normalizeLinkText;


	  // Expose utils & helpers for easy acces from plugins

	  /**
	   * MarkdownIt#utils -> utils
	   *
	   * Assorted utility functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
	   **/
	  this.utils = utils;

	  /**
	   * MarkdownIt#helpers -> helpers
	   *
	   * Link components parser functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
	   **/
	  this.helpers = utils.assign({}, helpers);


	  this.options = {};
	  this.configure(presetName);

	  if (options) { this.set(options); }
	}


	/** chainable
	 * MarkdownIt.set(options)
	 *
	 * Set parser options (in the same format as in constructor). Probably, you
	 * will never need it, but you can change options after constructor call.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .set({ html: true, breaks: true })
	 *             .set({ typographer, true });
	 * ```
	 *
	 * __Note:__ To achieve the best possible performance, don't modify a
	 * `markdown-it` instance options on the fly. If you need multiple configurations
	 * it's best to create multiple instances and initialize each with separate
	 * config.
	 **/
	MarkdownIt.prototype.set = function (options) {
	  utils.assign(this.options, options);
	  return this;
	};


	/** chainable, internal
	 * MarkdownIt.configure(presets)
	 *
	 * Batch load of all options and compenent settings. This is internal method,
	 * and you probably will not need it. But if you with - see available presets
	 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
	 *
	 * We strongly recommend to use presets instead of direct config loads. That
	 * will give better compatibility with next versions.
	 **/
	MarkdownIt.prototype.configure = function (presets) {
	  var self = this, presetName;

	  if (utils.isString(presets)) {
	    presetName = presets;
	    presets = config[presetName];
	    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
	  }

	  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

	  if (presets.options) { self.set(presets.options); }

	  if (presets.components) {
	    Object.keys(presets.components).forEach(function (name) {
	      if (presets.components[name].rules) {
	        self[name].ruler.enableOnly(presets.components[name].rules);
	      }
	      if (presets.components[name].rules2) {
	        self[name].ruler2.enableOnly(presets.components[name].rules2);
	      }
	    });
	  }
	  return this;
	};


	/** chainable
	 * MarkdownIt.enable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to enable
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable list or rules. It will automatically find appropriate components,
	 * containing rules with given names. If rule not found, and `ignoreInvalid`
	 * not set - throws exception.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .enable(['sub', 'sup'])
	 *             .disable('smartquotes');
	 * ```
	 **/
	MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
	  var result = [];

	  if (!Array.isArray(list)) { list = [ list ]; }

	  [ 'core', 'block', 'inline' ].forEach(function (chain) {
	    result = result.concat(this[chain].ruler.enable(list, true));
	  }, this);

	  result = result.concat(this.inline.ruler2.enable(list, true));

	  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

	  if (missed.length && !ignoreInvalid) {
	    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
	  }

	  return this;
	};


	/** chainable
	 * MarkdownIt.disable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * The same as [[MarkdownIt.enable]], but turn specified rules off.
	 **/
	MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
	  var result = [];

	  if (!Array.isArray(list)) { list = [ list ]; }

	  [ 'core', 'block', 'inline' ].forEach(function (chain) {
	    result = result.concat(this[chain].ruler.disable(list, true));
	  }, this);

	  result = result.concat(this.inline.ruler2.disable(list, true));

	  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

	  if (missed.length && !ignoreInvalid) {
	    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
	  }
	  return this;
	};


	/** chainable
	 * MarkdownIt.use(plugin, params)
	 *
	 * Load specified plugin with given params into current parser instance.
	 * It's just a sugar to call `plugin(md, params)` with curring.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var iterator = require('markdown-it-for-inline');
	 * var md = require('markdown-it')()
	 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
	 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
	 *             });
	 * ```
	 **/
	MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
	  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
	  plugin.apply(plugin, args);
	  return this;
	};


	/** internal
	 * MarkdownIt.parse(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Parse input string and returns list of block tokens (special token type
	 * "inline" will contain list of inline tokens). You should not call this
	 * method directly, until you write custom renderer (for example, to produce
	 * AST).
	 *
	 * `env` is used to pass data between "distributed" rules and return additional
	 * metadata like reference info, needed for the renderer. It also can be used to
	 * inject data in specific cases. Usually, you will be ok to pass `{}`,
	 * and then pass updated object to renderer.
	 **/
	MarkdownIt.prototype.parse = function (src, env) {
	  if (typeof src !== 'string') {
	    throw new Error('Input data should be a String');
	  }

	  var state = new this.core.State(src, this, env);

	  this.core.process(state);

	  return state.tokens;
	};


	/**
	 * MarkdownIt.render(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Render markdown string into html. It does all magic for you :).
	 *
	 * `env` can be used to inject additional metadata (`{}` by default).
	 * But you will not need it with high probability. See also comment
	 * in [[MarkdownIt.parse]].
	 **/
	MarkdownIt.prototype.render = function (src, env) {
	  env = env || {};

	  return this.renderer.render(this.parse(src, env), this.options, env);
	};


	/** internal
	 * MarkdownIt.parseInline(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
	 * block tokens list with the single `inline` element, containing parsed inline
	 * tokens in `children` property. Also updates `env` object.
	 **/
	MarkdownIt.prototype.parseInline = function (src, env) {
	  var state = new this.core.State(src, this, env);

	  state.inlineMode = true;
	  this.core.process(state);

	  return state.tokens;
	};


	/**
	 * MarkdownIt.renderInline(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
	 * will NOT be wrapped into `<p>` tags.
	 **/
	MarkdownIt.prototype.renderInline = function (src, env) {
	  env = env || {};

	  return this.renderer.render(this.parseInline(src, env), this.options, env);
	};


	module.exports = MarkdownIt;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// Utilities
	//
	'use strict';


	function _class(obj) { return Object.prototype.toString.call(obj); }

	function isString(obj) { return _class(obj) === '[object String]'; }

	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	function has(object, key) {
	  return _hasOwnProperty.call(object, key);
	}

	// Merge objects
	//
	function assign(obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);

	  sources.forEach(function (source) {
	    if (!source) { return; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be object');
	    }

	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });

	  return obj;
	}

	// Remove element from array and put another array at those position.
	// Useful for some operations with tokens
	function arrayReplaceAt(src, pos, newElements) {
	  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
	}

	////////////////////////////////////////////////////////////////////////////////

	function isValidEntityCode(c) {
	  /*eslint no-bitwise:0*/
	  // broken sequence
	  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
	  // never used
	  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
	  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
	  // control codes
	  if (c >= 0x00 && c <= 0x08) { return false; }
	  if (c === 0x0B) { return false; }
	  if (c >= 0x0E && c <= 0x1F) { return false; }
	  if (c >= 0x7F && c <= 0x9F) { return false; }
	  // out of range
	  if (c > 0x10FFFF) { return false; }
	  return true;
	}

	function fromCodePoint(c) {
	  /*eslint no-bitwise:0*/
	  if (c > 0xffff) {
	    c -= 0x10000;
	    var surrogate1 = 0xd800 + (c >> 10),
	        surrogate2 = 0xdc00 + (c & 0x3ff);

	    return String.fromCharCode(surrogate1, surrogate2);
	  }
	  return String.fromCharCode(c);
	}


	var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
	var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
	var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

	var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;

	var entities = __webpack_require__(54);

	function replaceEntityPattern(match, name) {
	  var code = 0;

	  if (has(entities, name)) {
	    return entities[name];
	  }

	  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
	    code = name[1].toLowerCase() === 'x' ?
	      parseInt(name.slice(2), 16)
	    :
	      parseInt(name.slice(1), 10);
	    if (isValidEntityCode(code)) {
	      return fromCodePoint(code);
	    }
	  }

	  return match;
	}

	/*function replaceEntities(str) {
	  if (str.indexOf('&') < 0) { return str; }

	  return str.replace(ENTITY_RE, replaceEntityPattern);
	}*/

	function unescapeMd(str) {
	  if (str.indexOf('\\') < 0) { return str; }
	  return str.replace(UNESCAPE_MD_RE, '$1');
	}

	function unescapeAll(str) {
	  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

	  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
	    if (escaped) { return escaped; }
	    return replaceEntityPattern(match, entity);
	  });
	}

	////////////////////////////////////////////////////////////////////////////////

	var HTML_ESCAPE_TEST_RE = /[&<>"]/;
	var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
	var HTML_REPLACEMENTS = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};

	function replaceUnsafeChar(ch) {
	  return HTML_REPLACEMENTS[ch];
	}

	function escapeHtml(str) {
	  if (HTML_ESCAPE_TEST_RE.test(str)) {
	    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	  }
	  return str;
	}

	////////////////////////////////////////////////////////////////////////////////

	var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

	function escapeRE(str) {
	  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
	}

	////////////////////////////////////////////////////////////////////////////////

	function isSpace(code) {
	  switch (code) {
	    case 0x09:
	    case 0x20:
	      return true;
	  }
	  return false;
	}

	// Zs (unicode class) || [\t\f\v\r\n]
	function isWhiteSpace(code) {
	  if (code >= 0x2000 && code <= 0x200A) { return true; }
	  switch (code) {
	    case 0x09: // \t
	    case 0x0A: // \n
	    case 0x0B: // \v
	    case 0x0C: // \f
	    case 0x0D: // \r
	    case 0x20:
	    case 0xA0:
	    case 0x1680:
	    case 0x202F:
	    case 0x205F:
	    case 0x3000:
	      return true;
	  }
	  return false;
	}

	////////////////////////////////////////////////////////////////////////////////

	/*eslint-disable max-len*/
	var UNICODE_PUNCT_RE = __webpack_require__(56);

	// Currently without astral characters support.
	function isPunctChar(ch) {
	  return UNICODE_PUNCT_RE.test(ch);
	}


	// Markdown ASCII punctuation characters.
	//
	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	//
	// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
	//
	function isMdAsciiPunct(ch) {
	  switch (ch) {
	    case 0x21/* ! */:
	    case 0x22/* " */:
	    case 0x23/* # */:
	    case 0x24/* $ */:
	    case 0x25/* % */:
	    case 0x26/* & */:
	    case 0x27/* ' */:
	    case 0x28/* ( */:
	    case 0x29/* ) */:
	    case 0x2A/* * */:
	    case 0x2B/* + */:
	    case 0x2C/* , */:
	    case 0x2D/* - */:
	    case 0x2E/* . */:
	    case 0x2F/* / */:
	    case 0x3A/* : */:
	    case 0x3B/* ; */:
	    case 0x3C/* < */:
	    case 0x3D/* = */:
	    case 0x3E/* > */:
	    case 0x3F/* ? */:
	    case 0x40/* @ */:
	    case 0x5B/* [ */:
	    case 0x5C/* \ */:
	    case 0x5D/* ] */:
	    case 0x5E/* ^ */:
	    case 0x5F/* _ */:
	    case 0x60/* ` */:
	    case 0x7B/* { */:
	    case 0x7C/* | */:
	    case 0x7D/* } */:
	    case 0x7E/* ~ */:
	      return true;
	    default:
	      return false;
	  }
	}

	// Hepler to unify [reference labels].
	//
	function normalizeReference(str) {
	  // use .toUpperCase() instead of .toLowerCase()
	  // here to avoid a conflict with Object.prototype
	  // members (most notably, `__proto__`)
	  return str.trim().replace(/\s+/g, ' ').toUpperCase();
	}

	////////////////////////////////////////////////////////////////////////////////

	// Re-export libraries commonly used in both markdown-it and its plugins,
	// so plugins won't have to depend on them explicitly, which reduces their
	// bundled size (e.g. a browser build).
	//
	exports.lib                 = {};
	exports.lib.mdurl           = __webpack_require__(57);
	exports.lib.ucmicro         = __webpack_require__(62);

	exports.assign              = assign;
	exports.isString            = isString;
	exports.has                 = has;
	exports.unescapeMd          = unescapeMd;
	exports.unescapeAll         = unescapeAll;
	exports.isValidEntityCode   = isValidEntityCode;
	exports.fromCodePoint       = fromCodePoint;
	// exports.replaceEntities     = replaceEntities;
	exports.escapeHtml          = escapeHtml;
	exports.arrayReplaceAt      = arrayReplaceAt;
	exports.isSpace             = isSpace;
	exports.isWhiteSpace        = isWhiteSpace;
	exports.isMdAsciiPunct      = isMdAsciiPunct;
	exports.isPunctChar         = isPunctChar;
	exports.escapeRE            = escapeRE;
	exports.normalizeReference  = normalizeReference;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// HTML5 entities map: { name -> utf16string }
	//
	'use strict';

	/*eslint quotes:0*/
	module.exports = __webpack_require__(55);


/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = {
		"Aacute": "Á",
		"aacute": "á",
		"Abreve": "Ă",
		"abreve": "ă",
		"ac": "∾",
		"acd": "∿",
		"acE": "∾̳",
		"Acirc": "Â",
		"acirc": "â",
		"acute": "´",
		"Acy": "А",
		"acy": "а",
		"AElig": "Æ",
		"aelig": "æ",
		"af": "⁡",
		"Afr": "𝔄",
		"afr": "𝔞",
		"Agrave": "À",
		"agrave": "à",
		"alefsym": "ℵ",
		"aleph": "ℵ",
		"Alpha": "Α",
		"alpha": "α",
		"Amacr": "Ā",
		"amacr": "ā",
		"amalg": "⨿",
		"amp": "&",
		"AMP": "&",
		"andand": "⩕",
		"And": "⩓",
		"and": "∧",
		"andd": "⩜",
		"andslope": "⩘",
		"andv": "⩚",
		"ang": "∠",
		"ange": "⦤",
		"angle": "∠",
		"angmsdaa": "⦨",
		"angmsdab": "⦩",
		"angmsdac": "⦪",
		"angmsdad": "⦫",
		"angmsdae": "⦬",
		"angmsdaf": "⦭",
		"angmsdag": "⦮",
		"angmsdah": "⦯",
		"angmsd": "∡",
		"angrt": "∟",
		"angrtvb": "⊾",
		"angrtvbd": "⦝",
		"angsph": "∢",
		"angst": "Å",
		"angzarr": "⍼",
		"Aogon": "Ą",
		"aogon": "ą",
		"Aopf": "𝔸",
		"aopf": "𝕒",
		"apacir": "⩯",
		"ap": "≈",
		"apE": "⩰",
		"ape": "≊",
		"apid": "≋",
		"apos": "'",
		"ApplyFunction": "⁡",
		"approx": "≈",
		"approxeq": "≊",
		"Aring": "Å",
		"aring": "å",
		"Ascr": "𝒜",
		"ascr": "𝒶",
		"Assign": "≔",
		"ast": "*",
		"asymp": "≈",
		"asympeq": "≍",
		"Atilde": "Ã",
		"atilde": "ã",
		"Auml": "Ä",
		"auml": "ä",
		"awconint": "∳",
		"awint": "⨑",
		"backcong": "≌",
		"backepsilon": "϶",
		"backprime": "‵",
		"backsim": "∽",
		"backsimeq": "⋍",
		"Backslash": "∖",
		"Barv": "⫧",
		"barvee": "⊽",
		"barwed": "⌅",
		"Barwed": "⌆",
		"barwedge": "⌅",
		"bbrk": "⎵",
		"bbrktbrk": "⎶",
		"bcong": "≌",
		"Bcy": "Б",
		"bcy": "б",
		"bdquo": "„",
		"becaus": "∵",
		"because": "∵",
		"Because": "∵",
		"bemptyv": "⦰",
		"bepsi": "϶",
		"bernou": "ℬ",
		"Bernoullis": "ℬ",
		"Beta": "Β",
		"beta": "β",
		"beth": "ℶ",
		"between": "≬",
		"Bfr": "𝔅",
		"bfr": "𝔟",
		"bigcap": "⋂",
		"bigcirc": "◯",
		"bigcup": "⋃",
		"bigodot": "⨀",
		"bigoplus": "⨁",
		"bigotimes": "⨂",
		"bigsqcup": "⨆",
		"bigstar": "★",
		"bigtriangledown": "▽",
		"bigtriangleup": "△",
		"biguplus": "⨄",
		"bigvee": "⋁",
		"bigwedge": "⋀",
		"bkarow": "⤍",
		"blacklozenge": "⧫",
		"blacksquare": "▪",
		"blacktriangle": "▴",
		"blacktriangledown": "▾",
		"blacktriangleleft": "◂",
		"blacktriangleright": "▸",
		"blank": "␣",
		"blk12": "▒",
		"blk14": "░",
		"blk34": "▓",
		"block": "█",
		"bne": "=⃥",
		"bnequiv": "≡⃥",
		"bNot": "⫭",
		"bnot": "⌐",
		"Bopf": "𝔹",
		"bopf": "𝕓",
		"bot": "⊥",
		"bottom": "⊥",
		"bowtie": "⋈",
		"boxbox": "⧉",
		"boxdl": "┐",
		"boxdL": "╕",
		"boxDl": "╖",
		"boxDL": "╗",
		"boxdr": "┌",
		"boxdR": "╒",
		"boxDr": "╓",
		"boxDR": "╔",
		"boxh": "─",
		"boxH": "═",
		"boxhd": "┬",
		"boxHd": "╤",
		"boxhD": "╥",
		"boxHD": "╦",
		"boxhu": "┴",
		"boxHu": "╧",
		"boxhU": "╨",
		"boxHU": "╩",
		"boxminus": "⊟",
		"boxplus": "⊞",
		"boxtimes": "⊠",
		"boxul": "┘",
		"boxuL": "╛",
		"boxUl": "╜",
		"boxUL": "╝",
		"boxur": "└",
		"boxuR": "╘",
		"boxUr": "╙",
		"boxUR": "╚",
		"boxv": "│",
		"boxV": "║",
		"boxvh": "┼",
		"boxvH": "╪",
		"boxVh": "╫",
		"boxVH": "╬",
		"boxvl": "┤",
		"boxvL": "╡",
		"boxVl": "╢",
		"boxVL": "╣",
		"boxvr": "├",
		"boxvR": "╞",
		"boxVr": "╟",
		"boxVR": "╠",
		"bprime": "‵",
		"breve": "˘",
		"Breve": "˘",
		"brvbar": "¦",
		"bscr": "𝒷",
		"Bscr": "ℬ",
		"bsemi": "⁏",
		"bsim": "∽",
		"bsime": "⋍",
		"bsolb": "⧅",
		"bsol": "\\",
		"bsolhsub": "⟈",
		"bull": "•",
		"bullet": "•",
		"bump": "≎",
		"bumpE": "⪮",
		"bumpe": "≏",
		"Bumpeq": "≎",
		"bumpeq": "≏",
		"Cacute": "Ć",
		"cacute": "ć",
		"capand": "⩄",
		"capbrcup": "⩉",
		"capcap": "⩋",
		"cap": "∩",
		"Cap": "⋒",
		"capcup": "⩇",
		"capdot": "⩀",
		"CapitalDifferentialD": "ⅅ",
		"caps": "∩︀",
		"caret": "⁁",
		"caron": "ˇ",
		"Cayleys": "ℭ",
		"ccaps": "⩍",
		"Ccaron": "Č",
		"ccaron": "č",
		"Ccedil": "Ç",
		"ccedil": "ç",
		"Ccirc": "Ĉ",
		"ccirc": "ĉ",
		"Cconint": "∰",
		"ccups": "⩌",
		"ccupssm": "⩐",
		"Cdot": "Ċ",
		"cdot": "ċ",
		"cedil": "¸",
		"Cedilla": "¸",
		"cemptyv": "⦲",
		"cent": "¢",
		"centerdot": "·",
		"CenterDot": "·",
		"cfr": "𝔠",
		"Cfr": "ℭ",
		"CHcy": "Ч",
		"chcy": "ч",
		"check": "✓",
		"checkmark": "✓",
		"Chi": "Χ",
		"chi": "χ",
		"circ": "ˆ",
		"circeq": "≗",
		"circlearrowleft": "↺",
		"circlearrowright": "↻",
		"circledast": "⊛",
		"circledcirc": "⊚",
		"circleddash": "⊝",
		"CircleDot": "⊙",
		"circledR": "®",
		"circledS": "Ⓢ",
		"CircleMinus": "⊖",
		"CirclePlus": "⊕",
		"CircleTimes": "⊗",
		"cir": "○",
		"cirE": "⧃",
		"cire": "≗",
		"cirfnint": "⨐",
		"cirmid": "⫯",
		"cirscir": "⧂",
		"ClockwiseContourIntegral": "∲",
		"CloseCurlyDoubleQuote": "”",
		"CloseCurlyQuote": "’",
		"clubs": "♣",
		"clubsuit": "♣",
		"colon": ":",
		"Colon": "∷",
		"Colone": "⩴",
		"colone": "≔",
		"coloneq": "≔",
		"comma": ",",
		"commat": "@",
		"comp": "∁",
		"compfn": "∘",
		"complement": "∁",
		"complexes": "ℂ",
		"cong": "≅",
		"congdot": "⩭",
		"Congruent": "≡",
		"conint": "∮",
		"Conint": "∯",
		"ContourIntegral": "∮",
		"copf": "𝕔",
		"Copf": "ℂ",
		"coprod": "∐",
		"Coproduct": "∐",
		"copy": "©",
		"COPY": "©",
		"copysr": "℗",
		"CounterClockwiseContourIntegral": "∳",
		"crarr": "↵",
		"cross": "✗",
		"Cross": "⨯",
		"Cscr": "𝒞",
		"cscr": "𝒸",
		"csub": "⫏",
		"csube": "⫑",
		"csup": "⫐",
		"csupe": "⫒",
		"ctdot": "⋯",
		"cudarrl": "⤸",
		"cudarrr": "⤵",
		"cuepr": "⋞",
		"cuesc": "⋟",
		"cularr": "↶",
		"cularrp": "⤽",
		"cupbrcap": "⩈",
		"cupcap": "⩆",
		"CupCap": "≍",
		"cup": "∪",
		"Cup": "⋓",
		"cupcup": "⩊",
		"cupdot": "⊍",
		"cupor": "⩅",
		"cups": "∪︀",
		"curarr": "↷",
		"curarrm": "⤼",
		"curlyeqprec": "⋞",
		"curlyeqsucc": "⋟",
		"curlyvee": "⋎",
		"curlywedge": "⋏",
		"curren": "¤",
		"curvearrowleft": "↶",
		"curvearrowright": "↷",
		"cuvee": "⋎",
		"cuwed": "⋏",
		"cwconint": "∲",
		"cwint": "∱",
		"cylcty": "⌭",
		"dagger": "†",
		"Dagger": "‡",
		"daleth": "ℸ",
		"darr": "↓",
		"Darr": "↡",
		"dArr": "⇓",
		"dash": "‐",
		"Dashv": "⫤",
		"dashv": "⊣",
		"dbkarow": "⤏",
		"dblac": "˝",
		"Dcaron": "Ď",
		"dcaron": "ď",
		"Dcy": "Д",
		"dcy": "д",
		"ddagger": "‡",
		"ddarr": "⇊",
		"DD": "ⅅ",
		"dd": "ⅆ",
		"DDotrahd": "⤑",
		"ddotseq": "⩷",
		"deg": "°",
		"Del": "∇",
		"Delta": "Δ",
		"delta": "δ",
		"demptyv": "⦱",
		"dfisht": "⥿",
		"Dfr": "𝔇",
		"dfr": "𝔡",
		"dHar": "⥥",
		"dharl": "⇃",
		"dharr": "⇂",
		"DiacriticalAcute": "´",
		"DiacriticalDot": "˙",
		"DiacriticalDoubleAcute": "˝",
		"DiacriticalGrave": "`",
		"DiacriticalTilde": "˜",
		"diam": "⋄",
		"diamond": "⋄",
		"Diamond": "⋄",
		"diamondsuit": "♦",
		"diams": "♦",
		"die": "¨",
		"DifferentialD": "ⅆ",
		"digamma": "ϝ",
		"disin": "⋲",
		"div": "÷",
		"divide": "÷",
		"divideontimes": "⋇",
		"divonx": "⋇",
		"DJcy": "Ђ",
		"djcy": "ђ",
		"dlcorn": "⌞",
		"dlcrop": "⌍",
		"dollar": "$",
		"Dopf": "𝔻",
		"dopf": "𝕕",
		"Dot": "¨",
		"dot": "˙",
		"DotDot": "⃜",
		"doteq": "≐",
		"doteqdot": "≑",
		"DotEqual": "≐",
		"dotminus": "∸",
		"dotplus": "∔",
		"dotsquare": "⊡",
		"doublebarwedge": "⌆",
		"DoubleContourIntegral": "∯",
		"DoubleDot": "¨",
		"DoubleDownArrow": "⇓",
		"DoubleLeftArrow": "⇐",
		"DoubleLeftRightArrow": "⇔",
		"DoubleLeftTee": "⫤",
		"DoubleLongLeftArrow": "⟸",
		"DoubleLongLeftRightArrow": "⟺",
		"DoubleLongRightArrow": "⟹",
		"DoubleRightArrow": "⇒",
		"DoubleRightTee": "⊨",
		"DoubleUpArrow": "⇑",
		"DoubleUpDownArrow": "⇕",
		"DoubleVerticalBar": "∥",
		"DownArrowBar": "⤓",
		"downarrow": "↓",
		"DownArrow": "↓",
		"Downarrow": "⇓",
		"DownArrowUpArrow": "⇵",
		"DownBreve": "̑",
		"downdownarrows": "⇊",
		"downharpoonleft": "⇃",
		"downharpoonright": "⇂",
		"DownLeftRightVector": "⥐",
		"DownLeftTeeVector": "⥞",
		"DownLeftVectorBar": "⥖",
		"DownLeftVector": "↽",
		"DownRightTeeVector": "⥟",
		"DownRightVectorBar": "⥗",
		"DownRightVector": "⇁",
		"DownTeeArrow": "↧",
		"DownTee": "⊤",
		"drbkarow": "⤐",
		"drcorn": "⌟",
		"drcrop": "⌌",
		"Dscr": "𝒟",
		"dscr": "𝒹",
		"DScy": "Ѕ",
		"dscy": "ѕ",
		"dsol": "⧶",
		"Dstrok": "Đ",
		"dstrok": "đ",
		"dtdot": "⋱",
		"dtri": "▿",
		"dtrif": "▾",
		"duarr": "⇵",
		"duhar": "⥯",
		"dwangle": "⦦",
		"DZcy": "Џ",
		"dzcy": "џ",
		"dzigrarr": "⟿",
		"Eacute": "É",
		"eacute": "é",
		"easter": "⩮",
		"Ecaron": "Ě",
		"ecaron": "ě",
		"Ecirc": "Ê",
		"ecirc": "ê",
		"ecir": "≖",
		"ecolon": "≕",
		"Ecy": "Э",
		"ecy": "э",
		"eDDot": "⩷",
		"Edot": "Ė",
		"edot": "ė",
		"eDot": "≑",
		"ee": "ⅇ",
		"efDot": "≒",
		"Efr": "𝔈",
		"efr": "𝔢",
		"eg": "⪚",
		"Egrave": "È",
		"egrave": "è",
		"egs": "⪖",
		"egsdot": "⪘",
		"el": "⪙",
		"Element": "∈",
		"elinters": "⏧",
		"ell": "ℓ",
		"els": "⪕",
		"elsdot": "⪗",
		"Emacr": "Ē",
		"emacr": "ē",
		"empty": "∅",
		"emptyset": "∅",
		"EmptySmallSquare": "◻",
		"emptyv": "∅",
		"EmptyVerySmallSquare": "▫",
		"emsp13": " ",
		"emsp14": " ",
		"emsp": " ",
		"ENG": "Ŋ",
		"eng": "ŋ",
		"ensp": " ",
		"Eogon": "Ę",
		"eogon": "ę",
		"Eopf": "𝔼",
		"eopf": "𝕖",
		"epar": "⋕",
		"eparsl": "⧣",
		"eplus": "⩱",
		"epsi": "ε",
		"Epsilon": "Ε",
		"epsilon": "ε",
		"epsiv": "ϵ",
		"eqcirc": "≖",
		"eqcolon": "≕",
		"eqsim": "≂",
		"eqslantgtr": "⪖",
		"eqslantless": "⪕",
		"Equal": "⩵",
		"equals": "=",
		"EqualTilde": "≂",
		"equest": "≟",
		"Equilibrium": "⇌",
		"equiv": "≡",
		"equivDD": "⩸",
		"eqvparsl": "⧥",
		"erarr": "⥱",
		"erDot": "≓",
		"escr": "ℯ",
		"Escr": "ℰ",
		"esdot": "≐",
		"Esim": "⩳",
		"esim": "≂",
		"Eta": "Η",
		"eta": "η",
		"ETH": "Ð",
		"eth": "ð",
		"Euml": "Ë",
		"euml": "ë",
		"euro": "€",
		"excl": "!",
		"exist": "∃",
		"Exists": "∃",
		"expectation": "ℰ",
		"exponentiale": "ⅇ",
		"ExponentialE": "ⅇ",
		"fallingdotseq": "≒",
		"Fcy": "Ф",
		"fcy": "ф",
		"female": "♀",
		"ffilig": "ﬃ",
		"fflig": "ﬀ",
		"ffllig": "ﬄ",
		"Ffr": "𝔉",
		"ffr": "𝔣",
		"filig": "ﬁ",
		"FilledSmallSquare": "◼",
		"FilledVerySmallSquare": "▪",
		"fjlig": "fj",
		"flat": "♭",
		"fllig": "ﬂ",
		"fltns": "▱",
		"fnof": "ƒ",
		"Fopf": "𝔽",
		"fopf": "𝕗",
		"forall": "∀",
		"ForAll": "∀",
		"fork": "⋔",
		"forkv": "⫙",
		"Fouriertrf": "ℱ",
		"fpartint": "⨍",
		"frac12": "½",
		"frac13": "⅓",
		"frac14": "¼",
		"frac15": "⅕",
		"frac16": "⅙",
		"frac18": "⅛",
		"frac23": "⅔",
		"frac25": "⅖",
		"frac34": "¾",
		"frac35": "⅗",
		"frac38": "⅜",
		"frac45": "⅘",
		"frac56": "⅚",
		"frac58": "⅝",
		"frac78": "⅞",
		"frasl": "⁄",
		"frown": "⌢",
		"fscr": "𝒻",
		"Fscr": "ℱ",
		"gacute": "ǵ",
		"Gamma": "Γ",
		"gamma": "γ",
		"Gammad": "Ϝ",
		"gammad": "ϝ",
		"gap": "⪆",
		"Gbreve": "Ğ",
		"gbreve": "ğ",
		"Gcedil": "Ģ",
		"Gcirc": "Ĝ",
		"gcirc": "ĝ",
		"Gcy": "Г",
		"gcy": "г",
		"Gdot": "Ġ",
		"gdot": "ġ",
		"ge": "≥",
		"gE": "≧",
		"gEl": "⪌",
		"gel": "⋛",
		"geq": "≥",
		"geqq": "≧",
		"geqslant": "⩾",
		"gescc": "⪩",
		"ges": "⩾",
		"gesdot": "⪀",
		"gesdoto": "⪂",
		"gesdotol": "⪄",
		"gesl": "⋛︀",
		"gesles": "⪔",
		"Gfr": "𝔊",
		"gfr": "𝔤",
		"gg": "≫",
		"Gg": "⋙",
		"ggg": "⋙",
		"gimel": "ℷ",
		"GJcy": "Ѓ",
		"gjcy": "ѓ",
		"gla": "⪥",
		"gl": "≷",
		"glE": "⪒",
		"glj": "⪤",
		"gnap": "⪊",
		"gnapprox": "⪊",
		"gne": "⪈",
		"gnE": "≩",
		"gneq": "⪈",
		"gneqq": "≩",
		"gnsim": "⋧",
		"Gopf": "𝔾",
		"gopf": "𝕘",
		"grave": "`",
		"GreaterEqual": "≥",
		"GreaterEqualLess": "⋛",
		"GreaterFullEqual": "≧",
		"GreaterGreater": "⪢",
		"GreaterLess": "≷",
		"GreaterSlantEqual": "⩾",
		"GreaterTilde": "≳",
		"Gscr": "𝒢",
		"gscr": "ℊ",
		"gsim": "≳",
		"gsime": "⪎",
		"gsiml": "⪐",
		"gtcc": "⪧",
		"gtcir": "⩺",
		"gt": ">",
		"GT": ">",
		"Gt": "≫",
		"gtdot": "⋗",
		"gtlPar": "⦕",
		"gtquest": "⩼",
		"gtrapprox": "⪆",
		"gtrarr": "⥸",
		"gtrdot": "⋗",
		"gtreqless": "⋛",
		"gtreqqless": "⪌",
		"gtrless": "≷",
		"gtrsim": "≳",
		"gvertneqq": "≩︀",
		"gvnE": "≩︀",
		"Hacek": "ˇ",
		"hairsp": " ",
		"half": "½",
		"hamilt": "ℋ",
		"HARDcy": "Ъ",
		"hardcy": "ъ",
		"harrcir": "⥈",
		"harr": "↔",
		"hArr": "⇔",
		"harrw": "↭",
		"Hat": "^",
		"hbar": "ℏ",
		"Hcirc": "Ĥ",
		"hcirc": "ĥ",
		"hearts": "♥",
		"heartsuit": "♥",
		"hellip": "…",
		"hercon": "⊹",
		"hfr": "𝔥",
		"Hfr": "ℌ",
		"HilbertSpace": "ℋ",
		"hksearow": "⤥",
		"hkswarow": "⤦",
		"hoarr": "⇿",
		"homtht": "∻",
		"hookleftarrow": "↩",
		"hookrightarrow": "↪",
		"hopf": "𝕙",
		"Hopf": "ℍ",
		"horbar": "―",
		"HorizontalLine": "─",
		"hscr": "𝒽",
		"Hscr": "ℋ",
		"hslash": "ℏ",
		"Hstrok": "Ħ",
		"hstrok": "ħ",
		"HumpDownHump": "≎",
		"HumpEqual": "≏",
		"hybull": "⁃",
		"hyphen": "‐",
		"Iacute": "Í",
		"iacute": "í",
		"ic": "⁣",
		"Icirc": "Î",
		"icirc": "î",
		"Icy": "И",
		"icy": "и",
		"Idot": "İ",
		"IEcy": "Е",
		"iecy": "е",
		"iexcl": "¡",
		"iff": "⇔",
		"ifr": "𝔦",
		"Ifr": "ℑ",
		"Igrave": "Ì",
		"igrave": "ì",
		"ii": "ⅈ",
		"iiiint": "⨌",
		"iiint": "∭",
		"iinfin": "⧜",
		"iiota": "℩",
		"IJlig": "Ĳ",
		"ijlig": "ĳ",
		"Imacr": "Ī",
		"imacr": "ī",
		"image": "ℑ",
		"ImaginaryI": "ⅈ",
		"imagline": "ℐ",
		"imagpart": "ℑ",
		"imath": "ı",
		"Im": "ℑ",
		"imof": "⊷",
		"imped": "Ƶ",
		"Implies": "⇒",
		"incare": "℅",
		"in": "∈",
		"infin": "∞",
		"infintie": "⧝",
		"inodot": "ı",
		"intcal": "⊺",
		"int": "∫",
		"Int": "∬",
		"integers": "ℤ",
		"Integral": "∫",
		"intercal": "⊺",
		"Intersection": "⋂",
		"intlarhk": "⨗",
		"intprod": "⨼",
		"InvisibleComma": "⁣",
		"InvisibleTimes": "⁢",
		"IOcy": "Ё",
		"iocy": "ё",
		"Iogon": "Į",
		"iogon": "į",
		"Iopf": "𝕀",
		"iopf": "𝕚",
		"Iota": "Ι",
		"iota": "ι",
		"iprod": "⨼",
		"iquest": "¿",
		"iscr": "𝒾",
		"Iscr": "ℐ",
		"isin": "∈",
		"isindot": "⋵",
		"isinE": "⋹",
		"isins": "⋴",
		"isinsv": "⋳",
		"isinv": "∈",
		"it": "⁢",
		"Itilde": "Ĩ",
		"itilde": "ĩ",
		"Iukcy": "І",
		"iukcy": "і",
		"Iuml": "Ï",
		"iuml": "ï",
		"Jcirc": "Ĵ",
		"jcirc": "ĵ",
		"Jcy": "Й",
		"jcy": "й",
		"Jfr": "𝔍",
		"jfr": "𝔧",
		"jmath": "ȷ",
		"Jopf": "𝕁",
		"jopf": "𝕛",
		"Jscr": "𝒥",
		"jscr": "𝒿",
		"Jsercy": "Ј",
		"jsercy": "ј",
		"Jukcy": "Є",
		"jukcy": "є",
		"Kappa": "Κ",
		"kappa": "κ",
		"kappav": "ϰ",
		"Kcedil": "Ķ",
		"kcedil": "ķ",
		"Kcy": "К",
		"kcy": "к",
		"Kfr": "𝔎",
		"kfr": "𝔨",
		"kgreen": "ĸ",
		"KHcy": "Х",
		"khcy": "х",
		"KJcy": "Ќ",
		"kjcy": "ќ",
		"Kopf": "𝕂",
		"kopf": "𝕜",
		"Kscr": "𝒦",
		"kscr": "𝓀",
		"lAarr": "⇚",
		"Lacute": "Ĺ",
		"lacute": "ĺ",
		"laemptyv": "⦴",
		"lagran": "ℒ",
		"Lambda": "Λ",
		"lambda": "λ",
		"lang": "⟨",
		"Lang": "⟪",
		"langd": "⦑",
		"langle": "⟨",
		"lap": "⪅",
		"Laplacetrf": "ℒ",
		"laquo": "«",
		"larrb": "⇤",
		"larrbfs": "⤟",
		"larr": "←",
		"Larr": "↞",
		"lArr": "⇐",
		"larrfs": "⤝",
		"larrhk": "↩",
		"larrlp": "↫",
		"larrpl": "⤹",
		"larrsim": "⥳",
		"larrtl": "↢",
		"latail": "⤙",
		"lAtail": "⤛",
		"lat": "⪫",
		"late": "⪭",
		"lates": "⪭︀",
		"lbarr": "⤌",
		"lBarr": "⤎",
		"lbbrk": "❲",
		"lbrace": "{",
		"lbrack": "[",
		"lbrke": "⦋",
		"lbrksld": "⦏",
		"lbrkslu": "⦍",
		"Lcaron": "Ľ",
		"lcaron": "ľ",
		"Lcedil": "Ļ",
		"lcedil": "ļ",
		"lceil": "⌈",
		"lcub": "{",
		"Lcy": "Л",
		"lcy": "л",
		"ldca": "⤶",
		"ldquo": "“",
		"ldquor": "„",
		"ldrdhar": "⥧",
		"ldrushar": "⥋",
		"ldsh": "↲",
		"le": "≤",
		"lE": "≦",
		"LeftAngleBracket": "⟨",
		"LeftArrowBar": "⇤",
		"leftarrow": "←",
		"LeftArrow": "←",
		"Leftarrow": "⇐",
		"LeftArrowRightArrow": "⇆",
		"leftarrowtail": "↢",
		"LeftCeiling": "⌈",
		"LeftDoubleBracket": "⟦",
		"LeftDownTeeVector": "⥡",
		"LeftDownVectorBar": "⥙",
		"LeftDownVector": "⇃",
		"LeftFloor": "⌊",
		"leftharpoondown": "↽",
		"leftharpoonup": "↼",
		"leftleftarrows": "⇇",
		"leftrightarrow": "↔",
		"LeftRightArrow": "↔",
		"Leftrightarrow": "⇔",
		"leftrightarrows": "⇆",
		"leftrightharpoons": "⇋",
		"leftrightsquigarrow": "↭",
		"LeftRightVector": "⥎",
		"LeftTeeArrow": "↤",
		"LeftTee": "⊣",
		"LeftTeeVector": "⥚",
		"leftthreetimes": "⋋",
		"LeftTriangleBar": "⧏",
		"LeftTriangle": "⊲",
		"LeftTriangleEqual": "⊴",
		"LeftUpDownVector": "⥑",
		"LeftUpTeeVector": "⥠",
		"LeftUpVectorBar": "⥘",
		"LeftUpVector": "↿",
		"LeftVectorBar": "⥒",
		"LeftVector": "↼",
		"lEg": "⪋",
		"leg": "⋚",
		"leq": "≤",
		"leqq": "≦",
		"leqslant": "⩽",
		"lescc": "⪨",
		"les": "⩽",
		"lesdot": "⩿",
		"lesdoto": "⪁",
		"lesdotor": "⪃",
		"lesg": "⋚︀",
		"lesges": "⪓",
		"lessapprox": "⪅",
		"lessdot": "⋖",
		"lesseqgtr": "⋚",
		"lesseqqgtr": "⪋",
		"LessEqualGreater": "⋚",
		"LessFullEqual": "≦",
		"LessGreater": "≶",
		"lessgtr": "≶",
		"LessLess": "⪡",
		"lesssim": "≲",
		"LessSlantEqual": "⩽",
		"LessTilde": "≲",
		"lfisht": "⥼",
		"lfloor": "⌊",
		"Lfr": "𝔏",
		"lfr": "𝔩",
		"lg": "≶",
		"lgE": "⪑",
		"lHar": "⥢",
		"lhard": "↽",
		"lharu": "↼",
		"lharul": "⥪",
		"lhblk": "▄",
		"LJcy": "Љ",
		"ljcy": "љ",
		"llarr": "⇇",
		"ll": "≪",
		"Ll": "⋘",
		"llcorner": "⌞",
		"Lleftarrow": "⇚",
		"llhard": "⥫",
		"lltri": "◺",
		"Lmidot": "Ŀ",
		"lmidot": "ŀ",
		"lmoustache": "⎰",
		"lmoust": "⎰",
		"lnap": "⪉",
		"lnapprox": "⪉",
		"lne": "⪇",
		"lnE": "≨",
		"lneq": "⪇",
		"lneqq": "≨",
		"lnsim": "⋦",
		"loang": "⟬",
		"loarr": "⇽",
		"lobrk": "⟦",
		"longleftarrow": "⟵",
		"LongLeftArrow": "⟵",
		"Longleftarrow": "⟸",
		"longleftrightarrow": "⟷",
		"LongLeftRightArrow": "⟷",
		"Longleftrightarrow": "⟺",
		"longmapsto": "⟼",
		"longrightarrow": "⟶",
		"LongRightArrow": "⟶",
		"Longrightarrow": "⟹",
		"looparrowleft": "↫",
		"looparrowright": "↬",
		"lopar": "⦅",
		"Lopf": "𝕃",
		"lopf": "𝕝",
		"loplus": "⨭",
		"lotimes": "⨴",
		"lowast": "∗",
		"lowbar": "_",
		"LowerLeftArrow": "↙",
		"LowerRightArrow": "↘",
		"loz": "◊",
		"lozenge": "◊",
		"lozf": "⧫",
		"lpar": "(",
		"lparlt": "⦓",
		"lrarr": "⇆",
		"lrcorner": "⌟",
		"lrhar": "⇋",
		"lrhard": "⥭",
		"lrm": "‎",
		"lrtri": "⊿",
		"lsaquo": "‹",
		"lscr": "𝓁",
		"Lscr": "ℒ",
		"lsh": "↰",
		"Lsh": "↰",
		"lsim": "≲",
		"lsime": "⪍",
		"lsimg": "⪏",
		"lsqb": "[",
		"lsquo": "‘",
		"lsquor": "‚",
		"Lstrok": "Ł",
		"lstrok": "ł",
		"ltcc": "⪦",
		"ltcir": "⩹",
		"lt": "<",
		"LT": "<",
		"Lt": "≪",
		"ltdot": "⋖",
		"lthree": "⋋",
		"ltimes": "⋉",
		"ltlarr": "⥶",
		"ltquest": "⩻",
		"ltri": "◃",
		"ltrie": "⊴",
		"ltrif": "◂",
		"ltrPar": "⦖",
		"lurdshar": "⥊",
		"luruhar": "⥦",
		"lvertneqq": "≨︀",
		"lvnE": "≨︀",
		"macr": "¯",
		"male": "♂",
		"malt": "✠",
		"maltese": "✠",
		"Map": "⤅",
		"map": "↦",
		"mapsto": "↦",
		"mapstodown": "↧",
		"mapstoleft": "↤",
		"mapstoup": "↥",
		"marker": "▮",
		"mcomma": "⨩",
		"Mcy": "М",
		"mcy": "м",
		"mdash": "—",
		"mDDot": "∺",
		"measuredangle": "∡",
		"MediumSpace": " ",
		"Mellintrf": "ℳ",
		"Mfr": "𝔐",
		"mfr": "𝔪",
		"mho": "℧",
		"micro": "µ",
		"midast": "*",
		"midcir": "⫰",
		"mid": "∣",
		"middot": "·",
		"minusb": "⊟",
		"minus": "−",
		"minusd": "∸",
		"minusdu": "⨪",
		"MinusPlus": "∓",
		"mlcp": "⫛",
		"mldr": "…",
		"mnplus": "∓",
		"models": "⊧",
		"Mopf": "𝕄",
		"mopf": "𝕞",
		"mp": "∓",
		"mscr": "𝓂",
		"Mscr": "ℳ",
		"mstpos": "∾",
		"Mu": "Μ",
		"mu": "μ",
		"multimap": "⊸",
		"mumap": "⊸",
		"nabla": "∇",
		"Nacute": "Ń",
		"nacute": "ń",
		"nang": "∠⃒",
		"nap": "≉",
		"napE": "⩰̸",
		"napid": "≋̸",
		"napos": "ŉ",
		"napprox": "≉",
		"natural": "♮",
		"naturals": "ℕ",
		"natur": "♮",
		"nbsp": " ",
		"nbump": "≎̸",
		"nbumpe": "≏̸",
		"ncap": "⩃",
		"Ncaron": "Ň",
		"ncaron": "ň",
		"Ncedil": "Ņ",
		"ncedil": "ņ",
		"ncong": "≇",
		"ncongdot": "⩭̸",
		"ncup": "⩂",
		"Ncy": "Н",
		"ncy": "н",
		"ndash": "–",
		"nearhk": "⤤",
		"nearr": "↗",
		"neArr": "⇗",
		"nearrow": "↗",
		"ne": "≠",
		"nedot": "≐̸",
		"NegativeMediumSpace": "​",
		"NegativeThickSpace": "​",
		"NegativeThinSpace": "​",
		"NegativeVeryThinSpace": "​",
		"nequiv": "≢",
		"nesear": "⤨",
		"nesim": "≂̸",
		"NestedGreaterGreater": "≫",
		"NestedLessLess": "≪",
		"NewLine": "\n",
		"nexist": "∄",
		"nexists": "∄",
		"Nfr": "𝔑",
		"nfr": "𝔫",
		"ngE": "≧̸",
		"nge": "≱",
		"ngeq": "≱",
		"ngeqq": "≧̸",
		"ngeqslant": "⩾̸",
		"nges": "⩾̸",
		"nGg": "⋙̸",
		"ngsim": "≵",
		"nGt": "≫⃒",
		"ngt": "≯",
		"ngtr": "≯",
		"nGtv": "≫̸",
		"nharr": "↮",
		"nhArr": "⇎",
		"nhpar": "⫲",
		"ni": "∋",
		"nis": "⋼",
		"nisd": "⋺",
		"niv": "∋",
		"NJcy": "Њ",
		"njcy": "њ",
		"nlarr": "↚",
		"nlArr": "⇍",
		"nldr": "‥",
		"nlE": "≦̸",
		"nle": "≰",
		"nleftarrow": "↚",
		"nLeftarrow": "⇍",
		"nleftrightarrow": "↮",
		"nLeftrightarrow": "⇎",
		"nleq": "≰",
		"nleqq": "≦̸",
		"nleqslant": "⩽̸",
		"nles": "⩽̸",
		"nless": "≮",
		"nLl": "⋘̸",
		"nlsim": "≴",
		"nLt": "≪⃒",
		"nlt": "≮",
		"nltri": "⋪",
		"nltrie": "⋬",
		"nLtv": "≪̸",
		"nmid": "∤",
		"NoBreak": "⁠",
		"NonBreakingSpace": " ",
		"nopf": "𝕟",
		"Nopf": "ℕ",
		"Not": "⫬",
		"not": "¬",
		"NotCongruent": "≢",
		"NotCupCap": "≭",
		"NotDoubleVerticalBar": "∦",
		"NotElement": "∉",
		"NotEqual": "≠",
		"NotEqualTilde": "≂̸",
		"NotExists": "∄",
		"NotGreater": "≯",
		"NotGreaterEqual": "≱",
		"NotGreaterFullEqual": "≧̸",
		"NotGreaterGreater": "≫̸",
		"NotGreaterLess": "≹",
		"NotGreaterSlantEqual": "⩾̸",
		"NotGreaterTilde": "≵",
		"NotHumpDownHump": "≎̸",
		"NotHumpEqual": "≏̸",
		"notin": "∉",
		"notindot": "⋵̸",
		"notinE": "⋹̸",
		"notinva": "∉",
		"notinvb": "⋷",
		"notinvc": "⋶",
		"NotLeftTriangleBar": "⧏̸",
		"NotLeftTriangle": "⋪",
		"NotLeftTriangleEqual": "⋬",
		"NotLess": "≮",
		"NotLessEqual": "≰",
		"NotLessGreater": "≸",
		"NotLessLess": "≪̸",
		"NotLessSlantEqual": "⩽̸",
		"NotLessTilde": "≴",
		"NotNestedGreaterGreater": "⪢̸",
		"NotNestedLessLess": "⪡̸",
		"notni": "∌",
		"notniva": "∌",
		"notnivb": "⋾",
		"notnivc": "⋽",
		"NotPrecedes": "⊀",
		"NotPrecedesEqual": "⪯̸",
		"NotPrecedesSlantEqual": "⋠",
		"NotReverseElement": "∌",
		"NotRightTriangleBar": "⧐̸",
		"NotRightTriangle": "⋫",
		"NotRightTriangleEqual": "⋭",
		"NotSquareSubset": "⊏̸",
		"NotSquareSubsetEqual": "⋢",
		"NotSquareSuperset": "⊐̸",
		"NotSquareSupersetEqual": "⋣",
		"NotSubset": "⊂⃒",
		"NotSubsetEqual": "⊈",
		"NotSucceeds": "⊁",
		"NotSucceedsEqual": "⪰̸",
		"NotSucceedsSlantEqual": "⋡",
		"NotSucceedsTilde": "≿̸",
		"NotSuperset": "⊃⃒",
		"NotSupersetEqual": "⊉",
		"NotTilde": "≁",
		"NotTildeEqual": "≄",
		"NotTildeFullEqual": "≇",
		"NotTildeTilde": "≉",
		"NotVerticalBar": "∤",
		"nparallel": "∦",
		"npar": "∦",
		"nparsl": "⫽⃥",
		"npart": "∂̸",
		"npolint": "⨔",
		"npr": "⊀",
		"nprcue": "⋠",
		"nprec": "⊀",
		"npreceq": "⪯̸",
		"npre": "⪯̸",
		"nrarrc": "⤳̸",
		"nrarr": "↛",
		"nrArr": "⇏",
		"nrarrw": "↝̸",
		"nrightarrow": "↛",
		"nRightarrow": "⇏",
		"nrtri": "⋫",
		"nrtrie": "⋭",
		"nsc": "⊁",
		"nsccue": "⋡",
		"nsce": "⪰̸",
		"Nscr": "𝒩",
		"nscr": "𝓃",
		"nshortmid": "∤",
		"nshortparallel": "∦",
		"nsim": "≁",
		"nsime": "≄",
		"nsimeq": "≄",
		"nsmid": "∤",
		"nspar": "∦",
		"nsqsube": "⋢",
		"nsqsupe": "⋣",
		"nsub": "⊄",
		"nsubE": "⫅̸",
		"nsube": "⊈",
		"nsubset": "⊂⃒",
		"nsubseteq": "⊈",
		"nsubseteqq": "⫅̸",
		"nsucc": "⊁",
		"nsucceq": "⪰̸",
		"nsup": "⊅",
		"nsupE": "⫆̸",
		"nsupe": "⊉",
		"nsupset": "⊃⃒",
		"nsupseteq": "⊉",
		"nsupseteqq": "⫆̸",
		"ntgl": "≹",
		"Ntilde": "Ñ",
		"ntilde": "ñ",
		"ntlg": "≸",
		"ntriangleleft": "⋪",
		"ntrianglelefteq": "⋬",
		"ntriangleright": "⋫",
		"ntrianglerighteq": "⋭",
		"Nu": "Ν",
		"nu": "ν",
		"num": "#",
		"numero": "№",
		"numsp": " ",
		"nvap": "≍⃒",
		"nvdash": "⊬",
		"nvDash": "⊭",
		"nVdash": "⊮",
		"nVDash": "⊯",
		"nvge": "≥⃒",
		"nvgt": ">⃒",
		"nvHarr": "⤄",
		"nvinfin": "⧞",
		"nvlArr": "⤂",
		"nvle": "≤⃒",
		"nvlt": "<⃒",
		"nvltrie": "⊴⃒",
		"nvrArr": "⤃",
		"nvrtrie": "⊵⃒",
		"nvsim": "∼⃒",
		"nwarhk": "⤣",
		"nwarr": "↖",
		"nwArr": "⇖",
		"nwarrow": "↖",
		"nwnear": "⤧",
		"Oacute": "Ó",
		"oacute": "ó",
		"oast": "⊛",
		"Ocirc": "Ô",
		"ocirc": "ô",
		"ocir": "⊚",
		"Ocy": "О",
		"ocy": "о",
		"odash": "⊝",
		"Odblac": "Ő",
		"odblac": "ő",
		"odiv": "⨸",
		"odot": "⊙",
		"odsold": "⦼",
		"OElig": "Œ",
		"oelig": "œ",
		"ofcir": "⦿",
		"Ofr": "𝔒",
		"ofr": "𝔬",
		"ogon": "˛",
		"Ograve": "Ò",
		"ograve": "ò",
		"ogt": "⧁",
		"ohbar": "⦵",
		"ohm": "Ω",
		"oint": "∮",
		"olarr": "↺",
		"olcir": "⦾",
		"olcross": "⦻",
		"oline": "‾",
		"olt": "⧀",
		"Omacr": "Ō",
		"omacr": "ō",
		"Omega": "Ω",
		"omega": "ω",
		"Omicron": "Ο",
		"omicron": "ο",
		"omid": "⦶",
		"ominus": "⊖",
		"Oopf": "𝕆",
		"oopf": "𝕠",
		"opar": "⦷",
		"OpenCurlyDoubleQuote": "“",
		"OpenCurlyQuote": "‘",
		"operp": "⦹",
		"oplus": "⊕",
		"orarr": "↻",
		"Or": "⩔",
		"or": "∨",
		"ord": "⩝",
		"order": "ℴ",
		"orderof": "ℴ",
		"ordf": "ª",
		"ordm": "º",
		"origof": "⊶",
		"oror": "⩖",
		"orslope": "⩗",
		"orv": "⩛",
		"oS": "Ⓢ",
		"Oscr": "𝒪",
		"oscr": "ℴ",
		"Oslash": "Ø",
		"oslash": "ø",
		"osol": "⊘",
		"Otilde": "Õ",
		"otilde": "õ",
		"otimesas": "⨶",
		"Otimes": "⨷",
		"otimes": "⊗",
		"Ouml": "Ö",
		"ouml": "ö",
		"ovbar": "⌽",
		"OverBar": "‾",
		"OverBrace": "⏞",
		"OverBracket": "⎴",
		"OverParenthesis": "⏜",
		"para": "¶",
		"parallel": "∥",
		"par": "∥",
		"parsim": "⫳",
		"parsl": "⫽",
		"part": "∂",
		"PartialD": "∂",
		"Pcy": "П",
		"pcy": "п",
		"percnt": "%",
		"period": ".",
		"permil": "‰",
		"perp": "⊥",
		"pertenk": "‱",
		"Pfr": "𝔓",
		"pfr": "𝔭",
		"Phi": "Φ",
		"phi": "φ",
		"phiv": "ϕ",
		"phmmat": "ℳ",
		"phone": "☎",
		"Pi": "Π",
		"pi": "π",
		"pitchfork": "⋔",
		"piv": "ϖ",
		"planck": "ℏ",
		"planckh": "ℎ",
		"plankv": "ℏ",
		"plusacir": "⨣",
		"plusb": "⊞",
		"pluscir": "⨢",
		"plus": "+",
		"plusdo": "∔",
		"plusdu": "⨥",
		"pluse": "⩲",
		"PlusMinus": "±",
		"plusmn": "±",
		"plussim": "⨦",
		"plustwo": "⨧",
		"pm": "±",
		"Poincareplane": "ℌ",
		"pointint": "⨕",
		"popf": "𝕡",
		"Popf": "ℙ",
		"pound": "£",
		"prap": "⪷",
		"Pr": "⪻",
		"pr": "≺",
		"prcue": "≼",
		"precapprox": "⪷",
		"prec": "≺",
		"preccurlyeq": "≼",
		"Precedes": "≺",
		"PrecedesEqual": "⪯",
		"PrecedesSlantEqual": "≼",
		"PrecedesTilde": "≾",
		"preceq": "⪯",
		"precnapprox": "⪹",
		"precneqq": "⪵",
		"precnsim": "⋨",
		"pre": "⪯",
		"prE": "⪳",
		"precsim": "≾",
		"prime": "′",
		"Prime": "″",
		"primes": "ℙ",
		"prnap": "⪹",
		"prnE": "⪵",
		"prnsim": "⋨",
		"prod": "∏",
		"Product": "∏",
		"profalar": "⌮",
		"profline": "⌒",
		"profsurf": "⌓",
		"prop": "∝",
		"Proportional": "∝",
		"Proportion": "∷",
		"propto": "∝",
		"prsim": "≾",
		"prurel": "⊰",
		"Pscr": "𝒫",
		"pscr": "𝓅",
		"Psi": "Ψ",
		"psi": "ψ",
		"puncsp": " ",
		"Qfr": "𝔔",
		"qfr": "𝔮",
		"qint": "⨌",
		"qopf": "𝕢",
		"Qopf": "ℚ",
		"qprime": "⁗",
		"Qscr": "𝒬",
		"qscr": "𝓆",
		"quaternions": "ℍ",
		"quatint": "⨖",
		"quest": "?",
		"questeq": "≟",
		"quot": "\"",
		"QUOT": "\"",
		"rAarr": "⇛",
		"race": "∽̱",
		"Racute": "Ŕ",
		"racute": "ŕ",
		"radic": "√",
		"raemptyv": "⦳",
		"rang": "⟩",
		"Rang": "⟫",
		"rangd": "⦒",
		"range": "⦥",
		"rangle": "⟩",
		"raquo": "»",
		"rarrap": "⥵",
		"rarrb": "⇥",
		"rarrbfs": "⤠",
		"rarrc": "⤳",
		"rarr": "→",
		"Rarr": "↠",
		"rArr": "⇒",
		"rarrfs": "⤞",
		"rarrhk": "↪",
		"rarrlp": "↬",
		"rarrpl": "⥅",
		"rarrsim": "⥴",
		"Rarrtl": "⤖",
		"rarrtl": "↣",
		"rarrw": "↝",
		"ratail": "⤚",
		"rAtail": "⤜",
		"ratio": "∶",
		"rationals": "ℚ",
		"rbarr": "⤍",
		"rBarr": "⤏",
		"RBarr": "⤐",
		"rbbrk": "❳",
		"rbrace": "}",
		"rbrack": "]",
		"rbrke": "⦌",
		"rbrksld": "⦎",
		"rbrkslu": "⦐",
		"Rcaron": "Ř",
		"rcaron": "ř",
		"Rcedil": "Ŗ",
		"rcedil": "ŗ",
		"rceil": "⌉",
		"rcub": "}",
		"Rcy": "Р",
		"rcy": "р",
		"rdca": "⤷",
		"rdldhar": "⥩",
		"rdquo": "”",
		"rdquor": "”",
		"rdsh": "↳",
		"real": "ℜ",
		"realine": "ℛ",
		"realpart": "ℜ",
		"reals": "ℝ",
		"Re": "ℜ",
		"rect": "▭",
		"reg": "®",
		"REG": "®",
		"ReverseElement": "∋",
		"ReverseEquilibrium": "⇋",
		"ReverseUpEquilibrium": "⥯",
		"rfisht": "⥽",
		"rfloor": "⌋",
		"rfr": "𝔯",
		"Rfr": "ℜ",
		"rHar": "⥤",
		"rhard": "⇁",
		"rharu": "⇀",
		"rharul": "⥬",
		"Rho": "Ρ",
		"rho": "ρ",
		"rhov": "ϱ",
		"RightAngleBracket": "⟩",
		"RightArrowBar": "⇥",
		"rightarrow": "→",
		"RightArrow": "→",
		"Rightarrow": "⇒",
		"RightArrowLeftArrow": "⇄",
		"rightarrowtail": "↣",
		"RightCeiling": "⌉",
		"RightDoubleBracket": "⟧",
		"RightDownTeeVector": "⥝",
		"RightDownVectorBar": "⥕",
		"RightDownVector": "⇂",
		"RightFloor": "⌋",
		"rightharpoondown": "⇁",
		"rightharpoonup": "⇀",
		"rightleftarrows": "⇄",
		"rightleftharpoons": "⇌",
		"rightrightarrows": "⇉",
		"rightsquigarrow": "↝",
		"RightTeeArrow": "↦",
		"RightTee": "⊢",
		"RightTeeVector": "⥛",
		"rightthreetimes": "⋌",
		"RightTriangleBar": "⧐",
		"RightTriangle": "⊳",
		"RightTriangleEqual": "⊵",
		"RightUpDownVector": "⥏",
		"RightUpTeeVector": "⥜",
		"RightUpVectorBar": "⥔",
		"RightUpVector": "↾",
		"RightVectorBar": "⥓",
		"RightVector": "⇀",
		"ring": "˚",
		"risingdotseq": "≓",
		"rlarr": "⇄",
		"rlhar": "⇌",
		"rlm": "‏",
		"rmoustache": "⎱",
		"rmoust": "⎱",
		"rnmid": "⫮",
		"roang": "⟭",
		"roarr": "⇾",
		"robrk": "⟧",
		"ropar": "⦆",
		"ropf": "𝕣",
		"Ropf": "ℝ",
		"roplus": "⨮",
		"rotimes": "⨵",
		"RoundImplies": "⥰",
		"rpar": ")",
		"rpargt": "⦔",
		"rppolint": "⨒",
		"rrarr": "⇉",
		"Rrightarrow": "⇛",
		"rsaquo": "›",
		"rscr": "𝓇",
		"Rscr": "ℛ",
		"rsh": "↱",
		"Rsh": "↱",
		"rsqb": "]",
		"rsquo": "’",
		"rsquor": "’",
		"rthree": "⋌",
		"rtimes": "⋊",
		"rtri": "▹",
		"rtrie": "⊵",
		"rtrif": "▸",
		"rtriltri": "⧎",
		"RuleDelayed": "⧴",
		"ruluhar": "⥨",
		"rx": "℞",
		"Sacute": "Ś",
		"sacute": "ś",
		"sbquo": "‚",
		"scap": "⪸",
		"Scaron": "Š",
		"scaron": "š",
		"Sc": "⪼",
		"sc": "≻",
		"sccue": "≽",
		"sce": "⪰",
		"scE": "⪴",
		"Scedil": "Ş",
		"scedil": "ş",
		"Scirc": "Ŝ",
		"scirc": "ŝ",
		"scnap": "⪺",
		"scnE": "⪶",
		"scnsim": "⋩",
		"scpolint": "⨓",
		"scsim": "≿",
		"Scy": "С",
		"scy": "с",
		"sdotb": "⊡",
		"sdot": "⋅",
		"sdote": "⩦",
		"searhk": "⤥",
		"searr": "↘",
		"seArr": "⇘",
		"searrow": "↘",
		"sect": "§",
		"semi": ";",
		"seswar": "⤩",
		"setminus": "∖",
		"setmn": "∖",
		"sext": "✶",
		"Sfr": "𝔖",
		"sfr": "𝔰",
		"sfrown": "⌢",
		"sharp": "♯",
		"SHCHcy": "Щ",
		"shchcy": "щ",
		"SHcy": "Ш",
		"shcy": "ш",
		"ShortDownArrow": "↓",
		"ShortLeftArrow": "←",
		"shortmid": "∣",
		"shortparallel": "∥",
		"ShortRightArrow": "→",
		"ShortUpArrow": "↑",
		"shy": "­",
		"Sigma": "Σ",
		"sigma": "σ",
		"sigmaf": "ς",
		"sigmav": "ς",
		"sim": "∼",
		"simdot": "⩪",
		"sime": "≃",
		"simeq": "≃",
		"simg": "⪞",
		"simgE": "⪠",
		"siml": "⪝",
		"simlE": "⪟",
		"simne": "≆",
		"simplus": "⨤",
		"simrarr": "⥲",
		"slarr": "←",
		"SmallCircle": "∘",
		"smallsetminus": "∖",
		"smashp": "⨳",
		"smeparsl": "⧤",
		"smid": "∣",
		"smile": "⌣",
		"smt": "⪪",
		"smte": "⪬",
		"smtes": "⪬︀",
		"SOFTcy": "Ь",
		"softcy": "ь",
		"solbar": "⌿",
		"solb": "⧄",
		"sol": "/",
		"Sopf": "𝕊",
		"sopf": "𝕤",
		"spades": "♠",
		"spadesuit": "♠",
		"spar": "∥",
		"sqcap": "⊓",
		"sqcaps": "⊓︀",
		"sqcup": "⊔",
		"sqcups": "⊔︀",
		"Sqrt": "√",
		"sqsub": "⊏",
		"sqsube": "⊑",
		"sqsubset": "⊏",
		"sqsubseteq": "⊑",
		"sqsup": "⊐",
		"sqsupe": "⊒",
		"sqsupset": "⊐",
		"sqsupseteq": "⊒",
		"square": "□",
		"Square": "□",
		"SquareIntersection": "⊓",
		"SquareSubset": "⊏",
		"SquareSubsetEqual": "⊑",
		"SquareSuperset": "⊐",
		"SquareSupersetEqual": "⊒",
		"SquareUnion": "⊔",
		"squarf": "▪",
		"squ": "□",
		"squf": "▪",
		"srarr": "→",
		"Sscr": "𝒮",
		"sscr": "𝓈",
		"ssetmn": "∖",
		"ssmile": "⌣",
		"sstarf": "⋆",
		"Star": "⋆",
		"star": "☆",
		"starf": "★",
		"straightepsilon": "ϵ",
		"straightphi": "ϕ",
		"strns": "¯",
		"sub": "⊂",
		"Sub": "⋐",
		"subdot": "⪽",
		"subE": "⫅",
		"sube": "⊆",
		"subedot": "⫃",
		"submult": "⫁",
		"subnE": "⫋",
		"subne": "⊊",
		"subplus": "⪿",
		"subrarr": "⥹",
		"subset": "⊂",
		"Subset": "⋐",
		"subseteq": "⊆",
		"subseteqq": "⫅",
		"SubsetEqual": "⊆",
		"subsetneq": "⊊",
		"subsetneqq": "⫋",
		"subsim": "⫇",
		"subsub": "⫕",
		"subsup": "⫓",
		"succapprox": "⪸",
		"succ": "≻",
		"succcurlyeq": "≽",
		"Succeeds": "≻",
		"SucceedsEqual": "⪰",
		"SucceedsSlantEqual": "≽",
		"SucceedsTilde": "≿",
		"succeq": "⪰",
		"succnapprox": "⪺",
		"succneqq": "⪶",
		"succnsim": "⋩",
		"succsim": "≿",
		"SuchThat": "∋",
		"sum": "∑",
		"Sum": "∑",
		"sung": "♪",
		"sup1": "¹",
		"sup2": "²",
		"sup3": "³",
		"sup": "⊃",
		"Sup": "⋑",
		"supdot": "⪾",
		"supdsub": "⫘",
		"supE": "⫆",
		"supe": "⊇",
		"supedot": "⫄",
		"Superset": "⊃",
		"SupersetEqual": "⊇",
		"suphsol": "⟉",
		"suphsub": "⫗",
		"suplarr": "⥻",
		"supmult": "⫂",
		"supnE": "⫌",
		"supne": "⊋",
		"supplus": "⫀",
		"supset": "⊃",
		"Supset": "⋑",
		"supseteq": "⊇",
		"supseteqq": "⫆",
		"supsetneq": "⊋",
		"supsetneqq": "⫌",
		"supsim": "⫈",
		"supsub": "⫔",
		"supsup": "⫖",
		"swarhk": "⤦",
		"swarr": "↙",
		"swArr": "⇙",
		"swarrow": "↙",
		"swnwar": "⤪",
		"szlig": "ß",
		"Tab": "\t",
		"target": "⌖",
		"Tau": "Τ",
		"tau": "τ",
		"tbrk": "⎴",
		"Tcaron": "Ť",
		"tcaron": "ť",
		"Tcedil": "Ţ",
		"tcedil": "ţ",
		"Tcy": "Т",
		"tcy": "т",
		"tdot": "⃛",
		"telrec": "⌕",
		"Tfr": "𝔗",
		"tfr": "𝔱",
		"there4": "∴",
		"therefore": "∴",
		"Therefore": "∴",
		"Theta": "Θ",
		"theta": "θ",
		"thetasym": "ϑ",
		"thetav": "ϑ",
		"thickapprox": "≈",
		"thicksim": "∼",
		"ThickSpace": "  ",
		"ThinSpace": " ",
		"thinsp": " ",
		"thkap": "≈",
		"thksim": "∼",
		"THORN": "Þ",
		"thorn": "þ",
		"tilde": "˜",
		"Tilde": "∼",
		"TildeEqual": "≃",
		"TildeFullEqual": "≅",
		"TildeTilde": "≈",
		"timesbar": "⨱",
		"timesb": "⊠",
		"times": "×",
		"timesd": "⨰",
		"tint": "∭",
		"toea": "⤨",
		"topbot": "⌶",
		"topcir": "⫱",
		"top": "⊤",
		"Topf": "𝕋",
		"topf": "𝕥",
		"topfork": "⫚",
		"tosa": "⤩",
		"tprime": "‴",
		"trade": "™",
		"TRADE": "™",
		"triangle": "▵",
		"triangledown": "▿",
		"triangleleft": "◃",
		"trianglelefteq": "⊴",
		"triangleq": "≜",
		"triangleright": "▹",
		"trianglerighteq": "⊵",
		"tridot": "◬",
		"trie": "≜",
		"triminus": "⨺",
		"TripleDot": "⃛",
		"triplus": "⨹",
		"trisb": "⧍",
		"tritime": "⨻",
		"trpezium": "⏢",
		"Tscr": "𝒯",
		"tscr": "𝓉",
		"TScy": "Ц",
		"tscy": "ц",
		"TSHcy": "Ћ",
		"tshcy": "ћ",
		"Tstrok": "Ŧ",
		"tstrok": "ŧ",
		"twixt": "≬",
		"twoheadleftarrow": "↞",
		"twoheadrightarrow": "↠",
		"Uacute": "Ú",
		"uacute": "ú",
		"uarr": "↑",
		"Uarr": "↟",
		"uArr": "⇑",
		"Uarrocir": "⥉",
		"Ubrcy": "Ў",
		"ubrcy": "ў",
		"Ubreve": "Ŭ",
		"ubreve": "ŭ",
		"Ucirc": "Û",
		"ucirc": "û",
		"Ucy": "У",
		"ucy": "у",
		"udarr": "⇅",
		"Udblac": "Ű",
		"udblac": "ű",
		"udhar": "⥮",
		"ufisht": "⥾",
		"Ufr": "𝔘",
		"ufr": "𝔲",
		"Ugrave": "Ù",
		"ugrave": "ù",
		"uHar": "⥣",
		"uharl": "↿",
		"uharr": "↾",
		"uhblk": "▀",
		"ulcorn": "⌜",
		"ulcorner": "⌜",
		"ulcrop": "⌏",
		"ultri": "◸",
		"Umacr": "Ū",
		"umacr": "ū",
		"uml": "¨",
		"UnderBar": "_",
		"UnderBrace": "⏟",
		"UnderBracket": "⎵",
		"UnderParenthesis": "⏝",
		"Union": "⋃",
		"UnionPlus": "⊎",
		"Uogon": "Ų",
		"uogon": "ų",
		"Uopf": "𝕌",
		"uopf": "𝕦",
		"UpArrowBar": "⤒",
		"uparrow": "↑",
		"UpArrow": "↑",
		"Uparrow": "⇑",
		"UpArrowDownArrow": "⇅",
		"updownarrow": "↕",
		"UpDownArrow": "↕",
		"Updownarrow": "⇕",
		"UpEquilibrium": "⥮",
		"upharpoonleft": "↿",
		"upharpoonright": "↾",
		"uplus": "⊎",
		"UpperLeftArrow": "↖",
		"UpperRightArrow": "↗",
		"upsi": "υ",
		"Upsi": "ϒ",
		"upsih": "ϒ",
		"Upsilon": "Υ",
		"upsilon": "υ",
		"UpTeeArrow": "↥",
		"UpTee": "⊥",
		"upuparrows": "⇈",
		"urcorn": "⌝",
		"urcorner": "⌝",
		"urcrop": "⌎",
		"Uring": "Ů",
		"uring": "ů",
		"urtri": "◹",
		"Uscr": "𝒰",
		"uscr": "𝓊",
		"utdot": "⋰",
		"Utilde": "Ũ",
		"utilde": "ũ",
		"utri": "▵",
		"utrif": "▴",
		"uuarr": "⇈",
		"Uuml": "Ü",
		"uuml": "ü",
		"uwangle": "⦧",
		"vangrt": "⦜",
		"varepsilon": "ϵ",
		"varkappa": "ϰ",
		"varnothing": "∅",
		"varphi": "ϕ",
		"varpi": "ϖ",
		"varpropto": "∝",
		"varr": "↕",
		"vArr": "⇕",
		"varrho": "ϱ",
		"varsigma": "ς",
		"varsubsetneq": "⊊︀",
		"varsubsetneqq": "⫋︀",
		"varsupsetneq": "⊋︀",
		"varsupsetneqq": "⫌︀",
		"vartheta": "ϑ",
		"vartriangleleft": "⊲",
		"vartriangleright": "⊳",
		"vBar": "⫨",
		"Vbar": "⫫",
		"vBarv": "⫩",
		"Vcy": "В",
		"vcy": "в",
		"vdash": "⊢",
		"vDash": "⊨",
		"Vdash": "⊩",
		"VDash": "⊫",
		"Vdashl": "⫦",
		"veebar": "⊻",
		"vee": "∨",
		"Vee": "⋁",
		"veeeq": "≚",
		"vellip": "⋮",
		"verbar": "|",
		"Verbar": "‖",
		"vert": "|",
		"Vert": "‖",
		"VerticalBar": "∣",
		"VerticalLine": "|",
		"VerticalSeparator": "❘",
		"VerticalTilde": "≀",
		"VeryThinSpace": " ",
		"Vfr": "𝔙",
		"vfr": "𝔳",
		"vltri": "⊲",
		"vnsub": "⊂⃒",
		"vnsup": "⊃⃒",
		"Vopf": "𝕍",
		"vopf": "𝕧",
		"vprop": "∝",
		"vrtri": "⊳",
		"Vscr": "𝒱",
		"vscr": "𝓋",
		"vsubnE": "⫋︀",
		"vsubne": "⊊︀",
		"vsupnE": "⫌︀",
		"vsupne": "⊋︀",
		"Vvdash": "⊪",
		"vzigzag": "⦚",
		"Wcirc": "Ŵ",
		"wcirc": "ŵ",
		"wedbar": "⩟",
		"wedge": "∧",
		"Wedge": "⋀",
		"wedgeq": "≙",
		"weierp": "℘",
		"Wfr": "𝔚",
		"wfr": "𝔴",
		"Wopf": "𝕎",
		"wopf": "𝕨",
		"wp": "℘",
		"wr": "≀",
		"wreath": "≀",
		"Wscr": "𝒲",
		"wscr": "𝓌",
		"xcap": "⋂",
		"xcirc": "◯",
		"xcup": "⋃",
		"xdtri": "▽",
		"Xfr": "𝔛",
		"xfr": "𝔵",
		"xharr": "⟷",
		"xhArr": "⟺",
		"Xi": "Ξ",
		"xi": "ξ",
		"xlarr": "⟵",
		"xlArr": "⟸",
		"xmap": "⟼",
		"xnis": "⋻",
		"xodot": "⨀",
		"Xopf": "𝕏",
		"xopf": "𝕩",
		"xoplus": "⨁",
		"xotime": "⨂",
		"xrarr": "⟶",
		"xrArr": "⟹",
		"Xscr": "𝒳",
		"xscr": "𝓍",
		"xsqcup": "⨆",
		"xuplus": "⨄",
		"xutri": "△",
		"xvee": "⋁",
		"xwedge": "⋀",
		"Yacute": "Ý",
		"yacute": "ý",
		"YAcy": "Я",
		"yacy": "я",
		"Ycirc": "Ŷ",
		"ycirc": "ŷ",
		"Ycy": "Ы",
		"ycy": "ы",
		"yen": "¥",
		"Yfr": "𝔜",
		"yfr": "𝔶",
		"YIcy": "Ї",
		"yicy": "ї",
		"Yopf": "𝕐",
		"yopf": "𝕪",
		"Yscr": "𝒴",
		"yscr": "𝓎",
		"YUcy": "Ю",
		"yucy": "ю",
		"yuml": "ÿ",
		"Yuml": "Ÿ",
		"Zacute": "Ź",
		"zacute": "ź",
		"Zcaron": "Ž",
		"zcaron": "ž",
		"Zcy": "З",
		"zcy": "з",
		"Zdot": "Ż",
		"zdot": "ż",
		"zeetrf": "ℨ",
		"ZeroWidthSpace": "​",
		"Zeta": "Ζ",
		"zeta": "ζ",
		"zfr": "𝔷",
		"Zfr": "ℨ",
		"ZHcy": "Ж",
		"zhcy": "ж",
		"zigrarr": "⇝",
		"zopf": "𝕫",
		"Zopf": "ℤ",
		"Zscr": "𝒵",
		"zscr": "𝓏",
		"zwj": "‍",
		"zwnj": "‌"
	};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	module.exports.encode = __webpack_require__(58);
	module.exports.decode = __webpack_require__(59);
	module.exports.format = __webpack_require__(60);
	module.exports.parse  = __webpack_require__(61);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	
	'use strict';


	var encodeCache = {};


	// Create a lookup array where anything but characters in `chars` string
	// and alphanumeric chars is percent-encoded.
	//
	function getEncodeCache(exclude) {
	  var i, ch, cache = encodeCache[exclude];
	  if (cache) { return cache; }

	  cache = encodeCache[exclude] = [];

	  for (i = 0; i < 128; i++) {
	    ch = String.fromCharCode(i);

	    if (/^[0-9a-z]$/i.test(ch)) {
	      // always allow unencoded alphanumeric characters
	      cache.push(ch);
	    } else {
	      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
	    }
	  }

	  for (i = 0; i < exclude.length; i++) {
	    cache[exclude.charCodeAt(i)] = exclude[i];
	  }

	  return cache;
	}


	// Encode unsafe characters with percent-encoding, skipping already
	// encoded sequences.
	//
	//  - string       - string to encode
	//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
	//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
	//
	function encode(string, exclude, keepEscaped) {
	  var i, l, code, nextCode, cache,
	      result = '';

	  if (typeof exclude !== 'string') {
	    // encode(string, keepEscaped)
	    keepEscaped  = exclude;
	    exclude = encode.defaultChars;
	  }

	  if (typeof keepEscaped === 'undefined') {
	    keepEscaped = true;
	  }

	  cache = getEncodeCache(exclude);

	  for (i = 0, l = string.length; i < l; i++) {
	    code = string.charCodeAt(i);

	    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
	      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
	        result += string.slice(i, i + 3);
	        i += 2;
	        continue;
	      }
	    }

	    if (code < 128) {
	      result += cache[code];
	      continue;
	    }

	    if (code >= 0xD800 && code <= 0xDFFF) {
	      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
	        nextCode = string.charCodeAt(i + 1);
	        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
	          result += encodeURIComponent(string[i] + string[i + 1]);
	          i++;
	          continue;
	        }
	      }
	      result += '%EF%BF%BD';
	      continue;
	    }

	    result += encodeURIComponent(string[i]);
	  }

	  return result;
	}

	encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
	encode.componentChars = "-_.!~*'()";


	module.exports = encode;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

	
	'use strict';


	/* eslint-disable no-bitwise */

	var decodeCache = {};

	function getDecodeCache(exclude) {
	  var i, ch, cache = decodeCache[exclude];
	  if (cache) { return cache; }

	  cache = decodeCache[exclude] = [];

	  for (i = 0; i < 128; i++) {
	    ch = String.fromCharCode(i);
	    cache.push(ch);
	  }

	  for (i = 0; i < exclude.length; i++) {
	    ch = exclude.charCodeAt(i);
	    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
	  }

	  return cache;
	}


	// Decode percent-encoded string.
	//
	function decode(string, exclude) {
	  var cache;

	  if (typeof exclude !== 'string') {
	    exclude = decode.defaultChars;
	  }

	  cache = getDecodeCache(exclude);

	  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
	    var i, l, b1, b2, b3, b4, chr,
	        result = '';

	    for (i = 0, l = seq.length; i < l; i += 3) {
	      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

	      if (b1 < 0x80) {
	        result += cache[b1];
	        continue;
	      }

	      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
	        // 110xxxxx 10xxxxxx
	        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

	        if ((b2 & 0xC0) === 0x80) {
	          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

	          if (chr < 0x80) {
	            result += '\ufffd\ufffd';
	          } else {
	            result += String.fromCharCode(chr);
	          }

	          i += 3;
	          continue;
	        }
	      }

	      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
	        // 1110xxxx 10xxxxxx 10xxxxxx
	        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

	        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
	          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

	          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
	            result += '\ufffd\ufffd\ufffd';
	          } else {
	            result += String.fromCharCode(chr);
	          }

	          i += 6;
	          continue;
	        }
	      }

	      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
	        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
	        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
	        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

	        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
	          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

	          if (chr < 0x10000 || chr > 0x10FFFF) {
	            result += '\ufffd\ufffd\ufffd\ufffd';
	          } else {
	            chr -= 0x10000;
	            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
	          }

	          i += 9;
	          continue;
	        }
	      }

	      result += '\ufffd';
	    }

	    return result;
	  });
	}


	decode.defaultChars   = ';/?:@&=+$,#';
	decode.componentChars = '';


	module.exports = decode;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	
	'use strict';


	module.exports = function format(url) {
	  var result = '';

	  result += url.protocol || '';
	  result += url.slashes ? '//' : '';
	  result += url.auth ? url.auth + '@' : '';

	  if (url.hostname && url.hostname.indexOf(':') !== -1) {
	    // ipv6 address
	    result += '[' + url.hostname + ']';
	  } else {
	    result += url.hostname || '';
	  }

	  result += url.port ? ':' + url.port : '';
	  result += url.pathname || '';
	  result += url.search || '';
	  result += url.hash || '';

	  return result;
	};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	//
	// Changes from joyent/node:
	//
	// 1. No leading slash in paths,
	//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
	//
	// 2. Backslashes are not replaced with slashes,
	//    so `http:\\example.org\` is treated like a relative path
	//
	// 3. Trailing colon is treated like a part of the path,
	//    i.e. in `http://example.org:foo` pathname is `:foo`
	//
	// 4. Nothing is URL-encoded in the resulting object,
	//    (in joyent/node some chars in auth and paths are encoded)
	//
	// 5. `url.parse()` does not have `parseQueryString` argument
	//
	// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
	//    which can be constructed using other parts of the url.
	//


	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.pathname = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = [ '\'' ].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
	    hostEndingChars = [ '/', '?', '#' ],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    /* eslint-disable no-script-url */
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    };
	    /* eslint-enable no-script-url */

	function urlParse(url, slashesDenoteHost) {
	  if (url && url instanceof Url) { return url; }

	  var u = new Url();
	  u.parse(url, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, slashesDenoteHost) {
	  var i, l, lowerProto, hec, slashes,
	      rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	      }
	      return this;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    lowerProto = proto.toLowerCase();
	    this.protocol = proto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (i = 0; i < hostEndingChars.length; i++) {
	      hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	        hostEnd = hec;
	      }
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = auth;
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (i = 0; i < nonHostChars.length; i++) {
	      hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	        hostEnd = hec;
	      }
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1) {
	      hostEnd = rest.length;
	    }

	    if (rest[hostEnd - 1] === ':') { hostEnd--; }
	    var host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost(host);

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) { continue; }
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    }

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	    }
	  }

	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    rest = rest.slice(0, qm);
	  }
	  if (rest) { this.pathname = rest; }
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '';
	  }

	  return this;
	};

	Url.prototype.parseHost = function(host) {
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) { this.hostname = host; }
	};

	module.exports = urlParse;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.Any = __webpack_require__(63);
	exports.Cc  = __webpack_require__(64);
	exports.Cf  = __webpack_require__(65);
	exports.P   = __webpack_require__(56);
	exports.Z   = __webpack_require__(66);


/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports=/[\0-\x1F\x7F-\x9F]/

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	// Just a shortcut for bulk export
	'use strict';


	exports.parseLinkLabel       = __webpack_require__(68);
	exports.parseLinkDestination = __webpack_require__(69);
	exports.parseLinkTitle       = __webpack_require__(70);


/***/ }),
/* 68 */
/***/ (function(module, exports) {

	// Parse link label
	//
	// this function assumes that first character ("[") already matches;
	// returns the end of the label
	//
	'use strict';

	module.exports = function parseLinkLabel(state, start, disableNested) {
	  var level, found, marker, prevPos,
	      labelEnd = -1,
	      max = state.posMax,
	      oldPos = state.pos;

	  state.pos = start + 1;
	  level = 1;

	  while (state.pos < max) {
	    marker = state.src.charCodeAt(state.pos);
	    if (marker === 0x5D /* ] */) {
	      level--;
	      if (level === 0) {
	        found = true;
	        break;
	      }
	    }

	    prevPos = state.pos;
	    state.md.inline.skipToken(state);
	    if (marker === 0x5B /* [ */) {
	      if (prevPos === state.pos - 1) {
	        // increase level if we find text `[`, which is not a part of any token
	        level++;
	      } else if (disableNested) {
	        state.pos = oldPos;
	        return -1;
	      }
	    }
	  }

	  if (found) {
	    labelEnd = state.pos;
	  }

	  // restore old state
	  state.pos = oldPos;

	  return labelEnd;
	};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// Parse link destination
	//
	'use strict';


	var isSpace     = __webpack_require__(53).isSpace;
	var unescapeAll = __webpack_require__(53).unescapeAll;


	module.exports = function parseLinkDestination(str, pos, max) {
	  var code, level,
	      lines = 0,
	      start = pos,
	      result = {
	        ok: false,
	        pos: 0,
	        lines: 0,
	        str: ''
	      };

	  if (str.charCodeAt(pos) === 0x3C /* < */) {
	    pos++;
	    while (pos < max) {
	      code = str.charCodeAt(pos);
	      if (code === 0x0A /* \n */ || isSpace(code)) { return result; }
	      if (code === 0x3E /* > */) {
	        result.pos = pos + 1;
	        result.str = unescapeAll(str.slice(start + 1, pos));
	        result.ok = true;
	        return result;
	      }
	      if (code === 0x5C /* \ */ && pos + 1 < max) {
	        pos += 2;
	        continue;
	      }

	      pos++;
	    }

	    // no closing '>'
	    return result;
	  }

	  // this should be ... } else { ... branch

	  level = 0;
	  while (pos < max) {
	    code = str.charCodeAt(pos);

	    if (code === 0x20) { break; }

	    // ascii control characters
	    if (code < 0x20 || code === 0x7F) { break; }

	    if (code === 0x5C /* \ */ && pos + 1 < max) {
	      pos += 2;
	      continue;
	    }

	    if (code === 0x28 /* ( */) {
	      level++;
	      if (level > 1) { break; }
	    }

	    if (code === 0x29 /* ) */) {
	      level--;
	      if (level < 0) { break; }
	    }

	    pos++;
	  }

	  if (start === pos) { return result; }

	  result.str = unescapeAll(str.slice(start, pos));
	  result.lines = lines;
	  result.pos = pos;
	  result.ok = true;
	  return result;
	};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	// Parse link title
	//
	'use strict';


	var unescapeAll = __webpack_require__(53).unescapeAll;


	module.exports = function parseLinkTitle(str, pos, max) {
	  var code,
	      marker,
	      lines = 0,
	      start = pos,
	      result = {
	        ok: false,
	        pos: 0,
	        lines: 0,
	        str: ''
	      };

	  if (pos >= max) { return result; }

	  marker = str.charCodeAt(pos);

	  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

	  pos++;

	  // if opening marker is "(", switch it to closing marker ")"
	  if (marker === 0x28) { marker = 0x29; }

	  while (pos < max) {
	    code = str.charCodeAt(pos);
	    if (code === marker) {
	      result.pos = pos + 1;
	      result.lines = lines;
	      result.str = unescapeAll(str.slice(start + 1, pos));
	      result.ok = true;
	      return result;
	    } else if (code === 0x0A) {
	      lines++;
	    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
	      pos++;
	      if (str.charCodeAt(pos) === 0x0A) {
	        lines++;
	      }
	    }

	    pos++;
	  }

	  return result;
	};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * class Renderer
	 *
	 * Generates HTML from parsed token stream. Each instance has independent
	 * copy of rules. Those can be rewritten with ease. Also, you can add new
	 * rules if you create plugin and adds new token types.
	 **/
	'use strict';


	var assign          = __webpack_require__(53).assign;
	var unescapeAll     = __webpack_require__(53).unescapeAll;
	var escapeHtml      = __webpack_require__(53).escapeHtml;


	////////////////////////////////////////////////////////////////////////////////

	var default_rules = {};


	default_rules.code_inline = function (tokens, idx, options, env, slf) {
	  var token = tokens[idx];

	  return  '<code' + slf.renderAttrs(token) + '>' +
	          escapeHtml(tokens[idx].content) +
	          '</code>';
	};


	default_rules.code_block = function (tokens, idx, options, env, slf) {
	  var token = tokens[idx];

	  return  '<pre' + slf.renderAttrs(token) + '><code>' +
	          escapeHtml(tokens[idx].content) +
	          '</code></pre>\n';
	};


	default_rules.fence = function (tokens, idx, options, env, slf) {
	  var token = tokens[idx],
	      info = token.info ? unescapeAll(token.info).trim() : '',
	      langName = '',
	      highlighted, i, tmpAttrs, tmpToken;

	  if (info) {
	    langName = info.split(/\s+/g)[0];
	  }

	  if (options.highlight) {
	    highlighted = options.highlight(token.content, langName) || escapeHtml(token.content);
	  } else {
	    highlighted = escapeHtml(token.content);
	  }

	  if (highlighted.indexOf('<pre') === 0) {
	    return highlighted + '\n';
	  }

	  // If language exists, inject class gently, without mudofying original token.
	  // May be, one day we will add .clone() for token and simplify this part, but
	  // now we prefer to keep things local.
	  if (info) {
	    i        = token.attrIndex('class');
	    tmpAttrs = token.attrs ? token.attrs.slice() : [];

	    if (i < 0) {
	      tmpAttrs.push([ 'class', options.langPrefix + langName ]);
	    } else {
	      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
	    }

	    // Fake token just to render attributes
	    tmpToken = {
	      attrs: tmpAttrs
	    };

	    return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
	          + highlighted
	          + '</code></pre>\n';
	  }


	  return  '<pre><code' + slf.renderAttrs(token) + '>'
	        + highlighted
	        + '</code></pre>\n';
	};


	default_rules.image = function (tokens, idx, options, env, slf) {
	  var token = tokens[idx];

	  // "alt" attr MUST be set, even if empty. Because it's mandatory and
	  // should be placed on proper position for tests.
	  //
	  // Replace content with actual value

	  token.attrs[token.attrIndex('alt')][1] =
	    slf.renderInlineAsText(token.children, options, env);

	  return slf.renderToken(tokens, idx, options);
	};


	default_rules.hardbreak = function (tokens, idx, options /*, env */) {
	  return options.xhtmlOut ? '<br />\n' : '<br>\n';
	};
	default_rules.softbreak = function (tokens, idx, options /*, env */) {
	  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
	};


	default_rules.text = function (tokens, idx /*, options, env */) {
	  return escapeHtml(tokens[idx].content);
	};


	default_rules.html_block = function (tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};
	default_rules.html_inline = function (tokens, idx /*, options, env */) {
	  return tokens[idx].content;
	};


	/**
	 * new Renderer()
	 *
	 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
	 **/
	function Renderer() {

	  /**
	   * Renderer#rules -> Object
	   *
	   * Contains render rules for tokens. Can be updated and extended.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * md.renderer.rules.strong_open  = function () { return '<b>'; };
	   * md.renderer.rules.strong_close = function () { return '</b>'; };
	   *
	   * var result = md.renderInline(...);
	   * ```
	   *
	   * Each rule is called as independed static function with fixed signature:
	   *
	   * ```javascript
	   * function my_token_render(tokens, idx, options, env, renderer) {
	   *   // ...
	   *   return renderedHTML;
	   * }
	   * ```
	   *
	   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
	   * for more details and examples.
	   **/
	  this.rules = assign({}, default_rules);
	}


	/**
	 * Renderer.renderAttrs(token) -> String
	 *
	 * Render token attributes to string.
	 **/
	Renderer.prototype.renderAttrs = function renderAttrs(token) {
	  var i, l, result;

	  if (!token.attrs) { return ''; }

	  result = '';

	  for (i = 0, l = token.attrs.length; i < l; i++) {
	    result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
	  }

	  return result;
	};


	/**
	 * Renderer.renderToken(tokens, idx, options) -> String
	 * - tokens (Array): list of tokens
	 * - idx (Numbed): token index to render
	 * - options (Object): params of parser instance
	 *
	 * Default token renderer. Can be overriden by custom function
	 * in [[Renderer#rules]].
	 **/
	Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
	  var nextToken,
	      result = '',
	      needLf = false,
	      token = tokens[idx];

	  // Tight list paragraphs
	  if (token.hidden) {
	    return '';
	  }

	  // Insert a newline between hidden paragraph and subsequent opening
	  // block-level tag.
	  //
	  // For example, here we should insert a newline before blockquote:
	  //  - a
	  //    >
	  //
	  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
	    result += '\n';
	  }

	  // Add token name, e.g. `<img`
	  result += (token.nesting === -1 ? '</' : '<') + token.tag;

	  // Encode attributes, e.g. `<img src="foo"`
	  result += this.renderAttrs(token);

	  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
	  if (token.nesting === 0 && options.xhtmlOut) {
	    result += ' /';
	  }

	  // Check if we need to add a newline after this tag
	  if (token.block) {
	    needLf = true;

	    if (token.nesting === 1) {
	      if (idx + 1 < tokens.length) {
	        nextToken = tokens[idx + 1];

	        if (nextToken.type === 'inline' || nextToken.hidden) {
	          // Block-level tag containing an inline tag.
	          //
	          needLf = false;

	        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
	          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
	          //
	          needLf = false;
	        }
	      }
	    }
	  }

	  result += needLf ? '>\n' : '>';

	  return result;
	};


	/**
	 * Renderer.renderInline(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to renter
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * The same as [[Renderer.render]], but for single token of `inline` type.
	 **/
	Renderer.prototype.renderInline = function (tokens, options, env) {
	  var type,
	      result = '',
	      rules = this.rules;

	  for (var i = 0, len = tokens.length; i < len; i++) {
	    type = tokens[i].type;

	    if (typeof rules[type] !== 'undefined') {
	      result += rules[type](tokens, i, options, env, this);
	    } else {
	      result += this.renderToken(tokens, i, options);
	    }
	  }

	  return result;
	};


	/** internal
	 * Renderer.renderInlineAsText(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to renter
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Special kludge for image `alt` attributes to conform CommonMark spec.
	 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
	 * instead of simple escaping.
	 **/
	Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
	  var result = '';

	  for (var i = 0, len = tokens.length; i < len; i++) {
	    if (tokens[i].type === 'text') {
	      result += tokens[i].content;
	    } else if (tokens[i].type === 'image') {
	      result += this.renderInlineAsText(tokens[i].children, options, env);
	    }
	  }

	  return result;
	};


	/**
	 * Renderer.render(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to renter
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Takes token stream and generates HTML. Probably, you will never need to call
	 * this method directly.
	 **/
	Renderer.prototype.render = function (tokens, options, env) {
	  var i, len, type,
	      result = '',
	      rules = this.rules;

	  for (i = 0, len = tokens.length; i < len; i++) {
	    type = tokens[i].type;

	    if (type === 'inline') {
	      result += this.renderInline(tokens[i].children, options, env);
	    } else if (typeof rules[type] !== 'undefined') {
	      result += rules[tokens[i].type](tokens, i, options, env, this);
	    } else {
	      result += this.renderToken(tokens, i, options, env);
	    }
	  }

	  return result;
	};

	module.exports = Renderer;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	/** internal
	 * class Core
	 *
	 * Top-level rules executor. Glues block/inline parsers and does intermediate
	 * transformations.
	 **/
	'use strict';


	var Ruler  = __webpack_require__(73);


	var _rules = [
	  [ 'normalize',      __webpack_require__(74)      ],
	  [ 'block',          __webpack_require__(75)          ],
	  [ 'inline',         __webpack_require__(76)         ],
	  [ 'linkify',        __webpack_require__(77)        ],
	  [ 'replacements',   __webpack_require__(78)   ],
	  [ 'smartquotes',    __webpack_require__(79)    ]
	];


	/**
	 * new Core()
	 **/
	function Core() {
	  /**
	   * Core#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of core rules.
	   **/
	  this.ruler = new Ruler();

	  for (var i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1]);
	  }
	}


	/**
	 * Core.process(state)
	 *
	 * Executes core chain rules.
	 **/
	Core.prototype.process = function (state) {
	  var i, l, rules;

	  rules = this.ruler.getRules('');

	  for (i = 0, l = rules.length; i < l; i++) {
	    rules[i](state);
	  }
	};

	Core.prototype.State = __webpack_require__(80);


	module.exports = Core;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

	/**
	 * class Ruler
	 *
	 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
	 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
	 *
	 * - keep rules in defined order
	 * - assign the name to each rule
	 * - enable/disable rules
	 * - add/replace rules
	 * - allow assign rules to additional named chains (in the same)
	 * - cacheing lists of active rules
	 *
	 * You will not need use this class directly until write plugins. For simple
	 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
	 * [[MarkdownIt.use]].
	 **/
	'use strict';


	/**
	 * new Ruler()
	 **/
	function Ruler() {
	  // List of added rules. Each element is:
	  //
	  // {
	  //   name: XXX,
	  //   enabled: Boolean,
	  //   fn: Function(),
	  //   alt: [ name2, name3 ]
	  // }
	  //
	  this.__rules__ = [];

	  // Cached rule chains.
	  //
	  // First level - chain name, '' for default.
	  // Second level - diginal anchor for fast filtering by charcodes.
	  //
	  this.__cache__ = null;
	}

	////////////////////////////////////////////////////////////////////////////////
	// Helper methods, should not be used directly


	// Find rule index by name
	//
	Ruler.prototype.__find__ = function (name) {
	  for (var i = 0; i < this.__rules__.length; i++) {
	    if (this.__rules__[i].name === name) {
	      return i;
	    }
	  }
	  return -1;
	};


	// Build rules lookup cache
	//
	Ruler.prototype.__compile__ = function () {
	  var self = this;
	  var chains = [ '' ];

	  // collect unique names
	  self.__rules__.forEach(function (rule) {
	    if (!rule.enabled) { return; }

	    rule.alt.forEach(function (altName) {
	      if (chains.indexOf(altName) < 0) {
	        chains.push(altName);
	      }
	    });
	  });

	  self.__cache__ = {};

	  chains.forEach(function (chain) {
	    self.__cache__[chain] = [];
	    self.__rules__.forEach(function (rule) {
	      if (!rule.enabled) { return; }

	      if (chain && rule.alt.indexOf(chain) < 0) { return; }

	      self.__cache__[chain].push(rule.fn);
	    });
	  });
	};


	/**
	 * Ruler.at(name, fn [, options])
	 * - name (String): rule name to replace.
	 * - fn (Function): new rule function.
	 * - options (Object): new rule options (not mandatory).
	 *
	 * Replace rule by name with new function & options. Throws error if name not
	 * found.
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * Replace existing typorgapher replacement rule with new one:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.at('replacements', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.at = function (name, fn, options) {
	  var index = this.__find__(name);
	  var opt = options || {};

	  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

	  this.__rules__[index].fn = fn;
	  this.__rules__[index].alt = opt.alt || [];
	  this.__cache__ = null;
	};


	/**
	 * Ruler.before(beforeName, ruleName, fn [, options])
	 * - beforeName (String): new rule will be added before this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain before one with given name. See also
	 * [[Ruler.after]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
	  var index = this.__find__(beforeName);
	  var opt = options || {};

	  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

	  this.__rules__.splice(index, 0, {
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });

	  this.__cache__ = null;
	};


	/**
	 * Ruler.after(afterName, ruleName, fn [, options])
	 * - afterName (String): new rule will be added after this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain after one with given name. See also
	 * [[Ruler.before]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.after = function (afterName, ruleName, fn, options) {
	  var index = this.__find__(afterName);
	  var opt = options || {};

	  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

	  this.__rules__.splice(index + 1, 0, {
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });

	  this.__cache__ = null;
	};

	/**
	 * Ruler.push(ruleName, fn [, options])
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Push new rule to the end of chain. See also
	 * [[Ruler.before]], [[Ruler.after]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.push('my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/
	Ruler.prototype.push = function (ruleName, fn, options) {
	  var opt = options || {};

	  this.__rules__.push({
	    name: ruleName,
	    enabled: true,
	    fn: fn,
	    alt: opt.alt || []
	  });

	  this.__cache__ = null;
	};


	/**
	 * Ruler.enable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to enable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
	 **/
	Ruler.prototype.enable = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) { list = [ list ]; }

	  var result = [];

	  // Search by name and enable
	  list.forEach(function (name) {
	    var idx = this.__find__(name);

	    if (idx < 0) {
	      if (ignoreInvalid) { return; }
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = true;
	    result.push(name);
	  }, this);

	  this.__cache__ = null;
	  return result;
	};


	/**
	 * Ruler.enableOnly(list [, ignoreInvalid])
	 * - list (String|Array): list of rule names to enable (whitelist).
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names, and disable everything else. If any rule name
	 * not found - throw Error. Errors can be disabled by second param.
	 *
	 * See also [[Ruler.disable]], [[Ruler.enable]].
	 **/
	Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) { list = [ list ]; }

	  this.__rules__.forEach(function (rule) { rule.enabled = false; });

	  this.enable(list, ignoreInvalid);
	};


	/**
	 * Ruler.disable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Disable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
	 **/
	Ruler.prototype.disable = function (list, ignoreInvalid) {
	  if (!Array.isArray(list)) { list = [ list ]; }

	  var result = [];

	  // Search by name and disable
	  list.forEach(function (name) {
	    var idx = this.__find__(name);

	    if (idx < 0) {
	      if (ignoreInvalid) { return; }
	      throw new Error('Rules manager: invalid rule name ' + name);
	    }
	    this.__rules__[idx].enabled = false;
	    result.push(name);
	  }, this);

	  this.__cache__ = null;
	  return result;
	};


	/**
	 * Ruler.getRules(chainName) -> Array
	 *
	 * Return array of active functions (rules) for given chain name. It analyzes
	 * rules configuration, compiles caches if not exists and returns result.
	 *
	 * Default chain name is `''` (empty string). It can't be skipped. That's
	 * done intentionally, to keep signature monomorphic for high speed.
	 **/
	Ruler.prototype.getRules = function (chainName) {
	  if (this.__cache__ === null) {
	    this.__compile__();
	  }

	  // Chain can be empty, if rules disabled. But we still have to return Array.
	  return this.__cache__[chainName] || [];
	};

	module.exports = Ruler;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

	// Normalize input string

	'use strict';


	var NEWLINES_RE  = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g;
	var NULL_RE      = /\u0000/g;


	module.exports = function inline(state) {
	  var str;

	  // Normalize newlines
	  str = state.src.replace(NEWLINES_RE, '\n');

	  // Replace NULL characters
	  str = str.replace(NULL_RE, '\uFFFD');

	  state.src = str;
	};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

	'use strict';


	module.exports = function block(state) {
	  var token;

	  if (state.inlineMode) {
	    token          = new state.Token('inline', '', 0);
	    token.content  = state.src;
	    token.map      = [ 0, 1 ];
	    token.children = [];
	    state.tokens.push(token);
	  } else {
	    state.md.block.parse(state.src, state.md, state.env, state.tokens);
	  }
	};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = function inline(state) {
	  var tokens = state.tokens, tok, i, l;

	  // Parse inlines
	  for (i = 0, l = tokens.length; i < l; i++) {
	    tok = tokens[i];
	    if (tok.type === 'inline') {
	      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
	    }
	  }
	};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	// Replace link-like texts with link nodes.
	//
	// Currently restricted by `md.validateLink()` to http/https/ftp
	//
	'use strict';


	var arrayReplaceAt = __webpack_require__(53).arrayReplaceAt;


	function isLinkOpen(str) {
	  return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
	  return /^<\/a\s*>/i.test(str);
	}


	module.exports = function linkify(state) {
	  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
	      level, htmlLinkLevel, url, fullUrl, urlText,
	      blockTokens = state.tokens,
	      links;

	  if (!state.md.options.linkify) { return; }

	  for (j = 0, l = blockTokens.length; j < l; j++) {
	    if (blockTokens[j].type !== 'inline' ||
	        !state.md.linkify.pretest(blockTokens[j].content)) {
	      continue;
	    }

	    tokens = blockTokens[j].children;

	    htmlLinkLevel = 0;

	    // We scan from the end, to keep position when new tags added.
	    // Use reversed logic in links start/end match
	    for (i = tokens.length - 1; i >= 0; i--) {
	      currentToken = tokens[i];

	      // Skip content of markdown links
	      if (currentToken.type === 'link_close') {
	        i--;
	        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
	          i--;
	        }
	        continue;
	      }

	      // Skip content of html tag links
	      if (currentToken.type === 'html_inline') {
	        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
	          htmlLinkLevel--;
	        }
	        if (isLinkClose(currentToken.content)) {
	          htmlLinkLevel++;
	        }
	      }
	      if (htmlLinkLevel > 0) { continue; }

	      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

	        text = currentToken.content;
	        links = state.md.linkify.match(text);

	        // Now split string to nodes
	        nodes = [];
	        level = currentToken.level;
	        lastPos = 0;

	        for (ln = 0; ln < links.length; ln++) {

	          url = links[ln].url;
	          fullUrl = state.md.normalizeLink(url);
	          if (!state.md.validateLink(fullUrl)) { continue; }

	          urlText = links[ln].text;

	          // Linkifier might send raw hostnames like "example.com", where url
	          // starts with domain name. So we prepend http:// in those cases,
	          // and remove it afterwards.
	          //
	          if (!links[ln].schema) {
	            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
	          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
	            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
	          } else {
	            urlText = state.md.normalizeLinkText(urlText);
	          }

	          pos = links[ln].index;

	          if (pos > lastPos) {
	            token         = new state.Token('text', '', 0);
	            token.content = text.slice(lastPos, pos);
	            token.level   = level;
	            nodes.push(token);
	          }

	          token         = new state.Token('link_open', 'a', 1);
	          token.attrs   = [ [ 'href', fullUrl ] ];
	          token.level   = level++;
	          token.markup  = 'linkify';
	          token.info    = 'auto';
	          nodes.push(token);

	          token         = new state.Token('text', '', 0);
	          token.content = urlText;
	          token.level   = level;
	          nodes.push(token);

	          token         = new state.Token('link_close', 'a', -1);
	          token.level   = --level;
	          token.markup  = 'linkify';
	          token.info    = 'auto';
	          nodes.push(token);

	          lastPos = links[ln].lastIndex;
	        }
	        if (lastPos < text.length) {
	          token         = new state.Token('text', '', 0);
	          token.content = text.slice(lastPos);
	          token.level   = level;
	          nodes.push(token);
	        }

	        // replace current node
	        blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
	      }
	    }
	  }
	};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

	// Simple typographyc replacements
	//
	// (c) (C) → ©
	// (tm) (TM) → ™
	// (r) (R) → ®
	// +- → ±
	// (p) (P) -> §
	// ... → … (also ?.... → ?.., !.... → !..)
	// ???????? → ???, !!!!! → !!!, `,,` → `,`
	// -- → &ndash;, --- → &mdash;
	//
	'use strict';

	// TODO:
	// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
	// - miltiplication 2 x 4 -> 2 × 4

	var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

	// Workaround for phantomjs - need regex without /g flag,
	// or root check will fail every second time
	var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

	var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
	var SCOPED_ABBR = {
	  c: '©',
	  r: '®',
	  p: '§',
	  tm: '™'
	};

	function replaceFn(match, name) {
	  return SCOPED_ABBR[name.toLowerCase()];
	}

	function replace_scoped(inlineTokens) {
	  var i, token, inside_autolink = 0;

	  for (i = inlineTokens.length - 1; i >= 0; i--) {
	    token = inlineTokens[i];

	    if (token.type === 'text' && !inside_autolink) {
	      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
	    }

	    if (token.type === 'link_open' && token.info === 'auto') {
	      inside_autolink--;
	    }

	    if (token.type === 'link_close' && token.info === 'auto') {
	      inside_autolink++;
	    }
	  }
	}

	function replace_rare(inlineTokens) {
	  var i, token, inside_autolink = 0;

	  for (i = inlineTokens.length - 1; i >= 0; i--) {
	    token = inlineTokens[i];

	    if (token.type === 'text' && !inside_autolink) {
	      if (RARE_RE.test(token.content)) {
	        token.content = token.content
	                    .replace(/\+-/g, '±')
	                    // .., ..., ....... -> …
	                    // but ?..... & !..... -> ?.. & !..
	                    .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
	                    .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
	                    // em-dash
	                    .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
	                    // en-dash
	                    .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
	                    .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
	      }
	    }

	    if (token.type === 'link_open' && token.info === 'auto') {
	      inside_autolink--;
	    }

	    if (token.type === 'link_close' && token.info === 'auto') {
	      inside_autolink++;
	    }
	  }
	}


	module.exports = function replace(state) {
	  var blkIdx;

	  if (!state.md.options.typographer) { return; }

	  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

	    if (state.tokens[blkIdx].type !== 'inline') { continue; }

	    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
	      replace_scoped(state.tokens[blkIdx].children);
	    }

	    if (RARE_RE.test(state.tokens[blkIdx].content)) {
	      replace_rare(state.tokens[blkIdx].children);
	    }

	  }
	};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// Convert straight quotation marks to typographic ones
	//
	'use strict';


	var isWhiteSpace   = __webpack_require__(53).isWhiteSpace;
	var isPunctChar    = __webpack_require__(53).isPunctChar;
	var isMdAsciiPunct = __webpack_require__(53).isMdAsciiPunct;

	var QUOTE_TEST_RE = /['"]/;
	var QUOTE_RE = /['"]/g;
	var APOSTROPHE = '\u2019'; /* ’ */


	function replaceAt(str, index, ch) {
	  return str.substr(0, index) + ch + str.substr(index + 1);
	}

	function process_inlines(tokens, state) {
	  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
	      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
	      canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

	  stack = [];

	  for (i = 0; i < tokens.length; i++) {
	    token = tokens[i];

	    thisLevel = tokens[i].level;

	    for (j = stack.length - 1; j >= 0; j--) {
	      if (stack[j].level <= thisLevel) { break; }
	    }
	    stack.length = j + 1;

	    if (token.type !== 'text') { continue; }

	    text = token.content;
	    pos = 0;
	    max = text.length;

	    /*eslint no-labels:0,block-scoped-var:0*/
	    OUTER:
	    while (pos < max) {
	      QUOTE_RE.lastIndex = pos;
	      t = QUOTE_RE.exec(text);
	      if (!t) { break; }

	      canOpen = canClose = true;
	      pos = t.index + 1;
	      isSingle = (t[0] === "'");

	      // Find previous character,
	      // default to space if it's the beginning of the line
	      //
	      lastChar = 0x20;

	      if (t.index - 1 >= 0) {
	        lastChar = text.charCodeAt(t.index - 1);
	      } else {
	        for (j = i - 1; j >= 0; j--) {
	          if (tokens[j].type !== 'text') { continue; }

	          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
	          break;
	        }
	      }

	      // Find next character,
	      // default to space if it's the end of the line
	      //
	      nextChar = 0x20;

	      if (pos < max) {
	        nextChar = text.charCodeAt(pos);
	      } else {
	        for (j = i + 1; j < tokens.length; j++) {
	          if (tokens[j].type !== 'text') { continue; }

	          nextChar = tokens[j].content.charCodeAt(0);
	          break;
	        }
	      }

	      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

	      isLastWhiteSpace = isWhiteSpace(lastChar);
	      isNextWhiteSpace = isWhiteSpace(nextChar);

	      if (isNextWhiteSpace) {
	        canOpen = false;
	      } else if (isNextPunctChar) {
	        if (!(isLastWhiteSpace || isLastPunctChar)) {
	          canOpen = false;
	        }
	      }

	      if (isLastWhiteSpace) {
	        canClose = false;
	      } else if (isLastPunctChar) {
	        if (!(isNextWhiteSpace || isNextPunctChar)) {
	          canClose = false;
	        }
	      }

	      if (nextChar === 0x22 /* " */ && t[0] === '"') {
	        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
	          // special case: 1"" - count first quote as an inch
	          canClose = canOpen = false;
	        }
	      }

	      if (canOpen && canClose) {
	        // treat this as the middle of the word
	        canOpen = false;
	        canClose = isNextPunctChar;
	      }

	      if (!canOpen && !canClose) {
	        // middle of word
	        if (isSingle) {
	          token.content = replaceAt(token.content, t.index, APOSTROPHE);
	        }
	        continue;
	      }

	      if (canClose) {
	        // this could be a closing quote, rewind the stack to get a match
	        for (j = stack.length - 1; j >= 0; j--) {
	          item = stack[j];
	          if (stack[j].level < thisLevel) { break; }
	          if (item.single === isSingle && stack[j].level === thisLevel) {
	            item = stack[j];

	            if (isSingle) {
	              openQuote = state.md.options.quotes[2];
	              closeQuote = state.md.options.quotes[3];
	            } else {
	              openQuote = state.md.options.quotes[0];
	              closeQuote = state.md.options.quotes[1];
	            }

	            // replace token.content *before* tokens[item.token].content,
	            // because, if they are pointing at the same token, replaceAt
	            // could mess up indices when quote length != 1
	            token.content = replaceAt(token.content, t.index, closeQuote);
	            tokens[item.token].content = replaceAt(
	              tokens[item.token].content, item.pos, openQuote);

	            pos += closeQuote.length - 1;
	            if (item.token === i) { pos += openQuote.length - 1; }

	            text = token.content;
	            max = text.length;

	            stack.length = j;
	            continue OUTER;
	          }
	        }
	      }

	      if (canOpen) {
	        stack.push({
	          token: i,
	          pos: t.index,
	          single: isSingle,
	          level: thisLevel
	        });
	      } else if (canClose && isSingle) {
	        token.content = replaceAt(token.content, t.index, APOSTROPHE);
	      }
	    }
	  }
	}


	module.exports = function smartquotes(state) {
	  /*eslint max-depth:0*/
	  var blkIdx;

	  if (!state.md.options.typographer) { return; }

	  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

	    if (state.tokens[blkIdx].type !== 'inline' ||
	        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
	      continue;
	    }

	    process_inlines(state.tokens[blkIdx].children, state);
	  }
	};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	// Core state object
	//
	'use strict';

	var Token = __webpack_require__(81);


	function StateCore(src, md, env) {
	  this.src = src;
	  this.env = env;
	  this.tokens = [];
	  this.inlineMode = false;
	  this.md = md; // link to parser instance
	}

	// re-export Token class to use in core rules
	StateCore.prototype.Token = Token;


	module.exports = StateCore;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

	// Token class

	'use strict';


	/**
	 * class Token
	 **/

	/**
	 * new Token(type, tag, nesting)
	 *
	 * Create new token and fill passed properties.
	 **/
	function Token(type, tag, nesting) {
	  /**
	   * Token#type -> String
	   *
	   * Type of the token (string, e.g. "paragraph_open")
	   **/
	  this.type     = type;

	  /**
	   * Token#tag -> String
	   *
	   * html tag name, e.g. "p"
	   **/
	  this.tag      = tag;

	  /**
	   * Token#attrs -> Array
	   *
	   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
	   **/
	  this.attrs    = null;

	  /**
	   * Token#map -> Array
	   *
	   * Source map info. Format: `[ line_begin, line_end ]`
	   **/
	  this.map      = null;

	  /**
	   * Token#nesting -> Number
	   *
	   * Level change (number in {-1, 0, 1} set), where:
	   *
	   * -  `1` means the tag is opening
	   * -  `0` means the tag is self-closing
	   * - `-1` means the tag is closing
	   **/
	  this.nesting  = nesting;

	  /**
	   * Token#level -> Number
	   *
	   * nesting level, the same as `state.level`
	   **/
	  this.level    = 0;

	  /**
	   * Token#children -> Array
	   *
	   * An array of child nodes (inline and img tokens)
	   **/
	  this.children = null;

	  /**
	   * Token#content -> String
	   *
	   * In a case of self-closing tag (code, html, fence, etc.),
	   * it has contents of this tag.
	   **/
	  this.content  = '';

	  /**
	   * Token#markup -> String
	   *
	   * '*' or '_' for emphasis, fence string for fence, etc.
	   **/
	  this.markup   = '';

	  /**
	   * Token#info -> String
	   *
	   * fence infostring
	   **/
	  this.info     = '';

	  /**
	   * Token#meta -> Object
	   *
	   * A place for plugins to store an arbitrary data
	   **/
	  this.meta     = null;

	  /**
	   * Token#block -> Boolean
	   *
	   * True for block-level tokens, false for inline tokens.
	   * Used in renderer to calculate line breaks
	   **/
	  this.block    = false;

	  /**
	   * Token#hidden -> Boolean
	   *
	   * If it's true, ignore this element when rendering. Used for tight lists
	   * to hide paragraphs.
	   **/
	  this.hidden   = false;
	}


	/**
	 * Token.attrIndex(name) -> Number
	 *
	 * Search attribute index by name.
	 **/
	Token.prototype.attrIndex = function attrIndex(name) {
	  var attrs, i, len;

	  if (!this.attrs) { return -1; }

	  attrs = this.attrs;

	  for (i = 0, len = attrs.length; i < len; i++) {
	    if (attrs[i][0] === name) { return i; }
	  }
	  return -1;
	};


	/**
	 * Token.attrPush(attrData)
	 *
	 * Add `[ name, value ]` attribute to list. Init attrs if necessary
	 **/
	Token.prototype.attrPush = function attrPush(attrData) {
	  if (this.attrs) {
	    this.attrs.push(attrData);
	  } else {
	    this.attrs = [ attrData ];
	  }
	};


	/**
	 * Token.attrSet(name, value)
	 *
	 * Set `name` attribute to `value`. Override old value if exists.
	 **/
	Token.prototype.attrSet = function attrSet(name, value) {
	  var idx = this.attrIndex(name),
	      attrData = [ name, value ];

	  if (idx < 0) {
	    this.attrPush(attrData);
	  } else {
	    this.attrs[idx] = attrData;
	  }
	};


	/**
	 * Token.attrGet(name)
	 *
	 * Get the value of attribute `name`, or null if it does not exist.
	 **/
	Token.prototype.attrGet = function attrGet(name) {
	  var idx = this.attrIndex(name), value = null;
	  if (idx >= 0) {
	    value = this.attrs[idx][1];
	  }
	  return value;
	};


	/**
	 * Token.attrJoin(name, value)
	 *
	 * Join value to existing attribute via space. Or create new attribute if not
	 * exists. Useful to operate with token classes.
	 **/
	Token.prototype.attrJoin = function attrJoin(name, value) {
	  var idx = this.attrIndex(name);

	  if (idx < 0) {
	    this.attrPush([ name, value ]);
	  } else {
	    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
	  }
	};


	module.exports = Token;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	/** internal
	 * class ParserBlock
	 *
	 * Block-level tokenizer.
	 **/
	'use strict';


	var Ruler           = __webpack_require__(73);


	var _rules = [
	  // First 2 params - rule name & source. Secondary array - list of rules,
	  // which can be terminated by this one.
	  [ 'table',      __webpack_require__(83),      [ 'paragraph', 'reference' ] ],
	  [ 'code',       __webpack_require__(84) ],
	  [ 'fence',      __webpack_require__(85),      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
	  [ 'blockquote', __webpack_require__(86), [ 'paragraph', 'reference', 'list' ] ],
	  [ 'hr',         __webpack_require__(87),         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
	  [ 'list',       __webpack_require__(88),       [ 'paragraph', 'reference', 'blockquote' ] ],
	  [ 'reference',  __webpack_require__(89) ],
	  [ 'heading',    __webpack_require__(90),    [ 'paragraph', 'reference', 'blockquote' ] ],
	  [ 'lheading',   __webpack_require__(91) ],
	  [ 'html_block', __webpack_require__(92), [ 'paragraph', 'reference', 'blockquote' ] ],
	  [ 'paragraph',  __webpack_require__(95) ]
	];


	/**
	 * new ParserBlock()
	 **/
	function ParserBlock() {
	  /**
	   * ParserBlock#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of block rules.
	   **/
	  this.ruler = new Ruler();

	  for (var i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1], { alt: (_rules[i][2] || []).slice() });
	  }
	}


	// Generate tokens for input range
	//
	ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
	  var ok, i,
	      rules = this.ruler.getRules(''),
	      len = rules.length,
	      line = startLine,
	      hasEmptyLines = false,
	      maxNesting = state.md.options.maxNesting;

	  while (line < endLine) {
	    state.line = line = state.skipEmptyLines(line);
	    if (line >= endLine) { break; }

	    // Termination condition for nested calls.
	    // Nested calls currently used for blockquotes & lists
	    if (state.sCount[line] < state.blkIndent) { break; }

	    // If nesting level exceeded - skip tail to the end. That's not ordinary
	    // situation and we should not care about content.
	    if (state.level >= maxNesting) {
	      state.line = endLine;
	      break;
	    }

	    // Try all possible rules.
	    // On success, rule should:
	    //
	    // - update `state.line`
	    // - update `state.tokens`
	    // - return true

	    for (i = 0; i < len; i++) {
	      ok = rules[i](state, line, endLine, false);
	      if (ok) { break; }
	    }

	    // set state.tight iff we had an empty line before current tag
	    // i.e. latest empty line should not count
	    state.tight = !hasEmptyLines;

	    // paragraph might "eat" one newline after it in nested lists
	    if (state.isEmpty(state.line - 1)) {
	      hasEmptyLines = true;
	    }

	    line = state.line;

	    if (line < endLine && state.isEmpty(line)) {
	      hasEmptyLines = true;
	      line++;
	      state.line = line;
	    }
	  }
	};


	/**
	 * ParserBlock.parse(str, md, env, outTokens)
	 *
	 * Process input string and push block tokens into `outTokens`
	 **/
	ParserBlock.prototype.parse = function (src, md, env, outTokens) {
	  var state;

	  if (!src) { return; }

	  state = new this.State(src, md, env, outTokens);

	  this.tokenize(state, state.line, state.lineMax);
	};


	ParserBlock.prototype.State = __webpack_require__(96);


	module.exports = ParserBlock;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// GFM table, non-standard

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	function getLine(state, line) {
	  var pos = state.bMarks[line] + state.blkIndent,
	      max = state.eMarks[line];

	  return state.src.substr(pos, max - pos);
	}

	function escapedSplit(str) {
	  var result = [],
	      pos = 0,
	      max = str.length,
	      ch,
	      escapes = 0,
	      lastPos = 0,
	      backTicked = false,
	      lastBackTick = 0;

	  ch  = str.charCodeAt(pos);

	  while (pos < max) {
	    if (ch === 0x60/* ` */) {
	      if (backTicked) {
	        // make \` close code sequence, but not open it;
	        // the reason is: `\` is correct code block
	        backTicked = false;
	        lastBackTick = pos;
	      } else if (escapes % 2 === 0) {
	        backTicked = true;
	        lastBackTick = pos;
	      }
	    } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
	      result.push(str.substring(lastPos, pos));
	      lastPos = pos + 1;
	    }

	    if (ch === 0x5c/* \ */) {
	      escapes++;
	    } else {
	      escapes = 0;
	    }

	    pos++;

	    // If there was an un-closed backtick, go back to just after
	    // the last backtick, but as if it was a normal character
	    if (pos === max && backTicked) {
	      backTicked = false;
	      pos = lastBackTick + 1;
	    }

	    ch = str.charCodeAt(pos);
	  }

	  result.push(str.substring(lastPos));

	  return result;
	}


	module.exports = function table(state, startLine, endLine, silent) {
	  var ch, lineText, pos, i, nextLine, columns, columnCount, token,
	      aligns, t, tableLines, tbodyLines;

	  // should have at least two lines
	  if (startLine + 2 > endLine) { return false; }

	  nextLine = startLine + 1;

	  if (state.sCount[nextLine] < state.blkIndent) { return false; }

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

	  // first character of the second line should be '|', '-', ':',
	  // and no other characters are allowed but spaces;
	  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

	  pos = state.bMarks[nextLine] + state.tShift[nextLine];
	  if (pos >= state.eMarks[nextLine]) { return false; }

	  ch = state.src.charCodeAt(pos++);
	  if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

	  while (pos < state.eMarks[nextLine]) {
	    ch = state.src.charCodeAt(pos);

	    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) { return false; }

	    pos++;
	  }

	  lineText = getLine(state, startLine + 1);

	  columns = lineText.split('|');
	  aligns = [];
	  for (i = 0; i < columns.length; i++) {
	    t = columns[i].trim();
	    if (!t) {
	      // allow empty columns before and after table, but not in between columns;
	      // e.g. allow ` |---| `, disallow ` ---||--- `
	      if (i === 0 || i === columns.length - 1) {
	        continue;
	      } else {
	        return false;
	      }
	    }

	    if (!/^:?-+:?$/.test(t)) { return false; }
	    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
	      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
	    } else if (t.charCodeAt(0) === 0x3A/* : */) {
	      aligns.push('left');
	    } else {
	      aligns.push('');
	    }
	  }

	  lineText = getLine(state, startLine).trim();
	  if (lineText.indexOf('|') === -1) { return false; }
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
	  columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

	  // header row will define an amount of columns in the entire table,
	  // and align row shouldn't be smaller than that (the rest of the rows can)
	  columnCount = columns.length;
	  if (columnCount > aligns.length) { return false; }

	  if (silent) { return true; }

	  token     = state.push('table_open', 'table', 1);
	  token.map = tableLines = [ startLine, 0 ];

	  token     = state.push('thead_open', 'thead', 1);
	  token.map = [ startLine, startLine + 1 ];

	  token     = state.push('tr_open', 'tr', 1);
	  token.map = [ startLine, startLine + 1 ];

	  for (i = 0; i < columns.length; i++) {
	    token          = state.push('th_open', 'th', 1);
	    token.map      = [ startLine, startLine + 1 ];
	    if (aligns[i]) {
	      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
	    }

	    token          = state.push('inline', '', 0);
	    token.content  = columns[i].trim();
	    token.map      = [ startLine, startLine + 1 ];
	    token.children = [];

	    token          = state.push('th_close', 'th', -1);
	  }

	  token     = state.push('tr_close', 'tr', -1);
	  token     = state.push('thead_close', 'thead', -1);

	  token     = state.push('tbody_open', 'tbody', 1);
	  token.map = tbodyLines = [ startLine + 2, 0 ];

	  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
	    if (state.sCount[nextLine] < state.blkIndent) { break; }

	    lineText = getLine(state, nextLine).trim();
	    if (lineText.indexOf('|') === -1) { break; }
	    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
	    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

	    token = state.push('tr_open', 'tr', 1);
	    for (i = 0; i < columnCount; i++) {
	      token          = state.push('td_open', 'td', 1);
	      if (aligns[i]) {
	        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
	      }

	      token          = state.push('inline', '', 0);
	      token.content  = columns[i] ? columns[i].trim() : '';
	      token.children = [];

	      token          = state.push('td_close', 'td', -1);
	    }
	    token = state.push('tr_close', 'tr', -1);
	  }
	  token = state.push('tbody_close', 'tbody', -1);
	  token = state.push('table_close', 'table', -1);

	  tableLines[1] = tbodyLines[1] = nextLine;
	  state.line = nextLine;
	  return true;
	};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

	// Code block (4 spaces padded)

	'use strict';


	module.exports = function code(state, startLine, endLine/*, silent*/) {
	  var nextLine, last, token;

	  if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

	  last = nextLine = startLine + 1;

	  while (nextLine < endLine) {
	    if (state.isEmpty(nextLine)) {
	      nextLine++;
	      continue;
	    }

	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      nextLine++;
	      last = nextLine;
	      continue;
	    }
	    break;
	  }

	  state.line = last;

	  token         = state.push('code_block', 'code', 0);
	  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
	  token.map     = [ startLine, state.line ];

	  return true;
	};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

	// fences (``` lang, ~~~ lang)

	'use strict';


	module.exports = function fence(state, startLine, endLine, silent) {
	  var marker, len, params, nextLine, mem, token, markup,
	      haveEndMarker = false,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  if (pos + 3 > max) { return false; }

	  marker = state.src.charCodeAt(pos);

	  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
	    return false;
	  }

	  // scan marker length
	  mem = pos;
	  pos = state.skipChars(pos, marker);

	  len = pos - mem;

	  if (len < 3) { return false; }

	  markup = state.src.slice(mem, pos);
	  params = state.src.slice(pos, max);

	  if (params.indexOf(String.fromCharCode(marker)) >= 0) { return false; }

	  // Since start is found, we can report success here in validation mode
	  if (silent) { return true; }

	  // search end of block
	  nextLine = startLine;

	  for (;;) {
	    nextLine++;
	    if (nextLine >= endLine) {
	      // unclosed block should be autoclosed by end of document.
	      // also block seems to be autoclosed by end of parent
	      break;
	    }

	    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];

	    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
	      // non-empty line with negative indent should stop the list:
	      // - ```
	      //  test
	      break;
	    }

	    if (state.src.charCodeAt(pos) !== marker) { continue; }

	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	      // closing fence should be indented less than 4 spaces
	      continue;
	    }

	    pos = state.skipChars(pos, marker);

	    // closing code fence must be at least as long as the opening one
	    if (pos - mem < len) { continue; }

	    // make sure tail has spaces only
	    pos = state.skipSpaces(pos);

	    if (pos < max) { continue; }

	    haveEndMarker = true;
	    // found!
	    break;
	  }

	  // If a fence has heading spaces, they should be removed from its inner block
	  len = state.sCount[startLine];

	  state.line = nextLine + (haveEndMarker ? 1 : 0);

	  token         = state.push('fence', 'code', 0);
	  token.info    = params;
	  token.content = state.getLines(startLine + 1, nextLine, len, true);
	  token.markup  = markup;
	  token.map     = [ startLine, state.line ];

	  return true;
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	// Block quotes

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	module.exports = function blockquote(state, startLine, endLine, silent) {
	  var adjustTab,
	      ch,
	      i,
	      initial,
	      isOutdented,
	      l,
	      lastLineEmpty,
	      lines,
	      nextLine,
	      offset,
	      oldBMarks,
	      oldBSCount,
	      oldIndent,
	      oldParentType,
	      oldSCount,
	      oldTShift,
	      spaceAfterMarker,
	      terminate,
	      terminatorRules,
	      token,
	      oldLineMax = state.lineMax,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  // check the block quote marker
	  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

	  // we know that it's going to be a valid blockquote,
	  // so no point trying to find the end of it in silent mode
	  if (silent) { return true; }

	  // skip spaces after ">" and re-calculate offset
	  initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

	  // skip one optional space after '>'
	  if (state.src.charCodeAt(pos) === 0x20 /* space */) {
	    // ' >   test '
	    //     ^ -- position start of line here:
	    pos++;
	    initial++;
	    offset++;
	    adjustTab = false;
	    spaceAfterMarker = true;
	  } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
	    spaceAfterMarker = true;

	    if ((state.bsCount[startLine] + offset) % 4 === 3) {
	      // '  >\t  test '
	      //       ^ -- position start of line here (tab has width===1)
	      pos++;
	      initial++;
	      offset++;
	      adjustTab = false;
	    } else {
	      // ' >\t  test '
	      //    ^ -- position start of line here + shift bsCount slightly
	      //         to make extra space appear
	      adjustTab = true;
	    }
	  } else {
	    spaceAfterMarker = false;
	  }

	  oldBMarks = [ state.bMarks[startLine] ];
	  state.bMarks[startLine] = pos;

	  while (pos < max) {
	    ch = state.src.charCodeAt(pos);

	    if (isSpace(ch)) {
	      if (ch === 0x09) {
	        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
	      } else {
	        offset++;
	      }
	    } else {
	      break;
	    }

	    pos++;
	  }

	  oldBSCount = [ state.bsCount[startLine] ];
	  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

	  lastLineEmpty = pos >= max;

	  oldSCount = [ state.sCount[startLine] ];
	  state.sCount[startLine] = offset - initial;

	  oldTShift = [ state.tShift[startLine] ];
	  state.tShift[startLine] = pos - state.bMarks[startLine];

	  terminatorRules = state.md.block.ruler.getRules('blockquote');

	  oldParentType = state.parentType;
	  state.parentType = 'blockquote';

	  // Search the end of the block
	  //
	  // Block ends with either:
	  //  1. an empty line outside:
	  //     ```
	  //     > test
	  //
	  //     ```
	  //  2. an empty line inside:
	  //     ```
	  //     >
	  //     test
	  //     ```
	  //  3. another tag:
	  //     ```
	  //     > test
	  //      - - -
	  //     ```
	  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
	    // check if it's outdented, i.e. it's inside list item and indented
	    // less than said list item:
	    //
	    // ```
	    // 1. anything
	    //    > current blockquote
	    // 2. checking this line
	    // ```
	    isOutdented = state.sCount[nextLine] < state.blkIndent;

	    pos = state.bMarks[nextLine] + state.tShift[nextLine];
	    max = state.eMarks[nextLine];

	    if (pos >= max) {
	      // Case 1: line is not inside the blockquote, and this line is empty.
	      break;
	    }

	    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !isOutdented) {
	      // This line is inside the blockquote.

	      // skip spaces after ">" and re-calculate offset
	      initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);

	      // skip one optional space after '>'
	      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
	        // ' >   test '
	        //     ^ -- position start of line here:
	        pos++;
	        initial++;
	        offset++;
	        adjustTab = false;
	        spaceAfterMarker = true;
	      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
	        spaceAfterMarker = true;

	        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
	          // '  >\t  test '
	          //       ^ -- position start of line here (tab has width===1)
	          pos++;
	          initial++;
	          offset++;
	          adjustTab = false;
	        } else {
	          // ' >\t  test '
	          //    ^ -- position start of line here + shift bsCount slightly
	          //         to make extra space appear
	          adjustTab = true;
	        }
	      } else {
	        spaceAfterMarker = false;
	      }

	      oldBMarks.push(state.bMarks[nextLine]);
	      state.bMarks[nextLine] = pos;

	      while (pos < max) {
	        ch = state.src.charCodeAt(pos);

	        if (isSpace(ch)) {
	          if (ch === 0x09) {
	            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
	          } else {
	            offset++;
	          }
	        } else {
	          break;
	        }

	        pos++;
	      }

	      lastLineEmpty = pos >= max;

	      oldBSCount.push(state.bsCount[nextLine]);
	      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

	      oldSCount.push(state.sCount[nextLine]);
	      state.sCount[nextLine] = offset - initial;

	      oldTShift.push(state.tShift[nextLine]);
	      state.tShift[nextLine] = pos - state.bMarks[nextLine];
	      continue;
	    }

	    // Case 2: line is not inside the blockquote, and the last line was empty.
	    if (lastLineEmpty) { break; }

	    // Case 3: another tag found.
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }

	    if (terminate) {
	      // Quirk to enforce "hard termination mode" for paragraphs;
	      // normally if you call `tokenize(state, startLine, nextLine)`,
	      // paragraphs will look below nextLine for paragraph continuation,
	      // but if blockquote is terminated by another tag, they shouldn't
	      state.lineMax = nextLine;

	      if (state.blkIndent !== 0) {
	        // state.blkIndent was non-zero, we now set it to zero,
	        // so we need to re-calculate all offsets to appear as
	        // if indent wasn't changed
	        oldBMarks.push(state.bMarks[nextLine]);
	        oldBSCount.push(state.bsCount[nextLine]);
	        oldTShift.push(state.tShift[nextLine]);
	        oldSCount.push(state.sCount[nextLine]);
	        state.sCount[nextLine] -= state.blkIndent;
	      }

	      break;
	    }

	    if (isOutdented) break;

	    oldBMarks.push(state.bMarks[nextLine]);
	    oldBSCount.push(state.bsCount[nextLine]);
	    oldTShift.push(state.tShift[nextLine]);
	    oldSCount.push(state.sCount[nextLine]);

	    // A negative indentation means that this is a paragraph continuation
	    //
	    state.sCount[nextLine] = -1;
	  }

	  oldIndent = state.blkIndent;
	  state.blkIndent = 0;

	  token        = state.push('blockquote_open', 'blockquote', 1);
	  token.markup = '>';
	  token.map    = lines = [ startLine, 0 ];

	  state.md.block.tokenize(state, startLine, nextLine);

	  token        = state.push('blockquote_close', 'blockquote', -1);
	  token.markup = '>';

	  state.lineMax = oldLineMax;
	  state.parentType = oldParentType;
	  lines[1] = state.line;

	  // Restore original tShift; this might not be necessary since the parser
	  // has already been here, but just to make sure we can do that.
	  for (i = 0; i < oldTShift.length; i++) {
	    state.bMarks[i + startLine] = oldBMarks[i];
	    state.tShift[i + startLine] = oldTShift[i];
	    state.sCount[i + startLine] = oldSCount[i];
	    state.bsCount[i + startLine] = oldBSCount[i];
	  }
	  state.blkIndent = oldIndent;

	  return true;
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	// Horizontal rule

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	module.exports = function hr(state, startLine, endLine, silent) {
	  var marker, cnt, ch, token,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  marker = state.src.charCodeAt(pos++);

	  // Check hr marker
	  if (marker !== 0x2A/* * */ &&
	      marker !== 0x2D/* - */ &&
	      marker !== 0x5F/* _ */) {
	    return false;
	  }

	  // markers can be mixed with spaces, but there should be at least 3 of them

	  cnt = 1;
	  while (pos < max) {
	    ch = state.src.charCodeAt(pos++);
	    if (ch !== marker && !isSpace(ch)) { return false; }
	    if (ch === marker) { cnt++; }
	  }

	  if (cnt < 3) { return false; }

	  if (silent) { return true; }

	  state.line = startLine + 1;

	  token        = state.push('hr', 'hr', 0);
	  token.map    = [ startLine, state.line ];
	  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

	  return true;
	};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	// Lists

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	// Search `[-+*][\n ]`, returns next pos arter marker on success
	// or -1 on fail.
	function skipBulletListMarker(state, startLine) {
	  var marker, pos, max, ch;

	  pos = state.bMarks[startLine] + state.tShift[startLine];
	  max = state.eMarks[startLine];

	  marker = state.src.charCodeAt(pos++);
	  // Check bullet
	  if (marker !== 0x2A/* * */ &&
	      marker !== 0x2D/* - */ &&
	      marker !== 0x2B/* + */) {
	    return -1;
	  }

	  if (pos < max) {
	    ch = state.src.charCodeAt(pos);

	    if (!isSpace(ch)) {
	      // " -test " - is not a list item
	      return -1;
	    }
	  }

	  return pos;
	}

	// Search `\d+[.)][\n ]`, returns next pos arter marker on success
	// or -1 on fail.
	function skipOrderedListMarker(state, startLine) {
	  var ch,
	      start = state.bMarks[startLine] + state.tShift[startLine],
	      pos = start,
	      max = state.eMarks[startLine];

	  // List marker should have at least 2 chars (digit + dot)
	  if (pos + 1 >= max) { return -1; }

	  ch = state.src.charCodeAt(pos++);

	  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

	  for (;;) {
	    // EOL -> fail
	    if (pos >= max) { return -1; }

	    ch = state.src.charCodeAt(pos++);

	    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

	      // List marker should have no more than 9 digits
	      // (prevents integer overflow in browsers)
	      if (pos - start >= 10) { return -1; }

	      continue;
	    }

	    // found valid marker
	    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
	      break;
	    }

	    return -1;
	  }


	  if (pos < max) {
	    ch = state.src.charCodeAt(pos);

	    if (!isSpace(ch)) {
	      // " 1.test " - is not a list item
	      return -1;
	    }
	  }
	  return pos;
	}

	function markTightParagraphs(state, idx) {
	  var i, l,
	      level = state.level + 2;

	  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
	    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
	      state.tokens[i + 2].hidden = true;
	      state.tokens[i].hidden = true;
	      i += 2;
	    }
	  }
	}


	module.exports = function list(state, startLine, endLine, silent) {
	  var ch,
	      contentStart,
	      i,
	      indent,
	      indentAfterMarker,
	      initial,
	      isOrdered,
	      itemLines,
	      l,
	      listLines,
	      listTokIdx,
	      markerCharCode,
	      markerValue,
	      max,
	      nextLine,
	      offset,
	      oldIndent,
	      oldLIndent,
	      oldParentType,
	      oldTShift,
	      oldTight,
	      pos,
	      posAfterMarker,
	      prevEmptyEnd,
	      start,
	      terminate,
	      terminatorRules,
	      token,
	      isTerminatingParagraph = false,
	      tight = true;

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  // limit conditions when list can interrupt
	  // a paragraph (validation mode only)
	  if (silent && state.parentType === 'paragraph') {
	    // Next list item should still terminate previous list item;
	    //
	    // This code can fail if plugins use blkIndent as well as lists,
	    // but I hope the spec gets fixed long before that happens.
	    //
	    if (state.tShift[startLine] >= state.blkIndent) {
	      isTerminatingParagraph = true;
	    }
	  }

	  // Detect list type and position after marker
	  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
	    isOrdered = true;
	    start = state.bMarks[startLine] + state.tShift[startLine];
	    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

	    // If we're starting a new ordered list right after
	    // a paragraph, it should start with 1.
	    if (isTerminatingParagraph && markerValue !== 1) return false;

	  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
	    isOrdered = false;

	  } else {
	    return false;
	  }

	  // If we're starting a new unordered list right after
	  // a paragraph, first line should not be empty.
	  if (isTerminatingParagraph) {
	    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
	  }

	  // We should terminate list on style change. Remember first one to compare.
	  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

	  // For validation mode we can terminate immediately
	  if (silent) { return true; }

	  // Start list
	  listTokIdx = state.tokens.length;

	  if (isOrdered) {
	    token       = state.push('ordered_list_open', 'ol', 1);
	    if (markerValue !== 1) {
	      token.attrs = [ [ 'start', markerValue ] ];
	    }

	  } else {
	    token       = state.push('bullet_list_open', 'ul', 1);
	  }

	  token.map    = listLines = [ startLine, 0 ];
	  token.markup = String.fromCharCode(markerCharCode);

	  //
	  // Iterate list items
	  //

	  nextLine = startLine;
	  prevEmptyEnd = false;
	  terminatorRules = state.md.block.ruler.getRules('list');

	  oldParentType = state.parentType;
	  state.parentType = 'list';

	  while (nextLine < endLine) {
	    pos = posAfterMarker;
	    max = state.eMarks[nextLine];

	    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

	    while (pos < max) {
	      ch = state.src.charCodeAt(pos);

	      if (isSpace(ch)) {
	        if (ch === 0x09) {
	          offset += 4 - (offset + state.bsCount[nextLine]) % 4;
	        } else {
	          offset++;
	        }
	      } else {
	        break;
	      }

	      pos++;
	    }

	    contentStart = pos;

	    if (contentStart >= max) {
	      // trimming space in "-    \n  3" case, indent is 1 here
	      indentAfterMarker = 1;
	    } else {
	      indentAfterMarker = offset - initial;
	    }

	    // If we have more than 4 spaces, the indent is 1
	    // (the rest is just indented code block)
	    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

	    // "  -  test"
	    //  ^^^^^ - calculating total length of this thing
	    indent = initial + indentAfterMarker;

	    // Run subparser & write tokens
	    token        = state.push('list_item_open', 'li', 1);
	    token.markup = String.fromCharCode(markerCharCode);
	    token.map    = itemLines = [ startLine, 0 ];

	    oldIndent = state.blkIndent;
	    oldTight = state.tight;
	    oldTShift = state.tShift[startLine];
	    oldLIndent = state.sCount[startLine];
	    state.blkIndent = indent;
	    state.tight = true;
	    state.tShift[startLine] = contentStart - state.bMarks[startLine];
	    state.sCount[startLine] = offset;

	    if (contentStart >= max && state.isEmpty(startLine + 1)) {
	      // workaround for this case
	      // (list item is empty, list terminates before "foo"):
	      // ~~~~~~~~
	      //   -
	      //
	      //     foo
	      // ~~~~~~~~
	      state.line = Math.min(state.line + 2, endLine);
	    } else {
	      state.md.block.tokenize(state, startLine, endLine, true);
	    }

	    // If any of list item is tight, mark list as tight
	    if (!state.tight || prevEmptyEnd) {
	      tight = false;
	    }
	    // Item become loose if finish with empty line,
	    // but we should filter last element, because it means list finish
	    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

	    state.blkIndent = oldIndent;
	    state.tShift[startLine] = oldTShift;
	    state.sCount[startLine] = oldLIndent;
	    state.tight = oldTight;

	    token        = state.push('list_item_close', 'li', -1);
	    token.markup = String.fromCharCode(markerCharCode);

	    nextLine = startLine = state.line;
	    itemLines[1] = nextLine;
	    contentStart = state.bMarks[startLine];

	    if (nextLine >= endLine) { break; }

	    //
	    // Try to check if list is terminated or continued.
	    //
	    if (state.sCount[nextLine] < state.blkIndent) { break; }

	    // fail if terminating block found
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }

	    // fail if list has another type
	    if (isOrdered) {
	      posAfterMarker = skipOrderedListMarker(state, nextLine);
	      if (posAfterMarker < 0) { break; }
	    } else {
	      posAfterMarker = skipBulletListMarker(state, nextLine);
	      if (posAfterMarker < 0) { break; }
	    }

	    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
	  }

	  // Finilize list
	  if (isOrdered) {
	    token = state.push('ordered_list_close', 'ol', -1);
	  } else {
	    token = state.push('bullet_list_close', 'ul', -1);
	  }
	  token.markup = String.fromCharCode(markerCharCode);

	  listLines[1] = nextLine;
	  state.line = nextLine;

	  state.parentType = oldParentType;

	  // mark paragraphs tight if needed
	  if (tight) {
	    markTightParagraphs(state, listTokIdx);
	  }

	  return true;
	};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	var normalizeReference   = __webpack_require__(53).normalizeReference;
	var isSpace              = __webpack_require__(53).isSpace;


	module.exports = function reference(state, startLine, _endLine, silent) {
	  var ch,
	      destEndPos,
	      destEndLineNo,
	      endLine,
	      href,
	      i,
	      l,
	      label,
	      labelEnd,
	      oldParentType,
	      res,
	      start,
	      str,
	      terminate,
	      terminatorRules,
	      title,
	      lines = 0,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine],
	      nextLine = startLine + 1;

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

	  // Simple check to quickly interrupt scan on [link](url) at the start of line.
	  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
	  while (++pos < max) {
	    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
	        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
	      if (pos + 1 === max) { return false; }
	      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
	      break;
	    }
	  }

	  endLine = state.lineMax;

	  // jump line-by-line until empty one or EOF
	  terminatorRules = state.md.block.ruler.getRules('reference');

	  oldParentType = state.parentType;
	  state.parentType = 'reference';

	  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) { continue; }

	    // Some tags can terminate paragraph without empty line.
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }
	  }

	  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	  max = str.length;

	  for (pos = 1; pos < max; pos++) {
	    ch = str.charCodeAt(pos);
	    if (ch === 0x5B /* [ */) {
	      return false;
	    } else if (ch === 0x5D /* ] */) {
	      labelEnd = pos;
	      break;
	    } else if (ch === 0x0A /* \n */) {
	      lines++;
	    } else if (ch === 0x5C /* \ */) {
	      pos++;
	      if (pos < max && str.charCodeAt(pos) === 0x0A) {
	        lines++;
	      }
	    }
	  }

	  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

	  // [label]:   destination   'title'
	  //         ^^^ skip optional whitespace here
	  for (pos = labelEnd + 2; pos < max; pos++) {
	    ch = str.charCodeAt(pos);
	    if (ch === 0x0A) {
	      lines++;
	    } else if (isSpace(ch)) {
	      /*eslint no-empty:0*/
	    } else {
	      break;
	    }
	  }

	  // [label]:   destination   'title'
	  //            ^^^^^^^^^^^ parse this
	  res = state.md.helpers.parseLinkDestination(str, pos, max);
	  if (!res.ok) { return false; }

	  href = state.md.normalizeLink(res.str);
	  if (!state.md.validateLink(href)) { return false; }

	  pos = res.pos;
	  lines += res.lines;

	  // save cursor state, we could require to rollback later
	  destEndPos = pos;
	  destEndLineNo = lines;

	  // [label]:   destination   'title'
	  //                       ^^^ skipping those spaces
	  start = pos;
	  for (; pos < max; pos++) {
	    ch = str.charCodeAt(pos);
	    if (ch === 0x0A) {
	      lines++;
	    } else if (isSpace(ch)) {
	      /*eslint no-empty:0*/
	    } else {
	      break;
	    }
	  }

	  // [label]:   destination   'title'
	  //                          ^^^^^^^ parse this
	  res = state.md.helpers.parseLinkTitle(str, pos, max);
	  if (pos < max && start !== pos && res.ok) {
	    title = res.str;
	    pos = res.pos;
	    lines += res.lines;
	  } else {
	    title = '';
	    pos = destEndPos;
	    lines = destEndLineNo;
	  }

	  // skip trailing spaces until the rest of the line
	  while (pos < max) {
	    ch = str.charCodeAt(pos);
	    if (!isSpace(ch)) { break; }
	    pos++;
	  }

	  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	    if (title) {
	      // garbage at the end of the line after title,
	      // but it could still be a valid reference if we roll back
	      title = '';
	      pos = destEndPos;
	      lines = destEndLineNo;
	      while (pos < max) {
	        ch = str.charCodeAt(pos);
	        if (!isSpace(ch)) { break; }
	        pos++;
	      }
	    }
	  }

	  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	    // garbage at the end of the line
	    return false;
	  }

	  label = normalizeReference(str.slice(1, labelEnd));
	  if (!label) {
	    // CommonMark 0.20 disallows empty labels
	    return false;
	  }

	  // Reference can not terminate anything. This check is for safety only.
	  /*istanbul ignore if*/
	  if (silent) { return true; }

	  if (typeof state.env.references === 'undefined') {
	    state.env.references = {};
	  }
	  if (typeof state.env.references[label] === 'undefined') {
	    state.env.references[label] = { title: title, href: href };
	  }

	  state.parentType = oldParentType;

	  state.line = startLine + lines + 1;
	  return true;
	};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	// heading (#, ##, ...)

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	module.exports = function heading(state, startLine, endLine, silent) {
	  var ch, level, tmp, token,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  ch  = state.src.charCodeAt(pos);

	  if (ch !== 0x23/* # */ || pos >= max) { return false; }

	  // count heading level
	  level = 1;
	  ch = state.src.charCodeAt(++pos);
	  while (ch === 0x23/* # */ && pos < max && level <= 6) {
	    level++;
	    ch = state.src.charCodeAt(++pos);
	  }

	  if (level > 6 || (pos < max && !isSpace(ch))) { return false; }

	  if (silent) { return true; }

	  // Let's cut tails like '    ###  ' from the end of string

	  max = state.skipSpacesBack(max, pos);
	  tmp = state.skipCharsBack(max, 0x23, pos); // #
	  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
	    max = tmp;
	  }

	  state.line = startLine + 1;

	  token        = state.push('heading_open', 'h' + String(level), 1);
	  token.markup = '########'.slice(0, level);
	  token.map    = [ startLine, state.line ];

	  token          = state.push('inline', '', 0);
	  token.content  = state.src.slice(pos, max).trim();
	  token.map      = [ startLine, state.line ];
	  token.children = [];

	  token        = state.push('heading_close', 'h' + String(level), -1);
	  token.markup = '########'.slice(0, level);

	  return true;
	};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

	// lheading (---, ===)

	'use strict';


	module.exports = function lheading(state, startLine, endLine/*, silent*/) {
	  var content, terminate, i, l, token, pos, max, level, marker,
	      nextLine = startLine + 1, oldParentType,
	      terminatorRules = state.md.block.ruler.getRules('paragraph');

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  oldParentType = state.parentType;
	  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

	  // jump line-by-line until empty one or EOF
	  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

	    //
	    // Check for underline in setext header
	    //
	    if (state.sCount[nextLine] >= state.blkIndent) {
	      pos = state.bMarks[nextLine] + state.tShift[nextLine];
	      max = state.eMarks[nextLine];

	      if (pos < max) {
	        marker = state.src.charCodeAt(pos);

	        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
	          pos = state.skipChars(pos, marker);
	          pos = state.skipSpaces(pos);

	          if (pos >= max) {
	            level = (marker === 0x3D/* = */ ? 1 : 2);
	            break;
	          }
	        }
	      }
	    }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) { continue; }

	    // Some tags can terminate paragraph without empty line.
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }
	  }

	  if (!level) {
	    // Didn't find valid underline
	    return false;
	  }

	  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

	  state.line = nextLine + 1;

	  token          = state.push('heading_open', 'h' + String(level), 1);
	  token.markup   = String.fromCharCode(marker);
	  token.map      = [ startLine, state.line ];

	  token          = state.push('inline', '', 0);
	  token.content  = content;
	  token.map      = [ startLine, state.line - 1 ];
	  token.children = [];

	  token          = state.push('heading_close', 'h' + String(level), -1);
	  token.markup   = String.fromCharCode(marker);

	  state.parentType = oldParentType;

	  return true;
	};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	// HTML block

	'use strict';


	var block_names = __webpack_require__(93);
	var HTML_OPEN_CLOSE_TAG_RE = __webpack_require__(94).HTML_OPEN_CLOSE_TAG_RE;

	// An array of opening and corresponding closing sequences for html tags,
	// last argument defines whether it can terminate a paragraph or not
	//
	var HTML_SEQUENCES = [
	  [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ],
	  [ /^<!--/,        /-->/,   true ],
	  [ /^<\?/,         /\?>/,   true ],
	  [ /^<![A-Z]/,     />/,     true ],
	  [ /^<!\[CDATA\[/, /\]\]>/, true ],
	  [ new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
	  [ new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),  /^$/, false ]
	];


	module.exports = function html_block(state, startLine, endLine, silent) {
	  var i, nextLine, token, lineText,
	      pos = state.bMarks[startLine] + state.tShift[startLine],
	      max = state.eMarks[startLine];

	  // if it's indented more than 3 spaces, it should be a code block
	  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

	  if (!state.md.options.html) { return false; }

	  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

	  lineText = state.src.slice(pos, max);

	  for (i = 0; i < HTML_SEQUENCES.length; i++) {
	    if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
	  }

	  if (i === HTML_SEQUENCES.length) { return false; }

	  if (silent) {
	    // true if this sequence can be a terminator, false otherwise
	    return HTML_SEQUENCES[i][2];
	  }

	  nextLine = startLine + 1;

	  // If we are here - we detected HTML block.
	  // Let's roll down till block end.
	  if (!HTML_SEQUENCES[i][1].test(lineText)) {
	    for (; nextLine < endLine; nextLine++) {
	      if (state.sCount[nextLine] < state.blkIndent) { break; }

	      pos = state.bMarks[nextLine] + state.tShift[nextLine];
	      max = state.eMarks[nextLine];
	      lineText = state.src.slice(pos, max);

	      if (HTML_SEQUENCES[i][1].test(lineText)) {
	        if (lineText.length !== 0) { nextLine++; }
	        break;
	      }
	    }
	  }

	  state.line = nextLine;

	  token         = state.push('html_block', '', 0);
	  token.map     = [ startLine, nextLine ];
	  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

	  return true;
	};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

	// List of valid html blocks names, accorting to commonmark spec
	// http://jgm.github.io/CommonMark/spec.html#html-blocks

	'use strict';


	module.exports = [
	  'address',
	  'article',
	  'aside',
	  'base',
	  'basefont',
	  'blockquote',
	  'body',
	  'caption',
	  'center',
	  'col',
	  'colgroup',
	  'dd',
	  'details',
	  'dialog',
	  'dir',
	  'div',
	  'dl',
	  'dt',
	  'fieldset',
	  'figcaption',
	  'figure',
	  'footer',
	  'form',
	  'frame',
	  'frameset',
	  'h1',
	  'h2',
	  'h3',
	  'h4',
	  'h5',
	  'h6',
	  'head',
	  'header',
	  'hr',
	  'html',
	  'iframe',
	  'legend',
	  'li',
	  'link',
	  'main',
	  'menu',
	  'menuitem',
	  'meta',
	  'nav',
	  'noframes',
	  'ol',
	  'optgroup',
	  'option',
	  'p',
	  'param',
	  'pre',
	  'section',
	  'source',
	  'title',
	  'summary',
	  'table',
	  'tbody',
	  'td',
	  'tfoot',
	  'th',
	  'thead',
	  'title',
	  'tr',
	  'track',
	  'ul'
	];


/***/ }),
/* 94 */
/***/ (function(module, exports) {

	// Regexps to match html elements

	'use strict';

	var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

	var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
	var single_quoted = "'[^']*'";
	var double_quoted = '"[^"]*"';

	var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

	var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

	var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

	var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
	var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
	var processing  = '<[?].*?[?]>';
	var declaration = '<![A-Z]+\\s+[^>]*>';
	var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

	var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
	                        '|' + processing + '|' + declaration + '|' + cdata + ')');
	var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

	module.exports.HTML_TAG_RE = HTML_TAG_RE;
	module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;


/***/ }),
/* 95 */
/***/ (function(module, exports) {

	// Paragraph

	'use strict';


	module.exports = function paragraph(state, startLine/*, endLine*/) {
	  var content, terminate, i, l, token, oldParentType,
	      nextLine = startLine + 1,
	      terminatorRules = state.md.block.ruler.getRules('paragraph'),
	      endLine = state.lineMax;

	  oldParentType = state.parentType;
	  state.parentType = 'paragraph';

	  // jump line-by-line until empty one or EOF
	  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
	    // this would be a code block normally, but after paragraph
	    // it's considered a lazy continuation regardless of what's there
	    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

	    // quirk for blockquotes, this line should already be checked by that rule
	    if (state.sCount[nextLine] < 0) { continue; }

	    // Some tags can terminate paragraph without empty line.
	    terminate = false;
	    for (i = 0, l = terminatorRules.length; i < l; i++) {
	      if (terminatorRules[i](state, nextLine, endLine, true)) {
	        terminate = true;
	        break;
	      }
	    }
	    if (terminate) { break; }
	  }

	  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

	  state.line = nextLine;

	  token          = state.push('paragraph_open', 'p', 1);
	  token.map      = [ startLine, state.line ];

	  token          = state.push('inline', '', 0);
	  token.content  = content;
	  token.map      = [ startLine, state.line ];
	  token.children = [];

	  token          = state.push('paragraph_close', 'p', -1);

	  state.parentType = oldParentType;

	  return true;
	};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	// Parser state class

	'use strict';

	var Token = __webpack_require__(81);
	var isSpace = __webpack_require__(53).isSpace;


	function StateBlock(src, md, env, tokens) {
	  var ch, s, start, pos, len, indent, offset, indent_found;

	  this.src = src;

	  // link to parser instance
	  this.md     = md;

	  this.env = env;

	  //
	  // Internal state vartiables
	  //

	  this.tokens = tokens;

	  this.bMarks = [];  // line begin offsets for fast jumps
	  this.eMarks = [];  // line end offsets for fast jumps
	  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
	  this.sCount = [];  // indents for each line (tabs expanded)

	  // An amount of virtual spaces (tabs expanded) between beginning
	  // of each line (bMarks) and real beginning of that line.
	  //
	  // It exists only as a hack because blockquotes override bMarks
	  // losing information in the process.
	  //
	  // It's used only when expanding tabs, you can think about it as
	  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
	  // means first tab should be expanded to 4-21%4 === 3 spaces.
	  //
	  this.bsCount = [];

	  // block parser variables
	  this.blkIndent  = 0; // required block content indent
	                       // (for example, if we are in list)
	  this.line       = 0; // line index in src
	  this.lineMax    = 0; // lines count
	  this.tight      = false;  // loose/tight mode for lists
	  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)

	  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
	  // used in lists to determine if they interrupt a paragraph
	  this.parentType = 'root';

	  this.level = 0;

	  // renderer
	  this.result = '';

	  // Create caches
	  // Generate markers.
	  s = this.src;
	  indent_found = false;

	  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
	    ch = s.charCodeAt(pos);

	    if (!indent_found) {
	      if (isSpace(ch)) {
	        indent++;

	        if (ch === 0x09) {
	          offset += 4 - offset % 4;
	        } else {
	          offset++;
	        }
	        continue;
	      } else {
	        indent_found = true;
	      }
	    }

	    if (ch === 0x0A || pos === len - 1) {
	      if (ch !== 0x0A) { pos++; }
	      this.bMarks.push(start);
	      this.eMarks.push(pos);
	      this.tShift.push(indent);
	      this.sCount.push(offset);
	      this.bsCount.push(0);

	      indent_found = false;
	      indent = 0;
	      offset = 0;
	      start = pos + 1;
	    }
	  }

	  // Push fake entry to simplify cache bounds checks
	  this.bMarks.push(s.length);
	  this.eMarks.push(s.length);
	  this.tShift.push(0);
	  this.sCount.push(0);
	  this.bsCount.push(0);

	  this.lineMax = this.bMarks.length - 1; // don't count last fake line
	}

	// Push new token to "stream".
	//
	StateBlock.prototype.push = function (type, tag, nesting) {
	  var token = new Token(type, tag, nesting);
	  token.block = true;

	  if (nesting < 0) { this.level--; }
	  token.level = this.level;
	  if (nesting > 0) { this.level++; }

	  this.tokens.push(token);
	  return token;
	};

	StateBlock.prototype.isEmpty = function isEmpty(line) {
	  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
	};

	StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
	  for (var max = this.lineMax; from < max; from++) {
	    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
	      break;
	    }
	  }
	  return from;
	};

	// Skip spaces from given position.
	StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
	  var ch;

	  for (var max = this.src.length; pos < max; pos++) {
	    ch = this.src.charCodeAt(pos);
	    if (!isSpace(ch)) { break; }
	  }
	  return pos;
	};

	// Skip spaces from given position in reverse.
	StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
	  if (pos <= min) { return pos; }

	  while (pos > min) {
	    if (!isSpace(this.src.charCodeAt(--pos))) { return pos + 1; }
	  }
	  return pos;
	};

	// Skip char codes from given position
	StateBlock.prototype.skipChars = function skipChars(pos, code) {
	  for (var max = this.src.length; pos < max; pos++) {
	    if (this.src.charCodeAt(pos) !== code) { break; }
	  }
	  return pos;
	};

	// Skip char codes reverse from given position - 1
	StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
	  if (pos <= min) { return pos; }

	  while (pos > min) {
	    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
	  }
	  return pos;
	};

	// cut lines range from source.
	StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
	  var i, lineIndent, ch, first, last, queue, lineStart,
	      line = begin;

	  if (begin >= end) {
	    return '';
	  }

	  queue = new Array(end - begin);

	  for (i = 0; line < end; line++, i++) {
	    lineIndent = 0;
	    lineStart = first = this.bMarks[line];

	    if (line + 1 < end || keepLastLF) {
	      // No need for bounds check because we have fake entry on tail.
	      last = this.eMarks[line] + 1;
	    } else {
	      last = this.eMarks[line];
	    }

	    while (first < last && lineIndent < indent) {
	      ch = this.src.charCodeAt(first);

	      if (isSpace(ch)) {
	        if (ch === 0x09) {
	          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
	        } else {
	          lineIndent++;
	        }
	      } else if (first - lineStart < this.tShift[line]) {
	        // patched tShift masked characters to look like spaces (blockquotes, list markers)
	        lineIndent++;
	      } else {
	        break;
	      }

	      first++;
	    }

	    if (lineIndent > indent) {
	      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
	      // with indent=2 becomes '  \tfoobar'
	      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
	    } else {
	      queue[i] = this.src.slice(first, last);
	    }
	  }

	  return queue.join('');
	};

	// re-export Token class to use in block rules
	StateBlock.prototype.Token = Token;


	module.exports = StateBlock;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	/** internal
	 * class ParserInline
	 *
	 * Tokenizes paragraph content.
	 **/
	'use strict';


	var Ruler           = __webpack_require__(73);


	////////////////////////////////////////////////////////////////////////////////
	// Parser rules

	var _rules = [
	  [ 'text',            __webpack_require__(98) ],
	  [ 'newline',         __webpack_require__(99) ],
	  [ 'escape',          __webpack_require__(100) ],
	  [ 'backticks',       __webpack_require__(101) ],
	  [ 'strikethrough',   __webpack_require__(102).tokenize ],
	  [ 'emphasis',        __webpack_require__(103).tokenize ],
	  [ 'link',            __webpack_require__(104) ],
	  [ 'image',           __webpack_require__(105) ],
	  [ 'autolink',        __webpack_require__(106) ],
	  [ 'html_inline',     __webpack_require__(107) ],
	  [ 'entity',          __webpack_require__(108) ]
	];

	var _rules2 = [
	  [ 'balance_pairs',   __webpack_require__(109) ],
	  [ 'strikethrough',   __webpack_require__(102).postProcess ],
	  [ 'emphasis',        __webpack_require__(103).postProcess ],
	  [ 'text_collapse',   __webpack_require__(110) ]
	];


	/**
	 * new ParserInline()
	 **/
	function ParserInline() {
	  var i;

	  /**
	   * ParserInline#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of inline rules.
	   **/
	  this.ruler = new Ruler();

	  for (i = 0; i < _rules.length; i++) {
	    this.ruler.push(_rules[i][0], _rules[i][1]);
	  }

	  /**
	   * ParserInline#ruler2 -> Ruler
	   *
	   * [[Ruler]] instance. Second ruler used for post-processing
	   * (e.g. in emphasis-like rules).
	   **/
	  this.ruler2 = new Ruler();

	  for (i = 0; i < _rules2.length; i++) {
	    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
	  }
	}


	// Skip single token by running all rules in validation mode;
	// returns `true` if any rule reported success
	//
	ParserInline.prototype.skipToken = function (state) {
	  var ok, i, pos = state.pos,
	      rules = this.ruler.getRules(''),
	      len = rules.length,
	      maxNesting = state.md.options.maxNesting,
	      cache = state.cache;


	  if (typeof cache[pos] !== 'undefined') {
	    state.pos = cache[pos];
	    return;
	  }

	  if (state.level < maxNesting) {
	    for (i = 0; i < len; i++) {
	      // Increment state.level and decrement it later to limit recursion.
	      // It's harmless to do here, because no tokens are created. But ideally,
	      // we'd need a separate private state variable for this purpose.
	      //
	      state.level++;
	      ok = rules[i](state, true);
	      state.level--;

	      if (ok) { break; }
	    }
	  } else {
	    // Too much nesting, just skip until the end of the paragraph.
	    //
	    // NOTE: this will cause links to behave incorrectly in the following case,
	    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
	    //
	    //       [[[[[[[[[[[[[[[[[[[[[foo]()
	    //
	    // TODO: remove this workaround when CM standard will allow nested links
	    //       (we can replace it by preventing links from being parsed in
	    //       validation mode)
	    //
	    state.pos = state.posMax;
	  }

	  if (!ok) { state.pos++; }
	  cache[pos] = state.pos;
	};


	// Generate tokens for input range
	//
	ParserInline.prototype.tokenize = function (state) {
	  var ok, i,
	      rules = this.ruler.getRules(''),
	      len = rules.length,
	      end = state.posMax,
	      maxNesting = state.md.options.maxNesting;

	  while (state.pos < end) {
	    // Try all possible rules.
	    // On success, rule should:
	    //
	    // - update `state.pos`
	    // - update `state.tokens`
	    // - return true

	    if (state.level < maxNesting) {
	      for (i = 0; i < len; i++) {
	        ok = rules[i](state, false);
	        if (ok) { break; }
	      }
	    }

	    if (ok) {
	      if (state.pos >= end) { break; }
	      continue;
	    }

	    state.pending += state.src[state.pos++];
	  }

	  if (state.pending) {
	    state.pushPending();
	  }
	};


	/**
	 * ParserInline.parse(str, md, env, outTokens)
	 *
	 * Process input string and push inline tokens into `outTokens`
	 **/
	ParserInline.prototype.parse = function (str, md, env, outTokens) {
	  var i, rules, len;
	  var state = new this.State(str, md, env, outTokens);

	  this.tokenize(state);

	  rules = this.ruler2.getRules('');
	  len = rules.length;

	  for (i = 0; i < len; i++) {
	    rules[i](state);
	  }
	};


	ParserInline.prototype.State = __webpack_require__(111);


	module.exports = ParserInline;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

	// Skip text characters for text token, place those to pending buffer
	// and increment current pos

	'use strict';


	// Rule to skip pure text
	// '{}$%@~+=:' reserved for extentions

	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

	// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	function isTerminatorChar(ch) {
	  switch (ch) {
	    case 0x0A/* \n */:
	    case 0x21/* ! */:
	    case 0x23/* # */:
	    case 0x24/* $ */:
	    case 0x25/* % */:
	    case 0x26/* & */:
	    case 0x2A/* * */:
	    case 0x2B/* + */:
	    case 0x2D/* - */:
	    case 0x3A/* : */:
	    case 0x3C/* < */:
	    case 0x3D/* = */:
	    case 0x3E/* > */:
	    case 0x40/* @ */:
	    case 0x5B/* [ */:
	    case 0x5C/* \ */:
	    case 0x5D/* ] */:
	    case 0x5E/* ^ */:
	    case 0x5F/* _ */:
	    case 0x60/* ` */:
	    case 0x7B/* { */:
	    case 0x7D/* } */:
	    case 0x7E/* ~ */:
	      return true;
	    default:
	      return false;
	  }
	}

	module.exports = function text(state, silent) {
	  var pos = state.pos;

	  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
	    pos++;
	  }

	  if (pos === state.pos) { return false; }

	  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

	  state.pos = pos;

	  return true;
	};

	// Alternative implementation, for memory.
	//
	// It costs 10% of performance, but allows extend terminators list, if place it
	// to `ParcerInline` property. Probably, will switch to it sometime, such
	// flexibility required.

	/*
	var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

	module.exports = function text(state, silent) {
	  var pos = state.pos,
	      idx = state.src.slice(pos).search(TERMINATOR_RE);

	  // first char is terminator -> empty text
	  if (idx === 0) { return false; }

	  // no terminator -> text till end of string
	  if (idx < 0) {
	    if (!silent) { state.pending += state.src.slice(pos); }
	    state.pos = state.src.length;
	    return true;
	  }

	  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

	  state.pos += idx;

	  return true;
	};*/


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	// Proceess '\n'

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;


	module.exports = function newline(state, silent) {
	  var pmax, max, pos = state.pos;

	  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

	  pmax = state.pending.length - 1;
	  max = state.posMax;

	  // '  \n' -> hardbreak
	  // Lookup in pending chars is bad practice! Don't copy to other rules!
	  // Pending string is stored in concat mode, indexed lookups will cause
	  // convertion to flat mode.
	  if (!silent) {
	    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
	      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
	        state.pending = state.pending.replace(/ +$/, '');
	        state.push('hardbreak', 'br', 0);
	      } else {
	        state.pending = state.pending.slice(0, -1);
	        state.push('softbreak', 'br', 0);
	      }

	    } else {
	      state.push('softbreak', 'br', 0);
	    }
	  }

	  pos++;

	  // skip heading spaces for next line
	  while (pos < max && isSpace(state.src.charCodeAt(pos))) { pos++; }

	  state.pos = pos;
	  return true;
	};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	// Proceess escaped chars and hardbreaks

	'use strict';

	var isSpace = __webpack_require__(53).isSpace;

	var ESCAPED = [];

	for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

	'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
	  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });


	module.exports = function escape(state, silent) {
	  var ch, pos = state.pos, max = state.posMax;

	  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

	  pos++;

	  if (pos < max) {
	    ch = state.src.charCodeAt(pos);

	    if (ch < 256 && ESCAPED[ch] !== 0) {
	      if (!silent) { state.pending += state.src[pos]; }
	      state.pos += 2;
	      return true;
	    }

	    if (ch === 0x0A) {
	      if (!silent) {
	        state.push('hardbreak', 'br', 0);
	      }

	      pos++;
	      // skip leading whitespaces from next line
	      while (pos < max) {
	        ch = state.src.charCodeAt(pos);
	        if (!isSpace(ch)) { break; }
	        pos++;
	      }

	      state.pos = pos;
	      return true;
	    }
	  }

	  if (!silent) { state.pending += '\\'; }
	  state.pos++;
	  return true;
	};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

	// Parse backticks

	'use strict';

	module.exports = function backtick(state, silent) {
	  var start, max, marker, matchStart, matchEnd, token,
	      pos = state.pos,
	      ch = state.src.charCodeAt(pos);

	  if (ch !== 0x60/* ` */) { return false; }

	  start = pos;
	  pos++;
	  max = state.posMax;

	  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

	  marker = state.src.slice(start, pos);

	  matchStart = matchEnd = pos;

	  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
	    matchEnd = matchStart + 1;

	    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

	    if (matchEnd - matchStart === marker.length) {
	      if (!silent) {
	        token         = state.push('code_inline', 'code', 0);
	        token.markup  = marker;
	        token.content = state.src.slice(pos, matchStart)
	                                 .replace(/[ \n]+/g, ' ')
	                                 .trim();
	      }
	      state.pos = matchEnd;
	      return true;
	    }
	  }

	  if (!silent) { state.pending += marker; }
	  state.pos += marker.length;
	  return true;
	};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

	// ~~strike through~~
	//
	'use strict';


	// Insert each marker as a separate text token, and add it to delimiter list
	//
	module.exports.tokenize = function strikethrough(state, silent) {
	  var i, scanned, token, len, ch,
	      start = state.pos,
	      marker = state.src.charCodeAt(start);

	  if (silent) { return false; }

	  if (marker !== 0x7E/* ~ */) { return false; }

	  scanned = state.scanDelims(state.pos, true);
	  len = scanned.length;
	  ch = String.fromCharCode(marker);

	  if (len < 2) { return false; }

	  if (len % 2) {
	    token         = state.push('text', '', 0);
	    token.content = ch;
	    len--;
	  }

	  for (i = 0; i < len; i += 2) {
	    token         = state.push('text', '', 0);
	    token.content = ch + ch;

	    state.delimiters.push({
	      marker: marker,
	      jump:   i,
	      token:  state.tokens.length - 1,
	      level:  state.level,
	      end:    -1,
	      open:   scanned.can_open,
	      close:  scanned.can_close
	    });
	  }

	  state.pos += scanned.length;

	  return true;
	};


	// Walk through delimiter list and replace text tokens with tags
	//
	module.exports.postProcess = function strikethrough(state) {
	  var i, j,
	      startDelim,
	      endDelim,
	      token,
	      loneMarkers = [],
	      delimiters = state.delimiters,
	      max = state.delimiters.length;

	  for (i = 0; i < max; i++) {
	    startDelim = delimiters[i];

	    if (startDelim.marker !== 0x7E/* ~ */) {
	      continue;
	    }

	    if (startDelim.end === -1) {
	      continue;
	    }

	    endDelim = delimiters[startDelim.end];

	    token         = state.tokens[startDelim.token];
	    token.type    = 's_open';
	    token.tag     = 's';
	    token.nesting = 1;
	    token.markup  = '~~';
	    token.content = '';

	    token         = state.tokens[endDelim.token];
	    token.type    = 's_close';
	    token.tag     = 's';
	    token.nesting = -1;
	    token.markup  = '~~';
	    token.content = '';

	    if (state.tokens[endDelim.token - 1].type === 'text' &&
	        state.tokens[endDelim.token - 1].content === '~') {

	      loneMarkers.push(endDelim.token - 1);
	    }
	  }

	  // If a marker sequence has an odd number of characters, it's splitted
	  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
	  // start of the sequence.
	  //
	  // So, we have to move all those markers after subsequent s_close tags.
	  //
	  while (loneMarkers.length) {
	    i = loneMarkers.pop();
	    j = i + 1;

	    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
	      j++;
	    }

	    j--;

	    if (i !== j) {
	      token = state.tokens[j];
	      state.tokens[j] = state.tokens[i];
	      state.tokens[i] = token;
	    }
	  }
	};


/***/ }),
/* 103 */
/***/ (function(module, exports) {

	// Process *this* and _that_
	//
	'use strict';


	// Insert each marker as a separate text token, and add it to delimiter list
	//
	module.exports.tokenize = function emphasis(state, silent) {
	  var i, scanned, token,
	      start = state.pos,
	      marker = state.src.charCodeAt(start);

	  if (silent) { return false; }

	  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

	  scanned = state.scanDelims(state.pos, marker === 0x2A);

	  for (i = 0; i < scanned.length; i++) {
	    token         = state.push('text', '', 0);
	    token.content = String.fromCharCode(marker);

	    state.delimiters.push({
	      // Char code of the starting marker (number).
	      //
	      marker: marker,

	      // Total length of these series of delimiters.
	      //
	      length: scanned.length,

	      // An amount of characters before this one that's equivalent to
	      // current one. In plain English: if this delimiter does not open
	      // an emphasis, neither do previous `jump` characters.
	      //
	      // Used to skip sequences like "*****" in one step, for 1st asterisk
	      // value will be 0, for 2nd it's 1 and so on.
	      //
	      jump:   i,

	      // A position of the token this delimiter corresponds to.
	      //
	      token:  state.tokens.length - 1,

	      // Token level.
	      //
	      level:  state.level,

	      // If this delimiter is matched as a valid opener, `end` will be
	      // equal to its position, otherwise it's `-1`.
	      //
	      end:    -1,

	      // Boolean flags that determine if this delimiter could open or close
	      // an emphasis.
	      //
	      open:   scanned.can_open,
	      close:  scanned.can_close
	    });
	  }

	  state.pos += scanned.length;

	  return true;
	};


	// Walk through delimiter list and replace text tokens with tags
	//
	module.exports.postProcess = function emphasis(state) {
	  var i,
	      startDelim,
	      endDelim,
	      token,
	      ch,
	      isStrong,
	      delimiters = state.delimiters,
	      max = state.delimiters.length;

	  for (i = 0; i < max; i++) {
	    startDelim = delimiters[i];

	    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
	      continue;
	    }

	    // Process only opening markers
	    if (startDelim.end === -1) {
	      continue;
	    }

	    endDelim = delimiters[startDelim.end];

	    // If the next delimiter has the same marker and is adjacent to this one,
	    // merge those into one strong delimiter.
	    //
	    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
	    //
	    isStrong = i + 1 < max &&
	               delimiters[i + 1].end === startDelim.end - 1 &&
	               delimiters[i + 1].token === startDelim.token + 1 &&
	               delimiters[startDelim.end - 1].token === endDelim.token - 1 &&
	               delimiters[i + 1].marker === startDelim.marker;

	    ch = String.fromCharCode(startDelim.marker);

	    token         = state.tokens[startDelim.token];
	    token.type    = isStrong ? 'strong_open' : 'em_open';
	    token.tag     = isStrong ? 'strong' : 'em';
	    token.nesting = 1;
	    token.markup  = isStrong ? ch + ch : ch;
	    token.content = '';

	    token         = state.tokens[endDelim.token];
	    token.type    = isStrong ? 'strong_close' : 'em_close';
	    token.tag     = isStrong ? 'strong' : 'em';
	    token.nesting = -1;
	    token.markup  = isStrong ? ch + ch : ch;
	    token.content = '';

	    if (isStrong) {
	      state.tokens[delimiters[i + 1].token].content = '';
	      state.tokens[delimiters[startDelim.end - 1].token].content = '';
	      i++;
	    }
	  }
	};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	// Process [link](<to> "stuff")

	'use strict';

	var normalizeReference   = __webpack_require__(53).normalizeReference;
	var isSpace              = __webpack_require__(53).isSpace;


	module.exports = function link(state, silent) {
	  var attrs,
	      code,
	      label,
	      labelEnd,
	      labelStart,
	      pos,
	      res,
	      ref,
	      title,
	      token,
	      href = '',
	      oldPos = state.pos,
	      max = state.posMax,
	      start = state.pos,
	      parseReference = true;

	  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

	  labelStart = state.pos + 1;
	  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

	  // parser failed to find ']', so it's not a valid link
	  if (labelEnd < 0) { return false; }

	  pos = labelEnd + 1;
	  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
	    //
	    // Inline link
	    //

	    // might have found a valid shortcut link, disable reference parsing
	    parseReference = false;

	    // [link](  <href>  "title"  )
	    //        ^^ skipping these spaces
	    pos++;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) { break; }
	    }
	    if (pos >= max) { return false; }

	    // [link](  <href>  "title"  )
	    //          ^^^^^^ parsing link destination
	    start = pos;
	    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	    if (res.ok) {
	      href = state.md.normalizeLink(res.str);
	      if (state.md.validateLink(href)) {
	        pos = res.pos;
	      } else {
	        href = '';
	      }
	    }

	    // [link](  <href>  "title"  )
	    //                ^^ skipping these spaces
	    start = pos;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) { break; }
	    }

	    // [link](  <href>  "title"  )
	    //                  ^^^^^^^ parsing link title
	    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	    if (pos < max && start !== pos && res.ok) {
	      title = res.str;
	      pos = res.pos;

	      // [link](  <href>  "title"  )
	      //                         ^^ skipping these spaces
	      for (; pos < max; pos++) {
	        code = state.src.charCodeAt(pos);
	        if (!isSpace(code) && code !== 0x0A) { break; }
	      }
	    } else {
	      title = '';
	    }

	    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
	      // parsing a valid shortcut link failed, fallback to reference
	      parseReference = true;
	    }
	    pos++;
	  }

	  if (parseReference) {
	    //
	    // Link reference
	    //
	    if (typeof state.env.references === 'undefined') { return false; }

	    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
	      start = pos + 1;
	      pos = state.md.helpers.parseLinkLabel(state, pos);
	      if (pos >= 0) {
	        label = state.src.slice(start, pos++);
	      } else {
	        pos = labelEnd + 1;
	      }
	    } else {
	      pos = labelEnd + 1;
	    }

	    // covers label === '' and label === undefined
	    // (collapsed reference link and shortcut reference link respectively)
	    if (!label) { label = state.src.slice(labelStart, labelEnd); }

	    ref = state.env.references[normalizeReference(label)];
	    if (!ref) {
	      state.pos = oldPos;
	      return false;
	    }
	    href = ref.href;
	    title = ref.title;
	  }

	  //
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    state.pos = labelStart;
	    state.posMax = labelEnd;

	    token        = state.push('link_open', 'a', 1);
	    token.attrs  = attrs = [ [ 'href', href ] ];
	    if (title) {
	      attrs.push([ 'title', title ]);
	    }

	    state.md.inline.tokenize(state);

	    token        = state.push('link_close', 'a', -1);
	  }

	  state.pos = pos;
	  state.posMax = max;
	  return true;
	};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	// Process ![image](<src> "title")

	'use strict';

	var normalizeReference   = __webpack_require__(53).normalizeReference;
	var isSpace              = __webpack_require__(53).isSpace;


	module.exports = function image(state, silent) {
	  var attrs,
	      code,
	      content,
	      label,
	      labelEnd,
	      labelStart,
	      pos,
	      ref,
	      res,
	      title,
	      token,
	      tokens,
	      start,
	      href = '',
	      oldPos = state.pos,
	      max = state.posMax;

	  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
	  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

	  labelStart = state.pos + 2;
	  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

	  // parser failed to find ']', so it's not a valid link
	  if (labelEnd < 0) { return false; }

	  pos = labelEnd + 1;
	  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
	    //
	    // Inline link
	    //

	    // [link](  <href>  "title"  )
	    //        ^^ skipping these spaces
	    pos++;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) { break; }
	    }
	    if (pos >= max) { return false; }

	    // [link](  <href>  "title"  )
	    //          ^^^^^^ parsing link destination
	    start = pos;
	    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	    if (res.ok) {
	      href = state.md.normalizeLink(res.str);
	      if (state.md.validateLink(href)) {
	        pos = res.pos;
	      } else {
	        href = '';
	      }
	    }

	    // [link](  <href>  "title"  )
	    //                ^^ skipping these spaces
	    start = pos;
	    for (; pos < max; pos++) {
	      code = state.src.charCodeAt(pos);
	      if (!isSpace(code) && code !== 0x0A) { break; }
	    }

	    // [link](  <href>  "title"  )
	    //                  ^^^^^^^ parsing link title
	    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	    if (pos < max && start !== pos && res.ok) {
	      title = res.str;
	      pos = res.pos;

	      // [link](  <href>  "title"  )
	      //                         ^^ skipping these spaces
	      for (; pos < max; pos++) {
	        code = state.src.charCodeAt(pos);
	        if (!isSpace(code) && code !== 0x0A) { break; }
	      }
	    } else {
	      title = '';
	    }

	    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
	      state.pos = oldPos;
	      return false;
	    }
	    pos++;
	  } else {
	    //
	    // Link reference
	    //
	    if (typeof state.env.references === 'undefined') { return false; }

	    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
	      start = pos + 1;
	      pos = state.md.helpers.parseLinkLabel(state, pos);
	      if (pos >= 0) {
	        label = state.src.slice(start, pos++);
	      } else {
	        pos = labelEnd + 1;
	      }
	    } else {
	      pos = labelEnd + 1;
	    }

	    // covers label === '' and label === undefined
	    // (collapsed reference link and shortcut reference link respectively)
	    if (!label) { label = state.src.slice(labelStart, labelEnd); }

	    ref = state.env.references[normalizeReference(label)];
	    if (!ref) {
	      state.pos = oldPos;
	      return false;
	    }
	    href = ref.href;
	    title = ref.title;
	  }

	  //
	  // We found the end of the link, and know for a fact it's a valid link;
	  // so all that's left to do is to call tokenizer.
	  //
	  if (!silent) {
	    content = state.src.slice(labelStart, labelEnd);

	    state.md.inline.parse(
	      content,
	      state.md,
	      state.env,
	      tokens = []
	    );

	    token          = state.push('image', 'img', 0);
	    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
	    token.children = tokens;
	    token.content  = content;

	    if (title) {
	      attrs.push([ 'title', title ]);
	    }
	  }

	  state.pos = pos;
	  state.posMax = max;
	  return true;
	};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

	// Process autolinks '<protocol:...>'

	'use strict';


	/*eslint max-len:0*/
	var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
	var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;


	module.exports = function autolink(state, silent) {
	  var tail, linkMatch, emailMatch, url, fullUrl, token,
	      pos = state.pos;

	  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

	  tail = state.src.slice(pos);

	  if (tail.indexOf('>') < 0) { return false; }

	  if (AUTOLINK_RE.test(tail)) {
	    linkMatch = tail.match(AUTOLINK_RE);

	    url = linkMatch[0].slice(1, -1);
	    fullUrl = state.md.normalizeLink(url);
	    if (!state.md.validateLink(fullUrl)) { return false; }

	    if (!silent) {
	      token         = state.push('link_open', 'a', 1);
	      token.attrs   = [ [ 'href', fullUrl ] ];
	      token.markup  = 'autolink';
	      token.info    = 'auto';

	      token         = state.push('text', '', 0);
	      token.content = state.md.normalizeLinkText(url);

	      token         = state.push('link_close', 'a', -1);
	      token.markup  = 'autolink';
	      token.info    = 'auto';
	    }

	    state.pos += linkMatch[0].length;
	    return true;
	  }

	  if (EMAIL_RE.test(tail)) {
	    emailMatch = tail.match(EMAIL_RE);

	    url = emailMatch[0].slice(1, -1);
	    fullUrl = state.md.normalizeLink('mailto:' + url);
	    if (!state.md.validateLink(fullUrl)) { return false; }

	    if (!silent) {
	      token         = state.push('link_open', 'a', 1);
	      token.attrs   = [ [ 'href', fullUrl ] ];
	      token.markup  = 'autolink';
	      token.info    = 'auto';

	      token         = state.push('text', '', 0);
	      token.content = state.md.normalizeLinkText(url);

	      token         = state.push('link_close', 'a', -1);
	      token.markup  = 'autolink';
	      token.info    = 'auto';
	    }

	    state.pos += emailMatch[0].length;
	    return true;
	  }

	  return false;
	};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	// Process html tags

	'use strict';


	var HTML_TAG_RE = __webpack_require__(94).HTML_TAG_RE;


	function isLetter(ch) {
	  /*eslint no-bitwise:0*/
	  var lc = ch | 0x20; // to lower case
	  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
	}


	module.exports = function html_inline(state, silent) {
	  var ch, match, max, token,
	      pos = state.pos;

	  if (!state.md.options.html) { return false; }

	  // Check start
	  max = state.posMax;
	  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
	      pos + 2 >= max) {
	    return false;
	  }

	  // Quick fail on second char
	  ch = state.src.charCodeAt(pos + 1);
	  if (ch !== 0x21/* ! */ &&
	      ch !== 0x3F/* ? */ &&
	      ch !== 0x2F/* / */ &&
	      !isLetter(ch)) {
	    return false;
	  }

	  match = state.src.slice(pos).match(HTML_TAG_RE);
	  if (!match) { return false; }

	  if (!silent) {
	    token         = state.push('html_inline', '', 0);
	    token.content = state.src.slice(pos, pos + match[0].length);
	  }
	  state.pos += match[0].length;
	  return true;
	};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	// Process html entity - &#123;, &#xAF;, &quot;, ...

	'use strict';

	var entities          = __webpack_require__(54);
	var has               = __webpack_require__(53).has;
	var isValidEntityCode = __webpack_require__(53).isValidEntityCode;
	var fromCodePoint     = __webpack_require__(53).fromCodePoint;


	var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
	var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


	module.exports = function entity(state, silent) {
	  var ch, code, match, pos = state.pos, max = state.posMax;

	  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

	  if (pos + 1 < max) {
	    ch = state.src.charCodeAt(pos + 1);

	    if (ch === 0x23 /* # */) {
	      match = state.src.slice(pos).match(DIGITAL_RE);
	      if (match) {
	        if (!silent) {
	          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
	          state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
	        }
	        state.pos += match[0].length;
	        return true;
	      }
	    } else {
	      match = state.src.slice(pos).match(NAMED_RE);
	      if (match) {
	        if (has(entities, match[1])) {
	          if (!silent) { state.pending += entities[match[1]]; }
	          state.pos += match[0].length;
	          return true;
	        }
	      }
	    }
	  }

	  if (!silent) { state.pending += '&'; }
	  state.pos++;
	  return true;
	};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

	// For each opening emphasis-like marker find a matching closing one
	//
	'use strict';


	module.exports = function link_pairs(state) {
	  var i, j, lastDelim, currDelim,
	      delimiters = state.delimiters,
	      max = state.delimiters.length;

	  for (i = 0; i < max; i++) {
	    lastDelim = delimiters[i];

	    if (!lastDelim.close) { continue; }

	    j = i - lastDelim.jump - 1;

	    while (j >= 0) {
	      currDelim = delimiters[j];

	      if (currDelim.open &&
	          currDelim.marker === lastDelim.marker &&
	          currDelim.end < 0 &&
	          currDelim.level === lastDelim.level) {

	        // typeofs are for backward compatibility with plugins
	        var odd_match = (currDelim.close || lastDelim.open) &&
	                        typeof currDelim.length !== 'undefined' &&
	                        typeof lastDelim.length !== 'undefined' &&
	                        (currDelim.length + lastDelim.length) % 3 === 0;

	        if (!odd_match) {
	          lastDelim.jump = i - j;
	          lastDelim.open = false;
	          currDelim.end  = i;
	          currDelim.jump = 0;
	          break;
	        }
	      }

	      j -= currDelim.jump + 1;
	    }
	  }
	};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

	// Merge adjacent text nodes into one, and re-calculate all token levels
	//
	'use strict';


	module.exports = function text_collapse(state) {
	  var curr, last,
	      level = 0,
	      tokens = state.tokens,
	      max = state.tokens.length;

	  for (curr = last = 0; curr < max; curr++) {
	    // re-calculate levels
	    level += tokens[curr].nesting;
	    tokens[curr].level = level;

	    if (tokens[curr].type === 'text' &&
	        curr + 1 < max &&
	        tokens[curr + 1].type === 'text') {

	      // collapse two adjacent text nodes
	      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
	    } else {
	      if (curr !== last) { tokens[last] = tokens[curr]; }

	      last++;
	    }
	  }

	  if (curr !== last) {
	    tokens.length = last;
	  }
	};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	// Inline parser state

	'use strict';


	var Token          = __webpack_require__(81);
	var isWhiteSpace   = __webpack_require__(53).isWhiteSpace;
	var isPunctChar    = __webpack_require__(53).isPunctChar;
	var isMdAsciiPunct = __webpack_require__(53).isMdAsciiPunct;


	function StateInline(src, md, env, outTokens) {
	  this.src = src;
	  this.env = env;
	  this.md = md;
	  this.tokens = outTokens;

	  this.pos = 0;
	  this.posMax = this.src.length;
	  this.level = 0;
	  this.pending = '';
	  this.pendingLevel = 0;

	  this.cache = {};        // Stores { start: end } pairs. Useful for backtrack
	                          // optimization of pairs parse (emphasis, strikes).

	  this.delimiters = [];   // Emphasis-like delimiters
	}


	// Flush pending text
	//
	StateInline.prototype.pushPending = function () {
	  var token = new Token('text', '', 0);
	  token.content = this.pending;
	  token.level = this.pendingLevel;
	  this.tokens.push(token);
	  this.pending = '';
	  return token;
	};


	// Push new token to "stream".
	// If pending text exists - flush it as text token
	//
	StateInline.prototype.push = function (type, tag, nesting) {
	  if (this.pending) {
	    this.pushPending();
	  }

	  var token = new Token(type, tag, nesting);

	  if (nesting < 0) { this.level--; }
	  token.level = this.level;
	  if (nesting > 0) { this.level++; }

	  this.pendingLevel = this.level;
	  this.tokens.push(token);
	  return token;
	};


	// Scan a sequence of emphasis-like markers, and determine whether
	// it can start an emphasis sequence or end an emphasis sequence.
	//
	//  - start - position to scan from (it should point at a valid marker);
	//  - canSplitWord - determine if these markers can be found inside a word
	//
	StateInline.prototype.scanDelims = function (start, canSplitWord) {
	  var pos = start, lastChar, nextChar, count, can_open, can_close,
	      isLastWhiteSpace, isLastPunctChar,
	      isNextWhiteSpace, isNextPunctChar,
	      left_flanking = true,
	      right_flanking = true,
	      max = this.posMax,
	      marker = this.src.charCodeAt(start);

	  // treat beginning of the line as a whitespace
	  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

	  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

	  count = pos - start;

	  // treat end of the line as a whitespace
	  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

	  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));

	  isLastWhiteSpace = isWhiteSpace(lastChar);
	  isNextWhiteSpace = isWhiteSpace(nextChar);

	  if (isNextWhiteSpace) {
	    left_flanking = false;
	  } else if (isNextPunctChar) {
	    if (!(isLastWhiteSpace || isLastPunctChar)) {
	      left_flanking = false;
	    }
	  }

	  if (isLastWhiteSpace) {
	    right_flanking = false;
	  } else if (isLastPunctChar) {
	    if (!(isNextWhiteSpace || isNextPunctChar)) {
	      right_flanking = false;
	    }
	  }

	  if (!canSplitWord) {
	    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
	    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
	  } else {
	    can_open  = left_flanking;
	    can_close = right_flanking;
	  }

	  return {
	    can_open:  can_open,
	    can_close: can_close,
	    length:    count
	  };
	};


	// re-export Token class to use in block rules
	StateInline.prototype.Token = Token;


	module.exports = StateInline;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	////////////////////////////////////////////////////////////////////////////////
	// Helpers

	// Merge objects
	//
	function assign(obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);

	  sources.forEach(function (source) {
	    if (!source) { return; }

	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });

	  return obj;
	}

	function _class(obj) { return Object.prototype.toString.call(obj); }
	function isString(obj) { return _class(obj) === '[object String]'; }
	function isObject(obj) { return _class(obj) === '[object Object]'; }
	function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
	function isFunction(obj) { return _class(obj) === '[object Function]'; }


	function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

	////////////////////////////////////////////////////////////////////////////////


	var defaultOptions = {
	  fuzzyLink: true,
	  fuzzyEmail: true,
	  fuzzyIP: false
	};


	function isOptionsObj(obj) {
	  return Object.keys(obj || {}).reduce(function (acc, k) {
	    return acc || defaultOptions.hasOwnProperty(k);
	  }, false);
	}


	var defaultSchemas = {
	  'http:': {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.http) {
	        // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.http =  new RegExp(
	          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
	        );
	      }
	      if (self.re.http.test(tail)) {
	        return tail.match(self.re.http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'https:':  'http:',
	  'ftp:':    'http:',
	  '//':      {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.no_http) {
	      // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.no_http =  new RegExp(
	          '^' +
	          self.re.src_auth +
	          // Don't allow single-level domains, because of false positives like '//test'
	          // with code comments
	          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
	          self.re.src_port +
	          self.re.src_host_terminator +
	          self.re.src_path,

	          'i'
	        );
	      }

	      if (self.re.no_http.test(tail)) {
	        // should not be `://` & `///`, that protects from errors in protocol name
	        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
	        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
	        return tail.match(self.re.no_http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'mailto:': {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.mailto) {
	        self.re.mailto =  new RegExp(
	          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
	        );
	      }
	      if (self.re.mailto.test(tail)) {
	        return tail.match(self.re.mailto)[0].length;
	      }
	      return 0;
	    }
	  }
	};

	/*eslint-disable max-len*/

	// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
	var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

	// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
	var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

	/*eslint-enable max-len*/

	////////////////////////////////////////////////////////////////////////////////

	function resetScanCache(self) {
	  self.__index__ = -1;
	  self.__text_cache__   = '';
	}

	function createValidator(re) {
	  return function (text, pos) {
	    var tail = text.slice(pos);

	    if (re.test(tail)) {
	      return tail.match(re)[0].length;
	    }
	    return 0;
	  };
	}

	function createNormalizer() {
	  return function (match, self) {
	    self.normalize(match);
	  };
	}

	// Schemas compiler. Build regexps.
	//
	function compile(self) {

	  // Load & clone RE patterns.
	  var re = self.re = __webpack_require__(113)(self.__opts__);

	  // Define dynamic patterns
	  var tlds = self.__tlds__.slice();

	  self.onCompile();

	  if (!self.__tlds_replaced__) {
	    tlds.push(tlds_2ch_src_re);
	  }
	  tlds.push(re.src_xn);

	  re.src_tlds = tlds.join('|');

	  function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

	  re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
	  re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
	  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
	  re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

	  //
	  // Compile each schema
	  //

	  var aliases = [];

	  self.__compiled__ = {}; // Reset compiled data

	  function schemaError(name, val) {
	    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
	  }

	  Object.keys(self.__schemas__).forEach(function (name) {
	    var val = self.__schemas__[name];

	    // skip disabled methods
	    if (val === null) { return; }

	    var compiled = { validate: null, link: null };

	    self.__compiled__[name] = compiled;

	    if (isObject(val)) {
	      if (isRegExp(val.validate)) {
	        compiled.validate = createValidator(val.validate);
	      } else if (isFunction(val.validate)) {
	        compiled.validate = val.validate;
	      } else {
	        schemaError(name, val);
	      }

	      if (isFunction(val.normalize)) {
	        compiled.normalize = val.normalize;
	      } else if (!val.normalize) {
	        compiled.normalize = createNormalizer();
	      } else {
	        schemaError(name, val);
	      }

	      return;
	    }

	    if (isString(val)) {
	      aliases.push(name);
	      return;
	    }

	    schemaError(name, val);
	  });

	  //
	  // Compile postponed aliases
	  //

	  aliases.forEach(function (alias) {
	    if (!self.__compiled__[self.__schemas__[alias]]) {
	      // Silently fail on missed schemas to avoid errons on disable.
	      // schemaError(alias, self.__schemas__[alias]);
	      return;
	    }

	    self.__compiled__[alias].validate =
	      self.__compiled__[self.__schemas__[alias]].validate;
	    self.__compiled__[alias].normalize =
	      self.__compiled__[self.__schemas__[alias]].normalize;
	  });

	  //
	  // Fake record for guessed links
	  //
	  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

	  //
	  // Build schema condition
	  //
	  var slist = Object.keys(self.__compiled__)
	                      .filter(function (name) {
	                        // Filter disabled & fake schemas
	                        return name.length > 0 && self.__compiled__[name];
	                      })
	                      .map(escapeRE)
	                      .join('|');
	  // (?!_) cause 1.5x slowdown
	  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
	  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

	  self.re.pretest       = RegExp(
	                            '(' + self.re.schema_test.source + ')|' +
	                            '(' + self.re.host_fuzzy_test.source + ')|' +
	                            '@',
	                            'i');

	  //
	  // Cleanup
	  //

	  resetScanCache(self);
	}

	/**
	 * class Match
	 *
	 * Match result. Single element of array, returned by [[LinkifyIt#match]]
	 **/
	function Match(self, shift) {
	  var start = self.__index__,
	      end   = self.__last_index__,
	      text  = self.__text_cache__.slice(start, end);

	  /**
	   * Match#schema -> String
	   *
	   * Prefix (protocol) for matched string.
	   **/
	  this.schema    = self.__schema__.toLowerCase();
	  /**
	   * Match#index -> Number
	   *
	   * First position of matched string.
	   **/
	  this.index     = start + shift;
	  /**
	   * Match#lastIndex -> Number
	   *
	   * Next position after matched string.
	   **/
	  this.lastIndex = end + shift;
	  /**
	   * Match#raw -> String
	   *
	   * Matched string.
	   **/
	  this.raw       = text;
	  /**
	   * Match#text -> String
	   *
	   * Notmalized text of matched string.
	   **/
	  this.text      = text;
	  /**
	   * Match#url -> String
	   *
	   * Normalized url of matched string.
	   **/
	  this.url       = text;
	}

	function createMatch(self, shift) {
	  var match = new Match(self, shift);

	  self.__compiled__[match.schema].normalize(match, self);

	  return match;
	}


	/**
	 * class LinkifyIt
	 **/

	/**
	 * new LinkifyIt(schemas, options)
	 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Creates new linkifier instance with optional additional schemas.
	 * Can be called without `new` keyword for convenience.
	 *
	 * By default understands:
	 *
	 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
	 * - "fuzzy" links and emails (example.com, foo@bar.com).
	 *
	 * `schemas` is an object, where each key/value describes protocol/rule:
	 *
	 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
	 *   for example). `linkify-it` makes shure that prefix is not preceeded with
	 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
	 * - __value__ - rule to check tail after link prefix
	 *   - _String_ - just alias to existing rule
	 *   - _Object_
	 *     - _validate_ - validator function (should return matched length on success),
	 *       or `RegExp`.
	 *     - _normalize_ - optional function to normalize text & url of matched result
	 *       (for example, for @twitter mentions).
	 *
	 * `options`:
	 *
	 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
	 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
	 *   like version numbers. Default `false`.
	 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
	 *
	 **/
	function LinkifyIt(schemas, options) {
	  if (!(this instanceof LinkifyIt)) {
	    return new LinkifyIt(schemas, options);
	  }

	  if (!options) {
	    if (isOptionsObj(schemas)) {
	      options = schemas;
	      schemas = {};
	    }
	  }

	  this.__opts__           = assign({}, defaultOptions, options);

	  // Cache last tested result. Used to skip repeating steps on next `match` call.
	  this.__index__          = -1;
	  this.__last_index__     = -1; // Next scan position
	  this.__schema__         = '';
	  this.__text_cache__     = '';

	  this.__schemas__        = assign({}, defaultSchemas, schemas);
	  this.__compiled__       = {};

	  this.__tlds__           = tlds_default;
	  this.__tlds_replaced__  = false;

	  this.re = {};

	  compile(this);
	}


	/** chainable
	 * LinkifyIt#add(schema, definition)
	 * - schema (String): rule name (fixed pattern prefix)
	 * - definition (String|RegExp|Object): schema definition
	 *
	 * Add new rule definition. See constructor description for details.
	 **/
	LinkifyIt.prototype.add = function add(schema, definition) {
	  this.__schemas__[schema] = definition;
	  compile(this);
	  return this;
	};


	/** chainable
	 * LinkifyIt#set(options)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Set recognition options for links without schema.
	 **/
	LinkifyIt.prototype.set = function set(options) {
	  this.__opts__ = assign(this.__opts__, options);
	  return this;
	};


	/**
	 * LinkifyIt#test(text) -> Boolean
	 *
	 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
	 **/
	LinkifyIt.prototype.test = function test(text) {
	  // Reset scan cache
	  this.__text_cache__ = text;
	  this.__index__      = -1;

	  if (!text.length) { return false; }

	  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

	  // try to scan for link with schema - that's the most simple rule
	  if (this.re.schema_test.test(text)) {
	    re = this.re.schema_search;
	    re.lastIndex = 0;
	    while ((m = re.exec(text)) !== null) {
	      len = this.testSchemaAt(text, m[2], re.lastIndex);
	      if (len) {
	        this.__schema__     = m[2];
	        this.__index__      = m.index + m[1].length;
	        this.__last_index__ = m.index + m[0].length + len;
	        break;
	      }
	    }
	  }

	  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
	    // guess schemaless links
	    tld_pos = text.search(this.re.host_fuzzy_test);
	    if (tld_pos >= 0) {
	      // if tld is located after found link - no need to check fuzzy pattern
	      if (this.__index__ < 0 || tld_pos < this.__index__) {
	        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

	          shift = ml.index + ml[1].length;

	          if (this.__index__ < 0 || shift < this.__index__) {
	            this.__schema__     = '';
	            this.__index__      = shift;
	            this.__last_index__ = ml.index + ml[0].length;
	          }
	        }
	      }
	    }
	  }

	  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
	    // guess schemaless emails
	    at_pos = text.indexOf('@');
	    if (at_pos >= 0) {
	      // We can't skip this check, because this cases are possible:
	      // 192.168.1.1@gmail.com, my.in@example.com
	      if ((me = text.match(this.re.email_fuzzy)) !== null) {

	        shift = me.index + me[1].length;
	        next  = me.index + me[0].length;

	        if (this.__index__ < 0 || shift < this.__index__ ||
	            (shift === this.__index__ && next > this.__last_index__)) {
	          this.__schema__     = 'mailto:';
	          this.__index__      = shift;
	          this.__last_index__ = next;
	        }
	      }
	    }
	  }

	  return this.__index__ >= 0;
	};


	/**
	 * LinkifyIt#pretest(text) -> Boolean
	 *
	 * Very quick check, that can give false positives. Returns true if link MAY BE
	 * can exists. Can be used for speed optimization, when you need to check that
	 * link NOT exists.
	 **/
	LinkifyIt.prototype.pretest = function pretest(text) {
	  return this.re.pretest.test(text);
	};


	/**
	 * LinkifyIt#testSchemaAt(text, name, position) -> Number
	 * - text (String): text to scan
	 * - name (String): rule (schema) name
	 * - position (Number): text offset to check from
	 *
	 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
	 * at given position. Returns length of found pattern (0 on fail).
	 **/
	LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
	  // If not supported schema check requested - terminate
	  if (!this.__compiled__[schema.toLowerCase()]) {
	    return 0;
	  }
	  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};


	/**
	 * LinkifyIt#match(text) -> Array|null
	 *
	 * Returns array of found link descriptions or `null` on fail. We strongly
	 * recommend to use [[LinkifyIt#test]] first, for best speed.
	 *
	 * ##### Result match description
	 *
	 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
	 *   protocol-neutral  links.
	 * - __index__ - offset of matched text
	 * - __lastIndex__ - index of next char after mathch end
	 * - __raw__ - matched text
	 * - __text__ - normalized text
	 * - __url__ - link, generated from matched text
	 **/
	LinkifyIt.prototype.match = function match(text) {
	  var shift = 0, result = [];

	  // Try to take previous element from cache, if .test() called before
	  if (this.__index__ >= 0 && this.__text_cache__ === text) {
	    result.push(createMatch(this, shift));
	    shift = this.__last_index__;
	  }

	  // Cut head if cache was used
	  var tail = shift ? text.slice(shift) : text;

	  // Scan string until end reached
	  while (this.test(tail)) {
	    result.push(createMatch(this, shift));

	    tail = tail.slice(this.__last_index__);
	    shift += this.__last_index__;
	  }

	  if (result.length) {
	    return result;
	  }

	  return null;
	};


	/** chainable
	 * LinkifyIt#tlds(list [, keepOld]) -> this
	 * - list (Array): list of tlds
	 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
	 *
	 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
	 * to avoid false positives. By default this algorythm used:
	 *
	 * - hostname with any 2-letter root zones are ok.
	 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
	 *   are ok.
	 * - encoded (`xn--...`) root zones are ok.
	 *
	 * If list is replaced, then exact match for 2-chars root zones will be checked.
	 **/
	LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
	  list = Array.isArray(list) ? list : [ list ];

	  if (!keepOld) {
	    this.__tlds__ = list.slice();
	    this.__tlds_replaced__ = true;
	    compile(this);
	    return this;
	  }

	  this.__tlds__ = this.__tlds__.concat(list)
	                                  .sort()
	                                  .filter(function (el, idx, arr) {
	                                    return el !== arr[idx - 1];
	                                  })
	                                  .reverse();

	  compile(this);
	  return this;
	};

	/**
	 * LinkifyIt#normalize(match)
	 *
	 * Default normalizer (if schema does not define it's own).
	 **/
	LinkifyIt.prototype.normalize = function normalize(match) {

	  // Do minimal possible changes by default. Need to collect feedback prior
	  // to move forward https://github.com/markdown-it/linkify-it/issues/1

	  if (!match.schema) { match.url = 'http://' + match.url; }

	  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
	    match.url = 'mailto:' + match.url;
	  }
	};


	/**
	 * LinkifyIt#onCompile()
	 *
	 * Override to modify basic RegExp-s.
	 **/
	LinkifyIt.prototype.onCompile = function onCompile() {
	};


	module.exports = LinkifyIt;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = function (opts) {
	  var re = {};

	  // Use direct extract instead of `regenerate` to reduse browserified size
	  re.src_Any = __webpack_require__(63).source;
	  re.src_Cc  = __webpack_require__(64).source;
	  re.src_Z   = __webpack_require__(66).source;
	  re.src_P   = __webpack_require__(56).source;

	  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
	  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

	  // \p{\Z\Cc} (white spaces + control)
	  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

	  // Experimental. List of chars, completely prohibited in links
	  // because can separate it from other part of text
	  var text_separators = '[><\uff5c]';

	  // All possible word characters (everything without punctuation, spaces & controls)
	  // Defined via punctuation & spaces to save space
	  // Should be something like \p{\L\N\S\M} (\w but without `_`)
	  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
	  // The same as abothe but without [0-9]
	  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

	  ////////////////////////////////////////////////////////////////////////////////

	  re.src_ip4 =

	    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

	  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
	  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

	  re.src_port =

	    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

	  re.src_host_terminator =

	    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

	  re.src_path =

	    '(?:' +
	      '[/?#]' +
	        '(?:' +
	          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
	          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
	          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
	          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
	          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
	          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
	          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
	          '\\.{2,3}[a-zA-Z0-9%/]|' + // github has ... in commit range links. Restrict to
	                                     // - english
	                                     // - percent-encoded
	                                     // - parts of file path
	                                     // until more examples found.
	          '\\.(?!' + re.src_ZCc + '|[.]).|' +
	          (opts && opts['---'] ?
	            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
	          :
	            '\\-+|'
	          ) +
	          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
	          '\\!(?!' + re.src_ZCc + '|[!]).|' +
	          '\\?(?!' + re.src_ZCc + '|[?]).' +
	        ')+' +
	      '|\\/' +
	    ')?';

	  re.src_email_name =

	    '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

	  re.src_xn =

	    'xn--[a-z0-9\\-]{1,59}';

	  // More to read about domain names
	  // http://serverfault.com/questions/638260/

	  re.src_domain_root =

	    // Allow letters & digits (http://test1)
	    '(?:' +
	      re.src_xn +
	      '|' +
	      re.src_pseudo_letter + '{1,63}' +
	    ')';

	  re.src_domain =

	    '(?:' +
	      re.src_xn +
	      '|' +
	      '(?:' + re.src_pseudo_letter + ')' +
	      '|' +
	      // don't allow `--` in domain names, because:
	      // - that can conflict with markdown &mdash; / &ndash;
	      // - nobody use those anyway
	      '(?:' + re.src_pseudo_letter + '(?:-(?!-)|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
	    ')';

	  re.src_host =

	    '(?:' +
	    // Don't need IP check, because digits are already allowed in normal domain names
	    //   src_ip4 +
	    // '|' +
	      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
	    ')';

	  re.tpl_host_fuzzy =

	    '(?:' +
	      re.src_ip4 +
	    '|' +
	      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
	    ')';

	  re.tpl_host_no_ip_fuzzy =

	    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

	  re.src_host_strict =

	    re.src_host + re.src_host_terminator;

	  re.tpl_host_fuzzy_strict =

	    re.tpl_host_fuzzy + re.src_host_terminator;

	  re.src_host_port_strict =

	    re.src_host + re.src_port + re.src_host_terminator;

	  re.tpl_host_port_fuzzy_strict =

	    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

	  re.tpl_host_port_no_ip_fuzzy_strict =

	    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


	  ////////////////////////////////////////////////////////////////////////////////
	  // Main rules

	  // Rude test fuzzy links by host, for quick deny
	  re.tpl_host_fuzzy_test =

	    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

	  re.tpl_email_fuzzy =

	      '(^|' + text_separators + '|\\(|' + re.src_ZCc + ')(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

	  re.tpl_link_fuzzy =
	      // Fuzzy link can't be prepended with .:/\- and non punctuation.
	      // but can start with > (markdown blockquote)
	      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
	      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

	  re.tpl_link_no_ip_fuzzy =
	      // Fuzzy link can't be prepended with .:/\- and non punctuation.
	      // but can start with > (markdown blockquote)
	      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
	      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

	  return re;
	};


/***/ }),
/* 114 */
/***/ (function(module, exports) {

	module.exports = require("punycode");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	// markdown-it default options

	'use strict';


	module.exports = {
	  options: {
	    html:         false,        // Enable HTML tags in source
	    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links

	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,

	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,

	    maxNesting:   100            // Internal protection, recursion limit
	  },

	  components: {

	    core: {},
	    block: {},
	    inline: {}
	  }
	};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

	// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
	// modes. For example, to parse bold/italic only.

	'use strict';


	module.exports = {
	  options: {
	    html:         false,        // Enable HTML tags in source
	    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links

	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,

	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,

	    maxNesting:   20            // Internal protection, recursion limit
	  },

	  components: {

	    core: {
	      rules: [
	        'normalize',
	        'block',
	        'inline'
	      ]
	    },

	    block: {
	      rules: [
	        'paragraph'
	      ]
	    },

	    inline: {
	      rules: [
	        'text'
	      ],
	      rules2: [
	        'balance_pairs',
	        'text_collapse'
	      ]
	    }
	  }
	};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

	// Commonmark default options

	'use strict';


	module.exports = {
	  options: {
	    html:         true,         // Enable HTML tags in source
	    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
	    breaks:       false,        // Convert '\n' in paragraphs into <br>
	    langPrefix:   'language-',  // CSS language prefix for fenced blocks
	    linkify:      false,        // autoconvert URL-like texts to links

	    // Enable some language-neutral replacements + quotes beautification
	    typographer:  false,

	    // Double + single quotes replacement pairs, when typographer enabled,
	    // and smartquotes on. Could be either a String or an Array.
	    //
	    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

	    // Highlighter function. Should return escaped HTML,
	    // or '' if the source string is not changed and should be escaped externaly.
	    // If result starts with <pre... internal wrapper is skipped.
	    //
	    // function (/*str, lang*/) { return ''; }
	    //
	    highlight: null,

	    maxNesting:   20            // Internal protection, recursion limit
	  },

	  components: {

	    core: {
	      rules: [
	        'normalize',
	        'block',
	        'inline'
	      ]
	    },

	    block: {
	      rules: [
	        'blockquote',
	        'code',
	        'fence',
	        'heading',
	        'hr',
	        'html_block',
	        'lheading',
	        'list',
	        'reference',
	        'paragraph'
	      ]
	    },

	    inline: {
	      rules: [
	        'autolink',
	        'backticks',
	        'emphasis',
	        'entity',
	        'escape',
	        'html_inline',
	        'image',
	        'link',
	        'newline',
	        'text'
	      ],
	      rules2: [
	        'balance_pairs',
	        'emphasis',
	        'text_collapse'
	      ]
	    }
	  }
	};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

	// Process block-level custom containers
	//
	'use strict';


	module.exports = function container_plugin(md, name, options) {

	  function validateDefault(params) {
	    return params.trim().split(' ', 2)[0] === name;
	  }

	  function renderDefault(tokens, idx, _options, env, self) {

	    // add a class to the opening tag
	    if (tokens[idx].nesting === 1) {
	      tokens[idx].attrPush([ 'class', name ]);
	    }

	    return self.renderToken(tokens, idx, _options, env, self);
	  }

	  options = options || {};

	  var min_markers = 3,
	      marker_str  = options.marker || ':',
	      marker_char = marker_str.charCodeAt(0),
	      marker_len  = marker_str.length,
	      validate    = options.validate || validateDefault,
	      render      = options.render || renderDefault;

	  function container(state, startLine, endLine, silent) {
	    var pos, nextLine, marker_count, markup, params, token,
	        old_parent, old_line_max,
	        auto_closed = false,
	        start = state.bMarks[startLine] + state.tShift[startLine],
	        max = state.eMarks[startLine];

	    // Check out the first character quickly,
	    // this should filter out most of non-containers
	    //
	    if (marker_char !== state.src.charCodeAt(start)) { return false; }

	    // Check out the rest of the marker string
	    //
	    for (pos = start + 1; pos <= max; pos++) {
	      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
	        break;
	      }
	    }

	    marker_count = Math.floor((pos - start) / marker_len);
	    if (marker_count < min_markers) { return false; }
	    pos -= (pos - start) % marker_len;

	    markup = state.src.slice(start, pos);
	    params = state.src.slice(pos, max);
	    if (!validate(params)) { return false; }

	    // Since start is found, we can report success here in validation mode
	    //
	    if (silent) { return true; }

	    // Search for the end of the block
	    //
	    nextLine = startLine;

	    for (;;) {
	      nextLine++;
	      if (nextLine >= endLine) {
	        // unclosed block should be autoclosed by end of document.
	        // also block seems to be autoclosed by end of parent
	        break;
	      }

	      start = state.bMarks[nextLine] + state.tShift[nextLine];
	      max = state.eMarks[nextLine];

	      if (start < max && state.sCount[nextLine] < state.blkIndent) {
	        // non-empty line with negative indent should stop the list:
	        // - ```
	        //  test
	        break;
	      }

	      if (marker_char !== state.src.charCodeAt(start)) { continue; }

	      if (state.sCount[nextLine] - state.blkIndent >= 4) {
	        // closing fence should be indented less than 4 spaces
	        continue;
	      }

	      for (pos = start + 1; pos <= max; pos++) {
	        if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
	          break;
	        }
	      }

	      // closing code fence must be at least as long as the opening one
	      if (Math.floor((pos - start) / marker_len) < marker_count) { continue; }

	      // make sure tail has spaces only
	      pos -= (pos - start) % marker_len;
	      pos = state.skipSpaces(pos);

	      if (pos < max) { continue; }

	      // found!
	      auto_closed = true;
	      break;
	    }

	    old_parent = state.parentType;
	    old_line_max = state.lineMax;
	    state.parentType = 'container';

	    // this will prevent lazy continuations from ever going past our end marker
	    state.lineMax = nextLine;

	    token        = state.push('container_' + name + '_open', 'div', 1);
	    token.markup = markup;
	    token.block  = true;
	    token.info   = params;
	    token.map    = [ startLine, nextLine ];

	    state.md.block.tokenize(state, startLine + 1, nextLine);

	    token        = state.push('container_' + name + '_close', 'div', -1);
	    token.markup = state.src.slice(start, pos);
	    token.block  = true;

	    state.parentType = old_parent;
	    state.lineMax = old_line_max;
	    state.line = nextLine + (auto_closed ? 1 : 0);

	    return true;
	  }

	  md.block.ruler.before('fence', 'container_' + name, container, {
	    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
	  });
	  md.renderer.rules['container_' + name + '_open'] = render;
	  md.renderer.rules['container_' + name + '_close'] = render;
	};


/***/ }),
/* 119 */
/***/ (function(module, exports) {

	"use strict";

	var classy,

	  // magic char codes
	  CHAR_0 = 0x30,
	  CHAR_9 = 0x39,
	  CHAR_A_UPPER = 0x41,
	  CHAR_Z_UPPER = 0x5A,
	  CHAR_A_LOWER = 0x61,
	  CHAR_Z_LOWER = 0x7A,
	  CHAR_UNDERSCORE = 0x5F,
	  CHAR_DASH = 0x2D,
	  CHAR_SPACE = 0x20,
	  CHAR_OPEN_CURLY = 0x7B,
	  CHAR_CLOSE_CURLY = 0x7D,
	  CHAR_NEWLINE = 0xA;

	function isValidClassChar(code) {
	  return (code >= CHAR_0 && code <= CHAR_9) ||
	    (code >= CHAR_A_UPPER && code <= CHAR_Z_UPPER) ||
	    (code >= CHAR_A_LOWER && code <= CHAR_Z_LOWER) ||
	    code === CHAR_UNDERSCORE ||
	    code === CHAR_DASH ||
	    code === CHAR_SPACE;
	}

	function parse(state) {
	  var pos = state.pos,
	    initialPos = pos,
	    classString = "",
	    i,
	    pendingText,
	    preferOuter = false,
	    token;

	  if (state.src.charCodeAt(pos) !== CHAR_OPEN_CURLY) {
	    return false;
	  }

	  // advance to account for opening brace
	  pos += 1;

	  // grab everything til the closing brace
	  while (state.src.charCodeAt(pos) !== CHAR_CLOSE_CURLY) {
	    if (!isValidClassChar(state.src.charCodeAt(pos))) {
	      return false;
	    }

	    classString += state.src.charAt(pos);
	    pos += 1;
	  }

	  // advance to account for closing brace
	  pos += 1;

	  // only count curly brackets as a classy token if
	  // - at the end of the element
	  // - just before a newline
	  if (pos !== state.posMax && state.src.charCodeAt(pos) !== CHAR_NEWLINE) {
	    return false;
	  }

	  // `preferOuter` keeps track of whether, in an ambiguous case
	  // (for instance with <ul>s and <li>s)
	  // we should prefer to add it on the containing element
	  if (state.src.charCodeAt(initialPos - 1) === CHAR_NEWLINE) {
	    preferOuter = true;
	  }

	  state.pos = pos;

	  // work back through the tokens, checking if any of them is an open inline tag
	  // if it does turn out we're in an inline tag, the class belongs to that
	  //
	  // NOTE TO SELF refactor this, add handling for <a> tags as well
	  for (i = state.tokens.length - 1; i >= 0; i -= 1) {
	    if (state.tokens[i].type === "em_close"
	        || state.tokens[i].type === "strong_close") {
	      break;
	    }

	    if (state.tokens[i].type === "em_open"
	        || state.tokens[i].type === "strong_open") {
	      state.tokens[i].attrPush(["class", classString]);

	      // there might be a leftover space at the end
	      pendingText = state.pending;
	      if (pendingText.charCodeAt(pendingText.length - 1) === CHAR_SPACE) {
	        state.pending = pendingText.substring(0, pendingText.length - 1);
	      }

	      return true;
	    }
	  }

	  token = state.push("classy", "classy", 0);
	  token.content = classString;
	  token.hidden = true;
	  token.preferOuter = preferOuter;

	  return true;
	}

	function getClassyFromInlineToken(inlineToken) {
	  var classy,
	    tokens = inlineToken.children,
	    numChildren = tokens.length;

	  // the token *at the end* of the inline tag
	  // should be classy
	  //
	  // also, don't do anything if the only token present is a classy token
	  if (!tokens[numChildren - 1] || tokens[numChildren - 1].type !== "classy"
	      || tokens.length === 1) {
	    return null;
	  }

	  classy = tokens.pop();
	  numChildren -= 1;

	  // clean up after token was removed
	  if (tokens[numChildren - 1].type === "softbreak") {
	    // we may need to get rid of the newline just before classy statement
	    tokens.pop(numChildren - 1);
	  } else {
	    // or there might be some whitespace
	    // we may need to trim on the previous element
	    tokens[numChildren - 1].content = tokens[numChildren - 1].content.trim();
	  }

	  return classy;
	}

	function getOpeningToken(tokens, preferOuter, currentIndex) {
	  var closingTokenIndex = currentIndex + 1,
	    openingTokenType,
	    i;

	  if (tokens[closingTokenIndex].hidden) {
	    closingTokenIndex += 1;
	  }

	  if (preferOuter && tokens[closingTokenIndex + 1]
	      && /_close$/.test(tokens[closingTokenIndex + 1].type)) {
	    closingTokenIndex += 1;
	  }

	  openingTokenType = tokens[closingTokenIndex].type.replace("_close", "_open");

	  for (i = currentIndex; i >= 0; i -= 1) {
	    if (tokens[i].type === openingTokenType
	        && tokens[i].level === tokens[closingTokenIndex].level) {
	      return tokens[i];
	    }
	  }
	}

	function parseBlock(state) {
	  var i,
	    openingToken,
	    classy;

	  for (i = 0; i < state.tokens.length; i += 1) {
	    if (state.tokens[i].type === "inline") {
	      classy = getClassyFromInlineToken(state.tokens[i]);
	      while (classy) {
	        openingToken = getOpeningToken(state.tokens, classy.preferOuter, i);
	        openingToken.attrPush(["class", classy.content]);

	        classy = getClassyFromInlineToken(state.tokens[i]);
	      }
	    }
	  }
	}

	classy = function (md) {
	  md.inline.ruler.push("classy", parse);
	  md.core.ruler.push("classy", parseBlock);
	};

	module.exports = classy;


/***/ }),
/* 120 */
/***/ (function(module, exports) {

	'use strict';

	function modifyToken(token, modifyFn, env) {
	  // create attrObj for convenient get/set of attributes
	  var attrObj = (token.attrs) ? token.attrs.reduce(function (acc, pair) {
	    acc[pair[0]] = pair[1];
	    return acc;
	  }, {}) : {};
	  token.attrObj = attrObj;
	  modifyFn(token, env);
	  // apply any overrides or new attributes from attrObj
	  Object.keys(token.attrObj).forEach(function (k) {
	    token.attrSet(k, token.attrObj[k]);
	  });
	}

	function noop() { }

	module.exports = function (md) {
	    md.core.ruler.push(
	        'modify-token',
	        function (state) {
	          var modifyFn = md.options.modifyToken || noop;
	          state.tokens.forEach(function (token) {
	            if (token.children && token.children.length) {
	              token.children.forEach(function (token) {
	                modifyToken(token, modifyFn, state.env);
	              });
	            }
	            modifyToken(token, modifyFn, state.env);
	          });
	          return false;
	        }
	    );
	};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

	// Process '## headings'

	'use strict';

	module.exports = function synapse_table_plugin(md) {
	    var tableClassStartRE = new RegExp(
	            '^\\s*{[|]{1}\\s*class\\s*=\\s*"\\s*(.*)"\\s*');
	    var tableClassEndRE = new RegExp('^\\s*[|]{1}}\\s*');
	    var centerStartRE = new RegExp('^\s*[-]{1}[>]{1}.*');
	    var centerEndRE = new RegExp('.*[<]{1}[-]{1}\s*$');
	    var outerPipesRE = new RegExp('^\s*[|]{1}.+[|]{1}\s*$');
	    function getLine(state, line) {
	      var pos = state.bMarks[line] + state.blkIndent, max = state.eMarks[line];

	      return state.src.substr(pos, max - pos);
	    }

	    function escapedSplit(str) {
	      if (outerPipesRE.test(str)) {
	        str = str.replace(/^\||\|$/g, '');
	      }

	      var result = [], pos = 0, max = str.length, ch, escapes = 0, lastPos = 0, backTicked = false, lastBackTick = 0;

	      ch = str.charCodeAt(pos);

	      while (pos < max) {
	        if (ch === 0x60 && (escapes % 2 === 0)) { // `
	          backTicked = !backTicked;
	          lastBackTick = pos;
	        } else if (ch === 0x7c && (escapes % 2 === 0) && !backTicked) { // |
	          result.push(str.substring(lastPos, pos));
	          lastPos = pos + 1;
	        } else if (ch === 0x5c) { // \
	          escapes++;
	        } else {
	          escapes = 0;
	        }

	        pos++;

	        // If there was an un-closed backtick, go back to just after
	        // the last backtick, but as if it was a normal character
	        if (pos === max && backTicked) {
	          backTicked = false;
	          pos = lastBackTick + 1;
	        }

	        ch = str.charCodeAt(pos);
	      }

	      result.push(str.substring(lastPos));

	      return result;
	    }

	    function table(state, startLine, endLine, silent) {
	      var lineText, pos, i, nextLine, columns, columnCount, token,
	        tableLines, tbodyLines, classNames, tableBodyStartLine, headerLine,
	        isSpecialSyntaxTable = false, wrapWithDiv = false;
	      // should have at least two lines
	      // (!!! Synapse change, used to be 3 due to required ---|---|--- line).  Header and single row.
	      if (startLine + 1 > endLine) {
	        return false;
	      }

	      pos = state.bMarks[startLine] + state.tShift[startLine];
	      if (pos >= state.eMarks[startLine]) {
	        return false;
	      }
	      lineText = getLine(state, startLine);

	      // look for optional class definition start, like '{| class="border"'
	      if (tableClassStartRE.test(lineText)) {
	        // this table definition includes class names, so the start marker is {| and end marker will be |}
	        classNames = lineText.match(tableClassStartRE)[1];
	        wrapWithDiv = classNames.indexOf('short') !== -1;
	        headerLine = startLine + 1;
	        // If tableClassStartRE passes, then it's definitely a table.
	        isSpecialSyntaxTable = true;
	      } else {
	        headerLine = startLine;
	      }

	      if (state.sCount[headerLine] < state.blkIndent) {
	        return false;
	      }

	      pos = state.bMarks[headerLine] + state.tShift[headerLine];
	      if (pos >= state.eMarks[headerLine]) {
	        return false;
	      }

	      // read column headers
	      lineText = getLine(state, headerLine).trim();
	      if (lineText.indexOf('|') === -1 && !isSpecialSyntaxTable) {
	        return false;
	      }

	      // has a '|'.  If it looks like there is math on this line, skip it.
	      if (lineText.indexOf('$$') !== -1) {
	        return false;
	      }
	      columns = escapedSplit(lineText);
	      // header row will define an amount of columns in the entire table,
	      // and align row shouldn't be smaller than that (the rest of the rows can)
	      columnCount = columns.length;

	      if (silent) {
	        return true;
	      }

	      if (wrapWithDiv) {
	        token = state.push('div_wrapper', 'div', 1);
	        token.attrs = [ [ 'class', ' markdowntableWrap ' ] ];
	      }
	      token = state.push('table_open', 'table', 1);
	      token.map = tableLines = [ startLine, 0 ];
	      if (classNames) {
	        token.attrs = [ [ 'class', ' ' + classNames + ' ' ] ];
	        // start line of the table (header) is really the second line.
	        startLine++;
	      }

	      lineText = getLine(state, headerLine + 1).trim();

	      // If this line is of the form ---|---|---, then we have column headers and we should skip this line.
	      // Else, no column headers and we should skip to the body.
	      if (/^[-:| ]+$/.test(lineText) && lineText.indexOf('|') !== -1) {
	        // we have column headers
	        tableBodyStartLine = headerLine + 2;
	        token = state.push('thead_open', 'thead', 1);
	        token.map = [ startLine, startLine + 1 ];

	        token = state.push('tr_open', 'tr', 1);
	        token.map = [ startLine, startLine + 1 ];

	        for (i = 0; i < columns.length; i++) {
	          token = state.push('th_open', 'th', 1);
	          token.map = [ startLine, startLine + 1 ];

	          token = state.push('inline', '', 0);
	          token.content = columns[i].trim();
	          token.map = [ startLine, startLine + 1 ];
	          token.children = [];

	          token = state.push('th_close', 'th', -1);
	        }

	        token = state.push('tr_close', 'tr', -1);
	        token = state.push('thead_close', 'thead', -1);
	      } else {
	        // no column headers
	        tableBodyStartLine = headerLine;
	      }

	      token = state.push('tbody_open', 'tbody', 1);
	      token.map = tbodyLines = [ tableBodyStartLine, 0 ];

	      for (nextLine = tableBodyStartLine; nextLine < endLine; nextLine++) {
	        if (state.sCount[nextLine] < state.blkIndent) {
	          break;
	        }

	        lineText = getLine(state, nextLine).trim();
	        if (tableClassEndRE.test(lineText)) {
	          // end of table with class definitions. Include this line in the table definition
	          nextLine++;
	          break;
	        }
	        if (lineText.indexOf('|') === -1 && !isSpecialSyntaxTable) {
	          break;
	        }
	        columns = escapedSplit(lineText);

	        token = state.push('tr_open', 'tr', 1);
	        // if line starts with -> and ends with <-, then eat these characters (SWC-3000)
	        if (centerStartRE.test(columns[0]) && centerEndRE.test(columns[columnCount - 1])) {
	          columns[0] = columns[0].substring(columns[0].indexOf('->') + 2);
	          columns[columnCount - 1] = columns[columnCount - 1].substring(0, columns[columnCount - 1].indexOf('<-'));
	        }
	        for (i = 0; i < columnCount; i++) {
	          token = state.push('td_open', 'td', 1);

	          token = state.push('inline', '', 0);
	          token.content = columns[i] ? columns[i].trim() : '';
	          token.children = [];

	          token = state.push('td_close', 'td', -1);
	        }
	        token = state.push('tr_close', 'tr', -1);
	      }
	      token = state.push('tbody_close', 'tbody', -1);
	      token = state.push('table_close', 'table', -1);

	      if (wrapWithDiv) {
	        token = state.push('div_wrapper', 'div', -1);
	      }

	      tableLines[1] = tbodyLines[1] = nextLine;
	      state.line = nextLine;
	      return true;
	    }
	    var rulesCanBeTerminated = [ 'paragraph', 'reference' ];
	    md.block.ruler.at('table', table, { alt: (rulesCanBeTerminated).slice() });
	  };


/***/ }),
/* 122 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = file;
	function getClearNotification() {
		return {
			openFileRequest: false,
			openFileSuccess: false,
			openFileError: false,
			saveProjectRequest: false,
			saveProjectSuccess: false,
			saveProjectError: false,
			exportMedia: true,
			saveMdRequest: false,
			saveMdSuccess: false,
			saveMdError: false,
			saveHtmlRequest: false,
			saveHtmlSuccess: false,
			saveHtmlError: false,
			copyToClipBoard: false
		};
	}

	function file(state = Object.assign({
		currentFileName: '',
		recentFiles: [],
		mediaFiles: []
	}, getClearNotification()), action) {
		switch (action.type) {
			case 'OPEN_FILE_REQUEST':
				return Object.assign({}, state, {
					openFileRequest: true
				});

			case 'OPEN_FILE_SUCCESS':
				return Object.assign({}, state, {
					currentFileName: action.fileName,
					recentFiles: state.recentFiles.includes(action.fileName) ? state.recentFiles : state.recentFiles.concat(action.fileName),
					openFileRequest: false,
					openFileSuccess: true,
					openFileError: false
				});

			case 'OPEN_FILE_ERROR':
				return Object.assign({}, state, {
					openFileRequest: false,
					openFileError: true
				});

			case 'OPEN_FILE_ABORTED':
				return Object.assign({}, state, {
					openFileRequest: false
				});

			case 'SET_RECENT_FILES':
				return Object.assign({}, state, {
					recentFiles: action.recentFiles
				});

			case 'SAVE_PROJECT_REQUEST':
				return Object.assign({}, state, {
					saveProjectRequest: true
				});

			case 'SAVE_PROJECT_SUCCESS':
				return Object.assign({}, state, {
					saveProjectRequest: false,
					saveProjectSuccess: true
				});

			case 'SAVE_PROJECT_ERROR':
				return Object.assign({}, state, {
					saveProjectRequest: false,
					saveProjectError: true
				});

			case 'SAVE_MD_REQUEST':
				return Object.assign({}, state, {
					saveMdRequest: true
				});

			case 'SAVE_MD_SUCCESS':
				return Object.assign({}, state, {
					currentFileName: action.fileName,
					recentFiles: state.recentFiles.includes(action.fileName) ? state.recentFiles : state.recentFiles.concat(action.fileName),
					saveMdRequest: false,
					saveMdSuccess: true
				});

			case 'SAVE_MD_ERROR':
				return Object.assign({}, state, {
					saveMdRequest: false,
					saveMdError: true
				});

			case 'SAVE_MD_ABORTED':
				return Object.assign({}, state, {
					saveMdRequest: false
				});

			case 'SAVE_HTML_REQUEST':
				return Object.assign({}, state, {
					saveHtmlRequest: true
				});

			case 'SAVE_HTML_SUCCESS':
				return Object.assign({}, state, {
					saveHtmlRequest: false,
					saveHtmlSuccess: true
				});

			case 'SAVE_HTML_ERROR':
				return Object.assign({}, state, {
					saveHtmlRequest: false,
					saveHtmlError: true
				});

			case 'SAVE_HTML_ABORTED':
				return Object.assign({}, state, {
					saveHtmlRequest: false
				});

			case 'COPY_TO_CLIPBOARD_START':
				return Object.assign({}, state, {
					copyToClipBoard: true
				});

			case 'COPY_TO_CLIPBOARD_END':
				return Object.assign({}, state, {
					copyToClipBoard: false
				});

			case 'CLEAR_NOTIFICATIONS':
				return Object.assign({}, state, getClearNotification());

			default:
				return state;
		}
		}

/***/ }),
/* 123 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ui;
	function ui(state = {
		currentColorScheme: 'dark',
		notificationDuration: 2000,
		previewPanelOpen: false,
		previewWindow: false,
		currentTheme: 'black',
		isCurrentThemeCustom: false,
		customThemePath: '../../../lib/customThemes',
		confPanelOpen: false,
		themesPanelOpen: false,
		showButtonText: true,
		languages: ['it', 'en'],
		colorSchemes: [],
		customThemes: [],
		currentLanguage: 'en',
		labels: null,
		customCss: '',
		slideBgpanelOpen: false,
		init: false
	}, action) {
		switch (action.type) {
			case 'SET_THEME':
				return Object.assign({}, state, {
					currentTheme: action.themeName,
					isCurrentThemeCustom: action.isCustomTheme,
					customThemePath: action.themePath ? action.themePath : state.customThemePath
				});

			case 'TOGGLE_PREVIEW_PANEL':
				return Object.assign({}, state, { previewPanelOpen: !state.previewPanelOpen });

			case 'OPEN_PREVIEW_WIN':
				//return Object.assign({}, state, {previewWindow: action.previewWindow});
				return Object.assign({}, state, { previewWindow: true });

			case 'OPEN_CONF_PANEL':
				return Object.assign({}, state, {
					confPanelOpen: !state.confPanelOpen,
					themesPanelOpen: false,
					slideBgpanelOpen: false
				});

			case 'CLOSE_CONF_PANEL':
				return Object.assign({}, state, { confPanelOpen: false });

			case 'SET_UI_CONF':
				return Object.assign({}, state, action.newConf);

			case 'CHANGE_LANGUAGE':
				return Object.assign({}, state, {
					currentLanguage: action.newLanguageIso,
					labels: action.labels
				});

			case 'SET_COLOR_SCHEME':
				return Object.assign({}, state, { currentColorScheme: action.colorScheme });

			case 'OPEN_THEMES_PANEL':
				return Object.assign({}, state, {
					themesPanelOpen: !state.themesPanelOpen,
					confPanelOpen: false,
					slideBgpanelOpen: false
				});

			case 'CLOSE_THEMES_PANEL':
				return Object.assign({}, state, { themesPanelOpen: false });

			case 'CUSTOM_THEME_DELETE_SUCCESS':
				return Object.assign({}, state, { customThemes: state.customThemes.filter(theme => theme != action.theme) });

			case 'CUSTOM_THEME_LOAD_SUCCESS':
				return Object.assign({}, state, { customThemes: state.customThemes.concat(action.theme) });

			case 'SET_CUSTOM_CSS':
				return Object.assign({}, state, { customCss: action.css });

			case 'OPEN_SLIDE_BG_PANEL':
				return Object.assign({}, state, {
					slideBgpanelOpen: !state.slideBgpanelOpen,
					confPanelOpen: false,
					themesPanelOpen: false
				});

			case 'CLOSE_SLIDE_BG_PANEL':
				return Object.assign({}, state, { slideBgpanelOpen: false });

			case 'SET_INIT':
				return Object.assign({}, state, { init: true });

			default:
				return state;
		}
		}

/***/ }),
/* 124 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = bgSlide;
	var configuration = {
		controls: true,
		progress: true,
		slideNumber: false,
		history: false,
		keyboard: true,
		overview: true,
		center: true,
		touch: true,
		loop: false,
		rtl: false,
		shuffle: false,
		fragments: true,
		embedded: false,
		help: true,
		showNotes: false,
		autoSlideStoppable: true,
		mouseWheel: false,
		hideAddressBar: true,
		previewLinks: false,
		transition: 'none',
		transitionSpeed: 'default',
		backgroundTransition: 'default'
	};

	var defaultExtraConf = {
		autoSlide: 0,
		//autoSlideMethod: Reveal.navigateNext,
		viewDistance: 3,
		parallaxBackgroundImage: '',
		parallaxBackgroundSize: '',
		parallaxBackgroundHorizontal: null,
		parallaxBackgroundVertical: null
	};

	function bgSlide(state = Object.assign({}, configuration, defaultExtraConf), action) {
		switch (action.type) {
			case 'SET_CONFIGURATION':
				return Object.assign({}, state, action.newConf);

			case 'SET_TEMP_PARALLAX_BG_IMAGE':
				return Object.assign({}, state, { tempParallaxBgImage: action.path });

			case 'SET_DEFAULT_EXTRA_CONF':
				return Object.assign({}, state, defaultExtraConf);

			default:
				return state;
		}
		}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.openFile = openFile;
	exports.saveProject = saveProject;
	exports.saveMd = saveMd;
	exports.saveCurrentMd = saveCurrentMd;
	exports.saveHtml = saveHtml;
	exports.showInFolder = showInFolder;
	exports.openInEditor = openInEditor;
	exports.delCustomTheme = delCustomTheme;
	exports.loadCustomTheme = loadCustomTheme;

	var _electron = __webpack_require__(1);

	var _path = __webpack_require__(126);

	var _path2 = _interopRequireDefault(_path);

	var _selectors = __webpack_require__(127);

	var _actions = __webpack_require__(128);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//TODO: catch errors on promises & dispatch actions to trigger notifications display
	const mainProcess = _electron.remote.require('./main');


	function openFileSuccess(fileName) {
	    return { type: 'OPEN_FILE_SUCCESS', fileName };
	}

	function openFileError(err) {
	    return { type: 'OPEN_FILE_ERROR', err };
	}

	function openFileRequest() {
	    return { type: 'OPEN_FILE_REQUEST' };
	}

	function openFileAborted() {
	    return { type: 'OPEN_FILE_ABORTED' };
	}

	function openFile(filePath) {
	    return function (dispatch, getState) {
	        dispatch(openFileRequest());

	        var openFile = mainProcess.openFile(filePath);

	        if (!openFile) {
	            return dispatch(openFileAborted());
	        }

	        openFile.then(([{ remedi }, { configuration }, { customCss }, { fileName, content }]) => {
	            if (remedi && remedi.theme) {
	                dispatch((0, _actions.setTheme)(remedi.theme, remedi.isCustomTheme, remedi.isCustomTheme ? 'file:///' + _path2.default.join(_path2.default.dirname(fileName), 'css', 'customThemes') : null));
	            }

	            dispatch((0, _actions.setCustomCss)(customCss));
	            dispatch((0, _actions.setConfiguration)(configuration));
	            dispatch(openFileSuccess(fileName));
	            dispatch((0, _actions.mdLoaded)(content));
	            dispatch((0, _actions.editorPosChanged)({ selectionStart: 0, selectionEnd: 0 }));

	            var state = getState();
	            var recentFiles = (0, _selectors.getRecentFiles)(state);
	            mainProcess.saveRemediConfig({ recentFiles });
	        }).catch(err => {
	            dispatch(openFileError(err));
	        });
	    };
	}

	function saveProject() {
	    return function (dispatch, getState) {
	        dispatch({ type: 'SAVE_PROJECT_REQUEST' });

	        var state = getState();

	        mainProcess.saveProject({
	            html: (0, _selectors.getHtml)(state),
	            md: (0, _selectors.getMd)(state),
	            withDependencies: (0, _selectors.getExportMedia)(state),
	            conf: (0, _selectors.getConfiguration)(state),
	            theme: (0, _selectors.getCurrentTheme)(state),
	            isCustomTheme: (0, _selectors.isCustomTheme)(state),
	            customCss: (0, _selectors.getCustomCss)(state)
	        }).then(() => {
	            dispatch({ type: 'SAVE_PROJECT_SUCCESS' });
	        }).catch(() => {
	            dispatch({ type: 'SAVE_PROJECT_ERROR' });
	        }).then(() => {
	            setTimeout(() => {
	                dispatch({ type: 'CLEAR_NOTIFICATIONS' });
	            }, (0, _selectors.getNotificationDuration)(state));
	        });
	        ;
	    };
	}

	function saveMdRequest() {
	    return { type: 'SAVE_MD_REQUEST' };
	}

	function saveMdSuccess(fileName) {
	    return { type: 'SAVE_MD_SUCCESS', fileName };
	}

	function saveMdError() {
	    return { type: 'SAVE_MD_ERROR' };
	}

	function saveMdAborted() {
	    return { type: 'SAVE_MD_ABORTED' };
	}

	function saveMdCommon(dispatch, getState, current) {
	    dispatch(saveMdRequest());

	    var state = getState();

	    var saveMd = current ? mainProcess.saveCurrentMd((0, _selectors.getMd)(state), (0, _selectors.getCurrentFileName)(state)) : mainProcess.saveMd((0, _selectors.getMd)(state));

	    if (!saveMd) {
	        return dispatch(saveMdAborted());
	    }
	    saveMd.then(fileName => {
	        dispatch(saveMdSuccess(fileName));
	    }).catch(() => {
	        dispatch(saveMdError());
	    });
	}

	function saveMd() {
	    return function (dispatch, getState) {
	        saveMdCommon(dispatch, getState, false);
	    };
	}

	function saveCurrentMd() {
	    return function (dispatch, getState) {
	        saveMdCommon(dispatch, getState, true);
	    };
	}

	function saveHtmlRequest() {
	    return { type: 'SAVE_HTML_REQUEST' };
	}

	function saveHtmlAborted() {
	    return { type: 'SAVE_HTML_ABORTED' };
	}

	function saveHtmlSuccess() {
	    return { type: 'SAVE_HTML_SUCCESS' };
	}

	function saveHtmlError() {
	    return { type: 'SAVE_HTML_ERROR' };
	}

	function saveHtml() {
	    return function (dispatch, getState) {
	        dispatch(saveHtmlRequest());

	        var state = getState();

	        var saveHtml = mainProcess.saveProject((0, _selectors.getHtml)(state));

	        if (!saveHtml) {
	            return dispatch(saveMdAborted());
	        }
	        saveHtml.then(() => {
	            dispatch(saveHtmlSuccess());
	        }).catch(() => {
	            dispatch(saveHtmlError());
	        });
	    };
	}

	function showInFolder() {
	    return function (dispatch, getState) {
	        var state = getState();

	        _electron.shell.showItemInFolder((0, _selectors.getCurrentFileName)(state));
	    };
	}

	function openInEditor() {
	    return function (dispatch, getState) {
	        var state = getState();

	        _electron.shell.openItem((0, _selectors.getCurrentFileName)(state));
	    };
	}

	function delCustomTheme(theme) {
	    return function (dispatch) {
	        mainProcess.delCustomTheme(theme).then(() => {
	            dispatch({ type: 'CUSTOM_THEME_DELETE_SUCCESS', theme });
	        }).catch(() => {
	            dispatch({ type: 'CUSTOM_THEME_DELETE_ERROR' });
	        });
	    };
	}

	function loadCustomTheme(theme) {
	    return function (dispatch) {
	        mainProcess.getFilePath('css').then(response => {
	            return mainProcess.loadCustomTheme(response.filePath);
	        }).then(({ fileName }) => {
	            dispatch({ type: 'CUSTOM_THEME_LOAD_SUCCESS', theme: fileName });
	        }).catch(() => {
	            dispatch({ type: 'CUSTOM_THEME_LOAD_ERROR' });
	        });
	    };
	}

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getLabels = getLabels;
	exports.getLabel = getLabel;
	exports.getLanguageIso = getLanguageIso;
	exports.getCurrentColorScheme = getCurrentColorScheme;
	exports.getHtml = getHtml;
	exports.getMd = getMd;
	exports.getInsert = getInsert;
	exports.getExportMedia = getExportMedia;
	exports.getCurrentFileName = getCurrentFileName;
	exports.getDirtyStatus = getDirtyStatus;
	exports.getEditorData = getEditorData;
	exports.getLeftPanelStatus = getLeftPanelStatus;
	exports.getInitialSlideBgSettings = getInitialSlideBgSettings;
	exports.getNewSlideBgSettings = getNewSlideBgSettings;
	exports.getSlideBgImage = getSlideBgImage;
	exports.getPreviewPanelOpen = getPreviewPanelOpen;
	exports.getCurrentTheme = getCurrentTheme;
	exports.getConfiguration = getConfiguration;
	exports.getConfPanelStatus = getConfPanelStatus;
	exports.getThemesPanelStatus = getThemesPanelStatus;
	exports.getRightPanelStatus = getRightPanelStatus;
	exports.getUiConf = getUiConf;
	exports.getCurrentLanguage = getCurrentLanguage;
	exports.getCustomThemes = getCustomThemes;
	exports.getCustomCss = getCustomCss;
	exports.getInit = getInit;
	exports.getCustomThemesList = getCustomThemesList;
	exports.isCustomTheme = isCustomTheme;
	exports.getCustomThemePath = getCustomThemePath;
	exports.getPreviewWin = getPreviewWin;
	exports.getNotificationDuration = getNotificationDuration;
	exports.getSaveProjectRequest = getSaveProjectRequest;
	exports.getSaveProjectSuccess = getSaveProjectSuccess;
	exports.getSaveProjectError = getSaveProjectError;
	exports.getRecentFiles = getRecentFiles;
	exports.getOpenFIleError = getOpenFIleError;
	function getLabels(state) {
		return state.ui.labels;
	}

	function getLabel(state) {
		return function (key) {
			return state.ui.labels[key];
		};
	}

	function getLanguageIso(state) {
		return state.ui.currentLanguage;
	}

	function getCurrentColorScheme(state) {
		return state.ui.currentColorScheme;
	}

	function getHtml(state) {
		return state.editor.html;
	}

	function getMd(state) {
		return state.editor.md;
	}

	function getInsert(state) {
		return state.editor.insert;
	}

	function getExportMedia(state) {
		return state.file.exportMedia;
	}

	function getCurrentFileName(state) {
		return state.file.currentFileName;
	}

	function getDirtyStatus(state) {
		return state.editor.dirty;
	}

	function getEditorData(state) {
		return {
			text: state.editor.md,
			selectionStart: state.editor.selectionStart,
			selectionEnd: state.editor.selectionEnd
		};
	}

	function getLeftPanelStatus(state) {
		return state.ui.slideBgpanelOpen;
	}

	function getInitialSlideBgSettings(state) {
		return state.bgSlide.initial;
	}

	function getNewSlideBgSettings(state) {
		var newSlideBgSettings = Object.assign({}, state.bgSlide.new);
		return newSlideBgSettings;
	}

	function getSlideBgImage(state) {
		return state.bgSlide['background-image'];
	}

	function getPreviewPanelOpen(state) {
		return state.ui.previewPanelOpen;
	}

	function getCurrentTheme(state) {
		return state.ui.currentTheme;
	}

	function getConfiguration(state) {
		return state.configuration;
	}

	function getConfPanelStatus(state) {
		return state.ui.confPanelOpen;
	}

	function getThemesPanelStatus(state) {
		return state.ui.themesPanelOpen;
	}

	function getRightPanelStatus(state) {
		return state.ui.confPanelOpen || state.ui.themesPanelOpen;
	}

	function getUiConf(state) {
		return state.ui;
	}

	function getCurrentLanguage(state) {
		return state.ui.currentLanguage;
	}

	function getCustomThemes(state) {
		return state.ui.customThemes;
	}

	function getCustomCss(state) {
		return state.ui.customCss;
	}

	function getInit(state) {
		return state.ui.init;
	}

	function getCustomThemesList(state) {
		return state.ui.customThemes;
	}

	function isCustomTheme(state) {
		return state.ui.isCurrentThemeCustom;
	}

	function getCustomThemePath(state) {
		return state.ui.customThemePath;
	}

	function getPreviewWin(state) {
		return state.ui.previewWindow;
	}

	function getNotificationDuration(state) {
		return state.ui.notificationDuration;
	}

	function getSaveProjectRequest(state) {
		return state.file.saveProjectRequest;
	}

	function getSaveProjectSuccess(state) {
		return state.file.saveProjectSuccess;
	}

	function getSaveProjectError(state) {
		return state.file.saveProjectError;
	}

	function getRecentFiles(state) {
		return state.file.recentFiles;
	}

	function getOpenFIleError(state) {
		return state.file.openFileError;
	}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.copyHtmlToClipboard = copyHtmlToClipboard;
	exports.init = init;
	exports.setRecentFiles = setRecentFiles;
	exports.changeLanguage = changeLanguage;
	exports.mdChanged = mdChanged;
	exports.mdLoaded = mdLoaded;
	exports.editorPosChanged = editorPosChanged;
	exports.insert = insert;
	exports.insertImage = insertImage;
	exports.openSlideBgPanel = openSlideBgPanel;
	exports.setBgImage = setBgImage;
	exports.setBgVideo = setBgVideo;
	exports.openBgImage = openBgImage;
	exports.openFilePath = openFilePath;
	exports.closeBgSettingsPanel = closeBgSettingsPanel;
	exports.togglePreviewPanel = togglePreviewPanel;
	exports.openPreviewWin = openPreviewWin;
	exports.setTheme = setTheme;
	exports.setTransition = setTransition;
	exports.setConfiguration = setConfiguration;
	exports.openConfPanel = openConfPanel;
	exports.closeConfPanel = closeConfPanel;
	exports.closeThemesPanel = closeThemesPanel;
	exports.setTempParallaxBgImage = setTempParallaxBgImage;
	exports.setDefaultExtraConf = setDefaultExtraConf;
	exports.setUiConf = setUiConf;
	exports.openThemesPanel = openThemesPanel;
	exports.setCustomCss = setCustomCss;
	exports.setInit = setInit;
	exports.setColorScheme = setColorScheme;

	var _electron = __webpack_require__(1);

	var _selectors = __webpack_require__(127);

	var _editorUtils = __webpack_require__(129);

	const mainProcess = _electron.remote.require('./main');


	function copyToClipboardStart() {
		return { type: 'COPY_TO_CLIPBOARD_START' };
	}

	function copyToClipboardEnd() {
		return { type: 'COPY_TO_CLIPBOARD_END' };
	}

	function copyHtmlToClipboard() {
		return function (dispatch, getState) {
			dispatch(copyToClipboardStart());

			var state = getState();

			_electron.clipboard.writeText((0, _selectors.getHtml)(state));

			setTimeout(() => {
				dispatch(copyToClipboardEnd());
			}, 1000);
		};
	}

	function init() {
		return function (dispatch, getState) {
			mainProcess.getRemediConfig().then(remediConfig => {
				dispatch(setColorSchemeWithoutSaving(remediConfig.currentColorScheme));
				dispatch(changeLanguageWithoutSaving(remediConfig.currentLanguage));
				dispatch(setRecentFiles(remediConfig.recentFiles));
			});

			mainProcess.getThemesList().then(colorSchemes => {
				dispatch(setUiConf({ colorSchemes }));
			});

			mainProcess.getLanguagesList().then(languages => {
				dispatch(setUiConf({ languages }));
			});

			mainProcess.getCustomThemesList().then(customThemes => {
				dispatch(setUiConf({ customThemes }));
			});
		};
	}

	function changeLanguageWithoutSaving(newLanguageIso) {
		return function (dispatch) {
			mainProcess.loadLabels(newLanguageIso).then(labels => {
				dispatch({ type: 'CHANGE_LANGUAGE', newLanguageIso, labels });
			});
		};
	}

	function setRecentFiles(recentFiles) {
		return { type: 'SET_RECENT_FILES', recentFiles };
	}

	function changeLanguage(newLanguageIso) {
		return function (dispatch) {
			mainProcess.saveRemediConfig({ currentLanguage: newLanguageIso });

			dispatch(changeLanguageWithoutSaving(newLanguageIso));
		};
	}

	function mdChanged(md) {
		return { type: 'MD_CHANGED', md };
	}

	function mdLoaded(md) {
		return { type: 'MD_LOADED', md };
	}

	function editorPosChanged(payload) {
		return { type: 'EDITOR_POS_CHANGED', payload };
	}

	function insert(arg1, arg2) {
		var stringsToInsert = Array.isArray(arg1) ? arg1 : [{ insert: arg1, pattern: arg2 }];
		return { type: 'INSERT', stringsToInsert };
	}

	function insertImage() {
		return function (dispatch) {
			var filePathRequest = mainProcess.getFilePath('img');

			if (!filePathRequest) {
				return;
			}

			filePathRequest.then(response => {
				let imgPath = response.filePath;
				dispatch(insert(`![](${imgPath.replace(/ /g, '%20')})`, /!\[[^\]]*\]\([^)]+\)/));
			}).catch(() => {
				return;
			});
		};
	}

	function openSlideBgPanel() {
		return function (dispatch, getState) {
			var state = getState();
			var currentSettings = (0, _editorUtils.getCurrentSlideBgSettingsFromEditor)((0, _selectors.getEditorData)(state));

			dispatch({ type: 'OPEN_SLIDE_BG_PANEL', currentSettings });
		};
	}

	function setBgImage(path) {
		return { type: 'SET_SLIDE_BG_IMAGE', path };
	}

	function setBgVideo(path) {
		return { type: 'SET_SLIDE_BG_VIDEO', path };
	}

	function openBgImage() {
		return function (dispatch, getState) {
			mainProcess.getFilePath('img').then(response => {
				let path = response.filePath;
				dispatch(setBgImage(path));
			}).catch(() => {
				let path = '';
				dispatch(setBgImage(path));
			});
		};
	}

	function openFilePath(fileType, finalAction) {
		return function (dispatch, getState) {
			mainProcess.getFilePath(fileType).then(response => {
				let path = response.filePath;
				dispatch(finalAction(path));
			}).catch(() => {
				let path = '';
				dispatch(finalAction(path));
			});
		};
	}

	function closeBgSettingsPanel() {
		return { type: 'CLOSE_SLIDE_BG_PANEL' };
	}

	function togglePreviewPanel() {
		return { type: 'TOGGLE_PREVIEW_PANEL' };
	}

	function openPreviewWin() {
		// return function (dispatch) {
		// 	mainProcess
		// 		.openPreviewWin()
		// 		.then(previewWindow => {
		// 			dispatch({type: 'OPEN_PREVIEW_WIN', previewWindow});
		// 		})
		// 	;
		// }

		// return function (dispatch, getState) {
		// 	var win = window.open('preview/preview.html', 'preview', '');
		// 	var state = getState();
		// 	var currentTheme = getCurrentTheme(state);
		// 	var message = {
		// 			html: getHtml(state),
		// 			configuration: getConfiguration(state),
		// 			customCss: getCustomCss(state),
		// 			currentTheme: currentTheme,
		// 			customTheme: getCustomThemesList(state).includes(currentTheme)
		// 		};

		// 	// window.addEventListener("message", (event) => {
		// 	// 	//this.ifr.focus();
		// 	// });
		// 	setTimeout(() => {
		// 		win.postMessage(message, "*");
		// 	}, 200);

		// }
		return { type: 'OPEN_PREVIEW_WIN' };
	}

	function setTheme(themeName, isCustomTheme = false, themePath = null) {
		return { type: 'SET_THEME', themeName, isCustomTheme, themePath };
	}

	function setTransition(transitionName) {
		return { type: 'SET_CONFIGURATION', newConf: { transition: transitionName } };
	}

	function setConfiguration(newConf) {
		return { type: 'SET_CONFIGURATION', newConf };
	}

	function openConfPanel() {
		return { type: 'OPEN_CONF_PANEL' };
	}

	function closeConfPanel() {
		return { type: 'CLOSE_CONF_PANEL' };
	}

	function closeThemesPanel() {
		return { type: 'CLOSE_THEMES_PANEL' };
	}

	function setTempParallaxBgImage(path) {
		return { type: 'SET_TEMP_PARALLAX_BG_IMAGE', path };
	}

	function setDefaultExtraConf() {
		return { type: 'SET_DEFAULT_EXTRA_CONF' };
	}

	function setUiConf(newConf) {
		return { type: 'SET_UI_CONF', newConf };
	}

	function openThemesPanel() {
		return { type: 'OPEN_THEMES_PANEL' };
	}

	function setCustomCss(css) {
		return { type: 'SET_CUSTOM_CSS', css };
	}

	function setInit() {
		return { type: 'SET_INIT' };
	}

	function setColorSchemeWithoutSaving(colorScheme) {
		return { type: 'SET_COLOR_SCHEME', colorScheme };
	}

	function setColorScheme(colorScheme) {
		return function (dispatch) {
			mainProcess.saveRemediConfig({ currentColorScheme: colorScheme });

			dispatch(setColorSchemeWithoutSaving(colorScheme));
		};
	}

/***/ }),
/* 129 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getCurrentEditLine = getCurrentEditLine;
	exports.insertReplaceAtCursor = insertReplaceAtCursor;
	exports.getCurrentSlideBgSettingsFromEditor = getCurrentSlideBgSettingsFromEditor;
	function pad(value, text, start, end) {
		var padValue = value;

		if (text[end] !== ' ') {
			padValue = padValue + ' ';
		}
		if (text[start] !== ' ') {
			padValue = ' ' + padValue;
		}

		return padValue;
	}

	/**
	 * @param {options.text} text where the value is to be inserted
	 * @param {options.selectionStart} selectionStart
	 * @param {options.selectionEnd} selectionEnd
	 * @returns
	 */
	function getCurrentEditLine(options) {
		var caretPos = options.selectionStart;
		var start;
		var end;

		for (start = caretPos - 1; start >= 0 && options.text[start - 1] != "\n"; --start);
		for (end = caretPos; end < options.text.length && options.text[end] != "\n"; ++end);

		return {
			start,
			end,
			text: options.text.substring(start, end)
		};
	}

	/**
	 * @param {options.value} value to insert
	 * @param {options.text} text where the value is to be inserted
	 * @param {options.selectionStart} selectionStart
	 * @param {options.selectionEnd} selectionEnd
	 * @param {options.pattern} pattern to match text to replace
	 * @returns
	 */
	function replace(options) {
		var line = getCurrentEditLine(options);
		var re = new RegExp(options.pattern);
		var newLine;

		if (line.text.match(re)) {
			newLine = line.text.replace(re, options.value);
		} else {
			newLine = line.text + pad(options.value, line.text, line.text.length - 1, line.text.length - 1);
		}

		return {
			start: line.start,
			end: line.end,
			text: newLine
		};
	}

	/**
	 * @param {options.value} value to insert
	 * @param {options.text} text where the value is to be inserted
	 * @param {options.selectionStart} selectionStart
	 * @param {options.selectionEnd} selectionEnd
	 * @param {options.pattern} pattern to match text to replace
	 * @returns
	 */
	function insertReplaceAtCursor(options) {
		var value = options.value;
		var finalText = options.text || '';
		var text = options.text || '';
		var selectionEnd = options.selectionEnd;
		var finalSelectionEnd = selectionEnd;
		var selectionStart = options.selectionStart;
		var finalSelectionStart = selectionStart;
		var pattern = options.pattern;

		if (selectionStart || selectionStart == '0') {
			let start;
			let end;
			let valueToInsert;
			options.value = options.value ? options.value.trim() : '';
			let finalPosition;

			if (pattern) {
				let line = replace(options);
				start = line.start;
				end = line.end;
				valueToInsert = line.text;
			} else {
				start = selectionStart;
				end = selectionEnd;
				valueToInsert = value.match(/:::slide|````/) ? value : pad(value, text, start - 1, end);
			}

			finalText = text.substring(0, start) + valueToInsert + text.substring(end, text.length);

			finalPosition = Boolean(valueToInsert.match(/::::?slide|````/)) ? start + valueToInsert.match(/::::?slide[^\n]*(\n|$)|````\n/)[0].length : start + valueToInsert.length;
			finalSelectionStart = finalSelectionEnd = finalPosition;
		} else {
			finalText += value;
		}

		return {
			text: finalText,
			selectionEnd: finalSelectionEnd,
			selectionStart: finalSelectionStart
		};
	}

	function getCurrentSlideBgSettingsFromEditor(editorData) {
		var currentLine = getCurrentEditLine(editorData).text;
		var currentSettings = {};

		if (currentLine.match(/^:+slide/)) {
			let currentSlideAttr = currentLine.replace(/^:+slide */, '').trim().replace(/" /g, '"!').split('!').filter(item => item.match(/^background-[^=]+="[^"]+"/));

			if (currentSlideAttr.length) {
				currentSlideAttr.forEach(item => {
					let itemBits = item.split('=');

					currentSettings[itemBits[0]] = itemBits[1].replace(/"/g, '');
				});
			}
		}

		return currentSettings;
	}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _reactHelmet = __webpack_require__(131);

	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

	var _Menu = __webpack_require__(141);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _Workarea = __webpack_require__(142);

	var _Workarea2 = _interopRequireDefault(_Workarea);

	var _BgPanel = __webpack_require__(149);

	var _BgPanel2 = _interopRequireDefault(_BgPanel);

	var _ConfPanel = __webpack_require__(156);

	var _ConfPanel2 = _interopRequireDefault(_ConfPanel);

	var _ThemesPanel = __webpack_require__(157);

	var _ThemesPanel2 = _interopRequireDefault(_ThemesPanel);

	var _selectors = __webpack_require__(127);

	var _actions = __webpack_require__(128);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		currentFileName: (0, _selectors.getCurrentFileName)(state),
		dirty: (0, _selectors.getDirtyStatus)(state),
		leftPanelOpen: (0, _selectors.getLeftPanelStatus)(state),
		previewOpen: (0, _selectors.getPreviewPanelOpen)(state),
		rightPanelOpen: (0, _selectors.getRightPanelStatus)(state),
		confPanelOpen: (0, _selectors.getConfPanelStatus)(state),
		themesPanelOpen: (0, _selectors.getThemesPanelStatus)(state),
		uiConf: (0, _selectors.getUiConf)(state)
	});

	const mapDispatchToProps = dispatch => ({
		init: () => dispatch((0, _actions.setInit)())
	});

	class App extends _react2.default.Component {
		shouldComponentUpdate(nextProps) {
			return nextProps.uiConf.labels;
		}

		componentDidMount() {
			this.props.init();
		}

		render() {
			if (!this.props.uiConf.labels) {
				return null;
			}

			var classes = 'application';
			if (this.props.leftPanelOpen) classes += ' leftPanelOpen';
			if (this.props.rightPanelOpen) classes += ' rightPanelOpen';
			if (this.props.confPanelOpen) classes += ' confPanelOpen';
			if (this.props.themesPanelOpen) classes += ' themesPanelOpen';
			if (!this.props.uiConf.showButtonText) classes += ' hideButtonText';
			if (this.props.previewOpen) classes += ' previewOn';
			if (this.props.init) classes += ' show';

			var styles = [{
				rel: 'stylesheet',
				href: 'style.css',
				type: 'text/css'
			}, {
				rel: 'stylesheet',
				href: `skins/${this.props.uiConf.currentColorScheme}.css`,
				type: 'text/css'
			}];

			return _react2.default.createElement(
				'div',
				{ className: classes },
				_react2.default.createElement(_reactHelmet2.default, {
					title: `REMEDI${this.props.currentFileName.length ? ' - ' + this.props.currentFileName : ''}${this.props.dirty ? '*' : ''}`,
					link: styles
				}),
				_react2.default.createElement(_Menu2.default, null),
				_react2.default.createElement(_Workarea2.default, null),
				_react2.default.createElement(_BgPanel2.default, null),
				_react2.default.createElement(_ConfPanel2.default, null),
				_react2.default.createElement(_ThemesPanel2.default, null)
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactSideEffect = __webpack_require__(132);

	var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);

	var _deepEqual = __webpack_require__(135);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _objectAssign = __webpack_require__(138);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _HelmetConstants = __webpack_require__(139);

	var _PlainComponent = __webpack_require__(140);

	var _PlainComponent2 = _interopRequireDefault(_PlainComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var HELMET_ATTRIBUTE = "data-react-helmet";

	var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
	    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	};

	var getInnermostProperty = function getInnermostProperty(propsList, property) {
	    for (var i = propsList.length - 1; i >= 0; i--) {
	        var props = propsList[i];

	        if (props[property]) {
	            return props[property];
	        }
	    }
	    return null;
	};

	var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
	    var innermostTitle = getInnermostProperty(propsList, "title");
	    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

	    if (innermostTemplate && innermostTitle) {
	        // use function arg to avoid need to escape $ characters
	        return innermostTemplate.replace(/%s/g, function () {
	            return innermostTitle;
	        });
	    }

	    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

	    return innermostTitle || innermostDefaultTitle || "";
	};

	var getOnChangeClientState = function getOnChangeClientState(propsList) {
	    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
	};

	var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[tagType] !== "undefined";
	    }).map(function (props) {
	        return props[tagType];
	    }).reduce(function (tagAttrs, current) {
	        return _extends({}, tagAttrs, current);
	    }, {});
	};

	var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
	    return propsList.filter(function (props) {
	        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
	    }).map(function (props) {
	        return props[_HelmetConstants.TAG_NAMES.BASE];
	    }).reverse().reduce(function (innermostBaseTag, tag) {
	        if (!innermostBaseTag.length) {
	            var keys = Object.keys(tag);

	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();

	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
	                    return innermostBaseTag.concat(tag);
	                }
	            }
	        }

	        return innermostBaseTag;
	    }, []);
	};

	var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
	    // Calculate list of tags, giving priority innermost component (end of the propslist)
	    var approvedSeenTags = {};

	    return propsList.filter(function (props) {
	        return typeof props[tagName] !== "undefined";
	    }).map(function (props) {
	        return props[tagName];
	    }).reverse().reduce(function (approvedTags, instanceTags) {
	        var instanceSeenTags = {};

	        instanceTags.filter(function (tag) {
	            var primaryAttributeKey = void 0;
	            var keys = Object.keys(tag);
	            for (var i = 0; i < keys.length; i++) {
	                var attributeKey = keys[i];
	                var lowerCaseAttributeKey = attributeKey.toLowerCase();

	                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
	                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
	                    primaryAttributeKey = lowerCaseAttributeKey;
	                }
	                // Special case for innerHTML which doesn't work lowercased
	                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
	                    primaryAttributeKey = attributeKey;
	                }
	            }

	            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
	                return false;
	            }

	            var value = tag[primaryAttributeKey].toLowerCase();

	            if (!approvedSeenTags[primaryAttributeKey]) {
	                approvedSeenTags[primaryAttributeKey] = {};
	            }

	            if (!instanceSeenTags[primaryAttributeKey]) {
	                instanceSeenTags[primaryAttributeKey] = {};
	            }

	            if (!approvedSeenTags[primaryAttributeKey][value]) {
	                instanceSeenTags[primaryAttributeKey][value] = true;
	                return true;
	            }

	            return false;
	        }).reverse().forEach(function (tag) {
	            return approvedTags.push(tag);
	        });

	        // Update seen tags with tags from this instance
	        var keys = Object.keys(instanceSeenTags);
	        for (var i = 0; i < keys.length; i++) {
	            var attributeKey = keys[i];
	            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

	            approvedSeenTags[attributeKey] = tagUnion;
	        }

	        return approvedTags;
	    }, []).reverse();
	};

	var updateTitle = function updateTitle(title, attributes) {
	    document.title = title || document.title;
	    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
	};

	var updateAttributes = function updateAttributes(tagName, attributes) {
	    var htmlTag = document.getElementsByTagName(tagName)[0];
	    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
	    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
	    var attributesToRemove = [].concat(helmetAttributes);
	    var attributeKeys = Object.keys(attributes);

	    for (var i = 0; i < attributeKeys.length; i++) {
	        var attribute = attributeKeys[i];
	        var value = attributes[attribute] || "";
	        htmlTag.setAttribute(attribute, value);

	        if (helmetAttributes.indexOf(attribute) === -1) {
	            helmetAttributes.push(attribute);
	        }

	        var indexToSave = attributesToRemove.indexOf(attribute);
	        if (indexToSave !== -1) {
	            attributesToRemove.splice(indexToSave, 1);
	        }
	    }

	    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
	        htmlTag.removeAttribute(attributesToRemove[_i]);
	    }

	    if (helmetAttributes.length === attributesToRemove.length) {
	        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
	    } else {
	        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
	    }
	};

	var updateTags = function updateTags(type, tags) {
	    var headElement = document.head || document.querySelector("head");
	    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
	    var oldTags = Array.prototype.slice.call(tagNodes);
	    var newTags = [];
	    var indexToDelete = void 0;

	    if (tags && tags.length) {
	        tags.forEach(function (tag) {
	            var newElement = document.createElement(type);

	            for (var attribute in tag) {
	                if (tag.hasOwnProperty(attribute)) {
	                    if (attribute === "innerHTML") {
	                        newElement.innerHTML = tag.innerHTML;
	                    } else if (attribute === "cssText") {
	                        if (newElement.styleSheet) {
	                            newElement.styleSheet.cssText = tag.cssText;
	                        } else {
	                            newElement.appendChild(document.createTextNode(tag.cssText));
	                        }
	                    } else {
	                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
	                        newElement.setAttribute(attribute, value);
	                    }
	                }
	            }

	            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

	            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
	            if (oldTags.some(function (existingTag, index) {
	                indexToDelete = index;
	                return newElement.isEqualNode(existingTag);
	            })) {
	                oldTags.splice(indexToDelete, 1);
	            } else {
	                newTags.push(newElement);
	            }
	        });
	    }

	    oldTags.forEach(function (tag) {
	        return tag.parentNode.removeChild(tag);
	    });
	    newTags.forEach(function (tag) {
	        return headElement.appendChild(tag);
	    });

	    return {
	        oldTags: oldTags,
	        newTags: newTags
	    };
	};

	var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
	    return Object.keys(attributes).reduce(function (str, key) {
	        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
	        return str ? str + " " + attr : attr;
	    }, "");
	};

	var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
	    var attributeString = generateHtmlAttributesAsString(attributes);
	    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(title) + "</" + type + ">";
	};

	var generateTagsAsString = function generateTagsAsString(type, tags) {
	    return tags.reduce(function (str, tag) {
	        var attributeHtml = Object.keys(tag).filter(function (attribute) {
	            return !(attribute === "innerHTML" || attribute === "cssText");
	        }).reduce(function (string, attribute) {
	            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
	            return string ? string + " " + attr : attr;
	        }, "");

	        var tagContent = tag.innerHTML || tag.cssText || "";

	        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

	        return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
	    }, "");
	};

	var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
	    // assigning into an array to define toString function on it
	    var initProps = _defineProperty({
	        key: title
	    }, HELMET_ATTRIBUTE, true);
	    var props = Object.keys(attributes).reduce(function (obj, key) {
	        obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
	        return obj;
	    }, initProps);

	    return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
	};

	var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
	    return tags.map(function (tag, i) {
	        var mappedTag = _defineProperty({
	            key: i
	        }, HELMET_ATTRIBUTE, true);

	        Object.keys(tag).forEach(function (attribute) {
	            var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;

	            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
	                var content = tag.innerHTML || tag.cssText;
	                mappedTag.dangerouslySetInnerHTML = { __html: content };
	            } else {
	                mappedTag[mappedAttribute] = tag[attribute];
	            }
	        });

	        return _react2.default.createElement(type, mappedTag);
	    });
	};

	var getMethodsForTag = function getMethodsForTag(type, tags) {
	    switch (type) {
	        case _HelmetConstants.TAG_NAMES.TITLE:
	            return {
	                toComponent: function toComponent() {
	                    return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes);
	                },
	                toString: function toString() {
	                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
	                }
	            };
	        case _HelmetConstants.TAG_NAMES.HTML:
	            return {
	                toComponent: function toComponent() {
	                    return tags;
	                },
	                toString: function toString() {
	                    return generateHtmlAttributesAsString(tags);
	                }
	            };
	        default:
	            return {
	                toComponent: function toComponent() {
	                    return generateTagsAsReactComponent(type, tags);
	                },
	                toString: function toString() {
	                    return generateTagsAsString(type, tags);
	                }
	            };
	    }
	};

	var mapStateOnServer = function mapStateOnServer(_ref) {
	    var htmlAttributes = _ref.htmlAttributes,
	        title = _ref.title,
	        titleAttributes = _ref.titleAttributes,
	        baseTag = _ref.baseTag,
	        metaTags = _ref.metaTags,
	        linkTags = _ref.linkTags,
	        scriptTags = _ref.scriptTags,
	        noscriptTags = _ref.noscriptTags,
	        styleTags = _ref.styleTags;
	    return {
	        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
	        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
	        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
	        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
	        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
	        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
	        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
	        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
	    };
	};

	var Helmet = function Helmet(Component) {
	    var _class, _temp;

	    return _temp = _class = function (_React$Component) {
	        _inherits(HelmetWrapper, _React$Component);

	        function HelmetWrapper() {
	            _classCallCheck(this, HelmetWrapper);

	            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
	        }

	        _createClass(HelmetWrapper, [{
	            key: "shouldComponentUpdate",
	            value: function shouldComponentUpdate(nextProps) {
	                return !(0, _deepEqual2.default)(this.props, nextProps);
	            }
	        }, {
	            key: "render",
	            value: function render() {
	                return _react2.default.createElement(Component, this.props);
	            }
	        }], [{
	            key: "canUseDOM",


	            // Component.peek comes from react-side-effect:
	            // For testing, you may use a static peek() method available on the returned component.
	            // It lets you get the current state without resetting the mounted instance stack.
	            // Don’t use it for anything other than testing.
	            set: function set(canUseDOM) {
	                Component.canUseDOM = canUseDOM;
	            }
	            /**
	             * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
	             * @param {String} title: "Title"
	             * @param {String} defaultTitle: "Default Title"
	             * @param {String} titleTemplate: "MySite.com - %s"
	             * @param {Object} titleAttributes: {"itemprop": "name"}
	             * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
	             * @param {Array} meta: [{"name": "description", "content": "Test description"}]
	             * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
	             * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
	             * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
	             * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
	             * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
	             */

	        }]);

	        return HelmetWrapper;
	    }(_react2.default.Component), _class.propTypes = {
	        htmlAttributes: _react2.default.PropTypes.object,
	        title: _react2.default.PropTypes.string,
	        defaultTitle: _react2.default.PropTypes.string,
	        titleTemplate: _react2.default.PropTypes.string,
	        titleAttributes: _react2.default.PropTypes.object,
	        base: _react2.default.PropTypes.object,
	        meta: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	        link: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	        script: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	        noscript: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	        style: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	        onChangeClientState: _react2.default.PropTypes.func
	    }, _class.peek = Component.peek, _class.rewind = function () {
	        var mappedState = Component.rewind();
	        if (!mappedState) {
	            // provide fallback if mappedState is undefined
	            mappedState = mapStateOnServer({
	                htmlAttributes: {},
	                title: "",
	                titleAttributes: {},
	                baseTag: [],
	                metaTags: [],
	                linkTags: [],
	                scriptTags: [],
	                noscriptTags: [],
	                styleTags: []
	            });
	        }

	        return mappedState;
	    }, _temp;
	};

	var reducePropsToState = function reducePropsToState(propsList) {
	    return {
	        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
	        title: getTitleFromPropsList(propsList),
	        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
	        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
	        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
	        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
	        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
	        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
	        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
	        onChangeClientState: getOnChangeClientState(propsList)
	    };
	};

	var handleClientStateChange = function handleClientStateChange(newState) {
	    var htmlAttributes = newState.htmlAttributes,
	        title = newState.title,
	        titleAttributes = newState.titleAttributes,
	        baseTag = newState.baseTag,
	        metaTags = newState.metaTags,
	        linkTags = newState.linkTags,
	        scriptTags = newState.scriptTags,
	        noscriptTags = newState.noscriptTags,
	        styleTags = newState.styleTags,
	        onChangeClientState = newState.onChangeClientState;


	    updateAttributes("html", htmlAttributes);

	    updateTitle(title, titleAttributes);

	    var tagUpdates = {
	        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
	        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
	        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
	        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
	        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
	        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
	    };

	    var addedTags = {};
	    var removedTags = {};

	    Object.keys(tagUpdates).forEach(function (tagType) {
	        var _tagUpdates$tagType = tagUpdates[tagType],
	            newTags = _tagUpdates$tagType.newTags,
	            oldTags = _tagUpdates$tagType.oldTags;


	        if (newTags.length) {
	            addedTags[tagType] = newTags;
	        }
	        if (oldTags.length) {
	            removedTags[tagType] = tagUpdates[tagType].oldTags;
	        }
	    });

	    onChangeClientState(newState, addedTags, removedTags);
	};

	var HelmetSideEffects = (0, _reactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(_PlainComponent2.default);

	exports.default = Helmet(HelmetSideEffects);
	module.exports = exports["default"];

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _exenv = __webpack_require__(133);

	var _exenv2 = _interopRequireDefault(_exenv);

	var _shallowequal = __webpack_require__(134);

	var _shallowequal2 = _interopRequireDefault(_shallowequal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
	  if (typeof reducePropsToState !== 'function') {
	    throw new Error('Expected reducePropsToState to be a function.');
	  }
	  if (typeof handleStateChangeOnClient !== 'function') {
	    throw new Error('Expected handleStateChangeOnClient to be a function.');
	  }
	  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
	    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
	  }

	  function getDisplayName(WrappedComponent) {
	    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	  }

	  return function wrap(WrappedComponent) {
	    if (typeof WrappedComponent !== 'function') {
	      throw new Error('Expected WrappedComponent to be a React component.');
	    }

	    var mountedInstances = [];
	    var state = void 0;

	    function emitChange() {
	      state = reducePropsToState(mountedInstances.map(function (instance) {
	        return instance.props;
	      }));

	      if (SideEffect.canUseDOM) {
	        handleStateChangeOnClient(state);
	      } else if (mapStateOnServer) {
	        state = mapStateOnServer(state);
	      }
	    }

	    var SideEffect = function (_Component) {
	      _inherits(SideEffect, _Component);

	      function SideEffect() {
	        _classCallCheck(this, SideEffect);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	      }

	      // Try to use displayName of wrapped component
	      SideEffect.peek = function peek() {
	        return state;
	      };

	      // Expose canUseDOM so tests can monkeypatch it


	      SideEffect.rewind = function rewind() {
	        if (SideEffect.canUseDOM) {
	          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
	        }

	        var recordedState = state;
	        state = undefined;
	        mountedInstances = [];
	        return recordedState;
	      };

	      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return !(0, _shallowequal2.default)(nextProps, this.props);
	      };

	      SideEffect.prototype.componentWillMount = function componentWillMount() {
	        mountedInstances.push(this);
	        emitChange();
	      };

	      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
	        emitChange();
	      };

	      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
	        var index = mountedInstances.indexOf(this);
	        mountedInstances.splice(index, 1);
	        emitChange();
	      };

	      SideEffect.prototype.render = function render() {
	        return _react2.default.createElement(WrappedComponent, this.props);
	      };

	      return SideEffect;
	    }(_react.Component);

	    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
	    SideEffect.canUseDOM = _exenv2.default.canUseDOM;


	    return SideEffect;
	  };
	};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/
	/* global define */

	(function () {
		'use strict';

		var canUseDOM = !!(
			typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
		);

		var ExecutionEnvironment = {

			canUseDOM: canUseDOM,

			canUseWorkers: typeof Worker !== 'undefined',

			canUseEventListeners:
				canUseDOM && !!(window.addEventListener || window.attachEvent),

			canUseViewport: canUseDOM && !!window.screen

		};

		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return ExecutionEnvironment;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}

	}());


/***/ }),
/* 134 */
/***/ (function(module, exports) {

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {

	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

	    if(ret !== void 0) {
	        return !!ret;
	    }

	    if(objA === objB) {
	        return true;
	    }

	    if(typeof objA !== 'object' || !objA ||
	       typeof objB !== 'object' || !objB) {
	        return false;
	    }

	    var keysA = Object.keys(objA);
	    var keysB = Object.keys(objB);

	    if(keysA.length !== keysB.length) {
	        return false;
	    }

	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

	    // Test for A's keys different from B.
	    for(var idx = 0; idx < keysA.length; idx++) {

	        var key = keysA[idx];

	        if(!bHasOwnProperty(key)) {
	            return false;
	        }

	        var valueA = objA[key];
	        var valueB = objB[key];

	        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

	        if(ret === false ||
	           ret === void 0 && valueA !== valueB) {
	            return false;
	        }

	    }

	    return true;

	};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(136);
	var isArguments = __webpack_require__(137);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ }),
/* 136 */
/***/ (function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ }),
/* 137 */
/***/ (function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ }),
/* 138 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }),
/* 139 */
/***/ (function(module, exports) {

	exports.__esModule = true;
	var TAG_NAMES = exports.TAG_NAMES = {
	    HTML: "htmlAttributes",
	    TITLE: "title",
	    BASE: "base",
	    META: "meta",
	    LINK: "link",
	    SCRIPT: "script",
	    NOSCRIPT: "noscript",
	    STYLE: "style"
	};

	var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
	    NAME: "name",
	    CHARSET: "charset",
	    HTTPEQUIV: "http-equiv",
	    REL: "rel",
	    HREF: "href",
	    PROPERTY: "property",
	    SRC: "src",
	    INNER_HTML: "innerHTML",
	    CSS_TEXT: "cssText",
	    ITEM_PROP: "itemprop"
	};

	var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
	    "charset": "charSet",
	    "http-equiv": "httpEquiv",
	    "itemprop": "itemProp",
	    "class": "className"
	};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlainComponent = function (_React$Component) {
	    _inherits(PlainComponent, _React$Component);

	    function PlainComponent() {
	        _classCallCheck(this, PlainComponent);

	        return _possibleConstructorReturn(this, (PlainComponent.__proto__ || Object.getPrototypeOf(PlainComponent)).apply(this, arguments));
	    }

	    _createClass(PlainComponent, [{
	        key: "render",
	        value: function render() {
	            return null;
	        }
	    }]);

	    return PlainComponent;
	}(_react2.default.Component);

	exports.default = PlainComponent;
	module.exports = exports["default"];

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _electron = __webpack_require__(1);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _fileActions = __webpack_require__(125);

	var _actions = __webpack_require__(128);

	var _selectors = __webpack_require__(127);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		label: (0, _selectors.getLabel)(state),
		currentFileName: (0, _selectors.getCurrentFileName)(state),
		currentTheme: (0, _selectors.getCurrentTheme)(state),
		configuration: (0, _selectors.getConfiguration)(state),
		uiConf: (0, _selectors.getUiConf)(state),
		recentFiles: (0, _selectors.getRecentFiles)(state),
		previewOpen: (0, _selectors.getPreviewPanelOpen)(state)
	});

	const mapDispatchToProps = dispatch => ({
		openFile: filePath => dispatch((0, _fileActions.openFile)(filePath)),
		saveProject: () => dispatch((0, _fileActions.saveProject)()),
		saveMd: () => dispatch((0, _fileActions.saveMd)()),
		saveCurrentMd: () => dispatch((0, _fileActions.saveCurrentMd)()),
		saveHtml: () => dispatch((0, _fileActions.saveHtml)()),
		copyHtmlToClipboard: () => dispatch((0, _actions.copyHtmlToClipboard)()),
		showInFolder: () => dispatch((0, _fileActions.showInFolder)()),
		openInEditor: () => dispatch((0, _fileActions.openInEditor)()),
		insert: (text, pattern) => dispatch((0, _actions.insert)(text, pattern)),
		insertImage: () => dispatch((0, _actions.insertImage)()),
		openSlideBgPanel: () => dispatch((0, _actions.openSlideBgPanel)()),
		togglePreviewPanel: () => dispatch((0, _actions.togglePreviewPanel)()),
		openPreviewWin: () => dispatch((0, _actions.openPreviewWin)()),
		setColorScheme: colorScheme => dispatch((0, _actions.setColorScheme)(colorScheme)),
		setTheme: themeName => dispatch((0, _actions.setTheme)(themeName)),
		setTransition: transitionName => dispatch((0, _actions.setTransition)(transitionName)),
		setConfiguration: newConf => dispatch((0, _actions.setConfiguration)(newConf)),
		openConfPanel: () => dispatch((0, _actions.openConfPanel)()),
		setUiConf: newConf => dispatch((0, _actions.setUiConf)(newConf)),
		changeLanguage: newIso => dispatch((0, _actions.changeLanguage)(newIso)),
		openThemesPanel: () => dispatch((0, _actions.openThemesPanel)())
	});

	class Menu extends _react2.default.Component {
		constructor(props) {
			super(props);

			this.transitions = ['None', 'Slide', 'Fade', 'Convex', 'Concave', 'Zoom'];
		}

		getFileItems() {
			const currentFile = Boolean(this.props.currentFileName.length);
			var fileItems = [{
				label: this.props.label('Open a markdown file...'),
				accelerator: 'CmdOrCtrl+O',
				click: () => this.props.openFile()
			}, {
				label: this.props.label('Save presentation...'),
				click: this.props.saveProject
			}, {
				label: this.props.label('Save markdown only...'),
				accelerator: !currentFile ? 'CmdOrCtrl+S' : null,
				visible: !currentFile,
				click: this.props.saveMd
			}, {
				label: this.props.label('Save') + ' ' + this.props.currentFileName,
				accelerator: currentFile ? 'CmdOrCtrl+S' : null,
				click: this.props.saveCurrentMd,
				visible: currentFile
			}, {
				label: this.props.label('Save HTML only...'),
				click: this.props.saveHtml
			}, {
				label: this.props.label('Copy HTML to clipboard'),
				click: this.props.copyHtmlToClipboard
			}, {
				label: this.props.label('Show in file system'),
				enabled: Boolean(this.props.currentFileName.length),
				click: this.props.showInFolder
			}, {
				label: this.props.label('Open in default editor'),
				enabled: Boolean(this.props.currentFileName.length),
				click: this.props.openInEditor
			}];

			if (this.props.recentFiles.length) {
				const recenfFilesItems = this.props.recentFiles.map(filePath => ({
					label: filePath,
					click: () => this.props.openFile(filePath)
				}));

				fileItems = fileItems.concat({
					type: 'separator'
				}, recenfFilesItems);
			}

			return fileItems;
		}

		getInsertMenuItems(slideTransitionMenuItem) {
			const insertMenuItems = [{
				label: this.props.label('Presentation slide'),
				accelerator: 'CommandOrControl+Shift+S',
				click: () => {
					this.props.insert('::::slide\n\n::::');
				}
			}, {
				label: this.props.label('Nested slide'),
				accelerator: 'CommandOrControl+Shift+N',
				click: () => {
					this.props.insert(':::slide\n\n:::');
				}
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Code block'),
				accelerator: 'CommandOrControl+Shift+C',
				click: () => {
					this.props.insert('````\n\n````');
				}
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Image'),
				accelerator: 'CommandOrControl+Shift+I',
				click: () => {
					this.props.insertImage();
				}
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Fragment fade in'),
				accelerator: 'CommandOrControl+Shift+F',
				click: () => {
					this.props.insert('{fragment}', '{fragment[^}]*}');
				}
			}];

			['Fragment grow', 'Fragment shrink', 'Fragment fade-out', 'Fragment fade-up', 'Fragment current-visible', 'Fragment highlight-current-blue', 'Fragment highlight-red', 'Fragment highlight-green', 'Fragment highlight-blue'].forEach(fragmentName => {
				insertMenuItems.push({
					label: this.props.label(fragmentName),
					click: () => {
						this.props.insert(`{${fragmentName.toLowerCase()}}`, '{fragment[^}]*}');
					}
				});
			});

			insertMenuItems.push({
				type: 'separator'
			}, {
				label: this.props.label('Individual slide transition'),
				submenu: slideTransitionMenuItem
			}, {
				type: 'separator'
			}, {
				label: this.props.label('Slide class'),
				click: () => this.props.insert('class=""', 'class="[^"]*"')
			}, {
				label: this.props.label('Slide id'),
				click: () => this.props.insert('id=""', 'id="[^"]*"')
			}, {
				label: this.props.label('Slide background...'),
				enabled: !this.props.previewOpen,
				accelerator: 'CommandOrControl+Shift+B',
				click: this.props.openSlideBgPanel
			});

			return insertMenuItems;
		}

		getThemeMenuItems() {
			const themes = ['Black', 'White', 'League', 'Beige', 'Sky', 'Night', 'Serif', 'Simple'];

			const themeMenuItems = themes.map(themeName => ({
				label: this.props.label(themeName),
				type: 'checkbox',
				checked: this.props.currentTheme === themeName.toLowerCase(),
				click: () => this.props.setTheme(themeName.toLowerCase())
			})).concat([{
				type: 'separator'
			}, {
				label: this.props.label('Custom themes'),
				enabled: Boolean(this.props.uiConf.customThemes.length),
				submenu: this.props.uiConf.customThemes.map(themeName => ({
					label: themeName,
					type: 'checkbox',
					checked: this.props.currentTheme === themeName,
					click: () => this.props.setTheme(themeName.toLowerCase())
				}))
			}, {
				label: this.props.label('Manage custom themes'),
				click: this.props.openThemesPanel
			}]);

			return themeMenuItems;
		}

		getLanguageMenuItems() {
			return this.props.uiConf.languages.map(iso => ({
				label: iso,
				type: 'radio',
				checked: this.props.uiConf.currentLanguage === iso,
				click: menuItem => {
					this.props.setUiConf({ currentLanguage: menuItem.label });
					this.props.changeLanguage(menuItem.label);
				}
			}));
		}

		getColorSchemeMenuItems() {
			return this.props.uiConf.colorSchemes.map(fileName => ({
				label: fileName,
				type: 'radio',
				checked: this.props.uiConf.currentColorScheme === fileName,
				click: menuItem => {
					this.props.setColorScheme(menuItem.label);
				}
			}));
		}

		getSlideTransitionMenuItem() {
			return this.transitions.slice(1).map(transitionName => ({
				label: this.props.label(transitionName),
				click: () => this.props.insert(`transition="${transitionName.toLowerCase()}"', 'transition="[^"]+"`)
			}));
		}

		getTransitionMenuItems() {
			return this.transitions.map(transitionName => ({
				label: this.props.label(transitionName),
				type: 'radio',
				checked: this.props.configuration.transition === transitionName.toLowerCase(),
				click: () => this.props.setTransition(transitionName.toLowerCase())
			}));
		}

		getTemplate() {
			const fileItems = this.getFileItems();
			const transitionMenuItems = this.getTransitionMenuItems();
			const insertMenuItems = this.getInsertMenuItems(transitionMenuItems);
			const themeMenuItems = this.getThemeMenuItems();
			const languageMenuItems = this.getLanguageMenuItems();
			const colorSchemesMenuItems = this.getColorSchemeMenuItems();
			const slideTransitionMenuItem = this.getSlideTransitionMenuItem();

			return [{
				label: this.props.label('File'),
				submenu: fileItems
			}, {
				label: this.props.label('Edit'),
				enabled: !this.props.previewOpen,
				submenu: [{
					label: this.props.label('Undo'),
					accelerator: 'CmdOrCtrl+Z',
					role: 'undo'
				}, {
					label: this.props.label('Redo'),
					accelerator: 'Shift+CmdOrCtrl+Z',
					role: 'redo'
				}, {
					type: 'separator'
				}, {
					label: this.props.label('Find'),
					accelerator: 'CmdOrCtrl+F',
					role: 'find'
				}, {
					label: this.props.label('Replace'),
					accelerator: 'CmdOrCtrl+R',
					role: 'replace'
				}, {
					type: 'separator'
				}, {
					label: this.props.label('Cut'),
					accelerator: 'CmdOrCtrl+X',
					role: 'cut'
				}, {
					label: this.props.label('Copy'),
					accelerator: 'CmdOrCtrl+C',
					role: 'copy'
				}, {
					label: this.props.label('Paste'),
					accelerator: 'CmdOrCtrl+V',
					role: 'paste'
				}, {
					label: this.props.label('Select All'),
					accelerator: 'CmdOrCtrl+A',
					role: 'selectall'
				}]
			}, {
				label: this.props.label('Insert'),
				enabled: !this.props.previewOpen,
				submenu: insertMenuItems
			}, {
				label: this.props.label('Preview'),
				submenu: [{
					label: this.props.label('Show preview in this window'),
					accelerator: 'CmdOrCtrl+P',
					type: 'checkbox',
					checked: this.props.uiConf.previewPanelOpen,
					click: this.props.togglePreviewPanel
				}
				// , {
				// 	label: this.props.label('Open preview in a new window'),
				// 	accelerator: 'CommandOrControl+Shift+P',
				// 	click: this.props.openPreviewWin
				// }
				]
			}, {
				label: this.props.label('Theme'),
				submenu: themeMenuItems
			}, {
				label: this.props.label('Transition'),
				submenu: transitionMenuItems
			}, {
				label: this.props.label('Configuration'),
				submenu: [{
					label: this.props.label('Display controls in the bottom right corner'),
					type: 'checkbox',
					checked: this.props.configuration.controls,
					click: menuItem => this.props.setConfiguration({ controls: menuItem.checked })
				}, {
					label: this.props.label('Show progress'),
					type: 'checkbox',
					checked: this.props.configuration.progress,
					click: menuItem => this.props.setConfiguration({ progress: menuItem.checked })
				}, {
					label: this.props.label('Show slide number'),
					type: 'checkbox',
					checked: this.props.configuration.slideNumber,
					click: menuItem => this.props.setConfiguration({ slideNumber: menuItem.checked })
				}, {
					label: this.props.label('Push each slide to the browser history'),
					type: 'checkbox',
					checked: this.props.configuration.history,
					click: menuItem => this.props.setConfiguration({ history: menuItem.checked })
				}, {
					label: this.props.label('Keyboard navigation'),
					type: 'checkbox',
					checked: this.props.configuration.keyboard,
					click: menuItem => this.props.setConfiguration({ keyboard: menuItem.checked })
				}, {
					label: this.props.label('Enable the slide overview mode'),
					type: 'checkbox',
					checked: this.props.configuration.overview,
					click: menuItem => this.props.setConfiguration({ overview: menuItem.checked })

				}, {
					label: this.props.label('Vertical centering of slides'),
					type: 'checkbox',
					checked: this.props.configuration.center,
					click: menuItem => this.props.setConfiguration({ center: menuItem.checked })
				}, {
					label: this.props.label('Enables touch navigation'),
					type: 'checkbox',
					checked: this.props.configuration.touch,
					click: menuItem => this.props.setConfiguration({ touch: menuItem.checked })
				}, {
					label: this.props.label('Loop the presentation'),
					type: 'checkbox',
					checked: this.props.configuration.loop,
					click: menuItem => this.props.setConfiguration({ loop: menuItem.checked })
				}, {
					label: this.props.label('Change the presentation direction to be RTL'),
					type: 'checkbox',
					checked: this.props.configuration.rtl,
					click: menuItem => this.props.setConfiguration({ rtl: menuItem.checked })
				}, {
					label: this.props.label('Randomizes the slide order at presentation load'),
					type: 'checkbox',
					checked: this.props.configuration.shuffle,
					click: menuItem => this.props.setConfiguration({ shuffle: menuItem.checked })
				}, {
					label: this.props.label('Turn fragments on'),
					type: 'checkbox',
					checked: this.props.configuration.fragments,
					click: menuItem => this.props.setConfiguration({ fragments: menuItem.checked })
				}, {
					label: this.props.label('Embedded'),
					type: 'checkbox',
					checked: this.props.configuration.embedded,
					click: menuItem => this.props.setConfiguration({ embedded: menuItem.checked })
				}, {
					label: this.props.label('Show a help overlay when ? is pressed'),
					type: 'checkbox',
					checked: this.props.configuration.help,
					click: menuItem => this.props.setConfiguration({ help: menuItem.checked })
				}, {
					label: this.props.label('Show speaker notes'),
					type: 'checkbox',
					checked: this.props.configuration.showNotes,
					click: menuItem => this.props.setConfiguration({ showNotes: menuItem.checked })
				}, {
					label: this.props.label('Stop auto-sliding after user input'),
					type: 'checkbox',
					checked: this.props.configuration.autoSlideStoppable,
					click: menuItem => this.props.setConfiguration({ autoSlideStoppable: menuItem.checked })
				}, {
					label: this.props.label('Enable slide navigation via mouse wheel'),
					type: 'checkbox',
					checked: this.props.configuration.mouseWheel,
					click: menuItem => this.props.setConfiguration({ mouseWheel: menuItem.checked })
				}, {
					label: this.props.label('Hides the address bar on mobile devices'),
					type: 'checkbox',
					checked: this.props.configuration.hideAddressBar,
					click: menuItem => this.props.setConfiguration({ hideAddressBar: menuItem.checked })
				}, {
					label: this.props.label('Opens links in an iframe preview overlay'),
					type: 'checkbox',
					checked: this.props.configuration.previewLinks,
					click: menuItem => this.props.setConfiguration({ previewLinks: menuItem.checked })
				}, {
					label: this.props.label('Other configuration...'),
					click: this.props.openConfPanel
				}]
			}, {
				label: this.props.label('Interface'),
				enabled: !this.props.previewOpen,
				submenu: [{
					label: this.props.label('Change color scheme'),
					submenu: colorSchemesMenuItems
				}, {
					label: this.props.label('Set language'),
					submenu: languageMenuItems
				}, {
					label: this.props.label('Show button text'),
					type: 'checkbox',
					checked: this.props.uiConf.showButtonText,
					click: menuItem => {
						this.props.setUiConf({ showButtonText: menuItem.checked });
					}
				}]
			}, {
				label: 'Developer',
				submenu: [{
					label: 'Toggle Developer Tools',
					accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'F12',
					click() {
						_electron.remote.getCurrentWindow().webContents.toggleDevTools();
					}
				}]
			}];
		}

		buildMenu() {
			const menu = _electron.remote.Menu.buildFromTemplate(this.getTemplate());
			_electron.remote.Menu.setApplicationMenu(menu);
		}

		render() {
			if (this.props.uiConf.labels) {
				this.buildMenu();
			}

			return null;
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Menu);

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactScrollSync = __webpack_require__(143);

	var _Controls = __webpack_require__(144);

	var _Controls2 = _interopRequireDefault(_Controls);

	var _Md = __webpack_require__(146);

	var _Md2 = _interopRequireDefault(_Md);

	var _Html = __webpack_require__(147);

	var _Html2 = _interopRequireDefault(_Html);

	var _Preview = __webpack_require__(148);

	var _Preview2 = _interopRequireDefault(_Preview);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const Workarea = () => _react2.default.createElement(
		'div',
		{ className: 'workarea' },
		_react2.default.createElement(_Controls2.default, null),
		_react2.default.createElement(
			'div',
			{ className: 'mainWrapper' },
			_react2.default.createElement(
				'section',
				{ className: 'editor' },
				_react2.default.createElement(
					_reactScrollSync.ScrollSync,
					null,
					_react2.default.createElement(
						'section',
						{ className: 'content' },
						_react2.default.createElement(_Md2.default, null),
						_react2.default.createElement(_Html2.default, null)
					)
				)
			)
		),
		_react2.default.createElement(_Preview2.default, null)
	);

		exports.default = Workarea;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2), __webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["react", "react-dom"], factory);
		else if(typeof exports === 'object')
			exports["ScrollSync"] = factory(require("react"), require("react-dom"));
		else
			root["ScrollSync"] = factory(root["react"], root["react-dom"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_13__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _ScrollSync = __webpack_require__(1);
		
		Object.defineProperty(exports, 'ScrollSync', {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_ScrollSync).default;
		  }
		});
		
		var _ScrollSyncPane = __webpack_require__(12);
		
		Object.defineProperty(exports, 'ScrollSyncPane', {
		  enumerable: true,
		  get: function get() {
		    return _interopRequireDefault(_ScrollSyncPane).default;
		  }
		});

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _react = __webpack_require__(2);
		
		var _react2 = _interopRequireDefault(_react);
		
		var _propTypes = __webpack_require__(3);
		
		var _propTypes2 = _interopRequireDefault(_propTypes);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
		/**
		 * ScrollSync provider component
		 *
		 */
		
		var ScrollSync = function (_Component) {
		  _inherits(ScrollSync, _Component);
		
		  function ScrollSync() {
		    var _ref;
		
		    var _temp, _this, _ret;
		
		    _classCallCheck(this, ScrollSync);
		
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }
		
		    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScrollSync.__proto__ || Object.getPrototypeOf(ScrollSync)).call.apply(_ref, [this].concat(args))), _this), _this.panes = [], _this.registerPane = function (node) {
		      if (!_this.findPane(node)) {
		        _this.addEvents(node);
		        _this.panes.push(node);
		      }
		    }, _this.unregisterPane = function (node) {
		      if (_this.findPane(node)) {
		        _this.removeEvents(node);
		        _this.panes.splice(_this.panes.indexOf(node), 1);
		      }
		    }, _this.addEvents = function (node) {
		      /* For some reason element.addEventListener doesnt work with document.body */
		      node.onscroll = _this.handlePaneScroll.bind(_this, node); // eslint-disable-line
		    }, _this.removeEvents = function (node) {
		      /* For some reason element.removeEventListener doesnt work with document.body */
		      node.onscroll = null; // eslint-disable-line
		    }, _this.findPane = function (node) {
		      return _this.panes.find(function (pane) {
		        return pane === node;
		      });
		    }, _this.handlePaneScroll = function (node) {
		      window.requestAnimationFrame(function () {
		        _this.syncScrollPositions(node);
		      });
		    }, _this.syncScrollPositions = function (scrolledPane) {
		      var scrollTop = scrolledPane.scrollTop,
		          scrollHeight = scrolledPane.scrollHeight,
		          clientHeight = scrolledPane.clientHeight,
		          scrollLeft = scrolledPane.scrollLeft,
		          scrollWidth = scrolledPane.scrollWidth,
		          clientWidth = scrolledPane.clientWidth;
		      var _this$props = _this.props,
		          proportional = _this$props.proportional,
		          vertical = _this$props.vertical,
		          horizontal = _this$props.horizontal;
		
		
		      _this.panes.forEach(function (pane) {
		        /* For all panes beside the currently scrolling one */
		        if (scrolledPane !== pane) {
		          /* Remove event listeners from the node that we'll manipulate */
		          _this.removeEvents(pane);
		          /* Calculate the actual pane height */
		          var paneHeight = pane.scrollHeight - clientHeight;
		          var paneWidth = pane.scrollWidth - clientWidth;
		          /* Adjust the scrollTop position of it accordingly */
		          if (vertical) {
		            pane.scrollTop = proportional ? paneHeight * scrollTop / (scrollHeight - clientHeight) : scrollTop; // eslint-disable-line
		          }
		          if (horizontal) {
		            pane.scrollLeft = proportional ? paneWidth * scrollLeft / (scrollWidth - clientWidth) : scrollLeft; // eslint-disable-line
		          }
		          /* Re-attach event listeners after we're done scrolling */
		          window.requestAnimationFrame(function () {
		            _this.addEvents(pane);
		          });
		        }
		      });
		    }, _temp), _possibleConstructorReturn(_this, _ret);
		  }
		
		  _createClass(ScrollSync, [{
		    key: 'getChildContext',
		    value: function getChildContext() {
		      return {
		        registerPane: this.registerPane,
		        unregisterPane: this.unregisterPane
		      };
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      return _react2.default.Children.only(this.props.children);
		    }
		  }]);
		
		  return ScrollSync;
		}(_react.Component);
		
		ScrollSync.propTypes = {
		  children: _propTypes2.default.element.isRequired,
		  proportional: _propTypes2.default.bool,
		  vertical: _propTypes2.default.bool,
		  horizontal: _propTypes2.default.bool
		};
		ScrollSync.defaultProps = {
		  proportional: true,
		  vertical: true,
		  horizontal: true
		};
		ScrollSync.childContextTypes = {
		  registerPane: _propTypes2.default.func,
		  unregisterPane: _propTypes2.default.func
		};
		exports.default = ScrollSync;
		module.exports = exports['default'];

	/***/ }),
	/* 2 */
	/***/ (function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		if (process.env.NODE_ENV !== 'production') {
		  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
		    Symbol.for &&
		    Symbol.for('react.element')) ||
		    0xeac7;
		
		  var isValidElement = function(object) {
		    return typeof object === 'object' &&
		      object !== null &&
		      object.$$typeof === REACT_ELEMENT_TYPE;
		  };
		
		  // By explicitly using `prop-types` you are opting into new development behavior.
		  // http://fb.me/prop-types-in-prod
		  var throwOnDirectAccess = true;
		  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
		} else {
		  // By explicitly using `prop-types` you are opting into new production behavior.
		  // http://fb.me/prop-types-in-prod
		  module.exports = __webpack_require__(11)();
		}
		
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

	/***/ }),
	/* 4 */
	/***/ (function(module, exports) {

		// shim for using process in browser
		var process = module.exports = {};
		
		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.
		
		var cachedSetTimeout;
		var cachedClearTimeout;
		
		function defaultSetTimout() {
		    throw new Error('setTimeout has not been defined');
		}
		function defaultClearTimeout () {
		    throw new Error('clearTimeout has not been defined');
		}
		(function () {
		    try {
		        if (typeof setTimeout === 'function') {
		            cachedSetTimeout = setTimeout;
		        } else {
		            cachedSetTimeout = defaultSetTimout;
		        }
		    } catch (e) {
		        cachedSetTimeout = defaultSetTimout;
		    }
		    try {
		        if (typeof clearTimeout === 'function') {
		            cachedClearTimeout = clearTimeout;
		        } else {
		            cachedClearTimeout = defaultClearTimeout;
		        }
		    } catch (e) {
		        cachedClearTimeout = defaultClearTimeout;
		    }
		} ())
		function runTimeout(fun) {
		    if (cachedSetTimeout === setTimeout) {
		        //normal enviroments in sane situations
		        return setTimeout(fun, 0);
		    }
		    // if setTimeout wasn't available but was latter defined
		    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
		        cachedSetTimeout = setTimeout;
		        return setTimeout(fun, 0);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedSetTimeout(fun, 0);
		    } catch(e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
		            return cachedSetTimeout.call(null, fun, 0);
		        } catch(e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
		            return cachedSetTimeout.call(this, fun, 0);
		        }
		    }
		
		
		}
		function runClearTimeout(marker) {
		    if (cachedClearTimeout === clearTimeout) {
		        //normal enviroments in sane situations
		        return clearTimeout(marker);
		    }
		    // if clearTimeout wasn't available but was latter defined
		    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
		        cachedClearTimeout = clearTimeout;
		        return clearTimeout(marker);
		    }
		    try {
		        // when when somebody has screwed with setTimeout but no I.E. maddness
		        return cachedClearTimeout(marker);
		    } catch (e){
		        try {
		            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
		            return cachedClearTimeout.call(null, marker);
		        } catch (e){
		            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
		            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
		            return cachedClearTimeout.call(this, marker);
		        }
		    }
		
		
		
		}
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
		
		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
		
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = runTimeout(cleanUpNextTick);
		    draining = true;
		
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    runClearTimeout(timeout);
		}
		
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        runTimeout(drainQueue);
		    }
		};
		
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
		
		function noop() {}
		
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
		process.prependListener = noop;
		process.prependOnceListener = noop;
		
		process.listeners = function (name) { return [] }
		
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
		
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(6);
		var invariant = __webpack_require__(7);
		var warning = __webpack_require__(8);
		
		var ReactPropTypesSecret = __webpack_require__(9);
		var checkPropTypes = __webpack_require__(10);
		
		module.exports = function(isValidElement, throwOnDirectAccess) {
		  /* global Symbol */
		  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
		
		  /**
		   * Returns the iterator method function contained on the iterable object.
		   *
		   * Be sure to invoke the function with the iterable as context:
		   *
		   *     var iteratorFn = getIteratorFn(myIterable);
		   *     if (iteratorFn) {
		   *       var iterator = iteratorFn.call(myIterable);
		   *       ...
		   *     }
		   *
		   * @param {?object} maybeIterable
		   * @return {?function}
		   */
		  function getIteratorFn(maybeIterable) {
		    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
		    if (typeof iteratorFn === 'function') {
		      return iteratorFn;
		    }
		  }
		
		  /**
		   * Collection of methods that allow declaration and validation of props that are
		   * supplied to React components. Example usage:
		   *
		   *   var Props = require('ReactPropTypes');
		   *   var MyArticle = React.createClass({
		   *     propTypes: {
		   *       // An optional string prop named "description".
		   *       description: Props.string,
		   *
		   *       // A required enum prop named "category".
		   *       category: Props.oneOf(['News','Photos']).isRequired,
		   *
		   *       // A prop named "dialog" that requires an instance of Dialog.
		   *       dialog: Props.instanceOf(Dialog).isRequired
		   *     },
		   *     render: function() { ... }
		   *   });
		   *
		   * A more formal specification of how these methods are used:
		   *
		   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
		   *   decl := ReactPropTypes.{type}(.isRequired)?
		   *
		   * Each and every declaration produces a function with the same signature. This
		   * allows the creation of custom validation functions. For example:
		   *
		   *  var MyLink = React.createClass({
		   *    propTypes: {
		   *      // An optional string or URI prop named "href".
		   *      href: function(props, propName, componentName) {
		   *        var propValue = props[propName];
		   *        if (propValue != null && typeof propValue !== 'string' &&
		   *            !(propValue instanceof URI)) {
		   *          return new Error(
		   *            'Expected a string or an URI for ' + propName + ' in ' +
		   *            componentName
		   *          );
		   *        }
		   *      }
		   *    },
		   *    render: function() {...}
		   *  });
		   *
		   * @internal
		   */
		
		  var ANONYMOUS = '<<anonymous>>';
		
		  // Important!
		  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
		  var ReactPropTypes = {
		    array: createPrimitiveTypeChecker('array'),
		    bool: createPrimitiveTypeChecker('boolean'),
		    func: createPrimitiveTypeChecker('function'),
		    number: createPrimitiveTypeChecker('number'),
		    object: createPrimitiveTypeChecker('object'),
		    string: createPrimitiveTypeChecker('string'),
		    symbol: createPrimitiveTypeChecker('symbol'),
		
		    any: createAnyTypeChecker(),
		    arrayOf: createArrayOfTypeChecker,
		    element: createElementTypeChecker(),
		    instanceOf: createInstanceTypeChecker,
		    node: createNodeChecker(),
		    objectOf: createObjectOfTypeChecker,
		    oneOf: createEnumTypeChecker,
		    oneOfType: createUnionTypeChecker,
		    shape: createShapeTypeChecker
		  };
		
		  /**
		   * inlined Object.is polyfill to avoid requiring consumers ship their own
		   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
		   */
		  /*eslint-disable no-self-compare*/
		  function is(x, y) {
		    // SameValue algorithm
		    if (x === y) {
		      // Steps 1-5, 7-10
		      // Steps 6.b-6.e: +0 != -0
		      return x !== 0 || 1 / x === 1 / y;
		    } else {
		      // Step 6.a: NaN == NaN
		      return x !== x && y !== y;
		    }
		  }
		  /*eslint-enable no-self-compare*/
		
		  /**
		   * We use an Error-like object for backward compatibility as people may call
		   * PropTypes directly and inspect their output. However, we don't use real
		   * Errors anymore. We don't inspect their stack anyway, and creating them
		   * is prohibitively expensive if they are created too often, such as what
		   * happens in oneOfType() for any type before the one that matched.
		   */
		  function PropTypeError(message) {
		    this.message = message;
		    this.stack = '';
		  }
		  // Make `instanceof Error` still work for returned errors.
		  PropTypeError.prototype = Error.prototype;
		
		  function createChainableTypeChecker(validate) {
		    if (process.env.NODE_ENV !== 'production') {
		      var manualPropTypeCallCache = {};
		      var manualPropTypeWarningCount = 0;
		    }
		    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
		      componentName = componentName || ANONYMOUS;
		      propFullName = propFullName || propName;
		
		      if (secret !== ReactPropTypesSecret) {
		        if (throwOnDirectAccess) {
		          // New behavior only for users of `prop-types` package
		          invariant(
		            false,
		            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
		            'Use `PropTypes.checkPropTypes()` to call them. ' +
		            'Read more at http://fb.me/use-check-prop-types'
		          );
		        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
		          // Old behavior for people using React.PropTypes
		          var cacheKey = componentName + ':' + propName;
		          if (
		            !manualPropTypeCallCache[cacheKey] &&
		            // Avoid spamming the console because they are often not actionable except for lib authors
		            manualPropTypeWarningCount < 3
		          ) {
		            warning(
		              false,
		              'You are manually calling a React.PropTypes validation ' +
		              'function for the `%s` prop on `%s`. This is deprecated ' +
		              'and will throw in the standalone `prop-types` package. ' +
		              'You may be seeing this warning due to a third-party PropTypes ' +
		              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
		              propFullName,
		              componentName
		            );
		            manualPropTypeCallCache[cacheKey] = true;
		            manualPropTypeWarningCount++;
		          }
		        }
		      }
		      if (props[propName] == null) {
		        if (isRequired) {
		          if (props[propName] === null) {
		            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
		          }
		          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
		        }
		        return null;
		      } else {
		        return validate(props, propName, componentName, location, propFullName);
		      }
		    }
		
		    var chainedCheckType = checkType.bind(null, false);
		    chainedCheckType.isRequired = checkType.bind(null, true);
		
		    return chainedCheckType;
		  }
		
		  function createPrimitiveTypeChecker(expectedType) {
		    function validate(props, propName, componentName, location, propFullName, secret) {
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== expectedType) {
		        // `propValue` being instance of, say, date/regexp, pass the 'object'
		        // check, but we can offer a more precise error message here rather than
		        // 'of type `object`'.
		        var preciseType = getPreciseType(propValue);
		
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createAnyTypeChecker() {
		    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
		  }
		
		  function createArrayOfTypeChecker(typeChecker) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (typeof typeChecker !== 'function') {
		        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
		      }
		      var propValue = props[propName];
		      if (!Array.isArray(propValue)) {
		        var propType = getPropType(propValue);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
		      }
		      for (var i = 0; i < propValue.length; i++) {
		        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
		        if (error instanceof Error) {
		          return error;
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createElementTypeChecker() {
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      if (!isValidElement(propValue)) {
		        var propType = getPropType(propValue);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createInstanceTypeChecker(expectedClass) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (!(props[propName] instanceof expectedClass)) {
		        var expectedClassName = expectedClass.name || ANONYMOUS;
		        var actualClassName = getClassName(props[propName]);
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createEnumTypeChecker(expectedValues) {
		    if (!Array.isArray(expectedValues)) {
		      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
		      return emptyFunction.thatReturnsNull;
		    }
		
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      for (var i = 0; i < expectedValues.length; i++) {
		        if (is(propValue, expectedValues[i])) {
		          return null;
		        }
		      }
		
		      var valuesString = JSON.stringify(expectedValues);
		      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createObjectOfTypeChecker(typeChecker) {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (typeof typeChecker !== 'function') {
		        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
		      }
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== 'object') {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
		      }
		      for (var key in propValue) {
		        if (propValue.hasOwnProperty(key)) {
		          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
		          if (error instanceof Error) {
		            return error;
		          }
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createUnionTypeChecker(arrayOfTypeCheckers) {
		    if (!Array.isArray(arrayOfTypeCheckers)) {
		      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
		      return emptyFunction.thatReturnsNull;
		    }
		
		    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
		      var checker = arrayOfTypeCheckers[i];
		      if (typeof checker !== 'function') {
		        warning(
		          false,
		          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
		          'received %s at index %s.',
		          getPostfixForTypeWarning(checker),
		          i
		        );
		        return emptyFunction.thatReturnsNull;
		      }
		    }
		
		    function validate(props, propName, componentName, location, propFullName) {
		      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
		        var checker = arrayOfTypeCheckers[i];
		        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
		          return null;
		        }
		      }
		
		      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createNodeChecker() {
		    function validate(props, propName, componentName, location, propFullName) {
		      if (!isNode(props[propName])) {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function createShapeTypeChecker(shapeTypes) {
		    function validate(props, propName, componentName, location, propFullName) {
		      var propValue = props[propName];
		      var propType = getPropType(propValue);
		      if (propType !== 'object') {
		        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
		      }
		      for (var key in shapeTypes) {
		        var checker = shapeTypes[key];
		        if (!checker) {
		          continue;
		        }
		        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
		        if (error) {
		          return error;
		        }
		      }
		      return null;
		    }
		    return createChainableTypeChecker(validate);
		  }
		
		  function isNode(propValue) {
		    switch (typeof propValue) {
		      case 'number':
		      case 'string':
		      case 'undefined':
		        return true;
		      case 'boolean':
		        return !propValue;
		      case 'object':
		        if (Array.isArray(propValue)) {
		          return propValue.every(isNode);
		        }
		        if (propValue === null || isValidElement(propValue)) {
		          return true;
		        }
		
		        var iteratorFn = getIteratorFn(propValue);
		        if (iteratorFn) {
		          var iterator = iteratorFn.call(propValue);
		          var step;
		          if (iteratorFn !== propValue.entries) {
		            while (!(step = iterator.next()).done) {
		              if (!isNode(step.value)) {
		                return false;
		              }
		            }
		          } else {
		            // Iterator will provide entry [k,v] tuples rather than values.
		            while (!(step = iterator.next()).done) {
		              var entry = step.value;
		              if (entry) {
		                if (!isNode(entry[1])) {
		                  return false;
		                }
		              }
		            }
		          }
		        } else {
		          return false;
		        }
		
		        return true;
		      default:
		        return false;
		    }
		  }
		
		  function isSymbol(propType, propValue) {
		    // Native Symbol.
		    if (propType === 'symbol') {
		      return true;
		    }
		
		    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
		    if (propValue['@@toStringTag'] === 'Symbol') {
		      return true;
		    }
		
		    // Fallback for non-spec compliant Symbols which are polyfilled.
		    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
		      return true;
		    }
		
		    return false;
		  }
		
		  // Equivalent of `typeof` but with special handling for array and regexp.
		  function getPropType(propValue) {
		    var propType = typeof propValue;
		    if (Array.isArray(propValue)) {
		      return 'array';
		    }
		    if (propValue instanceof RegExp) {
		      // Old webkits (at least until Android 4.0) return 'function' rather than
		      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
		      // passes PropTypes.object.
		      return 'object';
		    }
		    if (isSymbol(propType, propValue)) {
		      return 'symbol';
		    }
		    return propType;
		  }
		
		  // This handles more types than `getPropType`. Only used for error messages.
		  // See `createPrimitiveTypeChecker`.
		  function getPreciseType(propValue) {
		    if (typeof propValue === 'undefined' || propValue === null) {
		      return '' + propValue;
		    }
		    var propType = getPropType(propValue);
		    if (propType === 'object') {
		      if (propValue instanceof Date) {
		        return 'date';
		      } else if (propValue instanceof RegExp) {
		        return 'regexp';
		      }
		    }
		    return propType;
		  }
		
		  // Returns a string that is postfixed to a warning about an invalid type.
		  // For example, "undefined" or "of type array"
		  function getPostfixForTypeWarning(value) {
		    var type = getPreciseType(value);
		    switch (type) {
		      case 'array':
		      case 'object':
		        return 'an ' + type;
		      case 'boolean':
		      case 'date':
		      case 'regexp':
		        return 'a ' + type;
		      default:
		        return type;
		    }
		  }
		
		  // Returns class name of the object, if any.
		  function getClassName(propValue) {
		    if (!propValue.constructor || !propValue.constructor.name) {
		      return ANONYMOUS;
		    }
		    return propValue.constructor.name;
		  }
		
		  ReactPropTypes.checkPropTypes = checkPropTypes;
		  ReactPropTypes.PropTypes = ReactPropTypes;
		
		  return ReactPropTypes;
		};
		
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

	/***/ }),
	/* 6 */
	/***/ (function(module, exports) {

		"use strict";
		
		/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 * 
		 */
		
		function makeEmptyFunction(arg) {
		  return function () {
		    return arg;
		  };
		}
		
		/**
		 * This function accepts and discards inputs; it has no side effects. This is
		 * primarily useful idiomatically for overridable function endpoints which
		 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
		 */
		var emptyFunction = function emptyFunction() {};
		
		emptyFunction.thatReturns = makeEmptyFunction;
		emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
		emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
		emptyFunction.thatReturnsNull = makeEmptyFunction(null);
		emptyFunction.thatReturnsThis = function () {
		  return this;
		};
		emptyFunction.thatReturnsArgument = function (arg) {
		  return arg;
		};
		
		module.exports = emptyFunction;

	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright (c) 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */
		
		'use strict';
		
		/**
		 * Use invariant() to assert state which your program assumes to be true.
		 *
		 * Provide sprintf-style format (only %s is supported) and arguments
		 * to provide information about what broke and what you were
		 * expecting.
		 *
		 * The invariant message will be stripped in production, but the invariant
		 * will remain to ensure logic does not differ in production.
		 */
		
		var validateFormat = function validateFormat(format) {};
		
		if (process.env.NODE_ENV !== 'production') {
		  validateFormat = function validateFormat(format) {
		    if (format === undefined) {
		      throw new Error('invariant requires an error message argument');
		    }
		  };
		}
		
		function invariant(condition, format, a, b, c, d, e, f) {
		  validateFormat(format);
		
		  if (!condition) {
		    var error;
		    if (format === undefined) {
		      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
		    } else {
		      var args = [a, b, c, d, e, f];
		      var argIndex = 0;
		      error = new Error(format.replace(/%s/g, function () {
		        return args[argIndex++];
		      }));
		      error.name = 'Invariant Violation';
		    }
		
		    error.framesToPop = 1; // we don't care about invariant's own frame
		    throw error;
		  }
		}
		
		module.exports = invariant;
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2014-2015, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 *
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(6);
		
		/**
		 * Similar to invariant but only logs a warning if the condition is not met.
		 * This can be used to log issues in development environments in critical
		 * paths. Removing the logging code for production environments will keep the
		 * same logic and follow the same code paths.
		 */
		
		var warning = emptyFunction;
		
		if (process.env.NODE_ENV !== 'production') {
		  (function () {
		    var printWarning = function printWarning(format) {
		      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		        args[_key - 1] = arguments[_key];
		      }
		
		      var argIndex = 0;
		      var message = 'Warning: ' + format.replace(/%s/g, function () {
		        return args[argIndex++];
		      });
		      if (typeof console !== 'undefined') {
		        console.error(message);
		      }
		      try {
		        // --- Welcome to debugging React ---
		        // This error was thrown as a convenience so that you can use this stack
		        // to find the callsite that caused this warning to fire.
		        throw new Error(message);
		      } catch (x) {}
		    };
		
		    warning = function warning(condition, format) {
		      if (format === undefined) {
		        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
		      }
		
		      if (format.indexOf('Failed Composite propType: ') === 0) {
		        return; // Ignore CompositeComponent proptype check.
		      }
		
		      if (!condition) {
		        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		          args[_key2 - 2] = arguments[_key2];
		        }
		
		        printWarning.apply(undefined, [format].concat(args));
		      }
		    };
		  })();
		}
		
		module.exports = warning;
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

	/***/ }),
	/* 9 */
	/***/ (function(module, exports) {

		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
		
		module.exports = ReactPropTypesSecret;


	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(process) {/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		if (process.env.NODE_ENV !== 'production') {
		  var invariant = __webpack_require__(7);
		  var warning = __webpack_require__(8);
		  var ReactPropTypesSecret = __webpack_require__(9);
		  var loggedTypeFailures = {};
		}
		
		/**
		 * Assert that the values match with the type specs.
		 * Error messages are memorized and will only be shown once.
		 *
		 * @param {object} typeSpecs Map of name to a ReactPropType
		 * @param {object} values Runtime values that need to be type-checked
		 * @param {string} location e.g. "prop", "context", "child context"
		 * @param {string} componentName Name of the component for error messages.
		 * @param {?Function} getStack Returns the component stack.
		 * @private
		 */
		function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
		  if (process.env.NODE_ENV !== 'production') {
		    for (var typeSpecName in typeSpecs) {
		      if (typeSpecs.hasOwnProperty(typeSpecName)) {
		        var error;
		        // Prop type validation may throw. In case they do, we don't want to
		        // fail the render phase where it didn't fail before. So we log it.
		        // After these have been cleaned up, we'll let them throw.
		        try {
		          // This is intentionally an invariant that gets caught. It's the same
		          // behavior as without this statement except with a better message.
		          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
		          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
		        } catch (ex) {
		          error = ex;
		        }
		        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
		        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
		          // Only monitor this failure once because there tends to be a lot of the
		          // same error.
		          loggedTypeFailures[error.message] = true;
		
		          var stack = getStack ? getStack() : '';
		
		          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
		        }
		      }
		    }
		  }
		}
		
		module.exports = checkPropTypes;
		
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

		/**
		 * Copyright 2013-present, Facebook, Inc.
		 * All rights reserved.
		 *
		 * This source code is licensed under the BSD-style license found in the
		 * LICENSE file in the root directory of this source tree. An additional grant
		 * of patent rights can be found in the PATENTS file in the same directory.
		 */
		
		'use strict';
		
		var emptyFunction = __webpack_require__(6);
		var invariant = __webpack_require__(7);
		var ReactPropTypesSecret = __webpack_require__(9);
		
		module.exports = function() {
		  function shim(props, propName, componentName, location, propFullName, secret) {
		    if (secret === ReactPropTypesSecret) {
		      // It is still safe when called from React.
		      return;
		    }
		    invariant(
		      false,
		      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
		      'Use PropTypes.checkPropTypes() to call them. ' +
		      'Read more at http://fb.me/use-check-prop-types'
		    );
		  };
		  shim.isRequired = shim;
		  function getShim() {
		    return shim;
		  };
		  // Important!
		  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
		  var ReactPropTypes = {
		    array: shim,
		    bool: shim,
		    func: shim,
		    number: shim,
		    object: shim,
		    string: shim,
		    symbol: shim,
		
		    any: shim,
		    arrayOf: getShim,
		    element: shim,
		    instanceOf: getShim,
		    node: shim,
		    objectOf: getShim,
		    oneOf: getShim,
		    oneOfType: getShim,
		    shape: getShim
		  };
		
		  ReactPropTypes.checkPropTypes = emptyFunction;
		  ReactPropTypes.PropTypes = ReactPropTypes;
		
		  return ReactPropTypes;
		};


	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _react = __webpack_require__(2);
		
		var _reactDom = __webpack_require__(13);
		
		var _reactDom2 = _interopRequireDefault(_reactDom);
		
		var _propTypes = __webpack_require__(3);
		
		var _propTypes2 = _interopRequireDefault(_propTypes);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-find-dom-node: 0 */
		
		/**
		 * ScrollSyncPane Component
		 *
		 * Wrap your content in it to keep its scroll position in sync with other panes
		 *
		 * @example ./example.md
		 */
		
		var ScrollSyncPane = function (_Component) {
		  _inherits(ScrollSyncPane, _Component);
		
		  function ScrollSyncPane() {
		    _classCallCheck(this, ScrollSyncPane);
		
		    return _possibleConstructorReturn(this, (ScrollSyncPane.__proto__ || Object.getPrototypeOf(ScrollSyncPane)).apply(this, arguments));
		  }
		
		  _createClass(ScrollSyncPane, [{
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      this.node = this.props.attachTo || _reactDom2.default.findDOMNode(this);
		      this.context.registerPane(this.node);
		    }
		  }, {
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      this.context.unregisterPane(this.node);
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      return this.props.children;
		    }
		  }]);
		
		  return ScrollSyncPane;
		}(_react.Component);
		
		ScrollSyncPane.propTypes = {
		  children: _propTypes2.default.node.isRequired,
		  attachTo: _propTypes2.default.object
		};
		ScrollSyncPane.contextTypes = {
		  registerPane: _propTypes2.default.func.isRequired,
		  unregisterPane: _propTypes2.default.func.isRequired
		};
		exports.default = ScrollSyncPane;
		module.exports = exports['default'];

	/***/ }),
	/* 13 */
	/***/ (function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

	/***/ })
	/******/ ])
	});
	;
	//# sourceMappingURL=index.js.map

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _fileActions = __webpack_require__(125);

	var _actions = __webpack_require__(128);

	var _selectors = __webpack_require__(127);

	var _Notification = __webpack_require__(145);

	var _Notification2 = _interopRequireDefault(_Notification);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
	   labels: (0, _selectors.getLabels)(state)
	});

	const mapDispatchToProps = dispatch => ({
	   openFile: () => dispatch((0, _fileActions.openFile)()),
	   saveProject: () => dispatch((0, _fileActions.saveProject)()),
	   insert: (text, pattern) => dispatch((0, _actions.insert)(text, pattern)),
	   insertImage: () => dispatch((0, _actions.insertImage)()),
	   togglePreviewPanel: () => dispatch((0, _actions.togglePreviewPanel)())
	});

	class Controls extends _react2.default.Component {
	   render() {
	      return (
	         //<div className="buttonsContainer">
	         //   <button id="reset" onClick={()=>this.props.reset()}>Reset</button>
	         //   <button id="newGame" onClick={()=>this.props.newGame(this.props.animals)}>New game</button>
	         //</div>
	         _react2.default.createElement(
	            'section',
	            { className: 'controls' },
	            _react2.default.createElement(
	               'button',
	               { id: 'openFile', onClick: () => this.props.openFile() },
	               _react2.default.createElement(
	                  'svg',
	                  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 90 90', className: 'icon icon--openFile' },
	                  _react2.default.createElement('path', { d: 'M41.998 17.676c.817-.715 1.884-1.108 3.004-1.108 1.118 0 2.186.394 3.003 1.108l17.39 15.22c.48.422.77 1.007.813 1.646.042.64-.167 1.255-.59 1.737-.836.953-2.423 1.06-3.38.222l-14.84-12.988V58.9c0 1.32-1.075 2.396-2.396 2.396-1.32 0-2.396-1.074-2.396-2.396V23.514l-14.844 12.99c-.96.837-2.542.73-3.382-.228-.87-.994-.768-2.51.226-3.38l17.392-15.22zM74.832 68.64H15.168c-1.322 0-2.397 1.074-2.397 2.397 0 1.32 1.078 2.396 2.4 2.396h59.664c1.322 0 2.396-1.074 2.396-2.396 0-1.323-1.075-2.396-2.397-2.396z' })
	               ),
	               _react2.default.createElement(
	                  'span',
	                  { className: 'button-text text' },
	                  this.props.labels['Open markdown file']
	               )
	            ),
	            _react2.default.createElement(
	               'button',
	               { id: 'savePresentation', onClick: () => this.props.saveProject() },
	               _react2.default.createElement(
	                  'svg',
	                  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 90 90', className: 'icon icon--savePresentation' },
	                  _react2.default.createElement('path', { d: 'M41.998 60.188c.817.715 1.884 1.108 3.004 1.108 1.118 0 2.186-.394 3.003-1.108l17.39-15.22c.48-.422.77-1.007.813-1.646.042-.64-.167-1.255-.59-1.737-.836-.956-2.423-1.063-3.38-.225l-14.84 12.988V18.964c0-1.32-1.075-2.396-2.396-2.396-1.32 0-2.396 1.074-2.396 2.396V54.35L27.762 41.36c-.96-.837-2.542-.73-3.382.228-.87.994-.768 2.51.226 3.38l17.392 15.22zm32.834 8.452H15.168c-1.322 0-2.397 1.074-2.397 2.397 0 1.32 1.078 2.396 2.4 2.396h59.664c1.322 0 2.396-1.074 2.396-2.396 0-1.323-1.075-2.396-2.397-2.396z' })
	               ),
	               _react2.default.createElement(
	                  'span',
	                  { className: 'button-text text' },
	                  this.props.labels['Save presentation']
	               )
	            ),
	            _react2.default.createElement(
	               'button',
	               { id: 'insertSlide', onClick: () => this.props.insert('::::slide\n\n::::') },
	               _react2.default.createElement(
	                  'svg',
	                  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 90 90', className: 'icon icon--insertSlide' },
	                  _react2.default.createElement('path', { id: 'path4140',
	                     d: 'm 9.23633,17.3262 a 0.852811,0.852811 0 0 0 -0.85352,0.8535 l 0,53.6426 a 0.852811,0.852811 0 0 0 0.85352,0.8535 l 71.52737,0 a 0.852811,0.852811 0 0 0 0.8535,-0.8535 l 0,-53.6426 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -71.52737,0 z m 2.64257,3.4941 66.2422,0 0,48.3613 -66.2422,0 0,-48.3613 z m 6.2988,5.4473 a 0.852811,0.852811 0 0 0 -0.8535,0.8535 l 0,35.7598 a 0.852811,0.852811 0 0 0 0.8535,0.8535 l 53.6446,0 a 0.852811,0.852811 0 0 0 0.8535,-0.8535 l 0,-35.7598 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -53.6446,0 z m 1.7481,2.6015 50.1484,0 0,32.2657 -50.1484,0 0,-32.2657 z m 17.9219,3.6563 a 0.852811,0.852811 0 0 0 -0.8536,0.8535 l 0,8.9395 a 0.852811,0.852811 0 0 0 0.8536,0.8535 l 5.4043,0 0,0.9746 -8.0879,0 a 0.852811,0.852811 0 0 0 -0.8536,0.8555 l 0,0.8632 a 0.852811,0.852811 0 0 0 -0,0.029 l 0,1.8282 -5.4043,0 a 0.852811,0.852811 0 0 0 -0.8535,0.8535 l 0,8.9394 a 0.852811,0.852811 0 0 0 0.8535,0.8535 l 13.4102,0 a 0.852811,0.852811 0 0 0 0.8535,-0.8535 l 0,-8.9394 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -5.4043,0 0,-0.9747 15.2832,0 0,0.9747 -5.4082,0 a 0.852811,0.852811 0 0 0 -0.8535,0.8535 l 0,8.9394 a 0.852811,0.852811 0 0 0 0.8536,0.8535 l 13.4082,0 a 0.852811,0.852811 0 0 0 0.8535,-0.8535 l 0,-8.9394 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -5.4024,0 0,-1.8282 a 0.852811,0.852811 0 0 0 -0,-0.029 l 0,-0.8652 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -8.086,0 0,-0.9746 5.4043,0 a 0.852811,0.852811 0 0 0 0.8535,-0.8535 l 0,-8.9395 a 0.852811,0.852811 0 0 0 -0.8535,-0.8535 l -13.4101,0 z m 1.748,2.5996 9.9141,0 0,5.4473 -9.9141,0 0,-5.4473 z m -8.9414,15.1992 9.916,0 0,5.4453 -9.916,0 0,-5.4453 z m 17.8809,0 9.916,0 0,5.4453 -9.916,0 0,-5.4453 z' })
	               ),
	               _react2.default.createElement(
	                  'span',
	                  { className: 'button-text text' },
	                  this.props.labels['Insert slide']
	               )
	            ),
	            _react2.default.createElement(
	               'button',
	               { id: 'insertImage', onClick: () => this.props.insertImage() },
	               _react2.default.createElement(
	                  'svg',
	                  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 90 90', className: 'icon icon--insertImage' },
	                  _react2.default.createElement('path', { id: 'path4142', d: 'm 14.4707,17.6621 c -2.8548,0 -5.13672,2.3552 -5.13672,5.1348 l 0,44.4062 c 0,2.8547 2.35712,5.1348 5.13672,5.1348 l 61.0586,0 c 2.8548,0 5.1367,-2.3552 5.1367,-5.1348 l 0,-44.4062 c 0,-2.8199 -2.3167,-5.1348 -5.1367,-5.1348 l -61.0586,0 z m -0,4.7168 61.0605,0 c 0.2251,0 0.416,0.1338 0.416,0.418 l 0,44.4062 a 1.52558,1.52558 0 0 0 0,0 c -0,0.2255 -0.133,0.416 -0.4141,0.416 l -61.0605,0 c -0.2286,0 -0.4199,-0.1356 -0.4199,-0.418 l 0,-44.4062 c 0,-0.2252 0.1354,-0.418 0.418,-0.418 z' }),
	                  _react2.default.createElement('path', { id: 'path4144',
	                     d: 'm 41.6699,25.3418 c -4.7219,0 -8.6269,3.9157 -8.6269,8.6953 0,4.7661 3.8578,8.625 8.625,8.625 a 1.13103,1.13103 0 0 0 0.4472,-0.092 c 4.5577,-0.2473 8.1778,-3.9827 8.1778,-8.5332 0,-4.7793 -3.9029,-8.6953 -8.6231,-8.6953 z m 0,4.0664 c 2.5831,0 4.6289,2.0312 4.6289,4.6992 0,2.5827 -2.0458,4.627 -4.6289,4.627 -2.5869,0 -4.6289,-2.042 -4.6289,-4.6289 0,-2.6664 2.0423,-4.6973 4.6289,-4.6973 z m 19.1172,4.5723 c -0.824,-0.1944 -1.4112,0.1124 -1.875,0.5761 a 1.13103,1.13103 0 0 0 -0.072,0.078 L 44.3203,52.1895 36.7305,45.4707 a 1.13103,1.13103 0 0 0 -0.045,-0.037 c -0.7491,-0.598 -1.8407,-0.598 -2.5898,0 a 1.13103,1.13103 0 0 0 -0.068,0.061 l -15.6835,14.709 a 1.13103,1.13103 0 0 0 -0.025,0.025 c -0.7754,0.7754 -0.7975,1.9483 -0.1543,2.7539 a 1.13103,1.13103 0 0 0 0.088,0.098 c 0.774,0.7696 1.9428,0.7944 2.75,0.1523 a 1.13103,1.13103 0 0 0 0.07,-0.059 l 14.3691,-13.4511 7.7637,6.9433 a 1.13103,1.13103 0 0 0 0.1191,0.092 c 0.3561,0.242 0.8003,0.4043 1.2578,0.4043 0.714,0 1.169,-0.2607 1.5625,-0.8496 l -0.068,0.092 13.7011,-16.5625 8.8692,22.502 a 1.13103,1.13103 0 0 0 0,0.01 c 0.3231,0.8031 1.0826,1.2656 1.8828,1.2656 0.1396,0 0.58,-0.053 0.8555,-0.1914 0.4316,-0.2165 0.7753,-0.5499 0.9902,-1 0.2154,-0.451 0.2699,-1.082 -0,-1.627 l 0.043,0.092 -10.1309,-25.6738 a 1.13103,1.13103 0 0 0 -0.043,-0.094 c -0.2339,-0.4633 -0.7785,-0.9948 -1.457,-1.1425 z' })
	               ),
	               _react2.default.createElement(
	                  'span',
	                  { className: 'button-text text' },
	                  this.props.labels['Insert image']
	               )
	            ),
	            _react2.default.createElement(
	               'button',
	               { id: 'previewWin', onClick: () => this.props.togglePreviewPanel() },
	               _react2.default.createElement(
	                  'svg',
	                  { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 90 90', className: 'icon icon--preview' },
	                  _react2.default.createElement('path', { d: 'M45 21.284C59.67 22.244 73.508 34.52 83.114 45 73.217 55.186 59.892 68.082 45 68.716 28.06 68.716 6.886 45 6.886 45h4.664l1.29 1.296c2.733 2.7 5.725 5.402 8.867 7.916 5.507 4.407 10.868 7.742 15.773 9.572 2.732 1.02 5.253 1.544 7.52 1.544 2.267 0 4.788-.523 7.52-1.544 4.905-1.83 10.266-5.165 15.773-9.572 3.142-2.514 6.134-5.215 8.867-7.916L78.45 45l-1.29-1.296c-2.733-2.7-5.725-5.402-8.867-7.917-5.507-4.406-10.868-7.74-15.773-9.572-2.732-1.02-5.253-1.543-7.52-1.543-2.267 0-4.788.523-7.52 1.543-4.905 1.83-10.266 5.166-15.773 9.572-3.142 2.515-6.134 5.216-8.867 7.917L11.55 45H6.887S28.06 21.284 45 21.284zm0 17.364c3.508 0 6.352 2.844 6.352 6.352 0 3.508-2.844 6.352-6.352 6.352-3.508 0-6.352-2.844-6.352-6.352 0-3.508 2.844-6.352 6.352-6.352zm0-6.353c-7.016 0-12.705 5.69-12.705 12.705 0 7.016 5.69 12.705 12.705 12.705 7.016 0 12.705-5.69 12.705-12.705 0-7.016-5.69-12.705-12.705-12.705z' })
	               ),
	               _react2.default.createElement(
	                  'span',
	                  { className: 'button-text text' },
	                  this.props.labels['Open preview window']
	               )
	            ),
	            _react2.default.createElement(_Notification2.default, null)
	         )
	      );
	   }
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Controls);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _selectors = __webpack_require__(127);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		saveProjectRequest: (0, _selectors.getSaveProjectRequest)(state),
		saveProjectSuccess: (0, _selectors.getSaveProjectSuccess)(state),
		saveProjectError: (0, _selectors.getSaveProjectError)(state),
		openFileError: (0, _selectors.getOpenFIleError)(state),
		labels: (0, _selectors.getLabels)(state)
	});

	const Notification = ({ saveProjectRequest, saveProjectSuccess, saveProjectError, openFileError, labels }) => _react2.default.createElement(
		'div',
		{ className: 'notificationArea' },
		_react2.default.createElement(
			'span',
			{ className: saveProjectRequest ? "notification notification-warning show" : "hide" },
			labels["Saving project"]
		),
		_react2.default.createElement(
			'span',
			{ className: saveProjectSuccess ? "notification notification-success show" : "hide" },
			labels["Project saved"]
		),
		_react2.default.createElement(
			'span',
			{ className: saveProjectError ? "notification notification-error show" : "hide" },
			labels["Saving project error"]
		),
		_react2.default.createElement(
			'span',
			{ className: openFileError ? "notification notification-error show" : "hide" },
			labels["Open file error"]
		)
	);

		exports.default = (0, _reactRedux.connect)(mapStateToProps)(Notification);

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _actions = __webpack_require__(128);

	var _editorUtils = __webpack_require__(129);

	var _selectors = __webpack_require__(127);

	var _reactScrollSync = __webpack_require__(143);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var { findDOMNode } = __webpack_require__(2);


	const mapStateToProps = state => ({
		value: (0, _selectors.getMd)(state),
		previewPanelOpen: (0, _selectors.getPreviewPanelOpen)(state),
		insert: (0, _selectors.getInsert)(state)
	});

	const mapDispatchToProps = dispatch => ({
		mdEdited: mdValue => dispatch((0, _actions.mdChanged)(mdValue)),
		editorPosChanged: payload => dispatch((0, _actions.editorPosChanged)(payload))
	});

	var markdownEl;

	class Md extends _react2.default.Component {
		constructor(props) {
			super(props);

			this.state = {
				value: this.props.value,
				dirty: false
			};

			this.handleChange = this.handleChange.bind(this);
			this.handlePos = this.handlePos.bind(this);
		}

		componentDidMount() {
			markdownEl = findDOMNode(this).querySelector('textarea');
		}

		handleChange(rEvent) {
			var target = rEvent.nativeEvent.target;

			this.setState({
				value: target.value,
				dirty: true,
				selectionStart: target.selectionStart,
				selectionEnd: target.selectionEnd
			});
		}

		handlePos(rEvent) {
			var target = rEvent.nativeEvent.target;

			//if value is different the position has already been updated by handleChange method
			if (target.value !== this.state.value) {
				return;
			}

			this.setState({
				selectionStart: target.selectionStart,
				selectionEnd: target.selectionEnd
			});

			window.requestIdleCallback(() => {
				this.props.editorPosChanged({
					selectionStart: target.selectionStart,
					selectionEnd: target.selectionEnd
				});
			});
		}

		componentWillReceiveProps(nextProps) {
			if (!nextProps.previewPanelOpen && this.props.previewPanelOpen) {
				markdownEl.focus();
			}

			if (nextProps.value !== this.state.value) {
				this.setState({ value: nextProps.value });
				return;
			}

			if (nextProps.insert) {
				var insertResult = {
					text: this.state.value,
					selectionEnd: this.state.selectionEnd,
					selectionStart: this.state.selectionStart
				};

				while (nextProps.insert.length) {
					var insertItem = nextProps.insert.pop();

					insertResult = (0, _editorUtils.insertReplaceAtCursor)({
						value: insertItem.insert,
						pattern: insertItem.pattern,
						text: insertResult.text,
						selectionEnd: insertResult.selectionEnd,
						selectionStart: insertResult.selectionStart
					});
				}

				this.setState({
					value: insertResult.text,
					selectionEnd: insertResult.selectionEnd,
					selectionStart: insertResult.selectionStart
				});
			}
		}

		//If value is changed dispatch the action
		componentDidUpdate(prevProps, prevState) {
			markdownEl.selectionEnd = this.state.selectionEnd;
			markdownEl.selectionStart = this.state.selectionStart;

			//this.state.dirty filters the case when the value changes because a new file is loaded
			if (this.state.value !== prevState.value && this.state.dirty) {
				window.requestIdleCallback(() => {
					this.props.mdEdited(this.state.value);
				});
			}
		}

		render() {
			return _react2.default.createElement(
				'div',
				{ className: 'mdContainer' },
				_react2.default.createElement(
					'div',
					{ className: 'tabContainer' },
					_react2.default.createElement(
						'div',
						{ className: 'tab mdTab text' },
						'Markdown editor'
					)
				),
				_react2.default.createElement(
					_reactScrollSync.ScrollSyncPane,
					null,
					_react2.default.createElement('textarea', {
						className: 'raw-markdown',
						value: this.state.value,
						onChange: this.handleChange,
						onKeyUp: this.handlePos,
						onMouseUp: this.handlePos
					})
				)
			);
		}
	}

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Md);

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _reactScrollSync = __webpack_require__(143);

	var _selectors = __webpack_require__(127);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
	    html: (0, _selectors.getHtml)(state)
	});

	class Html extends _react2.default.Component {
	    render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'htmlContainer' },
	            _react2.default.createElement(
	                'div',
	                { className: 'tabContainer' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'tab htmlTab text' },
	                    'Html output'
	                )
	            ),
	            _react2.default.createElement(
	                _reactScrollSync.ScrollSyncPane,
	                null,
	                _react2.default.createElement('div', { className: 'rendered-html', dangerouslySetInnerHTML: { __html: this.props.html } })
	            )
	        );
	    }
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps)(Html);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _selectors = __webpack_require__(127);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		panelOpen: (0, _selectors.getPreviewPanelOpen)(state),
		previewWin: (0, _selectors.getPreviewWin)(state),
		configuration: (0, _selectors.getConfiguration)(state),
		customCss: (0, _selectors.getCustomCss)(state),
		isCustomTheme: (0, _selectors.isCustomTheme)(state),
		customThemePath: (0, _selectors.getCustomThemePath)(state),
		currentTheme: (0, _selectors.getCurrentTheme)(state),
		customThemesList: (0, _selectors.getCustomThemesList)(state),
		html: (0, _selectors.getHtml)(state)
	});

	var previewWin;

	class Preview extends _react2.default.Component {
		componentWillReceiveProps(nextProps) {
			if (nextProps.panelOpen) {
				var message = {
					html: nextProps.html,
					configuration: nextProps.configuration,
					customCss: nextProps.customCss,
					currentTheme: nextProps.currentTheme,
					customTheme: nextProps.isCustomTheme,
					customThemePath: nextProps.customThemePath
				};

				this.ifr.contentWindow.postMessage(message, "*");
			}

			// if (nextProps.previewWin) {
			// 	var message = {
			// 		html: nextProps.html,
			// 		configuration: nextProps.configuration,
			// 		customCss: nextProps.customCss,
			// 		currentTheme: nextProps.currentTheme,
			// 		customTheme: nextProps.customThemesList.includes(nextProps.currentTheme)
			// 	};
			// 	window.addEventListener("message", (event) => {
			// 		previewWin.postMessage(message, "*");
			// 	});
			// 	previewWin = window.open('preview/preview.html');
			// }
		}

		//After the initial rendering updates are managed via messages
		shouldComponentUpdate(nextProps) {
			return false;
		}

		//Trigger a click on the iframe when is ready
		componentDidMount() {
			window.addEventListener("message", event => {
				this.ifr.focus();
			});
		}

		render() {
			return _react2.default.createElement(
				'section',
				{ className: 'preview' },
				_react2.default.createElement('iframe', { ref: f => this.ifr = f, src: 'preview/preview.html', width: '100%', height: '100%', frameBorder: '0', scrolling: 'no' })
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps)(Preview);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _OpenFile = __webpack_require__(150);

	var _OpenFile2 = _interopRequireDefault(_OpenFile);

	var _actions = __webpack_require__(128);

	var _selectors = __webpack_require__(127);

	var _Label = __webpack_require__(151);

	var _Label2 = _interopRequireDefault(_Label);

	var _InputWrapper = __webpack_require__(153);

	var _InputWrapper2 = _interopRequireDefault(_InputWrapper);

	var _Button = __webpack_require__(152);

	var _Button2 = _interopRequireDefault(_Button);

	var _Panel = __webpack_require__(154);

	var _Panel2 = _interopRequireDefault(_Panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		labels: (0, _selectors.getLabels)(state),
		open: (0, _selectors.getLeftPanelStatus)(state),
		initial: (0, _selectors.getInitialSlideBgSettings)(state),
		new: (0, _selectors.getNewSlideBgSettings)(state)
	});

	const mapDispatchToProps = dispatch => ({
		closePanel: () => dispatch((0, _actions.closeBgSettingsPanel)()),
		insert: stringsToInsert => dispatch((0, _actions.insert)(stringsToInsert))
	});

	class BgPanel extends _react2.default.Component {
		constructor(props) {
			super(props);

			this.changedSettings = {};
			this.state = this.getBlankState();
		}

		getBlankState() {
			return {
				'background-color': '#000000',
				'background-image': '',
				'background-size': 'cover',
				'background-position': 'center center',
				'background-video': '',
				'background-video-loop': false,
				'background-video-muted': false,
				'background-iframe': ''
			};
		}

		componentWillReceiveProps(nextProps) {
			if (!nextProps.open) {
				return;
			}

			if (Object.keys(nextProps.new).length) {
				this.recordChange(nextProps.new);
				return;
			}

			if (Boolean(nextProps.initial) && Object.keys(nextProps.initial).length) {
				var nextState = Object.assign({}, nextProps.initial);
				this.setState(nextState);
				return;
			}

			this.setState(this.getBlankState());
		}

		handleChange(event, key) {
			var input = event.target;
			var value = input.type === 'checkbox' ? input.checked : input.value;

			var obj = {};
			obj[key] = value;
			this.recordChange(obj);
		}

		recordChange(newSetting) {
			Object.assign(this.changedSettings, newSetting);
			this.setState(Object.assign({}, this.state, newSetting));
		}

		handleSubmit(e) {
			var stringsToInsert = Object.keys(this.changedSettings).map(key => {
				// if (this.changedSettings[key] === '') {
				// 	return null;
				// }

				var insert = this.changedSettings[key] ? key + '="' + this.changedSettings[key] + '"' : '';
				var pattern = key + '="[^"]+"';

				return { insert, pattern };
			})
			//.filter(item => item)
			;

			this.props.insert(stringsToInsert);
			this.exit();
		}

		updateBgPos(e, axis) {
			var currentBgPos = this.state['background-position'].split(' ');
			var newBbPosBit = e.target.value;
			var newBgPos = currentBgPos;
			var updateIndex = axis === 'x' ? 0 : 1;

			newBgPos[updateIndex] = newBbPosBit;
			Object.assign(this.changedSettings, { 'background-position': newBgPos.join(' ') });
		}

		exit() {
			this.changedSettings = {};
			this.props.closePanel();
		}

		render() {
			return _react2.default.createElement(
				_Panel2.default,
				{ name: 'leftPanel bgOptionsPanel', closePanel: this.props.closePanel },
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'colorWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'colorBg', text: this.props.labels['Background color'] }),
					_react2.default.createElement('input', { id: 'colorBg', type: 'color',
						onChange: e => this.handleChange(e, 'background-color'),
						value: this.state['background-color'] })
				),
				_react2.default.createElement(_OpenFile2.default, {
					name: 'imgBgWrapper',
					label: this.props.labels['Background image'],
					buttonText: this.props.labels['Select image'],
					finalAction: path => (0, _actions.setBgImage)(path),
					fileType: 'img',
					handler: imgPath => {
						this.recordChange({ 'background-image': imgPath });
					},
					value: this.state['background-image']
				}),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'bgSizeWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'bgSize', text: this.props.labels['Background size'] }),
					_react2.default.createElement('input', { type: 'text',
						id: 'bgSize',
						placeholder: 'es: cover, contain, 3em, 10%, ecc.',
						value: this.state['background-size'],
						onChange: e => this.handleChange(e, 'background-size')
					})
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'bgPositionXWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'bgPositionX', text: this.props.labels['Background position x'] }),
					_react2.default.createElement(
						'select',
						{ id: 'bgPositionX', className: 'bgPositionPartial',
							onChange: e => this.updateBgPos(e, 'x')
						},
						_react2.default.createElement(
							'option',
							null,
							'center'
						),
						_react2.default.createElement(
							'option',
							null,
							'left'
						),
						_react2.default.createElement(
							'option',
							null,
							'right'
						)
					)
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'bgPositionYWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'bgPositionY', text: this.props.labels['Background position y'] }),
					_react2.default.createElement(
						'select',
						{ id: 'bgPositionY', className: 'bgPositionPartial',
							onChange: e => this.updateBgPos(e, 'y')
						},
						_react2.default.createElement(
							'option',
							null,
							'center'
						),
						_react2.default.createElement(
							'option',
							null,
							'top'
						),
						_react2.default.createElement(
							'option',
							null,
							'bottom'
						)
					)
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'bgRepeatWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'bgRepeat', text: this.props.labels['Background repeat'] }),
					_react2.default.createElement(
						'select',
						{ id: 'bgRepeat', onChange: e => this.handleChange(e, 'background-repeat') },
						_react2.default.createElement(
							'option',
							null,
							'no-repeat'
						),
						_react2.default.createElement(
							'option',
							null,
							'repeat'
						),
						_react2.default.createElement(
							'option',
							null,
							'repeat-x'
						),
						_react2.default.createElement(
							'option',
							null,
							'repeat-y'
						),
						_react2.default.createElement(
							'option',
							null,
							'inherit'
						)
					)
				),
				_react2.default.createElement(_OpenFile2.default, {
					name: 'videoBgWrapper',
					label: this.props.labels['Background video'],
					buttonText: this.props.labels['Select video'],
					finalAction: path => (0, _actions.setBgVideo)(path),
					fileType: 'video',
					handler: filePath => {
						this.recordChange({ 'background-video': filePath });
					},
					value: this.state['background-video']
				}),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'videoBgLoopWrapper' },
					_react2.default.createElement('input', { id: 'videoBgLoop', type: 'checkbox',
						disabled: !this.changedSettings['background-video'],
						value: this.state['background-video-loop'],
						onChange: e => this.handleChange(e, 'background-video-loop')
					}),
					_react2.default.createElement(_Label2.default, { inputId: 'videoBgLoop', text: this.props.labels['Background video loop'] })
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'videoBgMutedWrapper' },
					_react2.default.createElement('input', { id: 'videoBgLoop', type: 'checkbox',
						disabled: !this.changedSettings['background-video'],
						value: this.state['background-video-muted'],
						onChange: e => this.handleChange(e, 'background-video-muted')
					}),
					_react2.default.createElement(_Label2.default, { inputId: 'videoBgLoop', text: this.props.labels['Background video muted'] })
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'iframeBgWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'iframeBg', text: this.props.labels['Background web page'] }),
					_react2.default.createElement('input', { id: 'iframeBg', type: 'text', placeholder: 'http://www.example.com',
						onChange: e => this.handleChange(e, 'background-iframe'),
						value: this.state['background-iframe']
					}),
					_react2.default.createElement(_Button2.default, { 'data-input-id': 'iframeBg', text: this.props.labels['Reset'],
						clickHandler: () => this.recordChange({ 'background-iframe': '' })
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'buttonRow' },
					_react2.default.createElement(_Button2.default, { clickHandler: () => this.exit(), text: this.props.labels['Cancel'] }),
					_react2.default.createElement(_Button2.default, { clickHandler: e => this.handleSubmit(e), text: this.props.labels['Save'] })
				)
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BgPanel);

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _actions = __webpack_require__(128);

	var _selectors = __webpack_require__(127);

	var _Label = __webpack_require__(151);

	var _Label2 = _interopRequireDefault(_Label);

	var _Button = __webpack_require__(152);

	var _Button2 = _interopRequireDefault(_Button);

	var _InputWrapper = __webpack_require__(153);

	var _InputWrapper2 = _interopRequireDefault(_InputWrapper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		labels: (0, _selectors.getLabels)(state),
		currentSettings: (0, _selectors.getSlideBgImage)(state)
	});

	const mapDispatchToProps = dispatch => ({
		openFilePath: (fileType, finalAction) => dispatch((0, _actions.openFilePath)(fileType, finalAction))
	});

	class OpenImage extends _react2.default.Component {
		render() {
			return _react2.default.createElement(
				_InputWrapper2.default,
				{ name: this.props.name },
				_react2.default.createElement(_Label2.default, { inputId: 'filePath', text: this.props.label }),
				_react2.default.createElement(_Button2.default, {
					clickHandler: () => this.props.openFilePath(this.props.fileType, this.props.finalAction),
					text: this.props.buttonText
				}),
				_react2.default.createElement('input', { id: 'filePath', type: 'text',
					placeholder: this.props.labels['File path'],
					value: this.props.value,
					onChange: e => this.props.handler(e.target.value) }),
				_react2.default.createElement(
					'button',
					{ className: 'resetInput',
						onClick: e => this.props.handler('')
					},
					_react2.default.createElement('span', { className: 'icon' }),
					_react2.default.createElement(
						'span',
						{ className: 'text button-text' },
						this.props.labels['Reset']
					)
				)
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(OpenImage);

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
											value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const Label = ({ inputId, text, children }) => _react2.default.createElement(
											'label',
											{ htmlFor: inputId },
											_react2.default.createElement(
																					'span',
																					{ className: 'icon' },
																					children
											),
											_react2.default.createElement(
																					'span',
																					{ className: 'text' },
																					text
											)
	);

		exports.default = Label;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const Button = ({ clickHandler, text, children }) => _react2.default.createElement(
		"button",
		{ onClick: clickHandler },
		_react2.default.createElement(
			"span",
			{ className: "icon" },
			children
		),
		_react2.default.createElement(
			"span",
			{ className: "text button-text" },
			text
		)
	);

		exports.default = Button;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const InputWrapper = ({ name, children }) => _react2.default.createElement(
	  'div',
	  { className: `inputWrapper ${name}` },
	  children
	);

	exports.default = InputWrapper;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _CloseBtn = __webpack_require__(155);

	var _CloseBtn2 = _interopRequireDefault(_CloseBtn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const Panel = ({ name, closePanel, children }) => _react2.default.createElement(
		'div',
		{ className: name },
		_react2.default.createElement(_CloseBtn2.default, { clickHandler: closePanel }),
		_react2.default.createElement(
			'div',
			{ className: 'panelInner' },
			children
		)
	);

		exports.default = Panel;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _actions = __webpack_require__(128);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	class CloseBtn extends _react2.default.Component {
		render() {
			return _react2.default.createElement(
				'button',
				{ className: 'closeBtn flatButton', onClick: this.props.clickHandler.bind(this) },
				_react2.default.createElement(
					'svg',
					{ className: 'closeIcon icon', xmlns: 'http://www.w3.org/2000/svg', width: '179760.707', height: '179760.522', viewBox: '0 0 168.52566 168.52548' },
					_react2.default.createElement('path', { d: 'M144.106 8.747c-2.374-2.375-6.196-2.375-8.57 0L84.262 60.02 32.99 8.744c-2.375-2.374-6.197-2.374-8.57 0L8.745 24.418c-2.374 2.374-2.375 6.198 0 8.572l51.273 51.274-51.273 51.272c-2.375 2.374-2.375 6.196 0 8.57L24.42 159.78c2.373 2.373 6.196 2.373 8.57 0l51.272-51.273 51.274 51.273c2.374 2.375 6.198 2.373 8.572 0l15.672-15.673c2.375-2.374 2.375-6.197 0-8.57l-51.273-51.274L159.78 32.99c2.373-2.374 2.373-6.196 0-8.57L144.105 8.746z' })
				)
			);
		}
	};

		exports.default = (0, _reactRedux.connect)()(CloseBtn);

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _OpenFile = __webpack_require__(150);

	var _OpenFile2 = _interopRequireDefault(_OpenFile);

	var _actions = __webpack_require__(128);

	var _selectors = __webpack_require__(127);

	var _Label = __webpack_require__(151);

	var _Label2 = _interopRequireDefault(_Label);

	var _InputWrapper = __webpack_require__(153);

	var _InputWrapper2 = _interopRequireDefault(_InputWrapper);

	var _Button = __webpack_require__(152);

	var _Button2 = _interopRequireDefault(_Button);

	var _Panel = __webpack_require__(154);

	var _Panel2 = _interopRequireDefault(_Panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		labels: (0, _selectors.getLabels)(state),
		open: (0, _selectors.getConfPanelStatus)(state),
		conf: (0, _selectors.getConfiguration)(state)
	});

	const mapDispatchToProps = dispatch => ({
		closePanel: () => dispatch((0, _actions.closeConfPanel)()),
		setConfiguration: newConf => dispatch((0, _actions.setConfiguration)(newConf)),
		setDefaultExtraConf: () => dispatch((0, _actions.setDefaultExtraConf)())
	});

	class ConfPanel extends _react2.default.Component {
		constructor(props) {
			super(props);

			this.state = this.props.conf;
		}

		componentWillReceiveProps(nextProps) {
			if (!nextProps.open) {
				return;
			}

			this.setState(nextProps.conf);
		}

		handleChange(event, key) {
			var input = event.target;
			var value = input.type === 'checkbox' ? input.checked : input.value;

			var obj = {};
			obj[key] = value;
			this.recordChange(obj);
		}

		recordChange(newSetting) {
			this.setState(Object.assign({}, this.state, newSetting));
			this.props.setConfiguration(newSetting);
		}

		render() {
			return _react2.default.createElement(
				_Panel2.default,
				{ name: 'rightPanel confPanel', closePanel: this.props.closePanel },
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'autoSlideWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'autoSlide', text: this.props.labels['Auto play velocity (0 to disable)'] }),
					_react2.default.createElement('input', { id: 'autoSlide', type: 'number', min: '0', step: '500',
						value: this.state.autoSlide,
						onChange: e => this.handleChange(e, 'autoSlide')
					})
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'viewDistanceWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'viewDistance', text: this.props.labels['Number of slides preloaded in lazy load mode'] }),
					_react2.default.createElement('input', { id: 'viewDistance', type: 'number',
						value: this.state.viewDistance,
						onChange: e => this.handleChange(e, 'viewDistance')
					})
				),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'parallaxBackgroundSizeWrapper' },
					_react2.default.createElement(_Label2.default, { inputId: 'parallaxBackgroundSize', text: this.props.labels['Parallax background size (CSS syntax, e.g. \'2100px 900px\')'] }),
					_react2.default.createElement('input', { id: 'parallaxBackgroundSize', type: 'text',
						value: this.state.parallaxBackgroundSize,
						onChange: e => this.handleChange(e, 'parallaxBackgroundSize')
					})
				),
				_react2.default.createElement(_OpenFile2.default, {
					name: 'parallaxBackgroundImageWrapper',
					label: this.props.labels['Parallax background image'],
					buttonText: this.props.labels['Select image'],
					finalAction: path => (0, _actions.setConfiguration)({ parallaxBackgroundImage: path }),
					fileType: 'img',
					handler: imgPath => {
						this.recordChange({ parallaxBackgroundImage: imgPath });
					},
					value: this.state['parallaxBackgroundImage']
				}),
				_react2.default.createElement(
					_InputWrapper2.default,
					{ name: 'parallaxBackgroundWrapper' },
					_react2.default.createElement(
						'p',
						{ className: 'text' },
						this.props.labels['Number of pixels to move the parallax background per slide']
					),
					_react2.default.createElement(
						'div',
						{ className: 'parallaxBackgroundInputWrapper' },
						_react2.default.createElement(_Label2.default, { inputId: 'parallaxBackgroundHorizontal', text: this.props.labels['Horizontal'] }),
						_react2.default.createElement('input', { id: 'parallaxBackgroundHorizontal', type: 'number',
							value: this.state.parallaxBackgroundHorizontal || '',
							onChange: e => this.handleChange(e, 'parallaxBackgroundHorizontal')
						})
					),
					_react2.default.createElement(
						'div',
						{ className: 'parallaxBackgroundInputWrapper' },
						_react2.default.createElement(_Label2.default, { inputId: 'parallaxBackgroundVertical', text: this.props.labels['Vertical'] }),
						_react2.default.createElement('input', { id: 'parallaxBackgroundVertical', type: 'number',
							value: this.state.parallaxBackgroundVertical || '',
							onChange: e => this.handleChange(e, 'parallaxBackgroundVertical')
						})
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'buttonRow' },
					_react2.default.createElement(_Button2.default, { clickHandler: () => this.props.setDefaultExtraConf(), text: this.props.labels['Revert to default'] })
				)
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConfPanel);

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(31);

	var _OpenFile = __webpack_require__(150);

	var _OpenFile2 = _interopRequireDefault(_OpenFile);

	var _actions = __webpack_require__(128);

	var _fileActions = __webpack_require__(125);

	var _selectors = __webpack_require__(127);

	var _Label = __webpack_require__(151);

	var _Label2 = _interopRequireDefault(_Label);

	var _InputWrapper = __webpack_require__(153);

	var _InputWrapper2 = _interopRequireDefault(_InputWrapper);

	var _Button = __webpack_require__(152);

	var _Button2 = _interopRequireDefault(_Button);

	var _Panel = __webpack_require__(154);

	var _Panel2 = _interopRequireDefault(_Panel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	const mapStateToProps = state => ({
		labels: (0, _selectors.getLabels)(state),
		customThemes: (0, _selectors.getCustomThemes)(state),
		open: (0, _selectors.getThemesPanelStatus)(state),
		customCss: (0, _selectors.getCustomCss)(state)
	});

	const mapDispatchToProps = dispatch => ({
		closePanel: () => dispatch((0, _actions.closeThemesPanel)()),
		delCustomTheme: theme => dispatch((0, _fileActions.delCustomTheme)(theme)),
		loadCustomTheme: theme => dispatch((0, _fileActions.loadCustomTheme)(theme)),
		setCustomCss: css => dispatch((0, _actions.setCustomCss)(css))
	});

	class ThemesPanel extends _react2.default.Component {
		constructor(props) {
			super(props);

			this.state = {
				customCss: this.props.customCss
			};
		}

		componentWillReceiveProps(nextProps) {
			if (!nextProps.open) {
				return;
			}

			if (nextProps.customCss !== this.state.customCss) {
				this.setState({ customCss: nextProps.customCss });
			}
		}

		handleChange(e) {
			this.setState({ customCss: e.target.value });
		}

		saveCustomCss() {
			this.props.setCustomCss(this.state.customCss);
		}

		render() {
			return _react2.default.createElement(
				_Panel2.default,
				{ name: 'rightPanel themesPanel', closePanel: this.props.closePanel },
				_react2.default.createElement(_Button2.default, {
					clickHandler: () => this.props.loadCustomTheme(this.props.fileType, this.props.loadCustomTheme),
					text: this.props.labels['Load a custom theme css file']
				}),
				_react2.default.createElement(
					'p',
					null,
					this.props.labels['Custom themes']
				),
				_react2.default.createElement(
					'ul',
					null,
					this.props.customThemes.map(theme => _react2.default.createElement(
						'li',
						{ key: theme },
						_react2.default.createElement(
							'span',
							null,
							theme
						),
						_react2.default.createElement(_Button2.default, { text: this.props.labels['Delete'], clickHandler: () => this.props.delCustomTheme(theme) })
					))
				),
				_react2.default.createElement(
					'p',
					null,
					this.props.labels['Custom CSS']
				),
				_react2.default.createElement('textarea', { className: 'customCssInput', value: this.state.customCss, onChange: e => this.handleChange(e) }),
				_react2.default.createElement(_Button2.default, {
					clickHandler: () => this.saveCustomCss(),
					text: this.props.labels['Save']
				})
			);
		}
	};

		exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ThemesPanel);

/***/ })
/******/ ]);
//# sourceMappingURL=renderer-bundle.js.map