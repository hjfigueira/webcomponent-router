import {ce} from "../assets/helpers.js";
import {BasePage} from "../assets/helpers.js";
import ConversationSub from "./conversationSub.js";

export default class ConversationSingle extends BasePage{

    render()
    {
        let nome = ce('a');
        nome.innerText = 'Conversation Single';
        nome.setAttribute("href","#/");
        nome.style.display = 'block';

        this.append(nome);

        let inner = ce('a');
        inner.innerText = 'Conversation Inner';
        inner.setAttribute("href","#/conversation/inner");
        inner.style.display = 'block';

        this.append(inner);

        firebase.database()
            .ref('/users/1112')
            .once('value')
            .then((data) => {

                let dados = data.val();

                let username = ce('div');
                username.innerText = dados.username;
                this.append(username);

                let email = ce('div');
                email.innerText = dados.email;
                this.append(email);

                let wawa = ce('div');
                wawa.innerText = dados.wawa;
                this.append(wawa);

            });


        let innerRouter = ce('app-router');
        innerRouter.id = 'InnerRouter';
        innerRouter.states = {
            '/conversation/inner' : ConversationSub
        };

        this.append(innerRouter);
    }

}