/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/core/app-core.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/helpers.js":
/*!*******************************!*\
  !*** ./src/assets/helpers.js ***!
  \*******************************/
/*! exports provided: default, component, router, BasePage, ce, block */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasePage", function() { return BasePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ce", function() { return ce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "block", function() { return block; });

function register(tagName, className, extraConfig)
{
    tagName = tagName.replace(new RegExp('[^a-z|A-Z|0-9|\-]','g'),'');
    if(!window.customElements.get(tagName))
    {
        console.log('registering element '+tagName);
        window.customElements.define(tagName, className, extraConfig);
    }
    return tagName;
}

// export function ce(tagName, config, content)
// {
//     let el = document.createElement(tagName);
//
//     if(!!config) {
//
//         if (!!config['class']) {
//             el.classList.add(...config['class'].split(' '))
//         }
//         if (!!config['id']) {
//             el.id = config['id'];
//         }
//         if (!!content) {
//
//             let element;
//
//             if (typeof content === "function") {
//                 element = content();
//             } else {
//                 element = content;
//             }
//
//             el.append(element);
//         }
//     }
//
//     return el;
// }

function component(tagName, className, extraConfig)
{
    return register(tagName, className, extraConfig);
}

function router(routerName, extraData){

    return document.getElementById(routerName);

}

class BasePage extends HTMLElement
{

    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    append(params){
        this.shadowRoot.append(params);
    }

}

function ce(tag, config)
{

    let el = document.createElement(tag);
    BaseElement(el,config);
    return el;
}

function BaseElement(el, config){

    el.structChildren = [];
    el.references = [];
    el.selfReference = null;
    el.config = config;

    el.parse = function()
    {
        let classList = [];

        if(!!this.config)
        {
            let elements = this.config.split('.');
            let firstChar = elements[0].charAt(0);
            classList = elements.splice(1);
            this.classList = classList;

            if( firstChar === '#')
            {
                this.id = elements[0].substr(1);
            }
        }

        return this;
    };

    el.html = function(...children)
    {
        this.structChildren = this.structChildren.concat(children);

        for(let index in this.structChildren)
        {
            let item = this.structChildren[index].clone();

            if(!!item.selfReference)
            {
                this.references[item.selfReference] = item;
            }

            this.append(item);
        }

        return this;
    };

    el.text = function(string)
    {
        this.innerText = string;
        return this;
    };

    el.var = function(identifier)
    {
        this.selfReference = identifier;
        return this;
    };

    el.ref = function(identifier)
    {
        if(this.references.hasOwnProperty(identifier))
        {
            return this.references[identifier];
        }
        else{
            return false
        }
    };

    el.clone = function()
    {
        let clone = this.cloneNode(true);

        BaseElement(clone,this.config);

        return clone
    };

    el.parse();
}

function block(tag, config)
{
    return new BlockBuilder(tag, config);
}

class BaseBuilder {

    constructor(tag, idClass)
    {
        this.node = this.parse(tag, idClass);
    }

    parse(tag, idClass)
    {
        let node = document.createElement(tag);
        let classList = [];

        if(!!idClass)
        {
            let elements = idClass.split('.');
            let firstChar = elements[0].charAt(0);
            classList = elements.splice(1);
            node.classList = classList;

            if( firstChar === '#')
            {
                node.id = elements[0];
            }
        }

        return node;
    }

}

class BlockBuilder extends BaseBuilder{

    constructor(tag, idClass)
    {
        super(tag, idClass);
        this.children = [];
        this.variables = {};

    }

    html(...children)
    {
        this.children = this.children.concat(children);
        return this;
    }

    appendChildren()
    {
        for(let childIndex in this.children)
        {
            let child = this.children[childIndex];

            if(child instanceof ElementBuilder)
            {
                // child.appendChildren();
                this.node.append(child.node);
            }
            else{
                this.node.append(child)
            }

        }

        return this.node;
    }

    render()
    {
        this.appendChildren();
        return this.node;
    }

    loadReferences()
    {
        for(let childIndex in this.children)
        {
            if(!!this.children[childIndex].reference)
            {
                let refString = this.children[childIndex].reference;
                if(this.references.hasOwnProperty(refString))
                {
                    if(!this.references[refString].push)
                    {
                        this.reference[refString] = [this.reference[refString]];
                    }

                    this.references[refString].push(this.children[childIndex]);

                }else{
                    this.references[refString] = this.children[childIndex];
                }
            }
        }
        return this;
    }
}

class ElementBuilder extends HTMLElement{


    var(reference)
    {
        this.reference = reference;
        return this;
    }

    text(string)
    {
        this.node.innerText = string;
        return this;
    }

    toString()
    {
        return this.node;
    }

}



/***/ }),

/***/ "./src/core/app-bootstrap.js":
/*!***********************************!*\
  !*** ./src/core/app-bootstrap.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");
/* harmony import */ var _pages_conversationSingle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/conversationSingle.js */ "./src/pages/conversationSingle.js");
/* harmony import */ var _pages_conversationList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/conversationList.js */ "./src/pages/conversationList.js");
/* harmony import */ var _pages_conversationSingleNoSub_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/conversationSingleNoSub.js */ "./src/pages/conversationSingleNoSub.js");





let mainRouter = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('app-router');
mainRouter.id = 'mainRouter';
mainRouter.states = {
    '/' : _pages_conversationList_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    '/conversation/.*' : _pages_conversationSingle_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    '/conversation-nosub' : _pages_conversationSingleNoSub_js__WEBPACK_IMPORTED_MODULE_3__["default"],
};

document.body.append(mainRouter);

/***/ }),

/***/ "./src/core/app-core.js":
/*!******************************!*\
  !*** ./src/core/app-core.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-router.js */ "./src/core/app-router.js");
/* harmony import */ var _app_bootstrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-bootstrap.js */ "./src/core/app-bootstrap.js");




/***/ }),

/***/ "./src/core/app-router.js":
/*!********************************!*\
  !*** ./src/core/app-router.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");


window.customElements.define('app-router', class extends HTMLElement {

    constructor()
    {
        super();
        this.settings = {};
        this.routes = false;
        this.routerReference = null;
        this.lastState = null;

        this.loadSettings();

    }

    connectedCallback()
    {
        this.registerEvents();
        this.doRoute();
    }

    disconnectedCallback()
    {
        this.unregisterEvents();
    }

    get id() {
        return this.getAttribute('id');
    }

    set id(id) {
        if (id) {
            this.setAttribute('id', '');
        } else {
            this.removeAttribute('id');
        }
    }

    set states(routes) {
        this.routes = routes;
        this.prepareRoutes();
    }

    get states(){
        return this.routes;
    }


    prepareRoutes()
    {
        Object.defineProperties(this.routes, {
            state: {
                value: {
                    id: '',
                    params: {},
                    url: null,
                    content: null
                }
            },
            setRoute: {
                value: (url) => {

                    // Bail if there's no URL
                    if (!url) return;

                    var pathOnlyUrl = url.split(/\/?\?/)[0];

                    // Get the route state
                    var state = this.getRouteFromPath(pathOnlyUrl);
                    if (!state) return;
                    this.routes.state.id = state.id;
                    this.routes.state.params = this.getParams(url);
                    this.routes.state.url = state.url;
                    this.routes.state.content = state.content;
                    return this.routes.state;
                }
            },
            push: {
                value: () => {
                    if (this.settings.forceReload) {
                        if (window.location.href === this.routes.state.url) return;
                        window.location.href = this.routes.state.url;
                    }

                    if (!history.pushState) return;

                    // Update the page title
                    document.title = (this.routes[this.routes.state.id] && this.routes[this.routes.state.id].title ? this.routes[this.routes.state.id].title : '') + this.settings.title;

                    // Don't run if already current page
                    if (history.state && history.state.url && history.state.url === this.routes.state.url) return;
                    history.pushState(
                        this.routes.state,
                        (this.routes[this.routes.state.id] && this.routes[this.routes.state.id].title ? this.routes[this.routes.state.id].title : '') + this.settings.title,
                        this.routes.state.url
                    );
                }
            },
            replace: {
                value: () => {
                    if (!history.replaceState) return;

                    // Update the page title
                    document.title = (this.routes[this.routes.state.id] && this.routes[this.routes.state.id].title ? this.routes[this.routes.state.id].title : '') + this.settings.title;

                    // Don't run if already current page
                    if (history.state && history.state.url && history.state.url === this.routes.state.url) return;
                    history.pushState(
                        this.routes.state,
                        (this.routes[routes.state.id].title ? this.routes[this.routes.state.id].title : '') + this.settings.title,
                        this.routes.state.url
                    );
                }
            },
            route: {
                value: (url) => {
                    if (!url) return;
                    this.routes.setRoute(url);
                    return this.routes.state;
                }
            }
        });
    }

    loadSettings(options)
    {
        let settings = {
            title: '',
            onpopstate: true,
            forceReload: !(history.pushState),
        };

        // Shallow merge new properties into settings object
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                settings[key] = options[key];
            }
        }

        this.settings = settings;
    }

    /**
     * Get the URL parameters
     * source: https://css-tricks.com/snippets/javascript/get-url-variables/
     * @param  {String} url The URL
     * @return {Object}     The URL parameters
     */
    getParams(url)
    {
        var params = {};
        var query = url.substring(1);
        var parts = query.split('?');
        var vars = [];

        if(parts[1]){
            vars = parts[1].split('&');
        }

        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    /**
     * Parse a URL pathname for variables
     * @param  {String} pattern The pattern to match
     * @param  {String} url     The pathname to parse
     * @return {Object}         Details from the pathname
     */
    parsePathname(pattern, url)
    {
        // Variables
        let map = {};
        let keys = [];
        let matches = false;
        let oldUrl = url;
        let oldPattern = pattern;

        // If the URL is an exact match for the pattern, return it
        if (url === pattern || url + '/' === pattern) {
            return {
                id: pattern,
                params: {},
                url: url,
                content: this.getContent(oldUrl)
            };
        }

        // Add a trailing slash to the URL if one is missing
        url = url.slice(-1) === '/' ? url : url + '/';

        // Push variables in the pattern to our key array and replace them with regex match grouping
        var newPattern = pattern.replace('(*)', '.+?').replace(/\(:.+?\)/g, function(match) {
            var key = match.slice(2, -1);
            keys.push(key);
            return '([^/]*)';
        });

        // Test the URL against the pattern.
        // If it's a match, pull the variables out into the map
        newPattern = newPattern.replace(new RegExp('\/','g'),'\\/');
        var test = url.replace(new RegExp('^' + newPattern + '$'), function() {
            matches = true;
            for (var i = 0; i < keys.length; i++) {
                map[keys[i]] = arguments[i+1];
            }
        });

        // Return the data
        return {
            id: (matches ? pattern : null),
            params: map,
            url: url,
            content: this.getContent(oldPattern)
        };
    };

    getContent(url)
    {
        return  this.routes[url];
    }

    /**
     * Get the route state from query strings
     * @param  {String} url The URL
     * @return {Object}     The route state
     */
    getRouteFromQuery(url)
    {
        // Get the query string parameters and the page id
        var params = this.getParams(url);
        var id = params[this.settings.key] ? params[this.settings.key].toLowerCase() : '';

        // If route has redirect, call setRoute with redirect URL
        if (this.routes[id] && this.routes[id].redirect) {
            this.routes.setRoute(routes[id].redirect);
            return;
        }

        return {
            id: this.routes[id] ? id : 404,
            params: params,
            url: url
        };
    };

    /**
     * Get a route state from a pathname
     * @param  {String} url The URL
     * @return {Object}     The route state
     */
    getRouteFromPath(url)
    {
        // Make URL case-insensitive
        url = url.toLowerCase();

        // Loop through each route and test against URL
        for (var route in this.routes) {
            if (this.routes.hasOwnProperty(route)) {
                var parsed = this.parsePathname(route, url);
                if (parsed.id) {
                    return parsed;
                }
            }
        }

        // Otherwise return 404
        return {
            id: 404,
            params: {},
            url: url,
            content : null
        };

    };

    loadPage()
    {
        let identifier = this.routes.state.id;

        if(typeof identifier == 'string')
        {
            if (identifier === '/') {
                identifier = 'root'
            }
            if (identifier.charAt(0) === '/') {
                identifier = identifier.substr(1)
            }
        }

        let needsChange = false;
        if(this.lastState != identifier){
            this.lastState = identifier;
            needsChange = true;
        }

        if(identifier !== 404 && needsChange){

            console.log('pageload');
            let tagname = 'page-'+identifier;
            tagname = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tagname, this.routes.state.content);
            let template = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])(tagname);
            this.innerHTML = '';
            this.append(template);

        }
    }

    doRoute()
    {
        if(!this.routes){
            console.log('set property states do define routes');
            return;
        }

        let url = window.location.hash.replace('#','');
        if(!url){ url = '/';}
        this.routes.route(url);
        this.loadPage();
        console.log('router '+this.id+' routing to '+url);
    }

    registerEvents()
    {
        this.routerReference = this.doRoute.bind(this);
        window.addEventListener('popstate', this.routerReference, false);
    }

    unregisterEvents()
    {
        window.removeEventListener('popstate', this.routerReference, false);
    }


});

/***/ }),

/***/ "./src/pages/conversationList.js":
/*!***************************************!*\
  !*** ./src/pages/conversationList.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationList; });
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");



class ConversationList extends _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["BasePage"]{

    render()
    {
        let content = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content.innerText = 'Conversation List #1';
        content.setAttribute("href","#/conversation/?id=1");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

        let content2 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content2.innerText = 'Conversation List #2 NO SUB';
        content2.setAttribute("href","#/conversation-nosub/?id=2");
        content2.style.display = 'block';
        this.shadowRoot.appendChild(content2);

        let content3 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content3.innerText = 'Conversation List #3 SUB DIRECT';
        content3.setAttribute("href","#/conversation/inner/?id=3");
        content3.style.display = 'block';
        this.shadowRoot.appendChild(content3);

        let content4 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content4.innerText = 'Conversation List #4';
        content4.setAttribute("href","#/conversation/?id=4");
        content4.style.display = 'block';
        this.shadowRoot.appendChild(content4);

        let content5 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content5.innerText = 'Conversation List #5';
        content5.setAttribute("href","#/conversation/?id=5");
        content5.style.display = 'block';
        this.shadowRoot.appendChild(content5);

        let content6 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content6.innerText = 'Conversation List #6';
        content6.setAttribute("href","#/conversation/?id=6");
        content6.style.display = 'block';
        this.shadowRoot.appendChild(content6);

        let content7 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content7.innerText = 'Conversation List #7';
        content7.setAttribute("href","#/conversation/?id=7");
        content6.style.display = 'block';
        this.shadowRoot.appendChild(content7);

        let content8 = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content8.innerText = 'Conversation List #8';
        content8.setAttribute("href","#/conversation/?id=8");
        content8.style.display = 'block';
        this.shadowRoot.appendChild(content8);

    }

}

/***/ }),

/***/ "./src/pages/conversationSingle.js":
/*!*****************************************!*\
  !*** ./src/pages/conversationSingle.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationSingle; });
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");
/* harmony import */ var _conversationSub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversationSub.js */ "./src/pages/conversationSub.js");




class ConversationSingle extends _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["BasePage"]{

    render()
    {
        let nome = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        nome.innerText = 'Conversation Single';
        nome.setAttribute("href","#/");
        nome.style.display = 'block';

        this.append(nome);

        let inner = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        inner.innerText = 'Conversation Inner';
        inner.setAttribute("href","#/conversation/inner");
        inner.style.display = 'block';

        this.append(inner);

        firebase.database()
            .ref('/users/1112')
            .once('value')
            .then((data) => {

                let dados = data.val();

                let username = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('div');
                username.innerText = dados.username;
                this.append(username);

                let email = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('div');
                email.innerText = dados.email;
                this.append(email);

                let wawa = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('div');
                wawa.innerText = dados.wawa;
                this.append(wawa);

            });


        let innerRouter = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('app-router');
        innerRouter.id = 'InnerRouter';
        innerRouter.states = {
            '/conversation/inner' : _conversationSub_js__WEBPACK_IMPORTED_MODULE_1__["default"]
        };

        this.append(innerRouter);
    }

}

/***/ }),

/***/ "./src/pages/conversationSingleNoSub.js":
/*!**********************************************!*\
  !*** ./src/pages/conversationSingleNoSub.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationSingleNoSub; });
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");



class ConversationSingleNoSub extends _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["BasePage"]{

    render()
    {
        let content = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('a');
        content.innerText = 'NO SUB Sub #1';
        content.setAttribute("href","#/");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

    }

}

/***/ }),

/***/ "./src/pages/conversationSub.js":
/*!**************************************!*\
  !*** ./src/pages/conversationSub.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConversationSub; });
/* harmony import */ var _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/helpers.js */ "./src/assets/helpers.js");



class ConversationSub extends _assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["BasePage"]{

    render()
    {
        let content = Object(_assets_helpers_js__WEBPACK_IMPORTED_MODULE_0__["ce"])('span');
        content.innerText = 'Sub #1';
        // content.setAttribute("href","#/conversation/?id=1");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

    }

}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map