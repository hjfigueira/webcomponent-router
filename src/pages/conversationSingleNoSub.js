import {ce} from "../assets/helpers.js";
import {BasePage} from "../assets/helpers.js";

export default class ConversationSingleNoSub extends BasePage{

    render()
    {
        let content = ce('a');
        content.innerText = 'NO SUB Sub #1';
        content.setAttribute("href","#/");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

    }

}