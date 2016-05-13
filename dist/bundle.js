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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Slider = __webpack_require__(3);

	var _Slider2 = _interopRequireDefault(_Slider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(25);

	//Components


	_reactDom2.default.render(_react2.default.createElement(_Slider2.default, null), document.getElementById('slider'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.15.11
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';

	var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
	var COMPONENT_ID = 'liteid';
	var VELEMENT = 2;
	var VSTATELESS = 3;
	var VCOMPONENT = 4;
	var VCOMMENT = 5;

	var refs = null;

	function createVelem(type, props) {
	    return {
	        vtype: VELEMENT,
	        type: type,
	        props: props,
	        refs: refs
	    };
	}

	function createVstateless(type, props) {
	    return {
	        vtype: VSTATELESS,
	        id: getUid(),
	        type: type,
	        props: props
	    };
	}

	function createVcomponent(type, props) {
	    return {
	        vtype: VCOMPONENT,
	        id: getUid(),
	        type: type,
	        props: props,
	        refs: refs
	    };
	}

	function createVcomment(comment) {
	    return {
	        vtype: VCOMMENT,
	        comment: comment
	    };
	}

	function initVnode(vnode, parentContext, namespaceURI) {
	    var vtype = vnode.vtype;

	    var node = null;
	    if (!vtype) {
	        node = document.createTextNode(vnode);
	    } else if (vtype === VELEMENT) {
	        node = initVelem(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMPONENT) {
	        node = initVcomponent(vnode, parentContext, namespaceURI);
	    } else if (vtype === VSTATELESS) {
	        node = initVstateless(vnode, parentContext, namespaceURI);
	    } else if (vtype === VCOMMENT) {
	        node = document.createComment(vnode.comment);
	    }
	    return node;
	}

	function destroyVnode(vnode, node) {
	    var vtype = vnode.vtype;

	    if (vtype === VELEMENT) {
	        destroyVelem(vnode, node);
	    } else if (vtype === VCOMPONENT) {
	        destroyVcomponent(vnode, node);
	    } else if (vtype === VSTATELESS) {
	        destroyVstateless(vnode, node);
	    }
	}

	function initVelem(velem, parentContext, namespaceURI) {
	    var type = velem.type;
	    var props = velem.props;

	    var node = null;

	    if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
	        node = document.createElementNS(SVGNamespaceURI, type);
	        namespaceURI = SVGNamespaceURI;
	    } else {
	        node = document.createElement(type);
	    }

	    var children = props.children;

	    var vchildren = node.vchildren = [];
	    if (isArr(children)) {
	        flattenChildren(children, collectChild, vchildren);
	    } else {
	        collectChild(children, vchildren);
	    }

	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        node.appendChild(initVnode(vchildren[i], parentContext, namespaceURI));
	    }

	    var isCustomComponent = type.indexOf('-') >= 0 || props.is != null;
	    setProps(node, props, isCustomComponent);

	    attachRef(velem.refs, velem.ref, node);

	    return node;
	}

	function collectChild(child, children) {
	    if (child != null && typeof child !== 'boolean') {
	        children[children.length] = child.vtype ? child : '' + child;
	    }
	}

	function updateVelem(velem, newVelem, node, parentContext, hasNewContext) {
	    var props = velem.props;
	    var type = velem.type;

	    var newProps = newVelem.props;
	    var oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html;
	    var newChildren = newProps.children;
	    var vchildren = node.vchildren;
	    var childNodes = node.childNodes;
	    var namespaceURI = node.namespaceURI;

	    var isCustomComponent = type.indexOf('-') >= 0 || props.is != null;
	    var vchildrenLen = vchildren.length;
	    var newVchildren = node.vchildren = [];

	    if (isArr(newChildren)) {
	        flattenChildren(newChildren, collectChild, newVchildren);
	    } else {
	        collectChild(newChildren, newVchildren);
	    }

	    var newVchildrenLen = newVchildren.length;

	    if (oldHtml == null && vchildrenLen) {
	        var shouldRemove = null;
	        var patches = Array(newVchildrenLen);

	        for (var i = 0; i < vchildrenLen; i++) {
	            var vnode = vchildren[i];
	            for (var j = 0; j < newVchildrenLen; j++) {
	                if (patches[j]) {
	                    continue;
	                }
	                var newVnode = newVchildren[j];
	                if (vnode === newVnode) {
	                    patches[j] = {
	                        vnode: vnode,
	                        node: childNodes[i]
	                    };
	                    vchildren[i] = null;
	                    break;
	                }
	            }
	        }

	        outer: for (var i = 0; i < vchildrenLen; i++) {
	            var vnode = vchildren[i];
	            if (vnode === null) {
	                continue;
	            }
	            var _type = vnode.type;
	            var key = vnode.key;
	            var _refs = vnode.refs;

	            var childNode = childNodes[i];

	            for (var j = 0; j < newVchildrenLen; j++) {
	                if (patches[j]) {
	                    continue;
	                }
	                var newVnode = newVchildren[j];
	                if (newVnode.type === _type && newVnode.key === key && newVnode.refs === _refs) {
	                    patches[j] = {
	                        vnode: vnode,
	                        node: childNode
	                    };
	                    continue outer;
	                }
	            }

	            if (!shouldRemove) {
	                shouldRemove = [];
	            }
	            shouldRemove[shouldRemove.length] = childNode;
	            // shouldRemove.push(childNode)
	            destroyVnode(vnode, childNode);
	        }

	        if (shouldRemove) {
	            for (var i = 0, len = shouldRemove.length; i < len; i++) {
	                node.removeChild(shouldRemove[i]);
	            }
	        }

	        for (var i = 0; i < newVchildrenLen; i++) {
	            var newVnode = newVchildren[i];
	            var patchItem = patches[i];
	            if (patchItem) {
	                var vnode = patchItem.vnode;
	                var newChildNode = patchItem.node;
	                var vtype = newVnode.vtype;
	                if (newVnode !== vnode) {
	                    if (!vtype) {
	                        // textNode
	                        newChildNode.newText = newVnode;
	                        pendingTextUpdater[pendingTextUpdater.length] = newChildNode;
	                        // newChildNode.nodeValue = newVnode
	                        // newChildNode.replaceData(0, vnode.length, newVnode)
	                    } else if (vtype === VELEMENT) {
	                            newChildNode = updateVelem(vnode, newVnode, newChildNode, parentContext, hasNewContext);
	                        } else if (vtype === VCOMPONENT) {
	                            newChildNode = updateVcomponent(vnode, newVnode, newChildNode, parentContext, hasNewContext);
	                        } else if (vtype === VSTATELESS) {
	                            newChildNode = updateVstateless(vnode, newVnode, newChildNode, parentContext, hasNewContext);
	                        }
	                } else if (hasNewContext) {
	                    // update component with new context
	                    if (vtype === VCOMPONENT) {
	                        newChildNode = updateVcomponent(vnode, newVnode, newChildNode, parentContext, hasNewContext);
	                    } else if (vtype === VSTATELESS) {
	                        newChildNode = updateVstateless(vnode, newVnode, newChildNode, parentContext, hasNewContext);
	                    }
	                }
	                var currentNode = childNodes[i];
	                if (currentNode !== newChildNode) {
	                    node.insertBefore(newChildNode, currentNode || null);
	                }
	            } else {
	                var newChildNode = initVnode(newVnode, parentContext, namespaceURI);
	                node.insertBefore(newChildNode, childNodes[i] || null);
	            }
	        }
	        node.props = props;
	        node.newProps = newProps;
	        node.isCustomComponent = isCustomComponent;
	        pendingPropsUpdater[pendingPropsUpdater.length] = node;
	    } else {
	        // should patch props first, make sure innerHTML was cleared
	        patchProps(node, props, newProps, isCustomComponent);
	        for (var i = 0; i < newVchildrenLen; i++) {
	            node.appendChild(initVnode(newVchildren[i], parentContext, namespaceURI));
	        }
	    }

	    if (velem.ref !== newVelem.ref) {
	        detachRef(velem.refs, velem.ref);
	        attachRef(newVelem.refs, newVelem.ref, node);
	    }
	    return node;
	}

	function destroyVelem(velem, node) {
	    var props = velem.props;
	    var vchildren = node.vchildren;
	    var childNodes = node.childNodes;

	    for (var i = 0, len = vchildren.length; i < len; i++) {
	        destroyVnode(vchildren[i], childNodes[i]);
	    }

	    detachRef(velem.refs, velem.ref);

	    node.eventStore = node.vchildren = null;
	    for (var key in props) {
	        if (props.hasOwnProperty(key) && EVENT_KEYS.test(key)) {
	            key = getEventName(key);
	            if (notBubbleEvents[key] === true) {
	                node[key] = null;
	            }
	        }
	    }
	}

	function initVstateless(vstateless, parentContext, namespaceURI) {
	    var vnode = renderVstateless(vstateless, parentContext);
	    var node = initVnode(vnode, parentContext, namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[vstateless.id] = vnode;
	    return node;
	}
	function updateVstateless(vstateless, newVstateless, node, parentContext, hasNewContext) {
	    var id = vstateless.id;
	    var vnode = node.cache[id];
	    delete node.cache[id];
	    var newVnode = renderVstateless(newVstateless, parentContext);
	    var newNode = compareTwoVnodes(vnode, newVnode, node, parentContext, hasNewContext);
	    newNode.cache = newNode.cache || {};
	    newNode.cache[newVstateless.id] = newVnode;
	    if (newNode !== node) {
	        syncCache(newNode.cache, node.cache, newNode);
	    }
	    return newNode;
	}
	function destroyVstateless(vstateless, node) {
	    var id = vstateless.id;
	    var vnode = node.cache[id];
	    delete node.cache[id];
	    destroyVnode(vnode, node);
	}

	function renderVstateless(vstateless, parentContext) {
	    var factory = vstateless.type;
	    var props = vstateless.props;

	    var componentContext = getContextByTypes(parentContext, factory.contextTypes);
	    var vnode = factory(props, componentContext);
	    if (vnode && vnode.render) {
	        vnode = vnode.render();
	    }
	    if (vnode === null || vnode === false) {
	        vnode = createVcomment('react-empty: ' + getUid());
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + factory.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }
	    return vnode;
	}

	function initVcomponent(vcomponent, parentContext, namespaceURI) {
	    var Component = vcomponent.type;
	    var props = vcomponent.props;
	    var id = vcomponent.id;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    var component = new Component(props, componentContext);
	    var updater = component.$updater;
	    var cache = component.$cache;

	    cache.parentContext = parentContext;
	    updater.isPending = true;
	    component.props = component.props || props;
	    component.context = component.context || componentContext;
	    if (component.componentWillMount) {
	        component.componentWillMount();
	        component.state = updater.getState();
	    }
	    var vnode = renderComponent(component, parentContext);
	    var node = initVnode(vnode, vnode.context, namespaceURI);
	    node.cache = node.cache || {};
	    node.cache[id] = component;
	    cache.vnode = vnode;
	    cache.node = node;
	    cache.isMounted = true;
	    pendingComponents.push(component);
	    attachRef(vcomponent.refs, vcomponent.ref, component);
	    return node;
	}
	function updateVcomponent(vcomponent, newVcomponent, node, parentContext, hasNewContext) {
	    var id = vcomponent.id;
	    var component = node.cache[id];
	    var updater = component.$updater;
	    var cache = component.$cache;
	    var Component = newVcomponent.type;
	    var nextProps = newVcomponent.props;

	    var componentContext = getContextByTypes(parentContext, Component.contextTypes);
	    delete node.cache[id];
	    node.cache[newVcomponent.id] = component;
	    cache.parentContext = parentContext;
	    cache.hasNewContext = hasNewContext;
	    if (component.componentWillReceiveProps) {
	        updater.isPending = true;
	        component.componentWillReceiveProps(nextProps, componentContext);
	        updater.isPending = false;
	    }
	    updater.emitUpdate(nextProps, componentContext);

	    if (vcomponent.ref !== newVcomponent.ref) {
	        detachRef(vcomponent.refs, vcomponent.ref);
	        attachRef(newVcomponent.refs, newVcomponent.ref, component);
	    }
	    return cache.node;
	}
	function destroyVcomponent(vcomponent, node) {
	    var id = vcomponent.id;
	    var component = node.cache[id];
	    var cache = component.$cache;
	    delete node.cache[id];
	    detachRef(vcomponent.refs, vcomponent.ref);
	    component.setState = component.forceUpdate = noop;
	    if (component.componentWillUnmount) {
	        component.componentWillUnmount();
	    }
	    destroyVnode(cache.vnode, node);
	    delete component.setState;
	    cache.isMounted = false;
	    cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null;
	}

	function getContextByTypes(curContext, contextTypes) {
	    var context = {};
	    if (!contextTypes || !curContext) {
	        return context;
	    }
	    for (var key in contextTypes) {
	        if (contextTypes.hasOwnProperty(key)) {
	            context[key] = curContext[key];
	        }
	    }
	    return context;
	}

	function renderComponent(component, parentContext) {
	    refs = component.refs;
	    var vnode = component.render();

	    if (vnode === null || vnode === false) {
	        vnode = createVcomment('react-empty: ' + getUid());
	    } else if (!vnode || !vnode.vtype) {
	        throw new Error('@' + component.constructor.name + '#render:You may have returned undefined, an array or some other invalid object');
	    }

	    var curContext = refs = null;
	    if (component.getChildContext) {
	        curContext = component.getChildContext();
	    }
	    if (curContext) {
	        curContext = extend(extend({}, parentContext), curContext);
	    } else {
	        curContext = parentContext;
	    }
	    vnode.context = curContext;
	    return vnode;
	}

	function batchUpdateDOM() {
	    clearPendingPropsUpdater();
	    clearPendingTextUpdater();
	    clearPendingComponents();
	}

	var pendingComponents = [];
	function clearPendingComponents() {
	    var len = pendingComponents.length;
	    if (!len) {
	        return;
	    }
	    var components = pendingComponents;
	    pendingComponents = [];
	    var i = -1;
	    while (len--) {
	        var component = components[++i];
	        var updater = component.$updater;
	        if (component.componentDidMount) {
	            component.componentDidMount();
	        }
	        updater.isPending = false;
	        updater.emitUpdate();
	    }
	}

	var pendingTextUpdater = [];
	var clearPendingTextUpdater = function clearPendingTextUpdater() {
	    var len = pendingTextUpdater.length;
	    if (!len) {
	        return;
	    }
	    var list = pendingTextUpdater;
	    pendingTextUpdater = [];
	    for (var i = 0; i < len; i++) {
	        var node = list[i];
	        node.nodeValue = node.newText;
	    }
	};

	var pendingPropsUpdater = [];
	var clearPendingPropsUpdater = function clearPendingPropsUpdater() {
	    var len = pendingPropsUpdater.length;
	    if (!len) {
	        return;
	    }
	    var list = pendingPropsUpdater;
	    pendingPropsUpdater = [];
	    for (var i = 0; i < len; i++) {
	        var node = list[i];
	        patchProps(node, node.props, node.newProps, node.isCustomComponent);
	        node.props = node.newProps = null;
	    }
	};

	function compareTwoVnodes(vnode, newVnode, node, parentContext, hasNewContext) {
	    var newNode = node;

	    if (newVnode == null) {
	        // remove
	        destroyVnode(vnode, node);
	        node.parentNode.removeChild(node);
	    } else if (vnode.type !== newVnode.type || newVnode.key !== vnode.key) {
	        // replace
	        destroyVnode(vnode, node);
	        newNode = initVnode(newVnode, parentContext, node.namespaceURI);
	        node.parentNode.replaceChild(newNode, node);
	    } else if (vnode !== newVnode) {
	        // same type and same key -> update
	        var vtype = vnode.vtype;
	        if (vtype === VELEMENT) {
	            newNode = updateVelem(vnode, newVnode, node, parentContext, hasNewContext);
	        } else if (vtype === VCOMPONENT) {
	            newNode = updateVcomponent(vnode, newVnode, node, parentContext, hasNewContext);
	        } else if (vtype === VSTATELESS) {
	            newNode = updateVstateless(vnode, newVnode, node, parentContext, hasNewContext);
	        }
	    } else if (hasNewContext) {
	        // update component with new context
	        var vtype = vnode.vtype;
	        if (vtype === VCOMPONENT) {
	            newNode = updateVcomponent(vnode, newVnode, node, parentContext, hasNewContext);
	        } else if (vtype === VSTATELESS) {
	            newNode = updateVstateless(vnode, newVnode, node, parentContext, hasNewContext);
	        }
	    }

	    return newNode;
	}

	function getDOMNode() {
	    return this;
	}

	function attachRef(refs, refKey, refValue) {
	    if (!refs || refKey == null || !refValue) {
	        return;
	    }
	    if (refValue.nodeName && !refValue.getDOMNode) {
	        // support react v0.13 style: this.refs.myInput.getDOMNode()
	        refValue.getDOMNode = getDOMNode;
	    }
	    if (isFn(refKey)) {
	        refKey(refValue);
	    } else {
	        refs[refKey] = refValue;
	    }
	}

	function detachRef(refs, refKey) {
	    if (!refs || refKey == null) {
	        return;
	    }
	    if (isFn(refKey)) {
	        refKey(null);
	    } else {
	        delete refs[refKey];
	    }
	}

	function syncCache(cache, oldCache, node) {
	    for (var key in oldCache) {
	        if (!oldCache.hasOwnProperty(key)) {
	            continue;
	        }
	        var value = oldCache[key];
	        cache[key] = value;
	        // is component, update component.$cache.node
	        if (value.forceUpdate) {
	            value.$cache.node = node;
	        }
	    }
	}

	var updateQueue = {
		updaters: [],
		isPending: false,
		add: function add(updater) {
			this.updaters.push(updater);
		},
		batchUpdate: function batchUpdate() {
			if (this.isPending) {
				return;
			}
			this.isPending = true;
			/*
	   each updater.update may add new updater to updateQueue
	   clear them with a loop
	   event bubbles from bottom-level to top-level
	   reverse the updater order can merge some props and state and reduce the refresh times
	   see Updater.update method below to know why
	  */
			var updaters = this.updaters;

			var updater = undefined;
			while (updater = updaters.pop()) {
				updater.updateComponent();
			}
			this.isPending = false;
		}
	};

	function Updater(instance) {
		this.instance = instance;
		this.pendingStates = [];
		this.pendingCallbacks = [];
		this.isPending = false;
		this.nextProps = this.nextContext = null;
		this.clearCallbacks = this.clearCallbacks.bind(this);
	}

	Updater.prototype = {
		emitUpdate: function emitUpdate(nextProps, nextContext) {
			this.nextProps = nextProps;
			this.nextContext = nextContext;
			// receive nextProps!! should update immediately
			nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
		},
		updateComponent: function updateComponent() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var nextProps = this.nextProps;
			var nextContext = this.nextContext;

			if (nextProps || pendingStates.length > 0) {
				nextProps = nextProps || instance.props;
				nextContext = nextContext || instance.context;
				this.nextProps = this.nextContext = null;
				// merge the nextProps and nextState and update by one time
				shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
			}
		},
		addState: function addState(nextState) {
			if (nextState) {
				this.pendingStates.push(nextState);
				if (!this.isPending) {
					this.emitUpdate();
				}
			}
		},
		replaceState: function replaceState(nextState) {
			var pendingStates = this.pendingStates;

			pendingStates.pop();
			// push special params to point out should replace state
			pendingStates.push([nextState]);
		},
		getState: function getState() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var state = instance.state;
			var props = instance.props;

			if (pendingStates.length) {
				state = extend({}, state);
				eachItem(pendingStates, function (nextState) {
					// replace state
					if (isArr(nextState)) {
						state = extend({}, nextState[0]);
						return;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					extend(state, nextState);
				});
				pendingStates.length = 0;
			}
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;

			if (pendingCallbacks.length > 0) {
				this.pendingCallbacks = [];
				eachItem(pendingCallbacks, function (callback) {
					return callback.call(instance);
				});
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
				this.pendingCallbacks.push(callback);
			}
		}
	};
	function Component(props, context) {
		this.$updater = new Updater(this);
		this.$cache = { isMounted: false };
		this.props = props;
		this.state = {};
		this.refs = {};
		this.context = context;
	}

	Component.prototype = {
		constructor: Component,
		// getChildContext: _.noop,
		// componentWillUpdate: _.noop,
		// componentDidUpdate: _.noop,
		// componentWillReceiveProps: _.noop,
		// componentWillMount: _.noop,
		// componentDidMount: _.noop,
		// componentWillUnmount: _.noop,
		// shouldComponentUpdate(nextProps, nextState) {
		// 	return true
		// },
		forceUpdate: function forceUpdate(callback) {
			var $updater = this.$updater;
			var $cache = this.$cache;
			var props = this.props;
			var state = this.state;
			var context = this.context;

			if ($updater.isPending || !$cache.isMounted) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			var nextContext = $cache.context || {};
			var parentContext = $cache.parentContext;
			var node = $cache.node;
			var vnode = $cache.vnode;
			var hasNewContext = $cache.hasNewContext || !!this.getChildContext;
			$cache.props = $cache.state = $cache.context = null;
			$updater.isPending = true;
			if (this.componentWillUpdate) {
				this.componentWillUpdate(nextProps, nextState, nextContext);
			}
			this.state = nextState;
			this.props = nextProps;
			this.context = nextContext;
			var newVnode = renderComponent(this, parentContext);
			var newNode = compareTwoVnodes(vnode, newVnode, node, newVnode.context, hasNewContext);
			if (newNode !== node) {
				newNode.cache = newNode.cache || {};
				syncCache(newNode.cache, node.cache, newNode);
			}
			$cache.vnode = newVnode;
			$cache.node = newNode;
			$cache.hasNewContext = false;
			batchUpdateDOM();
			if (this.componentDidUpdate) {
				this.componentDidUpdate(props, state, context);
			}
			if (callback) {
				callback.call(this);
			}
			$updater.isPending = false;
			$updater.emitUpdate();
		},
		setState: function setState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		replaceState: function replaceState(nextState, callback) {
			var $updater = this.$updater;

			$updater.addCallback(callback);
			$updater.replaceState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.$cache.node;
			return node && node.nodeName === '#comment' ? null : node;
		},
		isMounted: function isMounted() {
			return this.$cache.isMounted;
		}
	};

	function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = true;
		if (component.shouldComponentUpdate) {
			shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		}
		if (shouldComponentUpdate === false) {
			component.props = nextProps;
			component.state = nextState;
			component.context = nextContext || {};
			return;
		}
		var cache = component.$cache;
		cache.props = nextProps;
		cache.state = nextState;
		cache.context = nextContext || {};
		component.forceUpdate(callback);
	}

	// event config
	var notBubbleEvents = {
		onmouseleave: 1,
		onmouseenter: 1,
		onload: 1,
		onunload: 1,
		onscroll: 1,
		onfocus: 1,
		onblur: 1,
		onrowexit: 1,
		onbeforeunload: 1,
		onstop: 1,
		ondragdrop: 1,
		ondragenter: 1,
		ondragexit: 1,
		ondraggesture: 1,
		ondragover: 1,
		oncontextmenu: 1
	};

	function getEventName(key) {
		key = key === 'onDoubleClick' ? 'ondblclick' : key;
		return key.toLowerCase();
	}

	// Mobile Safari does not fire properly bubble click events on
	// non-interactive elements, which means delegated click listeners do not
	// fire. The workaround for this bug involves attaching an empty click
	// listener on the target node.
	var inMobile = ('ontouchstart' in document);
	var emptyFunction = function emptyFunction() {};
	var ON_CLICK_KEY = 'onclick';

	var eventTypes = {};

	function addEvent(elem, eventType, listener) {
		eventType = getEventName(eventType);

		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = listener;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		eventStore[eventType] = listener;

		if (!eventTypes[eventType]) {
			// onclick -> click
			document.addEventListener(eventType.substr(2), dispatchEvent, false);
			eventTypes[eventType] = true;
		}

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.addEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			addEvent(elem, 'oninput', listener);
		}
	}

	function removeEvent(elem, eventType) {
		eventType = getEventName(eventType);
		if (notBubbleEvents[eventType] === 1) {
			elem[eventType] = null;
			return;
		}

		var eventStore = elem.eventStore || (elem.eventStore = {});
		delete eventStore[eventType];

		if (inMobile && eventType === ON_CLICK_KEY) {
			elem.removeEventListener('click', emptyFunction, false);
		}

		var nodeName = elem.nodeName;

		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			delete eventStore['oninput'];
		}
	}

	function dispatchEvent(event) {
		var target = event.target;
		var type = event.type;

		var eventType = 'on' + type;
		var syntheticEvent = undefined;

		updateQueue.isPending = true;
		while (target) {
			var _target = target;
			var eventStore = _target.eventStore;

			var listener = eventStore && eventStore[eventType];
			if (!listener) {
				target = target.parentNode;
				continue;
			}
			if (!syntheticEvent) {
				syntheticEvent = createSyntheticEvent(event);
			}
			syntheticEvent.currentTarget = target;
			listener.call(target, syntheticEvent);
			if (syntheticEvent.$cancalBubble) {
				break;
			}
			target = target.parentNode;
		}
		updateQueue.isPending = false;
		updateQueue.batchUpdate();
	}

	function createSyntheticEvent(nativeEvent) {
		var syntheticEvent = {};
		var cancalBubble = function cancalBubble() {
			return syntheticEvent.$cancalBubble = true;
		};
		syntheticEvent.nativeEvent = nativeEvent;
		syntheticEvent.persist = noop;
		for (var key in nativeEvent) {
			if (typeof nativeEvent[key] !== 'function') {
				syntheticEvent[key] = nativeEvent[key];
			} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
				syntheticEvent[key] = cancalBubble;
			} else {
				syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
			}
		}
		return syntheticEvent;
	}

	function setStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            setStyleValue(elemStyle, styleName, styles[styleName]);
	        }
	    }
	}

	function removeStyle(elemStyle, styles) {
	    for (var styleName in styles) {
	        if (styles.hasOwnProperty(styleName)) {
	            elemStyle[styleName] = '';
	        }
	    }
	}

	function patchStyle(elemStyle, style, newStyle) {
	    if (style === newStyle) {
	        return;
	    }
	    if (!newStyle && style) {
	        removeStyle(elemStyle, style);
	        return;
	    } else if (newStyle && !style) {
	        setStyle(elemStyle, newStyle);
	        return;
	    }

	    var keyMap = {};
	    for (var key in style) {
	        if (style.hasOwnProperty(key)) {
	            keyMap[key] = true;
	            if (style[key] !== newStyle[key]) {
	                setStyleValue(elemStyle, key, newStyle[key]);
	            }
	        }
	    }
	    for (var key in newStyle) {
	        if (newStyle.hasOwnProperty(key) && keyMap[key] !== true) {
	            if (style[key] !== newStyle[key]) {
	                setStyleValue(elemStyle, key, newStyle[key]);
	            }
	        }
	    }
	}

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	    animationIterationCount: 1,
	    borderImageOutset: 1,
	    borderImageSlice: 1,
	    borderImageWidth: 1,
	    boxFlex: 1,
	    boxFlexGroup: 1,
	    boxOrdinalGroup: 1,
	    columnCount: 1,
	    flex: 1,
	    flexGrow: 1,
	    flexPositive: 1,
	    flexShrink: 1,
	    flexNegative: 1,
	    flexOrder: 1,
	    gridRow: 1,
	    gridColumn: 1,
	    fontWeight: 1,
	    lineClamp: 1,
	    lineHeight: 1,
	    opacity: 1,
	    order: 1,
	    orphans: 1,
	    tabSize: 1,
	    widows: 1,
	    zIndex: 1,
	    zoom: 1,

	    // SVG-related properties
	    fillOpacity: 1,
	    floodOpacity: 1,
	    stopOpacity: 1,
	    strokeDasharray: 1,
	    strokeDashoffset: 1,
	    strokeMiterlimit: 1,
	    strokeOpacity: 1,
	    strokeWidth: 1
	};

	function prefixKey(prefix, key) {
	    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	Object.keys(isUnitlessNumber).forEach(function (prop) {
	    prefixes.forEach(function (prefix) {
	        isUnitlessNumber[prefixKey(prefix, prop)] = 1;
	    });
	});

	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	function setStyleValue(elemStyle, styleName, styleValue) {

	    if (!isUnitlessNumber[styleName] && RE_NUMBER.test(styleValue)) {
	        elemStyle[styleName] = styleValue + 'px';
	        return;
	    }

	    if (styleName === 'float') {
	        styleName = 'cssFloat';
	    }

	    if (styleValue == null || typeof styleValue === 'boolean') {
	        styleValue = '';
	    }

	    elemStyle[styleName] = styleValue;
	}

	var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
	var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\uB7\\u0300-\\u036F\\u203F-\\u2040';

	var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

	var isCustomAttribute = RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$'));
	// will merge some data in properties below
	var properties = {};

	/**
	 * Mapping from normalized, camelcased property names to a configuration that
	 * specifies how the associated DOM property should be accessed or rendered.
	 */
	var MUST_USE_PROPERTY = 0x1;
	var HAS_BOOLEAN_VALUE = 0x4;
	var HAS_NUMERIC_VALUE = 0x8;
	var HAS_POSITIVE_NUMERIC_VALUE = 0x10 | 0x8;
	var HAS_OVERLOADED_BOOLEAN_VALUE = 0x20;

	// html config
	var HTMLDOMPropertyConfig = {
	    props: {
	        /**
	         * Standard Properties
	         */
	        accept: 0,
	        acceptCharset: 0,
	        accessKey: 0,
	        action: 0,
	        allowFullScreen: HAS_BOOLEAN_VALUE,
	        allowTransparency: 0,
	        alt: 0,
	        async: HAS_BOOLEAN_VALUE,
	        autoComplete: 0,
	        autoFocus: HAS_BOOLEAN_VALUE,
	        autoPlay: HAS_BOOLEAN_VALUE,
	        capture: HAS_BOOLEAN_VALUE,
	        cellPadding: 0,
	        cellSpacing: 0,
	        charSet: 0,
	        challenge: 0,
	        checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        cite: 0,
	        classID: 0,
	        className: 0,
	        cols: HAS_POSITIVE_NUMERIC_VALUE,
	        colSpan: 0,
	        content: 0,
	        contentEditable: 0,
	        contextMenu: 0,
	        controls: HAS_BOOLEAN_VALUE,
	        coords: 0,
	        crossOrigin: 0,
	        data: 0, // For `<object />` acts as `src`.
	        dateTime: 0,
	        'default': HAS_BOOLEAN_VALUE,
	        // not in regular react, they did it in other way
	        defaultValue: MUST_USE_PROPERTY,
	        // not in regular react, they did it in other way
	        defaultChecked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        defer: HAS_BOOLEAN_VALUE,
	        dir: 0,
	        disabled: HAS_BOOLEAN_VALUE,
	        download: HAS_OVERLOADED_BOOLEAN_VALUE,
	        draggable: 0,
	        encType: 0,
	        form: 0,
	        formAction: 0,
	        formEncType: 0,
	        formMethod: 0,
	        formNoValidate: HAS_BOOLEAN_VALUE,
	        formTarget: 0,
	        frameBorder: 0,
	        headers: 0,
	        height: 0,
	        hidden: HAS_BOOLEAN_VALUE,
	        high: 0,
	        href: 0,
	        hrefLang: 0,
	        htmlFor: 0,
	        httpEquiv: 0,
	        icon: 0,
	        id: 0,
	        inputMode: 0,
	        integrity: 0,
	        is: 0,
	        keyParams: 0,
	        keyType: 0,
	        kind: 0,
	        label: 0,
	        lang: 0,
	        list: 0,
	        loop: HAS_BOOLEAN_VALUE,
	        low: 0,
	        manifest: 0,
	        marginHeight: 0,
	        marginWidth: 0,
	        max: 0,
	        maxLength: 0,
	        media: 0,
	        mediaGroup: 0,
	        method: 0,
	        min: 0,
	        minLength: 0,
	        // Caution; `option.selected` is not updated if `select.multiple` is
	        // disabled with `removeAttribute`.
	        multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        name: 0,
	        nonce: 0,
	        noValidate: HAS_BOOLEAN_VALUE,
	        open: HAS_BOOLEAN_VALUE,
	        optimum: 0,
	        pattern: 0,
	        placeholder: 0,
	        poster: 0,
	        preload: 0,
	        profile: 0,
	        radioGroup: 0,
	        readOnly: HAS_BOOLEAN_VALUE,
	        rel: 0,
	        required: HAS_BOOLEAN_VALUE,
	        reversed: HAS_BOOLEAN_VALUE,
	        role: 0,
	        rows: HAS_POSITIVE_NUMERIC_VALUE,
	        rowSpan: HAS_NUMERIC_VALUE,
	        sandbox: 0,
	        scope: 0,
	        scoped: HAS_BOOLEAN_VALUE,
	        scrolling: 0,
	        seamless: HAS_BOOLEAN_VALUE,
	        selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	        shape: 0,
	        size: HAS_POSITIVE_NUMERIC_VALUE,
	        sizes: 0,
	        span: HAS_POSITIVE_NUMERIC_VALUE,
	        spellCheck: 0,
	        src: 0,
	        srcDoc: 0,
	        srcLang: 0,
	        srcSet: 0,
	        start: HAS_NUMERIC_VALUE,
	        step: 0,
	        style: 0,
	        summary: 0,
	        tabIndex: 0,
	        target: 0,
	        title: 0,
	        // Setting .type throws on non-<input> tags
	        type: 0,
	        useMap: 0,
	        value: MUST_USE_PROPERTY,
	        width: 0,
	        wmode: 0,
	        wrap: 0,

	        /**
	         * RDFa Properties
	         */
	        about: 0,
	        datatype: 0,
	        inlist: 0,
	        prefix: 0,
	        // property is also supported for OpenGraph in meta tags.
	        property: 0,
	        resource: 0,
	        'typeof': 0,
	        vocab: 0,

	        /**
	         * Non-standard Properties
	         */
	        // autoCapitalize and autoCorrect are supported in Mobile Safari for
	        // keyboard hints.
	        autoCapitalize: 0,
	        autoCorrect: 0,
	        // autoSave allows WebKit/Blink to persist values of input fields on page reloads
	        autoSave: 0,
	        // color is for Safari mask-icon link
	        color: 0,
	        // itemProp, itemScope, itemType are for
	        // Microdata support. See http://schema.org/docs/gs.html
	        itemProp: 0,
	        itemScope: HAS_BOOLEAN_VALUE,
	        itemType: 0,
	        // itemID and itemRef are for Microdata support as well but
	        // only specified in the WHATWG spec document. See
	        // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	        itemID: 0,
	        itemRef: 0,
	        // results show looking glass icon and recent searches on input
	        // search fields in WebKit/Blink
	        results: 0,
	        // IE-only attribute that specifies security restrictions on an iframe
	        // as an alternative to the sandbox attribute on IE<10
	        security: 0,
	        // IE-only attribute that controls focus behavior
	        unselectable: 0
	    },
	    attrNS: {},
	    domAttrs: {
	        acceptCharset: 'accept-charset',
	        className: 'class',
	        htmlFor: 'for',
	        httpEquiv: 'http-equiv'
	    },
	    domProps: {}
	};

	// svg config
	var xlink = 'http://www.w3.org/1999/xlink';
	var xml = 'http://www.w3.org/XML/1998/namespace';

	// We use attributes for everything SVG so let's avoid some duplication and run
	// code instead.
	// The following are all specified in the HTML config already so we exclude here.
	// - class (as className)
	// - color
	// - height
	// - id
	// - lang
	// - max
	// - media
	// - method
	// - min
	// - name
	// - style
	// - target
	// - type
	// - width
	var ATTRS = {
	    accentHeight: 'accent-height',
	    accumulate: 0,
	    additive: 0,
	    alignmentBaseline: 'alignment-baseline',
	    allowReorder: 'allowReorder',
	    alphabetic: 0,
	    amplitude: 0,
	    arabicForm: 'arabic-form',
	    ascent: 0,
	    attributeName: 'attributeName',
	    attributeType: 'attributeType',
	    autoReverse: 'autoReverse',
	    azimuth: 0,
	    baseFrequency: 'baseFrequency',
	    baseProfile: 'baseProfile',
	    baselineShift: 'baseline-shift',
	    bbox: 0,
	    begin: 0,
	    bias: 0,
	    by: 0,
	    calcMode: 'calcMode',
	    capHeight: 'cap-height',
	    clip: 0,
	    clipPath: 'clip-path',
	    clipRule: 'clip-rule',
	    clipPathUnits: 'clipPathUnits',
	    colorInterpolation: 'color-interpolation',
	    colorInterpolationFilters: 'color-interpolation-filters',
	    colorProfile: 'color-profile',
	    colorRendering: 'color-rendering',
	    contentScriptType: 'contentScriptType',
	    contentStyleType: 'contentStyleType',
	    cursor: 0,
	    cx: 0,
	    cy: 0,
	    d: 0,
	    decelerate: 0,
	    descent: 0,
	    diffuseConstant: 'diffuseConstant',
	    direction: 0,
	    display: 0,
	    divisor: 0,
	    dominantBaseline: 'dominant-baseline',
	    dur: 0,
	    dx: 0,
	    dy: 0,
	    edgeMode: 'edgeMode',
	    elevation: 0,
	    enableBackground: 'enable-background',
	    end: 0,
	    exponent: 0,
	    externalResourcesRequired: 'externalResourcesRequired',
	    fill: 0,
	    fillOpacity: 'fill-opacity',
	    fillRule: 'fill-rule',
	    filter: 0,
	    filterRes: 'filterRes',
	    filterUnits: 'filterUnits',
	    floodColor: 'flood-color',
	    floodOpacity: 'flood-opacity',
	    focusable: 0,
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    fontSizeAdjust: 'font-size-adjust',
	    fontStretch: 'font-stretch',
	    fontStyle: 'font-style',
	    fontVariant: 'font-variant',
	    fontWeight: 'font-weight',
	    format: 0,
	    from: 0,
	    fx: 0,
	    fy: 0,
	    g1: 0,
	    g2: 0,
	    glyphName: 'glyph-name',
	    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
	    glyphOrientationVertical: 'glyph-orientation-vertical',
	    glyphRef: 'glyphRef',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    hanging: 0,
	    horizAdvX: 'horiz-adv-x',
	    horizOriginX: 'horiz-origin-x',
	    ideographic: 0,
	    imageRendering: 'image-rendering',
	    'in': 0,
	    in2: 0,
	    intercept: 0,
	    k: 0,
	    k1: 0,
	    k2: 0,
	    k3: 0,
	    k4: 0,
	    kernelMatrix: 'kernelMatrix',
	    kernelUnitLength: 'kernelUnitLength',
	    kerning: 0,
	    keyPoints: 'keyPoints',
	    keySplines: 'keySplines',
	    keyTimes: 'keyTimes',
	    lengthAdjust: 'lengthAdjust',
	    letterSpacing: 'letter-spacing',
	    lightingColor: 'lighting-color',
	    limitingConeAngle: 'limitingConeAngle',
	    local: 0,
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    markerHeight: 'markerHeight',
	    markerUnits: 'markerUnits',
	    markerWidth: 'markerWidth',
	    mask: 0,
	    maskContentUnits: 'maskContentUnits',
	    maskUnits: 'maskUnits',
	    mathematical: 0,
	    mode: 0,
	    numOctaves: 'numOctaves',
	    offset: 0,
	    opacity: 0,
	    operator: 0,
	    order: 0,
	    orient: 0,
	    orientation: 0,
	    origin: 0,
	    overflow: 0,
	    overlinePosition: 'overline-position',
	    overlineThickness: 'overline-thickness',
	    paintOrder: 'paint-order',
	    panose1: 'panose-1',
	    pathLength: 'pathLength',
	    patternContentUnits: 'patternContentUnits',
	    patternTransform: 'patternTransform',
	    patternUnits: 'patternUnits',
	    pointerEvents: 'pointer-events',
	    points: 0,
	    pointsAtX: 'pointsAtX',
	    pointsAtY: 'pointsAtY',
	    pointsAtZ: 'pointsAtZ',
	    preserveAlpha: 'preserveAlpha',
	    preserveAspectRatio: 'preserveAspectRatio',
	    primitiveUnits: 'primitiveUnits',
	    r: 0,
	    radius: 0,
	    refX: 'refX',
	    refY: 'refY',
	    renderingIntent: 'rendering-intent',
	    repeatCount: 'repeatCount',
	    repeatDur: 'repeatDur',
	    requiredExtensions: 'requiredExtensions',
	    requiredFeatures: 'requiredFeatures',
	    restart: 0,
	    result: 0,
	    rotate: 0,
	    rx: 0,
	    ry: 0,
	    scale: 0,
	    seed: 0,
	    shapeRendering: 'shape-rendering',
	    slope: 0,
	    spacing: 0,
	    specularConstant: 'specularConstant',
	    specularExponent: 'specularExponent',
	    speed: 0,
	    spreadMethod: 'spreadMethod',
	    startOffset: 'startOffset',
	    stdDeviation: 'stdDeviation',
	    stemh: 0,
	    stemv: 0,
	    stitchTiles: 'stitchTiles',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strikethroughPosition: 'strikethrough-position',
	    strikethroughThickness: 'strikethrough-thickness',
	    string: 0,
	    stroke: 0,
	    strokeDasharray: 'stroke-dasharray',
	    strokeDashoffset: 'stroke-dashoffset',
	    strokeLinecap: 'stroke-linecap',
	    strokeLinejoin: 'stroke-linejoin',
	    strokeMiterlimit: 'stroke-miterlimit',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    surfaceScale: 'surfaceScale',
	    systemLanguage: 'systemLanguage',
	    tableValues: 'tableValues',
	    targetX: 'targetX',
	    targetY: 'targetY',
	    textAnchor: 'text-anchor',
	    textDecoration: 'text-decoration',
	    textRendering: 'text-rendering',
	    textLength: 'textLength',
	    to: 0,
	    transform: 0,
	    u1: 0,
	    u2: 0,
	    underlinePosition: 'underline-position',
	    underlineThickness: 'underline-thickness',
	    unicode: 0,
	    unicodeBidi: 'unicode-bidi',
	    unicodeRange: 'unicode-range',
	    unitsPerEm: 'units-per-em',
	    vAlphabetic: 'v-alphabetic',
	    vHanging: 'v-hanging',
	    vIdeographic: 'v-ideographic',
	    vMathematical: 'v-mathematical',
	    values: 0,
	    vectorEffect: 'vector-effect',
	    version: 0,
	    vertAdvY: 'vert-adv-y',
	    vertOriginX: 'vert-origin-x',
	    vertOriginY: 'vert-origin-y',
	    viewBox: 'viewBox',
	    viewTarget: 'viewTarget',
	    visibility: 0,
	    widths: 0,
	    wordSpacing: 'word-spacing',
	    writingMode: 'writing-mode',
	    x: 0,
	    xHeight: 'x-height',
	    x1: 0,
	    x2: 0,
	    xChannelSelector: 'xChannelSelector',
	    xlinkActuate: 'xlink:actuate',
	    xlinkArcrole: 'xlink:arcrole',
	    xlinkHref: 'xlink:href',
	    xlinkRole: 'xlink:role',
	    xlinkShow: 'xlink:show',
	    xlinkTitle: 'xlink:title',
	    xlinkType: 'xlink:type',
	    xmlBase: 'xml:base',
	    xmlLang: 'xml:lang',
	    xmlSpace: 'xml:space',
	    y: 0,
	    y1: 0,
	    y2: 0,
	    yChannelSelector: 'yChannelSelector',
	    z: 0,
	    zoomAndPan: 'zoomAndPan'
	};

	var SVGDOMPropertyConfig = {
	    props: {},
	    attrNS: {
	        xlinkActuate: xlink,
	        xlinkArcrole: xlink,
	        xlinkHref: xlink,
	        xlinkRole: xlink,
	        xlinkShow: xlink,
	        xlinkTitle: xlink,
	        xlinkType: xlink,
	        xmlBase: xml,
	        xmlLang: xml,
	        xmlSpace: xml
	    },
	    domAttrs: {},
	    domProps: {}
	};

	Object.keys(ATTRS).map(function (key) {
	    SVGDOMPropertyConfig.props[key] = 0;
	    if (ATTRS[key]) {
	        SVGDOMPropertyConfig.domAttrs[key] = ATTRS[key];
	    }
	});

	// merge html and svg config into properties
	mergeConfigToProperties(HTMLDOMPropertyConfig);
	mergeConfigToProperties(SVGDOMPropertyConfig);

	function mergeConfigToProperties(config) {
	    var
	    // all react/react-lite supporting property names in here
	    props = config.props;
	    var
	    // attributes namespace in here
	    attrNS = config.attrNS;
	    var
	    // propName in props which should use to be dom-attribute in here
	    domAttrs = config.domAttrs;
	    var
	    // propName in props which should use to be dom-property in here
	    domProps = config.domProps;

	    for (var propName in props) {
	        if (!props.hasOwnProperty(propName)) {
	            continue;
	        }
	        var propConfig = props[propName];
	        properties[propName] = {
	            attributeName: domAttrs.hasOwnProperty(propName) ? domAttrs[propName] : propName.toLowerCase(),
	            propertyName: domProps.hasOwnProperty(propName) ? domProps[propName] : propName,
	            attributeNamespace: attrNS.hasOwnProperty(propName) ? attrNS[propName] : null,
	            mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
	            hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
	            hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
	            hasPositiveNumericValue: checkMask(propConfig, HAS_POSITIVE_NUMERIC_VALUE),
	            hasOverloadedBooleanValue: checkMask(propConfig, HAS_OVERLOADED_BOOLEAN_VALUE)
	        };
	    }
	}

	function checkMask(value, bitmask) {
	    return (value & bitmask) === bitmask;
	}

	/**
	 * Sets the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 * @param {*} value
	 */

	function setPropValue(node, name, value) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        // should delete value from dom
	        if (value == null || propInfo.hasBooleanValue && !value || propInfo.hasNumericValue && isNaN(value) || propInfo.hasPositiveNumericValue && value < 1 || propInfo.hasOverloadedBooleanValue && value === false) {
	            removePropValue(node, name);
	        } else if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            // dom.value has side effect
	            if (propName !== 'value' || '' + node[propName] !== '' + value) {
	                node[propName] = value;
	            }
	        } else {
	            var attributeName = propInfo.attributeName;
	            var namespace = propInfo.attributeNamespace;

	            // `setAttribute` with objects becomes only `[object]` in IE8/9,
	            // ('' + value) makes it output the correct toString()-value.
	            if (namespace) {
	                node.setAttributeNS(namespace, attributeName, '' + value);
	            } else if (propInfo.hasBooleanValue || propInfo.hasOverloadedBooleanValue && value === true) {
	                node.setAttribute(attributeName, '');
	            } else {
	                node.setAttribute(attributeName, '' + value);
	            }
	        }
	    } else if (isCustomAttribute(name) && VALID_ATTRIBUTE_NAME_REGEX.test(name)) {
	        if (value == null) {
	            node.removeAttribute(name);
	        } else {
	            node.setAttribute(name, '' + value);
	        }
	    }
	}

	/**
	 * Deletes the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 */

	function removePropValue(node, name) {
	    var propInfo = properties.hasOwnProperty(name) && properties[name];
	    if (propInfo) {
	        if (propInfo.mustUseProperty) {
	            var propName = propInfo.propertyName;
	            if (propInfo.hasBooleanValue) {
	                node[propName] = false;
	            } else {
	                // dom.value accept string value has side effect
	                if (propName !== 'value' || '' + node[propName] !== '') {
	                    node[propName] = '';
	                }
	            }
	        } else {
	            node.removeAttribute(propInfo.attributeName);
	        }
	    } else if (isCustomAttribute(name)) {
	        node.removeAttribute(name);
	    }
	}

	function isFn(obj) {
	    return typeof obj === 'function';
	}

	var isArr = Array.isArray;

	function noop() {}

	function identity(obj) {
	    return obj;
	}

	function pipe(fn1, fn2) {
	    return function () {
	        fn1.apply(this, arguments);
	        return fn2.apply(this, arguments);
	    };
	}

	function flattenChildren(list, iteratee, a) {
	    var len = list.length;
	    var i = -1;

	    while (len--) {
	        var item = list[++i];
	        if (isArr(item)) {
	            flattenChildren(item, iteratee, a);
	        } else {
	            iteratee(item, a);
	        }
	    }
	}

	function eachItem(list, iteratee) {
	    for (var i = 0, len = list.length; i < len; i++) {
	        iteratee(list[i], i);
	    }
	}

	function extend(to, from) {
	    if (!from) {
	        return to;
	    }
	    var keys = Object.keys(from);
	    var i = keys.length;
	    while (i--) {
	        to[keys[i]] = from[keys[i]];
	    }
	    return to;
	}

	var uid = 0;

	function getUid() {
	    return ++uid;
	}

	var EVENT_KEYS = /^on/i;
	function setProps(elem, props, isCustomComponent) {
	    for (var key in props) {
	        if (!props.hasOwnProperty(key) || key === 'children') {
	            continue;
	        }
	        var value = props[key];
	        if (EVENT_KEYS.test(key)) {
	            addEvent(elem, key, value);
	        } else if (key === 'style') {
	            setStyle(elem.style, value);
	        } else if (key === 'dangerouslySetInnerHTML') {
	            value && value.__html != null && (elem.innerHTML = value.__html);
	        } else if (isCustomComponent) {
	            if (value == null) {
	                elem.removeAttribute(key);
	            } else {
	                elem.setAttribute(key, '' + value);
	            }
	        } else {
	            setPropValue(elem, key, value);
	        }
	    }
	}

	function patchProp(key, oldValue, value, elem, isCustomComponent) {
	    if (key === 'value' || key === 'checked') {
	        oldValue = elem[key];
	    }
	    if (value === oldValue) {
	        return;
	    }
	    if (value === undefined) {
	        if (EVENT_KEYS.test(key)) {
	            removeEvent(elem, key);
	        } else if (key === 'style') {
	            removeStyle(elem.style, oldValue);
	        } else if (key === 'dangerouslySetInnerHTML') {
	            elem.innerHTML = '';
	        } else if (isCustomComponent) {
	            elem.removeAttribute(key);
	        } else {
	            removePropValue(elem, key);
	        }
	        return;
	    }
	    if (EVENT_KEYS.test(key)) {
	        // addEvent will replace the oldValue
	        addEvent(elem, key, value);
	    } else if (key === 'style') {
	        patchStyle(elem.style, oldValue, value);
	    } else if (key === 'dangerouslySetInnerHTML') {
	        var oldHtml = oldValue && oldValue.__html;
	        var html = value && value.__html;
	        if (html != null && html !== oldHtml) {
	            elem.innerHTML = html;
	        }
	    } else if (isCustomComponent) {
	        if (value == null) {
	            elem.removeAttribute(key);
	        } else {
	            elem.setAttribute(key, '' + value);
	        }
	    } else {
	        setPropValue(elem, key, value);
	    }
	}

	function patchProps(elem, props, newProps, isCustomComponent) {
	    var keyMap = { children: true };
	    for (var key in props) {
	        if (props.hasOwnProperty(key) && key !== 'children') {
	            keyMap[key] = true;
	            patchProp(key, props[key], newProps[key], elem, isCustomComponent);
	        }
	    }
	    for (var key in newProps) {
	        if (newProps.hasOwnProperty(key) && keyMap[key] !== true) {
	            patchProp(key, props[key], newProps[key], elem, isCustomComponent);
	        }
	    }
	}

	if (!Object.freeze) {
	    Object.freeze = identity;
	}

	var pendingRendering = {};
	var vnodeStore = {};
	function renderTreeIntoContainer(vnode, container, callback, parentContext) {
		if (!vnode.vtype) {
			throw new Error('cannot render ' + vnode + ' to container');
		}
		var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
		var argsCache = pendingRendering[id];

		// component lify cycle method maybe call root rendering
		// should bundle them and render by only one time
		if (argsCache) {
			if (argsCache === true) {
				pendingRendering[id] = argsCache = [vnode, callback, parentContext];
			} else {
				argsCache[0] = vnode;
				argsCache[2] = parentContext;
				if (callback) {
					argsCache[1] = argsCache[1] ? pipe(argsCache[1], callback) : callback;
				}
			}
			return;
		}

		pendingRendering[id] = true;
		var oldVnode = null;
		var rootNode = null;
		if (oldVnode = vnodeStore[id]) {
			rootNode = compareTwoVnodes(oldVnode, vnode, container.firstChild, parentContext);
		} else {
			rootNode = initVnode(vnode, parentContext, container.namespaceURI);
			var childNode = null;
			while (childNode = container.lastChild) {
				container.removeChild(childNode);
			}
			container.appendChild(rootNode);
		}
		vnodeStore[id] = vnode;
		var isPending = updateQueue.isPending;
		updateQueue.isPending = true;
		batchUpdateDOM();
		argsCache = pendingRendering[id];
		delete pendingRendering[id];

		var result = null;
		if (isArr(argsCache)) {
			result = renderTreeIntoContainer(argsCache[0], container, argsCache[1], argsCache[2]);
		} else if (vnode.vtype === VELEMENT) {
			result = rootNode;
		} else if (vnode.vtype === VCOMPONENT) {
			result = rootNode.cache[vnode.id];
		}

		if (!isPending) {
			updateQueue.isPending = false;
			updateQueue.batchUpdate();
		}

		if (callback) {
			callback.call(result);
		}

		return result;
	}

	function render(vnode, container, callback) {
		return renderTreeIntoContainer(vnode, container, callback);
	}

	function unstable_renderSubtreeIntoContainer(parentComponent, subVnode, container, callback) {
		var context = parentComponent.vnode ? parentComponent.vnode.context : parentComponent.$cache.parentContext;
		return renderTreeIntoContainer(subVnode, container, callback, context);
	}

	function unmountComponentAtNode(container) {
		if (!container.nodeName) {
			throw new Error('expect node');
		}
		var id = container[COMPONENT_ID];
		var vnode = null;
		if (vnode = vnodeStore[id]) {
			destroyVnode(vnode, container.firstChild);
			container.removeChild(container.firstChild);
			delete vnodeStore[id];
			return true;
		}
		return false;
	}

	function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (component.getDOMNode && component.$cache.isMounted) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	}

	var ReactDOM = Object.freeze({
		render: render,
		unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
		unmountComponentAtNode: unmountComponentAtNode,
		findDOMNode: findDOMNode
	});

	function isValidElement(obj) {
		return obj != null && !!obj.vtype;
	}

	function cloneElement(originElem, props) {
		var type = originElem.type;
		var key = originElem.key;
		var ref = originElem.ref;

		var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);

		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		var vnode = createElement.apply(undefined, [type, newProps].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	}

	function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	}

	function createElement(type, props, children) {
		var createVnode = null;
		var varType = typeof type;

		if (varType === 'string') {
			createVnode = createVelem;
		} else if (varType === 'function') {
			if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
				createVnode = createVcomponent;
			} else {
				createVnode = createVstateless;
			}
		} else {
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}

		var key = null;
		var ref = null;
		var finalProps = {};
		if (props != null) {
			for (var propKey in props) {
				if (!props.hasOwnProperty(propKey)) {
					continue;
				}
				if (propKey === 'key') {
					if (props.key !== undefined) {
						key = '' + props.key;
					}
				} else if (propKey === 'ref') {
					if (props.ref !== undefined) {
						ref = props.ref;
					}
				} else {
					finalProps[propKey] = props[propKey];
				}
			}
		}

		var defaultProps = type.defaultProps;

		if (defaultProps) {
			for (var propKey in defaultProps) {
				if (finalProps[propKey] === undefined) {
					finalProps[propKey] = defaultProps[propKey];
				}
			}
		}

		var argsLen = arguments.length;
		var finalChildren = children;

		if (argsLen > 3) {
			finalChildren = Array(argsLen - 2);
			for (var i = 2; i < argsLen; i++) {
				finalChildren[i - 2] = arguments[i];
			}
		}

		if (finalChildren !== undefined) {
			finalProps.children = finalChildren;
		}

		var vnode = createVnode(type, finalProps);
		vnode.key = key;
		vnode.ref = ref;
		return vnode;
	}

	var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	var DOM = {};
	eachItem(tagNames.split('|'), function (tagName) {
		DOM[tagName] = createFactory(tagName);
	});

	var check = function check() {
	    return check;
	};
	check.isRequired = check;
	var PropTypes = {
	    "array": check,
	    "bool": check,
	    "func": check,
	    "number": check,
	    "object": check,
	    "string": check,
	    "any": check,
	    "arrayOf": check,
	    "element": check,
	    "instanceOf": check,
	    "node": check,
	    "objectOf": check,
	    "oneOf": check,
	    "oneOfType": check,
	    "shape": check
	};

	function only(children) {
		if (isValidElement(children)) {
			return children;
		}
		throw new Error('expect only one child');
	}

	function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var index = 0;
		if (isArr(children)) {
			flattenChildren(children, function (child) {
				iteratee.call(context, child, index++);
			});
		} else {
			iteratee.call(context, children, index);
		}
	}

	function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] += 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			store.push(data);
		});
		var result = [];
		eachItem(store, function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;

			if (child == null || typeof child === 'boolean') {
				return;
			}
			if (!isValidElement(child) || key == null) {
				result.push(child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			result.push(child);
		});
		return result;
	}

	function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	}

	function toArray(children) {
		return map(children, identity) || [];
	}

	function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && typeof child.key === 'string') {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	}

	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	}

	var Children = Object.freeze({
		only: only,
		forEach: forEach,
		map: map,
		count: count,
		toArray: toArray
	});

	function eachMixin(mixins, iteratee) {
		eachItem(mixins, function (mixin) {
			if (mixin) {
				if (isArr(mixin.mixins)) {
					eachMixin(mixin.mixins, iteratee);
				}
				iteratee(mixin);
			}
		});
	}

	function combineMixinToProto(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var value = mixin[key];
			if (key === 'getInitialState') {
				proto.$getInitialStates.push(value);
				continue;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		}
	}

	function combineMixinToClass(Component, mixin) {
		extend(Component.propTypes, mixin.propTypes);
		extend(Component.contextTypes, mixin.contextTypes);
		extend(Component, mixin.statics);
		if (isFn(mixin.getDefaultProps)) {
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
	}

	function bindContext(obj, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				if (isFn(source[key])) {
					obj[key] = source[key].bind(obj);
				}
			}
		}
	}

	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;

	function getInitialState() {
		var _this = this;

		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		eachItem(this.$getInitialStates, function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	}
	function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		Klass.contextTypes = {};
		Klass.propTypes = {};
		Klass.defaultProps = {};
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	}

	var React = extend({
	    version: '0.15.1',
	    cloneElement: cloneElement,
	    isValidElement: isValidElement,
	    createElement: createElement,
	    createFactory: createFactory,
	    Component: Component,
	    createClass: createClass,
	    Children: Children,
	    PropTypes: PropTypes,
	    DOM: DOM
	}, ReactDOM);

	React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _axios = __webpack_require__(4);

	var _axios2 = _interopRequireDefault(_axios);

	var _reactOwlCarousel = __webpack_require__(23);

	var _reactOwlCarousel2 = _interopRequireDefault(_reactOwlCarousel);

	var _Content = __webpack_require__(24);

	var _Content2 = _interopRequireDefault(_Content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Slider = function (_React$Component) {
	  _inherits(Slider, _React$Component);

	  function Slider(props) {
	    _classCallCheck(this, Slider);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

	    _this.state = { data: [] };
	    _this.pullData = _this.pullData.bind(_this);
	    return _this;
	  }

	  _createClass(Slider, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.pullData();
	    }
	  }, {
	    key: 'pullData',
	    value: function pullData() {
	      var _this2 = this;

	      (0, _axios2.default)('/data.json').then(function (response) {
	        _this2.setState({ data: response.data });
	        //console.log(response);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var items = this.state.data;
	      // item: { imageUrl: string, textContent: string }

	      return _react2.default.createElement(
	        'div',
	        { className: 'carousel-block' },
	        _react2.default.createElement(
	          _reactOwlCarousel2.default,
	          { slideSpeed: 300, pagination: true, singleItem: true, responsive: true, autoPlay: true },
	          items.map(function (item) {
	            return _react2.default.createElement(
	              'div',
	              { key: item.slideId },
	              _react2.default.createElement('img', { src: item.url }),
	              _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                  'h4',
	                  null,
	                  item.textContent.textHeader
	                ),
	                _react2.default.createElement(_Content2.default, { item: item })
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return Slider;
	}(_react2.default.Component);

	exports.default = Slider;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(6);
	var utils = __webpack_require__(7);
	var dispatchRequest = __webpack_require__(8);
	var InterceptorManager = __webpack_require__(18);
	var isAbsoluteURL = __webpack_require__(19);
	var combineURLs = __webpack_require__(20);
	var bind = __webpack_require__(21);
	var transformData = __webpack_require__(13);

	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

	// Expose properties from defaultInstance
	axios.defaults = defaultInstance.defaults;
	axios.interceptors = defaultInstance.interceptors;

	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(22);

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isStream(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });

	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;

	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(10);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(10);
	      }

	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(7);
	var buildURL = __webpack_require__(11);
	var parseHeaders = __webpack_require__(12);
	var transformData = __webpack_require__(13);
	var isURLSameOrigin = __webpack_require__(14);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(15);
	var settle = __webpack_require__(16);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;

	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  var request = new XMLHttpRequest();
	  var loadEvent = 'onreadystatechange';
	  var xDomain = false;

	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	  if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	    loadEvent = 'onload';
	    xDomain = true;
	  }

	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }

	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

	  // For IE 9 CORS support.
	  request.onprogress = function handleProgress() {};
	  request.ontimeout = function handleTimeout() {};

	  // Listen for ready state
	  request[loadEvent] = function handleLoad() {
	    if (!request || (request.readyState !== 4 && !xDomain)) {
	      return;
	    }

	    // The request errored out and we didn't get a response, this will be
	    // handled by onerror instead
	    if (request.status === 0) {
	      return;
	    }

	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config,
	      request: request
	    };

	    settle(resolve, reject, response);

	    // Clean up request
	    request = null;
	  };

	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));

	    // Clean up request
	    request = null;
	  };

	  // Handle timeout
	  request.ontimeout = function handleTimeout() {
	    var err = new Error('timeout of ' + config.timeout + 'ms exceeded');
	    err.timeout = config.timeout;
	    err.code = 'ECONNABORTED';
	    reject(err);

	    // Clean up request
	    request = null;
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(17);

	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }

	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }

	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }

	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }

	  // Handle progress if needed
	  if (config.progress) {
	    if (config.method === 'post' || config.method === 'put') {
	      request.upload.addEventListener('progress', config.progress);
	    } else if (config.method === 'get') {
	      request.addEventListener('progress', config.progress);
	    }
	  }

	  if (requestData === undefined) {
	    requestData = null;
	  }

	  // Send the request
	  request.send(requestData);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(response);
	  }
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(2), __webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["react", "react-dom"], factory);
		else if(typeof exports === 'object')
			exports["react-owl-carousel"] = factory(require("react"), require("react-dom"));
		else
			root["react-owl-carousel"] = factory(root["React"], root["ReactDOM"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
	return /******/ (function(modules) { // webpackBootstrap
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
	/***/ function(module, exports, __webpack_require__) {

		eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(6);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(7);\n\n__webpack_require__(5);\n\n__webpack_require__(1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Owl_Carousel_Options = ['items', 'itemsDesktop', 'itemsDesktopSmall', 'itemsTablet', 'itemsTabletSmall', 'itemsMobile', 'itemsCustom', 'singleItem', 'itemsScaleUp', 'slideSpeed', 'paginationSpeed', 'rewindNav', 'rewindSpeed', 'autoPlay', 'stopOnHover', 'navigation', 'navigationText', 'scrollPerPage', 'pagination', 'paginationNumbers', 'responsive', 'responsiveRefreshRate', 'responsiveBaseWidth', 'baseClass', 'theme', 'lazyLoad', 'lazyFollow', 'lazyEffect', 'autoHeight', 'jsonPath', 'jsonSuccess', 'dragBeforeAnimFinish', 'mouseDrag', 'touchDrag', 'addClassActive', 'transitionStyle'];\n\n/**\n* http://owlgraphic.com/owlcarousel/demos/one.html\n*\n* Method\n*\t\tnext()\n*\t\tprev()\n*\t\tgoTo(x)\n*\t\tjumpTo(x)\n*\t\tplay()\n*\t\tstop()\n*/\n\nvar OwlCarousel = function (_React$Component) {\n\t_inherits(OwlCarousel, _React$Component);\n\n\tfunction OwlCarousel(props, context) {\n\t\t_classCallCheck(this, OwlCarousel);\n\n\t\tvar _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OwlCarousel).call(this, props, context));\n\n\t\t_this.next = function () {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').next();\n\t\t};\n\t\t_this.prev = function () {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').prev();\n\t\t};\n\t\t_this.goTo = function (x) {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').goTo(x);\n\t\t};\n\t\t_this.jumpTo = function (x) {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').jumpTo(x);\n\t\t};\n\t\t_this.play = function () {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').play();\n\t\t};\n\t\t_this.stop = function () {\n\t\t\treturn $((0, _reactDom.findDOMNode)(_this)).data('owlCarousel').stop();\n\t\t};\n\t\treturn _this;\n\t}\n\n\t_createClass(OwlCarousel, [{\n\t\tkey: 'componentDidMount',\n\t\tvalue: function componentDidMount() {\n\t\t\t$((0, _reactDom.findDOMNode)(this)).owlCarousel(this.getOptions());\n\t\t}\n\t}, {\n\t\tkey: 'componentWillReceiveProps',\n\t\tvalue: function componentWillReceiveProps(nextProps) {\n\t\t\t$((0, _reactDom.findDOMNode)(this)).data('owlCarousel').destroy();\n\t\t}\n\t}, {\n\t\tkey: 'componentDidUpdate',\n\t\tvalue: function componentDidUpdate(prevProps, prevState) {\n\t\t\t$((0, _reactDom.findDOMNode)(this)).owlCarousel(this.getOptions());\n\t\t}\n\t}, {\n\t\tkey: 'componentWillUnmount',\n\t\tvalue: function componentWillUnmount() {\n\t\t\t$((0, _reactDom.findDOMNode)(this)).data('owlCarousel').destroy();\n\t\t}\n\t}, {\n\t\tkey: 'getOptions',\n\t\tvalue: function getOptions() {\n\t\t\tvar _this2 = this;\n\n\t\t\tvar options = {};\n\n\t\t\tOwl_Carousel_Options.forEach(function (val) {\n\t\t\t\tif (_this2.props[val]) {\n\t\t\t\t\toptions[val] = _this2.props[val];\n\t\t\t\t}\n\t\t\t});\n\n\t\t\treturn options;\n\t\t}\n\t}, {\n\t\tkey: 'render',\n\t\tvalue: function render() {\n\t\t\tvar _props = this.props;\n\t\t\tvar items = _props.items;\n\t\t\tvar itemsDesktop = _props.itemsDesktop;\n\t\t\tvar itemsDesktopSmall = _props.itemsDesktopSmall;\n\t\t\tvar itemsTablet = _props.itemsTablet;\n\t\t\tvar itemsTabletSmall = _props.itemsTabletSmall;\n\t\t\tvar itemsMobile = _props.itemsMobile;\n\t\t\tvar itemsCustom = _props.itemsCustom;\n\t\t\tvar singleItem = _props.singleItem;\n\t\t\tvar itemsScaleUp = _props.itemsScaleUp;\n\t\t\tvar slideSpeed = _props.slideSpeed;\n\t\t\tvar paginationSpeed = _props.paginationSpeed;\n\t\t\tvar rewindNav = _props.rewindNav;\n\t\t\tvar rewindSpeed = _props.rewindSpeed;\n\t\t\tvar autoPlay = _props.autoPlay;\n\t\t\tvar stopOnHover = _props.stopOnHover;\n\t\t\tvar navigation = _props.navigation;\n\t\t\tvar navigationText = _props.navigationText;\n\t\t\tvar scrollPerPage = _props.scrollPerPage;\n\t\t\tvar pagination = _props.pagination;\n\t\t\tvar paginationNumbers = _props.paginationNumbers;\n\t\t\tvar responsive = _props.responsive;\n\t\t\tvar responsiveRefreshRate = _props.responsiveRefreshRate;\n\t\t\tvar responsiveBaseWidth = _props.responsiveBaseWidth;\n\t\t\tvar baseClass = _props.baseClass;\n\t\t\tvar theme = _props.theme;\n\t\t\tvar lazyLoad = _props.lazyLoad;\n\t\t\tvar lazyFollow = _props.lazyFollow;\n\t\t\tvar lazyEffect = _props.lazyEffect;\n\t\t\tvar autoHeight = _props.autoHeight;\n\t\t\tvar jsonPath = _props.jsonPath;\n\t\t\tvar jsonSuccess = _props.jsonSuccess;\n\t\t\tvar dragBeforeAnimFinish = _props.dragBeforeAnimFinish;\n\t\t\tvar mouseDrag = _props.mouseDrag;\n\t\t\tvar touchDrag = _props.touchDrag;\n\t\t\tvar addClassActive = _props.addClassActive;\n\t\t\tvar transitionStyle = _props.transitionStyle;\n\t\t\tvar children = _props.children;\n\t\t\tvar className = _props.className;\n\n\t\t\tvar props = _objectWithoutProperties(_props, ['items', 'itemsDesktop', 'itemsDesktopSmall', 'itemsTablet', 'itemsTabletSmall', 'itemsMobile', 'itemsCustom', 'singleItem', 'itemsScaleUp', 'slideSpeed', 'paginationSpeed', 'rewindNav', 'rewindSpeed', 'autoPlay', 'stopOnHover', 'navigation', 'navigationText', 'scrollPerPage', 'pagination', 'paginationNumbers', 'responsive', 'responsiveRefreshRate', 'responsiveBaseWidth', 'baseClass', 'theme', 'lazyLoad', 'lazyFollow', 'lazyEffect', 'autoHeight', 'jsonPath', 'jsonSuccess', 'dragBeforeAnimFinish', 'mouseDrag', 'touchDrag', 'addClassActive', 'transitionStyle', 'children', 'className']);\n\n\t\t\treturn _react2.default.createElement(\n\t\t\t\t'div',\n\t\t\t\tprops,\n\t\t\t\tchildren\n\t\t\t);\n\t\t}\n\t}]);\n\n\treturn OwlCarousel;\n}(_react2.default.Component);\n\nOwlCarousel.propTypes = {\n\tchildren: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element.isRequired)]).isRequired,\n\n\tstyle: _react.PropTypes.object,\n\tid: _react.PropTypes.string,\n\n\titems: _react.PropTypes.number,\n\titemsCustom: _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.number).isRequired),\n\titemsDesktop: _react.PropTypes.arrayOf(_react.PropTypes.number.isRequired),\n\titemsDesktopSmall: _react.PropTypes.arrayOf(_react.PropTypes.number.isRequired),\n\titemsTablet: _react.PropTypes.arrayOf(_react.PropTypes.number.isRequired),\n\titemsTabletSmall: _react.PropTypes.arrayOf(_react.PropTypes.number.isRequired),\n\titemsMobile: _react.PropTypes.arrayOf(_react.PropTypes.number.isRequired),\n\tsingleItem: _react.PropTypes.bool,\n\titemsScaleUp: _react.PropTypes.bool,\n\n\tslideSpeed: _react.PropTypes.number,\n\tpaginationSpeed: _react.PropTypes.number,\n\trewindSpeed: _react.PropTypes.number,\n\n\tautoPlay: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number]),\n\tstopOnHover: _react.PropTypes.bool,\n\n\tnavigation: _react.PropTypes.bool,\n\tnavigationText: _react.PropTypes.arrayOf(_react.PropTypes.string),\n\trewindNav: _react.PropTypes.bool,\n\tscrollPerPage: _react.PropTypes.bool,\n\n\tpagination: _react.PropTypes.bool,\n\tpaginationNumbers: _react.PropTypes.bool,\n\n\tresponsive: _react.PropTypes.bool,\n\tresponsiveRefreshRate: _react.PropTypes.number,\n\tresponsiveBaseWidth: function responsiveBaseWidth(props, propName, componentName) {\n\t\tif (props[propName] && !$(props[propName]).length) {\n\t\t\treturn new Error('React-owl-carousel: the props `responsiveBaseWidth` needs jQuery selector.');\n\t\t}\n\t},\n\n\tbaseClass: _react.PropTypes.string,\n\ttheme: _react.PropTypes.string,\n\n\tlazyLoad: _react.PropTypes.bool,\n\tlazyFollow: _react.PropTypes.bool,\n\tlazyEffect: _react.PropTypes.bool,\n\n\tautoHeight: _react.PropTypes.bool,\n\n\tjsonPath: _react.PropTypes.string,\n\tjsonSuccess: _react.PropTypes.func,\n\n\tdragBeforeAnimFinish: _react.PropTypes.bool,\n\tmouseDrag: _react.PropTypes.bool,\n\ttouchDrag: _react.PropTypes.bool,\n\n\taddClassActive: _react.PropTypes.bool,\n\n\t//build-in transitionStyle: 'fade', 'backSlide', 'goDown', 'scaleUp'\n\ttransitionStyle: _react.PropTypes.string,\n\n\tbeforeUpdate: _react.PropTypes.func,\n\tafterUpdate: _react.PropTypes.func,\n\tbeforeInit: _react.PropTypes.func,\n\tafterInit: _react.PropTypes.func,\n\tbeforeMove: _react.PropTypes.func,\n\tafterMove: _react.PropTypes.func,\n\tafterAction: _react.PropTypes.func,\n\tstartDragging: _react.PropTypes.func,\n\tafterLazyLoad: _react.PropTypes.func\n};\n\nexports.default = OwlCarousel;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/OwlCarousel.jsx\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/OwlCarousel.jsx?");

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		eval("/*\n *  jQuery OwlCarousel v1.3.2\n *\n *  Copyright (c) 2013 Bartosz Wojciechowski\n *  http://www.owlgraphic.com/owlcarousel/\n *\n *  Licensed under MIT\n *\n */\n\n/*JS Lint helpers: */\n/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */\n/*jslint nomen: true, continue:true */\n\n'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nif (typeof Object.create !== \"function\") {\n\tObject.create = function (obj) {\n\t\tfunction F() {}\n\t\tF.prototype = obj;\n\t\treturn new F();\n\t};\n}\n(function ($, window, document) {\n\n\tvar Carousel = {\n\t\tinit: function init(options, el) {\n\t\t\tvar base = this;\n\n\t\t\tbase.$elem = $(el);\n\t\t\tbase.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);\n\n\t\t\tbase.userOptions = options;\n\t\t\tbase.loadContent();\n\t\t},\n\n\t\tloadContent: function loadContent() {\n\t\t\tvar base = this,\n\t\t\t    url;\n\n\t\t\tfunction getData(data) {\n\t\t\t\tvar i,\n\t\t\t\t    content = \"\";\n\t\t\t\tif (typeof base.options.jsonSuccess === \"function\") {\n\t\t\t\t\tbase.options.jsonSuccess.apply(this, [data]);\n\t\t\t\t} else {\n\t\t\t\t\tfor (i in data.owl) {\n\t\t\t\t\t\tif (data.owl.hasOwnProperty(i)) {\n\t\t\t\t\t\t\tcontent += data.owl[i].item;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tbase.$elem.html(content);\n\t\t\t\t}\n\t\t\t\tbase.logIn();\n\t\t\t}\n\n\t\t\tif (typeof base.options.beforeInit === \"function\") {\n\t\t\t\tbase.options.beforeInit.apply(this, [base.$elem]);\n\t\t\t}\n\n\t\t\tif (typeof base.options.jsonPath === \"string\") {\n\t\t\t\turl = base.options.jsonPath;\n\t\t\t\t$.getJSON(url, getData);\n\t\t\t} else {\n\t\t\t\tbase.logIn();\n\t\t\t}\n\t\t},\n\n\t\tlogIn: function logIn() {\n\t\t\tvar base = this;\n\n\t\t\tbase.$elem.data(\"owl-originalStyles\", base.$elem.attr(\"style\")).data(\"owl-originalClasses\", base.$elem.attr(\"class\"));\n\n\t\t\tbase.$elem.css({\n\t\t\t\topacity: 0\n\t\t\t});\n\t\t\tbase.orignalItems = base.options.items;\n\t\t\tbase.checkBrowser();\n\t\t\tbase.wrapperWidth = 0;\n\t\t\tbase.checkVisible = null;\n\t\t\tbase.setVars();\n\t\t},\n\n\t\tsetVars: function setVars() {\n\t\t\tvar base = this;\n\t\t\tif (base.$elem.children().length === 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tbase.baseClass();\n\t\t\tbase.eventTypes();\n\t\t\tbase.$userItems = base.$elem.children();\n\t\t\tbase.itemsAmount = base.$userItems.length;\n\t\t\tbase.wrapItems();\n\t\t\tbase.$owlItems = base.$elem.find(\".owl-item\");\n\t\t\tbase.$owlWrapper = base.$elem.find(\".owl-wrapper\");\n\t\t\tbase.playDirection = \"next\";\n\t\t\tbase.prevItem = 0;\n\t\t\tbase.prevArr = [0];\n\t\t\tbase.currentItem = 0;\n\t\t\tbase.customEvents();\n\t\t\tbase.onStartup();\n\t\t},\n\n\t\tonStartup: function onStartup() {\n\t\t\tvar base = this;\n\t\t\tbase.updateItems();\n\t\t\tbase.calculateAll();\n\t\t\tbase.buildControls();\n\t\t\tbase.updateControls();\n\t\t\tbase.response();\n\t\t\tbase.moveEvents();\n\t\t\tbase.stopOnHover();\n\t\t\tbase.owlStatus();\n\n\t\t\tif (base.options.transitionStyle !== false) {\n\t\t\t\tbase.transitionTypes(base.options.transitionStyle);\n\t\t\t}\n\t\t\tif (base.options.autoPlay === true) {\n\t\t\t\tbase.options.autoPlay = 5000;\n\t\t\t}\n\t\t\tbase.play();\n\n\t\t\tbase.$elem.find(\".owl-wrapper\").css(\"display\", \"block\");\n\n\t\t\tif (!base.$elem.is(\":visible\")) {\n\t\t\t\tbase.watchVisibility();\n\t\t\t} else {\n\t\t\t\tbase.$elem.css(\"opacity\", 1);\n\t\t\t}\n\t\t\tbase.onstartup = false;\n\t\t\tbase.eachMoveUpdate();\n\t\t\tif (typeof base.options.afterInit === \"function\") {\n\t\t\t\tbase.options.afterInit.apply(this, [base.$elem]);\n\t\t\t}\n\t\t},\n\n\t\teachMoveUpdate: function eachMoveUpdate() {\n\t\t\tvar base = this;\n\n\t\t\tif (base.options.lazyLoad === true) {\n\t\t\t\tbase.lazyLoad();\n\t\t\t}\n\t\t\tif (base.options.autoHeight === true) {\n\t\t\t\tbase.autoHeight();\n\t\t\t}\n\t\t\tbase.onVisibleItems();\n\n\t\t\tif (typeof base.options.afterAction === \"function\") {\n\t\t\t\tbase.options.afterAction.apply(this, [base.$elem]);\n\t\t\t}\n\t\t},\n\n\t\tupdateVars: function updateVars() {\n\t\t\tvar base = this;\n\t\t\tif (typeof base.options.beforeUpdate === \"function\") {\n\t\t\t\tbase.options.beforeUpdate.apply(this, [base.$elem]);\n\t\t\t}\n\t\t\tbase.watchVisibility();\n\t\t\tbase.updateItems();\n\t\t\tbase.calculateAll();\n\t\t\tbase.updatePosition();\n\t\t\tbase.updateControls();\n\t\t\tbase.eachMoveUpdate();\n\t\t\tif (typeof base.options.afterUpdate === \"function\") {\n\t\t\t\tbase.options.afterUpdate.apply(this, [base.$elem]);\n\t\t\t}\n\t\t},\n\n\t\treload: function reload() {\n\t\t\tvar base = this;\n\t\t\twindow.setTimeout(function () {\n\t\t\t\tbase.updateVars();\n\t\t\t}, 0);\n\t\t},\n\n\t\twatchVisibility: function watchVisibility() {\n\t\t\tvar base = this;\n\n\t\t\tif (base.$elem.is(\":visible\") === false) {\n\t\t\t\tbase.$elem.css({\n\t\t\t\t\topacity: 0\n\t\t\t\t});\n\t\t\t\twindow.clearInterval(base.autoPlayInterval);\n\t\t\t\twindow.clearInterval(base.checkVisible);\n\t\t\t} else {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tbase.checkVisible = window.setInterval(function () {\n\t\t\t\tif (base.$elem.is(\":visible\")) {\n\t\t\t\t\tbase.reload();\n\t\t\t\t\tbase.$elem.animate({\n\t\t\t\t\t\topacity: 1\n\t\t\t\t\t}, 200);\n\t\t\t\t\twindow.clearInterval(base.checkVisible);\n\t\t\t\t}\n\t\t\t}, 500);\n\t\t},\n\n\t\twrapItems: function wrapItems() {\n\t\t\tvar base = this;\n\t\t\tbase.$userItems.wrapAll(\"<div class=\\\"owl-wrapper\\\">\").wrap(\"<div class=\\\"owl-item\\\"></div>\");\n\t\t\tbase.$elem.find(\".owl-wrapper\").wrap(\"<div class=\\\"owl-wrapper-outer\\\">\");\n\t\t\tbase.wrapperOuter = base.$elem.find(\".owl-wrapper-outer\");\n\t\t\tbase.$elem.css(\"display\", \"block\");\n\t\t},\n\n\t\tbaseClass: function baseClass() {\n\t\t\tvar base = this,\n\t\t\t    hasBaseClass = base.$elem.hasClass(base.options.baseClass),\n\t\t\t    hasThemeClass = base.$elem.hasClass(base.options.theme);\n\n\t\t\tif (!hasBaseClass) {\n\t\t\t\tbase.$elem.addClass(base.options.baseClass);\n\t\t\t}\n\n\t\t\tif (!hasThemeClass) {\n\t\t\t\tbase.$elem.addClass(base.options.theme);\n\t\t\t}\n\t\t},\n\n\t\tupdateItems: function updateItems() {\n\t\t\tvar base = this,\n\t\t\t    width,\n\t\t\t    i;\n\n\t\t\tif (base.options.responsive === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tif (base.options.singleItem === true) {\n\t\t\t\tbase.options.items = base.orignalItems = 1;\n\t\t\t\tbase.options.itemsCustom = false;\n\t\t\t\tbase.options.itemsDesktop = false;\n\t\t\t\tbase.options.itemsDesktopSmall = false;\n\t\t\t\tbase.options.itemsTablet = false;\n\t\t\t\tbase.options.itemsTabletSmall = false;\n\t\t\t\tbase.options.itemsMobile = false;\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\twidth = $(base.options.responsiveBaseWidth).width();\n\n\t\t\tif (width > (base.options.itemsDesktop[0] || base.orignalItems)) {\n\t\t\t\tbase.options.items = base.orignalItems;\n\t\t\t}\n\t\t\tif (base.options.itemsCustom !== false) {\n\t\t\t\t//Reorder array by screen size\n\t\t\t\tbase.options.itemsCustom.sort(function (a, b) {\n\t\t\t\t\treturn a[0] - b[0];\n\t\t\t\t});\n\n\t\t\t\tfor (i = 0; i < base.options.itemsCustom.length; i += 1) {\n\t\t\t\t\tif (base.options.itemsCustom[i][0] <= width) {\n\t\t\t\t\t\tbase.options.items = base.options.itemsCustom[i][1];\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\tif (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {\n\t\t\t\t\tbase.options.items = base.options.itemsDesktop[1];\n\t\t\t\t}\n\n\t\t\t\tif (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {\n\t\t\t\t\tbase.options.items = base.options.itemsDesktopSmall[1];\n\t\t\t\t}\n\n\t\t\t\tif (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {\n\t\t\t\t\tbase.options.items = base.options.itemsTablet[1];\n\t\t\t\t}\n\n\t\t\t\tif (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {\n\t\t\t\t\tbase.options.items = base.options.itemsTabletSmall[1];\n\t\t\t\t}\n\n\t\t\t\tif (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {\n\t\t\t\t\tbase.options.items = base.options.itemsMobile[1];\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t//if number of items is less than declared\n\t\t\tif (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {\n\t\t\t\tbase.options.items = base.itemsAmount;\n\t\t\t}\n\t\t},\n\n\t\tresponse: function response() {\n\t\t\tvar base = this,\n\t\t\t    smallDelay,\n\t\t\t    lastWindowWidth;\n\n\t\t\tif (base.options.responsive !== true) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tlastWindowWidth = $(window).width();\n\n\t\t\tbase.resizer = function () {\n\t\t\t\tif ($(window).width() !== lastWindowWidth) {\n\t\t\t\t\tif (base.options.autoPlay !== false) {\n\t\t\t\t\t\twindow.clearInterval(base.autoPlayInterval);\n\t\t\t\t\t}\n\t\t\t\t\twindow.clearTimeout(smallDelay);\n\t\t\t\t\tsmallDelay = window.setTimeout(function () {\n\t\t\t\t\t\tlastWindowWidth = $(window).width();\n\t\t\t\t\t\tbase.updateVars();\n\t\t\t\t\t}, base.options.responsiveRefreshRate);\n\t\t\t\t}\n\t\t\t};\n\t\t\t$(window).resize(base.resizer);\n\t\t},\n\n\t\tupdatePosition: function updatePosition() {\n\t\t\tvar base = this;\n\t\t\tbase.jumpTo(base.currentItem);\n\t\t\tif (base.options.autoPlay !== false) {\n\t\t\t\tbase.checkAp();\n\t\t\t}\n\t\t},\n\n\t\tappendItemsSizes: function appendItemsSizes() {\n\t\t\tvar base = this,\n\t\t\t    roundPages = 0,\n\t\t\t    lastItem = base.itemsAmount - base.options.items;\n\n\t\t\tbase.$owlItems.each(function (index) {\n\t\t\t\tvar $this = $(this);\n\t\t\t\t$this.css({\n\t\t\t\t\t\"width\": base.itemWidth\n\t\t\t\t}).data(\"owl-item\", Number(index));\n\n\t\t\t\tif (index % base.options.items === 0 || index === lastItem) {\n\t\t\t\t\tif (!(index > lastItem)) {\n\t\t\t\t\t\troundPages += 1;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t$this.data(\"owl-roundPages\", roundPages);\n\t\t\t});\n\t\t},\n\n\t\tappendWrapperSizes: function appendWrapperSizes() {\n\t\t\tvar base = this,\n\t\t\t    width = base.$owlItems.length * base.itemWidth;\n\n\t\t\tbase.$owlWrapper.css({\n\t\t\t\t\"width\": width * 2,\n\t\t\t\t\"left\": 0\n\t\t\t});\n\t\t\tbase.appendItemsSizes();\n\t\t},\n\n\t\tcalculateAll: function calculateAll() {\n\t\t\tvar base = this;\n\t\t\tbase.calculateWidth();\n\t\t\tbase.appendWrapperSizes();\n\t\t\tbase.loops();\n\t\t\tbase.max();\n\t\t},\n\n\t\tcalculateWidth: function calculateWidth() {\n\t\t\tvar base = this;\n\t\t\tbase.itemWidth = Math.round(base.$elem.width() / base.options.items);\n\t\t},\n\n\t\tmax: function max() {\n\t\t\tvar base = this,\n\t\t\t    maximum = (base.itemsAmount * base.itemWidth - base.options.items * base.itemWidth) * -1;\n\t\t\tif (base.options.items > base.itemsAmount) {\n\t\t\t\tbase.maximumItem = 0;\n\t\t\t\tmaximum = 0;\n\t\t\t\tbase.maximumPixels = 0;\n\t\t\t} else {\n\t\t\t\tbase.maximumItem = base.itemsAmount - base.options.items;\n\t\t\t\tbase.maximumPixels = maximum;\n\t\t\t}\n\t\t\treturn maximum;\n\t\t},\n\n\t\tmin: function min() {\n\t\t\treturn 0;\n\t\t},\n\n\t\tloops: function loops() {\n\t\t\tvar base = this,\n\t\t\t    prev = 0,\n\t\t\t    elWidth = 0,\n\t\t\t    i,\n\t\t\t    item,\n\t\t\t    roundPageNum;\n\n\t\t\tbase.positionsInArray = [0];\n\t\t\tbase.pagesInArray = [];\n\n\t\t\tfor (i = 0; i < base.itemsAmount; i += 1) {\n\t\t\t\telWidth += base.itemWidth;\n\t\t\t\tbase.positionsInArray.push(-elWidth);\n\n\t\t\t\tif (base.options.scrollPerPage === true) {\n\t\t\t\t\titem = $(base.$owlItems[i]);\n\t\t\t\t\troundPageNum = item.data(\"owl-roundPages\");\n\t\t\t\t\tif (roundPageNum !== prev) {\n\t\t\t\t\t\tbase.pagesInArray[prev] = base.positionsInArray[i];\n\t\t\t\t\t\tprev = roundPageNum;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tbuildControls: function buildControls() {\n\t\t\tvar base = this;\n\t\t\tif (base.options.navigation === true || base.options.pagination === true) {\n\t\t\t\tbase.owlControls = $(\"<div class=\\\"owl-controls\\\"/>\").toggleClass(\"clickable\", !base.browser.isTouch).appendTo(base.$elem);\n\t\t\t}\n\t\t\tif (base.options.pagination === true) {\n\t\t\t\tbase.buildPagination();\n\t\t\t}\n\t\t\tif (base.options.navigation === true) {\n\t\t\t\tbase.buildButtons();\n\t\t\t}\n\t\t},\n\n\t\tbuildButtons: function buildButtons() {\n\t\t\tvar base = this,\n\t\t\t    buttonsWrapper = $(\"<div class=\\\"owl-buttons\\\"/>\");\n\t\t\tbase.owlControls.append(buttonsWrapper);\n\n\t\t\tbase.buttonPrev = $(\"<div/>\", {\n\t\t\t\t\"class\": \"owl-prev\",\n\t\t\t\t\"html\": base.options.navigationText[0] || \"\"\n\t\t\t});\n\n\t\t\tbase.buttonNext = $(\"<div/>\", {\n\t\t\t\t\"class\": \"owl-next\",\n\t\t\t\t\"html\": base.options.navigationText[1] || \"\"\n\t\t\t});\n\n\t\t\tbuttonsWrapper.append(base.buttonPrev).append(base.buttonNext);\n\n\t\t\tbuttonsWrapper.on(\"touchstart.owlControls mousedown.owlControls\", \"div[class^=\\\"owl\\\"]\", function (event) {\n\t\t\t\tevent.preventDefault();\n\t\t\t});\n\n\t\t\tbuttonsWrapper.on(\"touchend.owlControls mouseup.owlControls\", \"div[class^=\\\"owl\\\"]\", function (event) {\n\t\t\t\tevent.preventDefault();\n\t\t\t\tif ($(this).hasClass(\"owl-next\")) {\n\t\t\t\t\tbase.next();\n\t\t\t\t} else {\n\t\t\t\t\tbase.prev();\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tbuildPagination: function buildPagination() {\n\t\t\tvar base = this;\n\n\t\t\tbase.paginationWrapper = $(\"<div class=\\\"owl-pagination\\\"/>\");\n\t\t\tbase.owlControls.append(base.paginationWrapper);\n\n\t\t\tbase.paginationWrapper.on(\"touchend.owlControls mouseup.owlControls\", \".owl-page\", function (event) {\n\t\t\t\tevent.preventDefault();\n\t\t\t\tif (Number($(this).data(\"owl-page\")) !== base.currentItem) {\n\t\t\t\t\tbase.goTo(Number($(this).data(\"owl-page\")), true);\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tupdatePagination: function updatePagination() {\n\t\t\tvar base = this,\n\t\t\t    counter,\n\t\t\t    lastPage,\n\t\t\t    lastItem,\n\t\t\t    i,\n\t\t\t    paginationButton,\n\t\t\t    paginationButtonInner;\n\n\t\t\tif (base.options.pagination === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tbase.paginationWrapper.html(\"\");\n\n\t\t\tcounter = 0;\n\t\t\tlastPage = base.itemsAmount - base.itemsAmount % base.options.items;\n\n\t\t\tfor (i = 0; i < base.itemsAmount; i += 1) {\n\t\t\t\tif (i % base.options.items === 0) {\n\t\t\t\t\tcounter += 1;\n\t\t\t\t\tif (lastPage === i) {\n\t\t\t\t\t\tlastItem = base.itemsAmount - base.options.items;\n\t\t\t\t\t}\n\t\t\t\t\tpaginationButton = $(\"<div/>\", {\n\t\t\t\t\t\t\"class\": \"owl-page\"\n\t\t\t\t\t});\n\t\t\t\t\tpaginationButtonInner = $(\"<span></span>\", {\n\t\t\t\t\t\t\"text\": base.options.paginationNumbers === true ? counter : \"\",\n\t\t\t\t\t\t\"class\": base.options.paginationNumbers === true ? \"owl-numbers\" : \"\"\n\t\t\t\t\t});\n\t\t\t\t\tpaginationButton.append(paginationButtonInner);\n\n\t\t\t\t\tpaginationButton.data(\"owl-page\", lastPage === i ? lastItem : i);\n\t\t\t\t\tpaginationButton.data(\"owl-roundPages\", counter);\n\n\t\t\t\t\tbase.paginationWrapper.append(paginationButton);\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.checkPagination();\n\t\t},\n\t\tcheckPagination: function checkPagination() {\n\t\t\tvar base = this;\n\t\t\tif (base.options.pagination === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tbase.paginationWrapper.find(\".owl-page\").each(function () {\n\t\t\t\tif ($(this).data(\"owl-roundPages\") === $(base.$owlItems[base.currentItem]).data(\"owl-roundPages\")) {\n\t\t\t\t\tbase.paginationWrapper.find(\".owl-page\").removeClass(\"active\");\n\t\t\t\t\t$(this).addClass(\"active\");\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tcheckNavigation: function checkNavigation() {\n\t\t\tvar base = this;\n\n\t\t\tif (base.options.navigation === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tif (base.options.rewindNav === false) {\n\t\t\t\tif (base.currentItem === 0 && base.maximumItem === 0) {\n\t\t\t\t\tbase.buttonPrev.addClass(\"disabled\");\n\t\t\t\t\tbase.buttonNext.addClass(\"disabled\");\n\t\t\t\t} else if (base.currentItem === 0 && base.maximumItem !== 0) {\n\t\t\t\t\tbase.buttonPrev.addClass(\"disabled\");\n\t\t\t\t\tbase.buttonNext.removeClass(\"disabled\");\n\t\t\t\t} else if (base.currentItem === base.maximumItem) {\n\t\t\t\t\tbase.buttonPrev.removeClass(\"disabled\");\n\t\t\t\t\tbase.buttonNext.addClass(\"disabled\");\n\t\t\t\t} else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {\n\t\t\t\t\tbase.buttonPrev.removeClass(\"disabled\");\n\t\t\t\t\tbase.buttonNext.removeClass(\"disabled\");\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tupdateControls: function updateControls() {\n\t\t\tvar base = this;\n\t\t\tbase.updatePagination();\n\t\t\tbase.checkNavigation();\n\t\t\tif (base.owlControls) {\n\t\t\t\tif (base.options.items >= base.itemsAmount) {\n\t\t\t\t\tbase.owlControls.hide();\n\t\t\t\t} else {\n\t\t\t\t\tbase.owlControls.show();\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tdestroyControls: function destroyControls() {\n\t\t\tvar base = this;\n\t\t\tif (base.owlControls) {\n\t\t\t\tbase.owlControls.remove();\n\t\t\t}\n\t\t},\n\n\t\tnext: function next(speed) {\n\t\t\tvar base = this;\n\n\t\t\tif (base.isTransition) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tbase.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;\n\t\t\tif (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? base.options.items - 1 : 0)) {\n\t\t\t\tif (base.options.rewindNav === true) {\n\t\t\t\t\tbase.currentItem = 0;\n\t\t\t\t\tspeed = \"rewind\";\n\t\t\t\t} else {\n\t\t\t\t\tbase.currentItem = base.maximumItem;\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.goTo(base.currentItem, speed);\n\t\t},\n\n\t\tprev: function prev(speed) {\n\t\t\tvar base = this;\n\n\t\t\tif (base.isTransition) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {\n\t\t\t\tbase.currentItem = 0;\n\t\t\t} else {\n\t\t\t\tbase.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;\n\t\t\t}\n\t\t\tif (base.currentItem < 0) {\n\t\t\t\tif (base.options.rewindNav === true) {\n\t\t\t\t\tbase.currentItem = base.maximumItem;\n\t\t\t\t\tspeed = \"rewind\";\n\t\t\t\t} else {\n\t\t\t\t\tbase.currentItem = 0;\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.goTo(base.currentItem, speed);\n\t\t},\n\n\t\tgoTo: function goTo(position, speed, drag) {\n\t\t\tvar base = this,\n\t\t\t    goToPixel;\n\n\t\t\tif (base.isTransition) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tif (typeof base.options.beforeMove === \"function\") {\n\t\t\t\tbase.options.beforeMove.apply(this, [base.$elem]);\n\t\t\t}\n\t\t\tif (position >= base.maximumItem) {\n\t\t\t\tposition = base.maximumItem;\n\t\t\t} else if (position <= 0) {\n\t\t\t\tposition = 0;\n\t\t\t}\n\n\t\t\tbase.currentItem = base.owl.currentItem = position;\n\t\t\tif (base.options.transitionStyle !== false && drag !== \"drag\" && base.options.items === 1 && base.browser.support3d === true) {\n\t\t\t\tbase.swapSpeed(0);\n\t\t\t\tif (base.browser.support3d === true) {\n\t\t\t\t\tbase.transition3d(base.positionsInArray[position]);\n\t\t\t\t} else {\n\t\t\t\t\tbase.css2slide(base.positionsInArray[position], 1);\n\t\t\t\t}\n\t\t\t\tbase.afterGo();\n\t\t\t\tbase.singleItemTransition();\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tgoToPixel = base.positionsInArray[position];\n\n\t\t\tif (base.browser.support3d === true) {\n\t\t\t\tbase.isCss3Finish = false;\n\n\t\t\t\tif (speed === true) {\n\t\t\t\t\tbase.swapSpeed(\"paginationSpeed\");\n\t\t\t\t\twindow.setTimeout(function () {\n\t\t\t\t\t\tbase.isCss3Finish = true;\n\t\t\t\t\t}, base.options.paginationSpeed);\n\t\t\t\t} else if (speed === \"rewind\") {\n\t\t\t\t\tbase.swapSpeed(base.options.rewindSpeed);\n\t\t\t\t\twindow.setTimeout(function () {\n\t\t\t\t\t\tbase.isCss3Finish = true;\n\t\t\t\t\t}, base.options.rewindSpeed);\n\t\t\t\t} else {\n\t\t\t\t\tbase.swapSpeed(\"slideSpeed\");\n\t\t\t\t\twindow.setTimeout(function () {\n\t\t\t\t\t\tbase.isCss3Finish = true;\n\t\t\t\t\t}, base.options.slideSpeed);\n\t\t\t\t}\n\t\t\t\tbase.transition3d(goToPixel);\n\t\t\t} else {\n\t\t\t\tif (speed === true) {\n\t\t\t\t\tbase.css2slide(goToPixel, base.options.paginationSpeed);\n\t\t\t\t} else if (speed === \"rewind\") {\n\t\t\t\t\tbase.css2slide(goToPixel, base.options.rewindSpeed);\n\t\t\t\t} else {\n\t\t\t\t\tbase.css2slide(goToPixel, base.options.slideSpeed);\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.afterGo();\n\t\t},\n\n\t\tjumpTo: function jumpTo(position) {\n\t\t\tvar base = this;\n\t\t\tif (typeof base.options.beforeMove === \"function\") {\n\t\t\t\tbase.options.beforeMove.apply(this, [base.$elem]);\n\t\t\t}\n\t\t\tif (position >= base.maximumItem || position === -1) {\n\t\t\t\tposition = base.maximumItem;\n\t\t\t} else if (position <= 0) {\n\t\t\t\tposition = 0;\n\t\t\t}\n\t\t\tbase.swapSpeed(0);\n\t\t\tif (base.browser.support3d === true) {\n\t\t\t\tbase.transition3d(base.positionsInArray[position]);\n\t\t\t} else {\n\t\t\t\tbase.css2slide(base.positionsInArray[position], 1);\n\t\t\t}\n\t\t\tbase.currentItem = base.owl.currentItem = position;\n\t\t\tbase.afterGo();\n\t\t},\n\n\t\tafterGo: function afterGo() {\n\t\t\tvar base = this;\n\n\t\t\tbase.prevArr.push(base.currentItem);\n\t\t\tbase.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];\n\t\t\tbase.prevArr.shift(0);\n\n\t\t\tif (base.prevItem !== base.currentItem) {\n\t\t\t\tbase.checkPagination();\n\t\t\t\tbase.checkNavigation();\n\t\t\t\tbase.eachMoveUpdate();\n\n\t\t\t\tif (base.options.autoPlay !== false) {\n\t\t\t\t\tbase.checkAp();\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (typeof base.options.afterMove === \"function\" && base.prevItem !== base.currentItem) {\n\t\t\t\tbase.options.afterMove.apply(this, [base.$elem]);\n\t\t\t}\n\t\t},\n\n\t\tstop: function stop() {\n\t\t\tvar base = this;\n\t\t\tbase.apStatus = \"stop\";\n\t\t\twindow.clearInterval(base.autoPlayInterval);\n\t\t},\n\n\t\tcheckAp: function checkAp() {\n\t\t\tvar base = this;\n\t\t\tif (base.apStatus !== \"stop\") {\n\t\t\t\tbase.play();\n\t\t\t}\n\t\t},\n\n\t\tplay: function play() {\n\t\t\tvar base = this;\n\t\t\tbase.apStatus = \"play\";\n\t\t\tif (base.options.autoPlay === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\twindow.clearInterval(base.autoPlayInterval);\n\t\t\tbase.autoPlayInterval = window.setInterval(function () {\n\t\t\t\tbase.next(true);\n\t\t\t}, base.options.autoPlay);\n\t\t},\n\n\t\tswapSpeed: function swapSpeed(action) {\n\t\t\tvar base = this;\n\t\t\tif (action === \"slideSpeed\") {\n\t\t\t\tbase.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));\n\t\t\t} else if (action === \"paginationSpeed\") {\n\t\t\t\tbase.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));\n\t\t\t} else if (typeof action !== \"string\") {\n\t\t\t\tbase.$owlWrapper.css(base.addCssSpeed(action));\n\t\t\t}\n\t\t},\n\n\t\taddCssSpeed: function addCssSpeed(speed) {\n\t\t\treturn {\n\t\t\t\t\"-webkit-transition\": \"all \" + speed + \"ms ease\",\n\t\t\t\t\"-moz-transition\": \"all \" + speed + \"ms ease\",\n\t\t\t\t\"-o-transition\": \"all \" + speed + \"ms ease\",\n\t\t\t\t\"transition\": \"all \" + speed + \"ms ease\"\n\t\t\t};\n\t\t},\n\n\t\tremoveTransition: function removeTransition() {\n\t\t\treturn {\n\t\t\t\t\"-webkit-transition\": \"\",\n\t\t\t\t\"-moz-transition\": \"\",\n\t\t\t\t\"-o-transition\": \"\",\n\t\t\t\t\"transition\": \"\"\n\t\t\t};\n\t\t},\n\n\t\tdoTranslate: function doTranslate(pixels) {\n\t\t\treturn {\n\t\t\t\t\"-webkit-transform\": \"translate3d(\" + pixels + \"px, 0px, 0px)\",\n\t\t\t\t\"-moz-transform\": \"translate3d(\" + pixels + \"px, 0px, 0px)\",\n\t\t\t\t\"-o-transform\": \"translate3d(\" + pixels + \"px, 0px, 0px)\",\n\t\t\t\t\"-ms-transform\": \"translate3d(\" + pixels + \"px, 0px, 0px)\",\n\t\t\t\t\"transform\": \"translate3d(\" + pixels + \"px, 0px,0px)\"\n\t\t\t};\n\t\t},\n\n\t\ttransition3d: function transition3d(value) {\n\t\t\tvar base = this;\n\t\t\tbase.$owlWrapper.css(base.doTranslate(value));\n\t\t},\n\n\t\tcss2move: function css2move(value) {\n\t\t\tvar base = this;\n\t\t\tbase.$owlWrapper.css({\n\t\t\t\t\"left\": value\n\t\t\t});\n\t\t},\n\n\t\tcss2slide: function css2slide(value, speed) {\n\t\t\tvar base = this;\n\n\t\t\tbase.isCssFinish = false;\n\t\t\tbase.$owlWrapper.stop(true, true).animate({\n\t\t\t\t\"left\": value\n\t\t\t}, {\n\t\t\t\tduration: speed || base.options.slideSpeed,\n\t\t\t\tcomplete: function complete() {\n\t\t\t\t\tbase.isCssFinish = true;\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tcheckBrowser: function checkBrowser() {\n\t\t\tvar base = this,\n\t\t\t    translate3D = \"translate3d(0px, 0px, 0px)\",\n\t\t\t    tempElem = document.createElement(\"div\"),\n\t\t\t    regex,\n\t\t\t    asSupport,\n\t\t\t    support3d,\n\t\t\t    isTouch;\n\n\t\t\ttempElem.style.cssText = \"  -moz-transform:\" + translate3D + \"; -ms-transform:\" + translate3D + \"; -o-transform:\" + translate3D + \"; -webkit-transform:\" + translate3D + \"; transform:\" + translate3D;\n\t\t\tregex = /translate3d\\(0px, 0px, 0px\\)/g;\n\t\t\tasSupport = tempElem.style.cssText.match(regex);\n\t\t\tsupport3d = asSupport !== null && asSupport.length === 1;\n\n\t\t\tisTouch = \"ontouchstart\" in window || window.navigator.msMaxTouchPoints;\n\n\t\t\tbase.browser = {\n\t\t\t\t\"support3d\": support3d,\n\t\t\t\t\"isTouch\": isTouch\n\t\t\t};\n\t\t},\n\n\t\tmoveEvents: function moveEvents() {\n\t\t\tvar base = this;\n\t\t\tif (base.options.mouseDrag !== false || base.options.touchDrag !== false) {\n\t\t\t\tbase.gestures();\n\t\t\t\tbase.disabledEvents();\n\t\t\t}\n\t\t},\n\n\t\teventTypes: function eventTypes() {\n\t\t\tvar base = this,\n\t\t\t    types = [\"s\", \"e\", \"x\"];\n\n\t\t\tbase.ev_types = {};\n\n\t\t\tif (base.options.mouseDrag === true && base.options.touchDrag === true) {\n\t\t\t\ttypes = [\"touchstart.owl mousedown.owl\", \"touchmove.owl mousemove.owl\", \"touchend.owl touchcancel.owl mouseup.owl\"];\n\t\t\t} else if (base.options.mouseDrag === false && base.options.touchDrag === true) {\n\t\t\t\ttypes = [\"touchstart.owl\", \"touchmove.owl\", \"touchend.owl touchcancel.owl\"];\n\t\t\t} else if (base.options.mouseDrag === true && base.options.touchDrag === false) {\n\t\t\t\ttypes = [\"mousedown.owl\", \"mousemove.owl\", \"mouseup.owl\"];\n\t\t\t}\n\n\t\t\tbase.ev_types.start = types[0];\n\t\t\tbase.ev_types.move = types[1];\n\t\t\tbase.ev_types.end = types[2];\n\t\t},\n\n\t\tdisabledEvents: function disabledEvents() {\n\t\t\tvar base = this;\n\t\t\tbase.$elem.on(\"dragstart.owl\", function (event) {\n\t\t\t\tevent.preventDefault();\n\t\t\t});\n\t\t\tbase.$elem.on(\"mousedown.disableTextSelect\", function (e) {\n\t\t\t\treturn $(e.target).is('input, textarea, select, option');\n\t\t\t});\n\t\t},\n\n\t\tgestures: function gestures() {\n\t\t\t/*jslint unparam: true*/\n\t\t\tvar base = this,\n\t\t\t    locals = {\n\t\t\t\toffsetX: 0,\n\t\t\t\toffsetY: 0,\n\t\t\t\tbaseElWidth: 0,\n\t\t\t\trelativePos: 0,\n\t\t\t\tposition: null,\n\t\t\t\tminSwipe: null,\n\t\t\t\tmaxSwipe: null,\n\t\t\t\tsliding: null,\n\t\t\t\tdargging: null,\n\t\t\t\ttargetElement: null\n\t\t\t};\n\n\t\t\tbase.isCssFinish = true;\n\n\t\t\tfunction getTouches(event) {\n\t\t\t\tif (event.touches !== undefined) {\n\t\t\t\t\treturn {\n\t\t\t\t\t\tx: event.touches[0].pageX,\n\t\t\t\t\t\ty: event.touches[0].pageY\n\t\t\t\t\t};\n\t\t\t\t}\n\n\t\t\t\tif (event.touches === undefined) {\n\t\t\t\t\tif (event.pageX !== undefined) {\n\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\tx: event.pageX,\n\t\t\t\t\t\t\ty: event.pageY\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\t\t\t\t\tif (event.pageX === undefined) {\n\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\tx: event.clientX,\n\t\t\t\t\t\t\ty: event.clientY\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction swapEvents(type) {\n\t\t\t\tif (type === \"on\") {\n\t\t\t\t\t$(document).on(base.ev_types.move, dragMove);\n\t\t\t\t\t$(document).on(base.ev_types.end, dragEnd);\n\t\t\t\t} else if (type === \"off\") {\n\t\t\t\t\t$(document).off(base.ev_types.move);\n\t\t\t\t\t$(document).off(base.ev_types.end);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction dragStart(event) {\n\t\t\t\tvar ev = event.originalEvent || event || window.event,\n\t\t\t\t    position;\n\n\t\t\t\tif (ev.which === 3) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\tif (base.itemsAmount <= base.options.items) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tif (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t\tif (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\n\t\t\t\tif (base.options.autoPlay !== false) {\n\t\t\t\t\twindow.clearInterval(base.autoPlayInterval);\n\t\t\t\t}\n\n\t\t\t\tif (base.browser.isTouch !== true && !base.$owlWrapper.hasClass(\"grabbing\")) {\n\t\t\t\t\tbase.$owlWrapper.addClass(\"grabbing\");\n\t\t\t\t}\n\n\t\t\t\tbase.newPosX = 0;\n\t\t\t\tbase.newRelativeX = 0;\n\n\t\t\t\t$(this).css(base.removeTransition());\n\n\t\t\t\tposition = $(this).position();\n\t\t\t\tlocals.relativePos = position.left;\n\n\t\t\t\tlocals.offsetX = getTouches(ev).x - position.left;\n\t\t\t\tlocals.offsetY = getTouches(ev).y - position.top;\n\n\t\t\t\tswapEvents(\"on\");\n\n\t\t\t\tlocals.sliding = false;\n\t\t\t\tlocals.targetElement = ev.target || ev.srcElement;\n\t\t\t}\n\n\t\t\tfunction dragMove(event) {\n\t\t\t\tvar ev = event.originalEvent || event || window.event,\n\t\t\t\t    minSwipe,\n\t\t\t\t    maxSwipe;\n\n\t\t\t\tbase.newPosX = getTouches(ev).x - locals.offsetX;\n\t\t\t\tbase.newPosY = getTouches(ev).y - locals.offsetY;\n\t\t\t\tbase.newRelativeX = base.newPosX - locals.relativePos;\n\n\t\t\t\tif (typeof base.options.startDragging === \"function\" && locals.dragging !== true && base.newRelativeX !== 0) {\n\t\t\t\t\tlocals.dragging = true;\n\t\t\t\t\tbase.options.startDragging.apply(base, [base.$elem]);\n\t\t\t\t}\n\n\t\t\t\tif ((base.newRelativeX > 8 || base.newRelativeX < -8) && base.browser.isTouch === true) {\n\t\t\t\t\tif (ev.preventDefault !== undefined) {\n\t\t\t\t\t\tev.preventDefault();\n\t\t\t\t\t} else {\n\t\t\t\t\t\tev.returnValue = false;\n\t\t\t\t\t}\n\t\t\t\t\tlocals.sliding = true;\n\t\t\t\t}\n\n\t\t\t\tif ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {\n\t\t\t\t\t$(document).off(\"touchmove.owl\");\n\t\t\t\t}\n\n\t\t\t\tminSwipe = function minSwipe() {\n\t\t\t\t\treturn base.newRelativeX / 5;\n\t\t\t\t};\n\n\t\t\t\tmaxSwipe = function maxSwipe() {\n\t\t\t\t\treturn base.maximumPixels + base.newRelativeX / 5;\n\t\t\t\t};\n\n\t\t\t\tbase.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());\n\t\t\t\tif (base.browser.support3d === true) {\n\t\t\t\t\tbase.transition3d(base.newPosX);\n\t\t\t\t} else {\n\t\t\t\t\tbase.css2move(base.newPosX);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction dragEnd(event) {\n\t\t\t\tvar ev = event.originalEvent || event || window.event,\n\t\t\t\t    newPosition,\n\t\t\t\t    handlers,\n\t\t\t\t    owlStopEvent;\n\n\t\t\t\t// Cannot set property target of #<Event> which has only a getter\n\t\t\t\t// ev.target = ev.target || ev.srcElement;\n\n\t\t\t\tlocals.dragging = false;\n\n\t\t\t\tif (base.browser.isTouch !== true) {\n\t\t\t\t\tbase.$owlWrapper.removeClass(\"grabbing\");\n\t\t\t\t}\n\n\t\t\t\tif (base.newRelativeX < 0) {\n\t\t\t\t\tbase.dragDirection = base.owl.dragDirection = \"left\";\n\t\t\t\t} else {\n\t\t\t\t\tbase.dragDirection = base.owl.dragDirection = \"right\";\n\t\t\t\t}\n\n\t\t\t\tif (base.newRelativeX !== 0) {\n\t\t\t\t\tnewPosition = base.getNewPosition();\n\t\t\t\t\tbase.goTo(newPosition, false, \"drag\");\n\t\t\t\t\tif (locals.targetElement === ev.target && base.browser.isTouch !== true) {\n\t\t\t\t\t\t$(ev.target).on(\"click.disable\", function (ev) {\n\t\t\t\t\t\t\tev.stopImmediatePropagation();\n\t\t\t\t\t\t\tev.stopPropagation();\n\t\t\t\t\t\t\tev.preventDefault();\n\t\t\t\t\t\t\t$(ev.target).off(\"click.disable\");\n\t\t\t\t\t\t});\n\t\t\t\t\t\thandlers = $._data(ev.target, \"events\").click;\n\t\t\t\t\t\towlStopEvent = handlers.pop();\n\t\t\t\t\t\thandlers.splice(0, 0, owlStopEvent);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tswapEvents(\"off\");\n\t\t\t}\n\t\t\tbase.$elem.on(base.ev_types.start, \".owl-wrapper\", dragStart);\n\t\t},\n\n\t\tgetNewPosition: function getNewPosition() {\n\t\t\tvar base = this,\n\t\t\t    newPosition = base.closestItem();\n\n\t\t\tif (newPosition > base.maximumItem) {\n\t\t\t\tbase.currentItem = base.maximumItem;\n\t\t\t\tnewPosition = base.maximumItem;\n\t\t\t} else if (base.newPosX >= 0) {\n\t\t\t\tnewPosition = 0;\n\t\t\t\tbase.currentItem = 0;\n\t\t\t}\n\t\t\treturn newPosition;\n\t\t},\n\t\tclosestItem: function closestItem() {\n\t\t\tvar base = this,\n\t\t\t    array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,\n\t\t\t    goal = base.newPosX,\n\t\t\t    closest = null;\n\n\t\t\t$.each(array, function (i, v) {\n\t\t\t\tif (goal - base.itemWidth / 20 > array[i + 1] && goal - base.itemWidth / 20 < v && base.moveDirection() === \"left\") {\n\t\t\t\t\tclosest = v;\n\t\t\t\t\tif (base.options.scrollPerPage === true) {\n\t\t\t\t\t\tbase.currentItem = $.inArray(closest, base.positionsInArray);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tbase.currentItem = i;\n\t\t\t\t\t}\n\t\t\t\t} else if (goal + base.itemWidth / 20 < v && goal + base.itemWidth / 20 > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === \"right\") {\n\t\t\t\t\tif (base.options.scrollPerPage === true) {\n\t\t\t\t\t\tclosest = array[i + 1] || array[array.length - 1];\n\t\t\t\t\t\tbase.currentItem = $.inArray(closest, base.positionsInArray);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tclosest = array[i + 1];\n\t\t\t\t\t\tbase.currentItem = i + 1;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t\treturn base.currentItem;\n\t\t},\n\n\t\tmoveDirection: function moveDirection() {\n\t\t\tvar base = this,\n\t\t\t    direction;\n\t\t\tif (base.newRelativeX < 0) {\n\t\t\t\tdirection = \"right\";\n\t\t\t\tbase.playDirection = \"next\";\n\t\t\t} else {\n\t\t\t\tdirection = \"left\";\n\t\t\t\tbase.playDirection = \"prev\";\n\t\t\t}\n\t\t\treturn direction;\n\t\t},\n\n\t\tcustomEvents: function customEvents() {\n\t\t\t/*jslint unparam: true*/\n\t\t\tvar base = this;\n\t\t\tbase.$elem.on(\"owl.next\", function () {\n\t\t\t\tbase.next();\n\t\t\t});\n\t\t\tbase.$elem.on(\"owl.prev\", function () {\n\t\t\t\tbase.prev();\n\t\t\t});\n\t\t\tbase.$elem.on(\"owl.play\", function (event, speed) {\n\t\t\t\tbase.options.autoPlay = speed;\n\t\t\t\tbase.play();\n\t\t\t\tbase.hoverStatus = \"play\";\n\t\t\t});\n\t\t\tbase.$elem.on(\"owl.stop\", function () {\n\t\t\t\tbase.stop();\n\t\t\t\tbase.hoverStatus = \"stop\";\n\t\t\t});\n\t\t\tbase.$elem.on(\"owl.goTo\", function (event, item) {\n\t\t\t\tbase.goTo(item);\n\t\t\t});\n\t\t\tbase.$elem.on(\"owl.jumpTo\", function (event, item) {\n\t\t\t\tbase.jumpTo(item);\n\t\t\t});\n\t\t},\n\n\t\tstopOnHover: function stopOnHover() {\n\t\t\tvar base = this;\n\t\t\tif (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {\n\t\t\t\tbase.$elem.on(\"mouseover\", function () {\n\t\t\t\t\tbase.stop();\n\t\t\t\t});\n\t\t\t\tbase.$elem.on(\"mouseout\", function () {\n\t\t\t\t\tif (base.hoverStatus !== \"stop\") {\n\t\t\t\t\t\tbase.play();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\n\t\tlazyLoad: function lazyLoad() {\n\t\t\tvar base = this,\n\t\t\t    i,\n\t\t\t    $item,\n\t\t\t    itemNumber,\n\t\t\t    $lazyImg,\n\t\t\t    follow;\n\n\t\t\tif (base.options.lazyLoad === false) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tfor (i = 0; i < base.itemsAmount; i += 1) {\n\t\t\t\t$item = $(base.$owlItems[i]);\n\n\t\t\t\tif ($item.data(\"owl-loaded\") === \"loaded\") {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\titemNumber = $item.data(\"owl-item\");\n\t\t\t\t$lazyImg = $item.find(\".lazyOwl\");\n\n\t\t\t\tif (typeof $lazyImg.data(\"src\") !== \"string\") {\n\t\t\t\t\t$item.data(\"owl-loaded\", \"loaded\");\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tif ($item.data(\"owl-loaded\") === undefined) {\n\t\t\t\t\t$lazyImg.hide();\n\t\t\t\t\t$item.addClass(\"loading\").data(\"owl-loaded\", \"checked\");\n\t\t\t\t}\n\t\t\t\tif (base.options.lazyFollow === true) {\n\t\t\t\t\tfollow = itemNumber >= base.currentItem;\n\t\t\t\t} else {\n\t\t\t\t\tfollow = true;\n\t\t\t\t}\n\t\t\t\tif (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {\n\t\t\t\t\tbase.lazyPreload($item, $lazyImg);\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\tlazyPreload: function lazyPreload($item, $lazyImg) {\n\t\t\tvar base = this,\n\t\t\t    iterations = 0,\n\t\t\t    isBackgroundImg;\n\n\t\t\tif ($lazyImg.prop(\"tagName\") === \"DIV\") {\n\t\t\t\t$lazyImg.css(\"background-image\", \"url(\" + $lazyImg.data(\"src\") + \")\");\n\t\t\t\tisBackgroundImg = true;\n\t\t\t} else {\n\t\t\t\t$lazyImg[0].src = $lazyImg.data(\"src\");\n\t\t\t}\n\n\t\t\tfunction showImage() {\n\t\t\t\t$item.data(\"owl-loaded\", \"loaded\").removeClass(\"loading\");\n\t\t\t\t$lazyImg.removeAttr(\"data-src\");\n\t\t\t\tif (base.options.lazyEffect) {\n\t\t\t\t\t$lazyImg.fadeIn(400);\n\t\t\t\t} else {\n\t\t\t\t\t$lazyImg.show();\n\t\t\t\t}\n\t\t\t\tif (typeof base.options.afterLazyLoad === \"function\") {\n\t\t\t\t\tbase.options.afterLazyLoad.apply(this, [base.$elem]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction checkLazyImage() {\n\t\t\t\titerations += 1;\n\t\t\t\tif (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {\n\t\t\t\t\tshowImage();\n\t\t\t\t} else if (iterations <= 100) {\n\t\t\t\t\t//if image loads in less than 10 seconds\n\t\t\t\t\twindow.setTimeout(checkLazyImage, 100);\n\t\t\t\t} else {\n\t\t\t\t\tshowImage();\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tcheckLazyImage();\n\t\t},\n\n\t\tautoHeight: function autoHeight() {\n\t\t\tvar base = this,\n\t\t\t    $currentimg = $(base.$owlItems[base.currentItem]).find(\"img\"),\n\t\t\t    iterations;\n\n\t\t\tfunction addHeight() {\n\t\t\t\tvar $currentItem = $(base.$owlItems[base.currentItem]).height();\n\t\t\t\tbase.wrapperOuter.css(\"height\", $currentItem + \"px\");\n\t\t\t\tif (!base.wrapperOuter.hasClass(\"autoHeight\")) {\n\t\t\t\t\twindow.setTimeout(function () {\n\t\t\t\t\t\tbase.wrapperOuter.addClass(\"autoHeight\");\n\t\t\t\t\t}, 0);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfunction checkImage() {\n\t\t\t\titerations += 1;\n\t\t\t\tif (base.completeImg($currentimg.get(0))) {\n\t\t\t\t\taddHeight();\n\t\t\t\t} else if (iterations <= 100) {\n\t\t\t\t\t//if image loads in less than 10 seconds\n\t\t\t\t\twindow.setTimeout(checkImage, 100);\n\t\t\t\t} else {\n\t\t\t\t\tbase.wrapperOuter.css(\"height\", \"\"); //Else remove height attribute\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ($currentimg.get(0) !== undefined) {\n\t\t\t\titerations = 0;\n\t\t\t\tcheckImage();\n\t\t\t} else {\n\t\t\t\taddHeight();\n\t\t\t}\n\t\t},\n\n\t\tcompleteImg: function completeImg(img) {\n\t\t\tvar naturalWidthType;\n\n\t\t\tif (!img.complete) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tnaturalWidthType = _typeof(img.naturalWidth);\n\t\t\tif (naturalWidthType !== \"undefined\" && img.naturalWidth === 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\treturn true;\n\t\t},\n\n\t\tonVisibleItems: function onVisibleItems() {\n\t\t\tvar base = this,\n\t\t\t    i;\n\n\t\t\tif (base.options.addClassActive === true) {\n\t\t\t\tbase.$owlItems.removeClass(\"active\");\n\t\t\t}\n\t\t\tbase.visibleItems = [];\n\t\t\tfor (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {\n\t\t\t\tbase.visibleItems.push(i);\n\n\t\t\t\tif (base.options.addClassActive === true) {\n\t\t\t\t\t$(base.$owlItems[i]).addClass(\"active\");\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.owl.visibleItems = base.visibleItems;\n\t\t},\n\n\t\ttransitionTypes: function transitionTypes(className) {\n\t\t\tvar base = this;\n\t\t\t//Currently available: \"fade\", \"backSlide\", \"goDown\", \"fadeUp\"\n\t\t\tbase.outClass = \"owl-\" + className + \"-out\";\n\t\t\tbase.inClass = \"owl-\" + className + \"-in\";\n\t\t},\n\n\t\tsingleItemTransition: function singleItemTransition() {\n\t\t\tvar base = this,\n\t\t\t    outClass = base.outClass,\n\t\t\t    inClass = base.inClass,\n\t\t\t    $currentItem = base.$owlItems.eq(base.currentItem),\n\t\t\t    $prevItem = base.$owlItems.eq(base.prevItem),\n\t\t\t    prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],\n\t\t\t    origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,\n\t\t\t    animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';\n\n\t\t\tbase.isTransition = true;\n\n\t\t\tbase.$owlWrapper.addClass('owl-origin').css({\n\t\t\t\t\"-webkit-transform-origin\": origin + \"px\",\n\t\t\t\t\"-moz-perspective-origin\": origin + \"px\",\n\t\t\t\t\"perspective-origin\": origin + \"px\"\n\t\t\t});\n\n\t\t\tfunction transStyles(prevPos) {\n\t\t\t\treturn {\n\t\t\t\t\t\"position\": \"relative\",\n\t\t\t\t\t\"left\": prevPos + \"px\"\n\t\t\t\t};\n\t\t\t}\n\n\t\t\t$prevItem.css(transStyles(prevPos, 10)).addClass(outClass).on(animEnd, function () {\n\t\t\t\tbase.endPrev = true;\n\t\t\t\t$prevItem.off(animEnd);\n\t\t\t\tbase.clearTransStyle($prevItem, outClass);\n\t\t\t});\n\n\t\t\t$currentItem.addClass(inClass).on(animEnd, function () {\n\t\t\t\tbase.endCurrent = true;\n\t\t\t\t$currentItem.off(animEnd);\n\t\t\t\tbase.clearTransStyle($currentItem, inClass);\n\t\t\t});\n\t\t},\n\n\t\tclearTransStyle: function clearTransStyle(item, classToRemove) {\n\t\t\tvar base = this;\n\t\t\titem.css({\n\t\t\t\t\"position\": \"\",\n\t\t\t\t\"left\": \"\"\n\t\t\t}).removeClass(classToRemove);\n\n\t\t\tif (base.endPrev && base.endCurrent) {\n\t\t\t\tbase.$owlWrapper.removeClass('owl-origin');\n\t\t\t\tbase.endPrev = false;\n\t\t\t\tbase.endCurrent = false;\n\t\t\t\tbase.isTransition = false;\n\t\t\t}\n\t\t},\n\n\t\towlStatus: function owlStatus() {\n\t\t\tvar base = this;\n\t\t\tbase.owl = {\n\t\t\t\t\"userOptions\": base.userOptions,\n\t\t\t\t\"baseElement\": base.$elem,\n\t\t\t\t\"userItems\": base.$userItems,\n\t\t\t\t\"owlItems\": base.$owlItems,\n\t\t\t\t\"currentItem\": base.currentItem,\n\t\t\t\t\"prevItem\": base.prevItem,\n\t\t\t\t\"visibleItems\": base.visibleItems,\n\t\t\t\t\"isTouch\": base.browser.isTouch,\n\t\t\t\t\"browser\": base.browser,\n\t\t\t\t\"dragDirection\": base.dragDirection\n\t\t\t};\n\t\t},\n\n\t\tclearEvents: function clearEvents() {\n\t\t\tvar base = this;\n\t\t\tbase.$elem.off(\".owl owl mousedown.disableTextSelect\");\n\t\t\t$(document).off(\".owl owl\");\n\t\t\t$(window).off(\"resize\", base.resizer);\n\t\t},\n\n\t\tunWrap: function unWrap() {\n\t\t\tvar base = this;\n\t\t\tif (base.$elem.children().length !== 0) {\n\t\t\t\tbase.$owlWrapper.unwrap();\n\t\t\t\tbase.$userItems.unwrap().unwrap();\n\t\t\t\tif (base.owlControls) {\n\t\t\t\t\tbase.owlControls.remove();\n\t\t\t\t}\n\t\t\t}\n\t\t\tbase.clearEvents();\n\t\t\tbase.$elem.attr(\"style\", base.$elem.data(\"owl-originalStyles\") || \"\").attr(\"class\", base.$elem.data(\"owl-originalClasses\"));\n\t\t},\n\n\t\tdestroy: function destroy() {\n\t\t\tvar base = this;\n\t\t\tbase.stop();\n\t\t\twindow.clearInterval(base.checkVisible);\n\t\t\tbase.unWrap();\n\t\t\tbase.$elem.removeData();\n\t\t},\n\n\t\treinit: function reinit(newOptions) {\n\t\t\tvar base = this,\n\t\t\t    options = $.extend({}, base.userOptions, newOptions);\n\t\t\tbase.unWrap();\n\t\t\tbase.init(options, base.$elem);\n\t\t},\n\n\t\taddItem: function addItem(htmlString, targetPosition) {\n\t\t\tvar base = this,\n\t\t\t    position;\n\n\t\t\tif (!htmlString) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif (base.$elem.children().length === 0) {\n\t\t\t\tbase.$elem.append(htmlString);\n\t\t\t\tbase.setVars();\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tbase.unWrap();\n\t\t\tif (targetPosition === undefined || targetPosition === -1) {\n\t\t\t\tposition = -1;\n\t\t\t} else {\n\t\t\t\tposition = targetPosition;\n\t\t\t}\n\t\t\tif (position >= base.$userItems.length || position === -1) {\n\t\t\t\tbase.$userItems.eq(-1).after(htmlString);\n\t\t\t} else {\n\t\t\t\tbase.$userItems.eq(position).before(htmlString);\n\t\t\t}\n\n\t\t\tbase.setVars();\n\t\t},\n\n\t\tremoveItem: function removeItem(targetPosition) {\n\t\t\tvar base = this,\n\t\t\t    position;\n\n\t\t\tif (base.$elem.children().length === 0) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tif (targetPosition === undefined || targetPosition === -1) {\n\t\t\t\tposition = -1;\n\t\t\t} else {\n\t\t\t\tposition = targetPosition;\n\t\t\t}\n\n\t\t\tbase.unWrap();\n\t\t\tbase.$userItems.eq(position).remove();\n\t\t\tbase.setVars();\n\t\t}\n\n\t};\n\n\t$.fn.owlCarousel = function (options) {\n\t\treturn this.each(function () {\n\t\t\tif ($(this).data(\"owl-init\") === true) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\t$(this).data(\"owl-init\", true);\n\t\t\tvar carousel = Object.create(Carousel);\n\t\t\tcarousel.init(options, this);\n\t\t\t$.data(this, \"owlCarousel\", carousel);\n\t\t});\n\t};\n\n\t$.fn.owlCarousel.options = {\n\n\t\titems: 5,\n\t\titemsCustom: false,\n\t\titemsDesktop: [1199, 4],\n\t\titemsDesktopSmall: [979, 3],\n\t\titemsTablet: [768, 2],\n\t\titemsTabletSmall: false,\n\t\titemsMobile: [479, 1],\n\t\tsingleItem: false,\n\t\titemsScaleUp: false,\n\n\t\tslideSpeed: 200,\n\t\tpaginationSpeed: 800,\n\t\trewindSpeed: 1000,\n\n\t\tautoPlay: false,\n\t\tstopOnHover: false,\n\n\t\tnavigation: false,\n\t\tnavigationText: [\"prev\", \"next\"],\n\t\trewindNav: true,\n\t\tscrollPerPage: false,\n\n\t\tpagination: true,\n\t\tpaginationNumbers: false,\n\n\t\tresponsive: true,\n\t\tresponsiveRefreshRate: 200,\n\t\tresponsiveBaseWidth: window,\n\n\t\tbaseClass: \"owl-carousel\",\n\t\ttheme: \"owl-theme\",\n\n\t\tlazyLoad: false,\n\t\tlazyFollow: true,\n\t\tlazyEffect: \"fade\",\n\n\t\tautoHeight: false,\n\n\t\tjsonPath: false,\n\t\tjsonSuccess: false,\n\n\t\tdragBeforeAnimFinish: true,\n\t\tmouseDrag: true,\n\t\ttouchDrag: true,\n\n\t\taddClassActive: false,\n\t\ttransitionStyle: false,\n\n\t\tbeforeUpdate: false,\n\t\tafterUpdate: false,\n\t\tbeforeInit: false,\n\t\tafterInit: false,\n\t\tbeforeMove: false,\n\t\tafterMove: false,\n\t\tafterAction: false,\n\t\tstartDragging: false,\n\t\tafterLazyLoad: false\n\t};\n})(jQuery, window, document);\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/owl.carousel.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/owl.carousel.js?");

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		eval("exports = module.exports = __webpack_require__(3)();\n// imports\n\n\n// module\nexports.push([module.id, \"/*\\n * \\tCore Owl Carousel CSS File\\n *\\tv1.3.2\\n */\\n\\n/* clearfix */\\n.owl-carousel .owl-wrapper:after {\\n\\tcontent: \\\".\\\";\\n\\tdisplay: block;\\n\\tclear: both;\\n\\tvisibility: hidden;\\n\\tline-height: 0;\\n\\theight: 0;\\n}\\n/* display none until init */\\n.owl-carousel{\\n\\tdisplay: none;\\n\\tposition: relative;\\n\\twidth: 100%;\\n\\t-ms-touch-action: pan-y;\\n}\\n.owl-carousel .owl-wrapper{\\n\\tdisplay: none;\\n\\tposition: relative;\\n\\t-webkit-transform: translate3d(0px, 0px, 0px);\\n}\\n.owl-carousel .owl-wrapper-outer{\\n\\toverflow: hidden;\\n\\tposition: relative;\\n\\twidth: 100%;\\n}\\n.owl-carousel .owl-wrapper-outer.autoHeight{\\n\\t-webkit-transition: height 500ms ease-in-out;\\n\\ttransition: height 500ms ease-in-out;\\n}\\n\\n.owl-carousel .owl-item{\\n\\tfloat: left;\\n}\\n.owl-controls .owl-page,\\n.owl-controls .owl-buttons div{\\n\\tcursor: pointer;\\n}\\n.owl-controls {\\n\\t-webkit-user-select: none;\\n\\t-moz-user-select: none;\\n\\t-ms-user-select: none;\\n\\tuser-select: none;\\n\\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\\n}\\n\\n/* mouse grab icon */\\n.grabbing {\\n    /*cursor:url(grabbing.png) 8 8, move;*/\\n}\\n\\n/* fix */\\n.owl-carousel  .owl-wrapper,\\n.owl-carousel  .owl-item{\\n\\t-webkit-backface-visibility: hidden;\\n\\t-moz-backface-visibility:    hidden;\\n\\t-ms-backface-visibility:     hidden;\\n  -webkit-transform: translate3d(0,0,0);\\n  -moz-transform: translate3d(0,0,0);\\n  -ms-transform: translate3d(0,0,0);\\n}\\n\\n/*\\n *  Owl Carousel CSS3 Transitions\\n *  v1.3.2\\n */\\n\\n.owl-origin {\\n\\t-webkit-perspective: 1200px;\\n\\t-webkit-perspective-origin-x : 50%;\\n\\t-webkit-perspective-origin-y : 50%;\\n\\t-moz-perspective : 1200px;\\n\\t-moz-perspective-origin-x : 50%;\\n\\t-moz-perspective-origin-y : 50%;\\n\\tperspective : 1200px;\\n}\\n/* fade */\\n.owl-fade-out {\\n  z-index: 10;\\n  -webkit-animation: fadeOut .7s both ease;\\n  animation: fadeOut .7s both ease;\\n}\\n.owl-fade-in {\\n  -webkit-animation: fadeIn .7s both ease;\\n  animation: fadeIn .7s both ease;\\n}\\n/* backSlide */\\n.owl-backSlide-out {\\n  -webkit-animation: backSlideOut 1s both ease;\\n  animation: backSlideOut 1s both ease;\\n}\\n.owl-backSlide-in {\\n  -webkit-animation: backSlideIn 1s both ease;\\n  animation: backSlideIn 1s both ease;\\n}\\n/* goDown */\\n.owl-goDown-out {\\n  -webkit-animation: scaleToFade .7s ease both;\\n  animation: scaleToFade .7s ease both;\\n}\\n.owl-goDown-in {\\n  -webkit-animation: goDown .6s ease both;\\n  animation: goDown .6s ease both;\\n}\\n/* scaleUp */\\n.owl-fadeUp-in {\\n  -webkit-animation: scaleUpFrom .5s ease both;\\n  animation: scaleUpFrom .5s ease both;\\n}\\n\\n.owl-fadeUp-out {\\n  -webkit-animation: scaleUpTo .5s ease both;\\n  animation: scaleUpTo .5s ease both;\\n}\\n/* Keyframes */\\n/*empty*/\\n@-webkit-keyframes empty {\\n  0% {opacity: 1}\\n}\\n@keyframes empty {\\n  0% {opacity: 1}\\n}\\n@-webkit-keyframes fadeIn {\\n  0% { opacity:0; }\\n  100% { opacity:1; }\\n}\\n@keyframes fadeIn {\\n  0% { opacity:0; }\\n  100% { opacity:1; }\\n}\\n@-webkit-keyframes fadeOut {\\n  0% { opacity:1; }\\n  100% { opacity:0; }\\n}\\n@keyframes fadeOut {\\n  0% { opacity:1; }\\n  100% { opacity:0; }\\n}\\n@-webkit-keyframes backSlideOut {\\n  25% { opacity: .5; -webkit-transform: translateZ(-500px); }\\n  75% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); }\\n  100% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); }\\n}\\n@keyframes backSlideOut {\\n  25% { opacity: .5; -webkit-transform: translateZ(-500px); transform: translateZ(-500px); }\\n  75% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); transform: translateZ(-500px) translateX(-200%); }\\n  100% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(-200%); transform: translateZ(-500px) translateX(-200%); }\\n}\\n@-webkit-keyframes backSlideIn {\\n  0%, 25% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(200%); }\\n  75% { opacity: .5; -webkit-transform: translateZ(-500px); }\\n  100% { opacity: 1; -webkit-transform: translateZ(0) translateX(0); }\\n}\\n@keyframes backSlideIn {\\n  0%, 25% { opacity: .5; -webkit-transform: translateZ(-500px) translateX(200%); transform: translateZ(-500px) translateX(200%); }\\n  75% { opacity: .5; -webkit-transform: translateZ(-500px); transform: translateZ(-500px); }\\n  100% { opacity: 1; -webkit-transform: translateZ(0) translateX(0); transform: translateZ(0) translateX(0); }\\n}\\n@-webkit-keyframes scaleToFade {\\n  to { opacity: 0; -webkit-transform: scale(.8); }\\n}\\n@keyframes scaleToFade {\\n  to { opacity: 0; -webkit-transform: scale(.8); transform: scale(.8); }\\n}\\n@-webkit-keyframes goDown {\\n  from { -webkit-transform: translateY(-100%); }\\n}\\n@keyframes goDown {\\n  from { -webkit-transform: translateY(-100%); transform: translateY(-100%); }\\n}\\n\\n@-webkit-keyframes scaleUpFrom {\\n  from { opacity: 0; -webkit-transform: scale(1.5); }\\n}\\n@keyframes scaleUpFrom {\\n  from { opacity: 0; -webkit-transform: scale(1.5); transform: scale(1.5); }\\n}\\n\\n@-webkit-keyframes scaleUpTo {\\n  to { opacity: 0; -webkit-transform: scale(1.5); }\\n}\\n@keyframes scaleUpTo {\\n  to { opacity: 0; -webkit-transform: scale(1.5); transform: scale(1.5); }\\n}\\n\", \"\"]);\n\n// exports\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader!./~/postcss-loader!./src/owl.carousel.css\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/owl.carousel.css?./~/css-loader!./~/postcss-loader");

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/css-loader/lib/css-base.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/css-loader/lib/css-base.js?");

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./~/style-loader/addStyles.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./~/style-loader/addStyles.js?");

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(2);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(4)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./owl.carousel.css\", function() {\n\t\t\tvar newContent = require(\"!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./owl.carousel.css\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/owl.carousel.css\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/owl.carousel.css?");

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		eval("module.exports = __WEBPACK_EXTERNAL_MODULE_6__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external {\"root\":\"React\",\"commonjs2\":\"react\",\"commonjs\":\"react\",\"amd\":\"react\"}\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		eval("module.exports = __WEBPACK_EXTERNAL_MODULE_7__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external {\"root\":\"ReactDOM\",\"commonjs2\":\"react-dom\",\"commonjs\":\"react-dom\",\"amd\":\"react-dom\"}\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%7B%22root%22:%22ReactDOM%22,%22commonjs2%22:%22react-dom%22,%22commonjs%22:%22react-dom%22,%22amd%22:%22react-dom%22%7D?");

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Content = function (_React$Component) {
	  _inherits(Content, _React$Component);

	  function Content(props) {
	    _classCallCheck(this, Content);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).call(this, props));
	  }

	  _createClass(Content, [{
	    key: 'render',
	    value: function render() {
	      var item = this.props.item;

	      return _react2.default.createElement(
	        'div',
	        { className: 'list-container' },
	        function () {
	          switch (item.textContent.type) {
	            case "list":
	              return _react2.default.createElement(
	                'ul',
	                null,
	                item.textContent.text.map(function (textLine) {
	                  return _react2.default.createElement(
	                    'li',
	                    { key: textLine.contentId },
	                    textLine.content
	                  );
	                })
	              );
	            case "text":
	              return _react2.default.createElement(
	                'p',
	                null,
	                item.textContent.text
	              );
	            default:
	              return null;
	          }
	        }()
	      );
	    }
	  }]);

	  return Content;
	}(_react2.default.Component);

	exports.default = Content;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(28)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(27)();
	// imports


	// module
	exports.push([module.id, ".carousel-block {\n  height: 100%;\n  width: 100%; }\n  .carousel-block .owl-carousel {\n    height: 100%;\n    display: block; }\n    .carousel-block .owl-carousel .owl-wrapper-outer {\n      display: block;\n      height: 100%; }\n      .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper {\n        display: block;\n        height: 100%; }\n        .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item {\n          height: 100%;\n          width: 100%;\n          /* padding:5px; */ }\n          .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div {\n            height: 100%; }\n            .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div img {\n              height: 100%;\n              width: 100%; }\n            .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div > div {\n              width: 38%;\n              height: auto;\n              background-color: rgba(18, 17, 17, 0.86);\n              padding: 10px;\n              text-align: left;\n              padding-left: 10px;\n              position: absolute;\n              bottom: 10px;\n              left: 10px; }\n              .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div > div h4 {\n                font-size: 1.4em;\n                line-height: 1.1em;\n                color: white;\n                margin: 5px;\n                margin-left: 0px; }\n              .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div > div p {\n                word-wrap: normal;\n                font-family: inherit;\n                padding: 0;\n                font-size: 1.1em;\n                line-height: 1.1em;\n                color: white;\n                width: calc(100% - 10px);\n                height: auto;\n                margin: 0; }\n              .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div > div .list-container {\n                color: white;\n                font-size: 1.1em; }\n                .carousel-block .owl-carousel .owl-wrapper-outer .owl-wrapper .owl-item > div > div .list-container ul {\n                  margin-top: 6px;\n                  margin-bottom: 6px; }\n    .carousel-block .owl-carousel .owl-controls {\n      height: 0;\n      text-align: center; }\n      .carousel-block .owl-carousel .owl-controls .owl-pagination {\n        position: absolute;\n        bottom: 5px;\n        padding: 5px;\n        display: inline-block;\n        width: auto;\n        height: auto;\n        margin: auto auto;\n        background-color: rgba(18, 17, 17, 0.86); }\n        .carousel-block .owl-carousel .owl-controls .owl-pagination .owl-page {\n          margin: 10px;\n          height: 10px;\n          width: 10px;\n          display: inline-block;\n          background-color: white;\n          border-radius: 50%;\n          background-color: rgba(33, 150, 243, 0.6); }\n        .carousel-block .owl-carousel .owl-controls .owl-pagination .owl-page:hover {\n          background-color: #2196f3; }\n        .carousel-block .owl-carousel .owl-controls .owl-pagination .owl-page.active {\n          margin: 10px;\n          height: 10px;\n          width: 10px;\n          display: inline-block;\n          background-color: white;\n          border-radius: 50%;\n          background-color: #2196f3; }\n", ""]);

	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);