import {ce} from "../assets/helpers.js";
import {BasePage} from "../assets/helpers.js";

export default class ConversationSub extends BasePage{

    render()
    {
        let content = ce('span');
        content.innerText = 'Sub #1';
        // content.setAttribute("href","#/conversation/?id=1");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

    }

}