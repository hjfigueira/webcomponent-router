import routes from '../config/routes.js';
import register, {ce} from "../assets/helpers.js";
import MenuTemplate from '../pages/menuTemplate.js';
import ConversationList from '../pages/conversationList.js';

/**
 * Classe para criação de um router simples baseado em estados da aplicação e composição de url
 * @constructor
 */
let Router = function()
{
    this.states = [];
};

Router.prototype.addState = function(jsonState)
{
    this.states.push(jsonState);
};


Router.prototype.init = function(){





};



register('app-main',class extends HTMLElement
{
    constructor()
    {
        super();

        //Attributes
        this.routesCache = [];
        this.currentUrl = '/';

        this.route();
    }

    clear()
    {
        this.innerText = '';
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
                currentStep = currentStep.concat(fragment);


                if(state === currentStep)
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

    _processRouteFragment()
    {

    }

    loadPage()
    {
        let statePathTree = [];
        let routePath = [];

        if(this.currentUrl == '/'){
            routePath.push('/');
        }else{
            routePath = this.currentUrl.split('/');
        }

        let routesOptions = this.routesCache;

        statePathTree = this._processRouteLevel(routesOptions, routePath, statePathTree, 0);
        statePathTree.reverse();
        console.log(statePathTree);

        for (let state in statePathTree){

            console.log(statePathTree[state]);

        }

        // let ClassName = MenuTemplate;
        // let PageIdentifier = 'page-' + this.currentUrl.replace('/','');

        register('page-main', MenuTemplate);
        let template = ce('page-main');
        this.append(template);

        register('page-conversation', ConversationList);
        let conversationList = ce('page-conversation');
        conversationList.slot = "mainPage";
        let slot = template.querySelector('slot[name="template"]');

        slot.appendChild(conversationList);

    }

    loadUrls(){

        this.routesCache = routes;

    }

    loadCurrentUrl(){

        let url = window.location.hash.replace('#','');
        if(!url){ url = '/';}
        this.currentUrl = url;

    }

    route(){
        this.clear();
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

});