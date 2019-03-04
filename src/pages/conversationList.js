import {ce} from "../assets/helpers.js";
import {BasePage} from "../assets/helpers.js";

export default class ConversationList extends BasePage{

    render()
    {
        let content = ce('a');
        content.innerText = 'Conversation List #1';
        content.setAttribute("href","#/conversation/?id=1");
        content.style.display = 'block';
        this.shadowRoot.appendChild(content);

        let content2 = ce('a');
        content2.innerText = 'Conversation List #2 NO SUB';
        content2.setAttribute("href","#/conversation-nosub/?id=2");
        content2.style.display = 'block';
        this.shadowRoot.appendChild(content2);

        let content3 = ce('a');
        content3.innerText = 'Conversation List #3 SUB DIRECT';
        content3.setAttribute("href","#/conversation/inner/?id=3");
        content3.style.display = 'block';
        this.shadowRoot.appendChild(content3);

        let content4 = ce('a');
        content4.innerText = 'Conversation List #4';
        content4.setAttribute("href","#/conversation/?id=4");
        content4.style.display = 'block';
        this.shadowRoot.appendChild(content4);

        let content5 = ce('a');
        content5.innerText = 'Conversation List #5';
        content5.setAttribute("href","#/conversation/?id=5");
        content5.style.display = 'block';
        this.shadowRoot.appendChild(content5);

        let content6 = ce('a');
        content6.innerText = 'Conversation List #6';
        content6.setAttribute("href","#/conversation/?id=6");
        content6.style.display = 'block';
        this.shadowRoot.appendChild(content6);

        let content7 = ce('a');
        content7.innerText = 'Conversation List #7';
        content7.setAttribute("href","#/conversation/?id=7");
        content6.style.display = 'block';
        this.shadowRoot.appendChild(content7);

        let content8 = ce('a');
        content8.innerText = 'Conversation List #8';
        content8.setAttribute("href","#/conversation/?id=8");
        content8.style.display = 'block';
        this.shadowRoot.appendChild(content8);

    }

}