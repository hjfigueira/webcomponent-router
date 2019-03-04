import MainPage from "../pages/mainPage.js";
import AboutPage from "../pages/aboutPage.js";
import block from "../assets/helpers.js";
import ce from "../assets/helpers.js";

router('mainRouter')

    .state('/', {
        view: MainPage
    })

    .state('/about', {
        view: AboutPage
    });





let template = block('div','.box')
    .html(
        ce('h1','.title').text('Título da Listagem'),
        ce('ul','#list-container').var('list-itens'),
        ce('div','.footer').text('Rodapé da Listagem')
    );

let listItem = block('li', '.item-card')
    .html(
        ce('span','.item-titulo').var('titulo'),
        ce('span','.item-descricao').var('descricao'),
    );


for(let index in itens)
{
    let element = itens[index];

    let item = new listItem();
    item['titulo'].text(element.titulo);
    item['descricao'].text(element.descricao);

    template['list-itens'].append(item);

}