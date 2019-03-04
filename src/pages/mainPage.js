import {ce} from "../assets/helpers.js";
import {BasePage} from "../assets/helpers.js";
import "../components/mainMenu.js"

export default class MainPage extends BasePage{

    render()
    {
        let mainContainer = ce('main');
        mainContainer.innerText = 'Texto do Template';

        let menuContainer = ce('app-menu');
        mainContainer.append(menuContainer);

        let mainPage = ce('slot');
        mainPage.setAttribute('name','mainPage');
        mainPage.append(this.renderPage());
        mainContainer.append(mainPage);

        this.append(mainContainer);
    }

    renderPage()
    {
        let div = ce('div');

        let span = ce('span');
        span.innerText = 'HI! Im a home page';
        div.append(span);

        let link = ce('a');
        link.innerHTML = 'Listagem';
        link.setAttribute('href','#/conversations');
        div.append(link);

        return div;
    }

}