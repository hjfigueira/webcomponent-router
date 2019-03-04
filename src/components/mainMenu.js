import {ce} from "../assets/helpers.js";
import component from "../assets/helpers.js";

component('app-menu', class extends HTMLElement{

    constructor()
    {
        super();
        this.attachShadow({mode : "open"});
    }

    connectedCallback()
    {

        let mainMenu = ce('ul');
        mainMenu.append(ce('li'));
        mainMenu.append(ce('li'));
        mainMenu.append(ce('li'));
        mainMenu.append(ce('li'));
        mainMenu.append(ce('li'));

        this.shadowRoot.append(mainMenu);
    }

});