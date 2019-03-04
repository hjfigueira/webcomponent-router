import register, {ce} from "../assets/helpers.js";

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
            tagname = register(tagname, this.routes.state.content);
            let template = ce(tagname);
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