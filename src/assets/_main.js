//@flow

import routes from '../config/routes.js';
import register, {ce} from "./helpers.js";

register('router-container',class extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:"open"});

        //Attributes
        this.routesCache = [];
        this.currentUrl = '/';

        this.route();
    }

    route(){

        this.loadCurrentUrl();
        this.loadUrls();
        this.loadPage();
        console.log('loaded page');

        window.onhashchange = () => {
            this.clear();
            this.loadCurrentUrl();
            this.loadPage();
            console.log('updated page');
        }
    }

    loadCurrentUrl(){

        let url = window.location.hash.replace('#','');
        if(!url){ url = '/';}
        this.currentUrl = url;

    }

    loadUrls(){

        this.routesCache = routes;

    }

    clear()
    {
        this.shadowRoot.innerHTML = '';
    }

    _processRouteLevel(routesOptions, routePath, statePathTree, baseLevel)
    {
        let nextLevel = baseLevel + 1;

        for(let state in routesOptions )
        {
            let currentStep = '';
            let foundState = {};

            for (let routeIndex in routePath)
            {

                let fragment = !!routePath[routeIndex] ? routePath[routeIndex] : '/';
                currentStep = currentStep.concat( '/' + fragment);


                var matchRoute = currentStep.match(new RegExp(state));
                if(matchRoute)
                {
                    foundState = routesOptions[state];
                    routePath = routePath.slice(nextLevel);
                    statePathTree = this._processRouteLevel(foundState.states, routePath, statePathTree, nextLevel);
                    statePathTree.push(foundState);
                    break;
                }

            }

        }

        return statePathTree;
    }


    loadPage()
    {
        let statePathTree = [];
        let routePath = [];
        let routesOptions = this.routesCache;
        let parentComponent = null;

        if(this.currentUrl == '/'){
            routePath.push('/');
        }else{
            routePath = this.currentUrl.split('/');
        }

        statePathTree = this._processRouteLevel(routesOptions, routePath, statePathTree, 0);
        statePathTree.reverse();

        for (let stateIndex in statePathTree){

            let state = statePathTree[stateIndex];
            parentComponent = this._composeParent(stateIndex, state, parentComponent);

        }

    }

    _composeParent(url, state, parent)
    {
        let classPages = {};
        let urlName = !url ? 'root' : url;
        let componentName = 'page-'+urlName;
        let pageComponent;

        if( typeof state.views !== 'object'){
            classPages['default'] = state.views;
        }else{
            classPages = state.views;
        }

        for(let viewSlotName in classPages)
        {
            let classPage = classPages[viewSlotName];
            register(componentName, classPage);
            pageComponent = ce(componentName);
            if(!parent)
            {
                this.shadowRoot.append(pageComponent);
            }else{
                pageComponent.setAttribute('slot',viewSlotName);
                parent.append(pageComponent)
            }
        }

        return pageComponent;

    }


});