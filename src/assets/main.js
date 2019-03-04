import register, {ce, block} from "./helpers.js";

register('router-container',class extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:"open"});

        this.currentUrl = '';
        this.routes = {};

        this.loadCurrentUrl();
        this.loadPage();

        window.onhashchange = () => {
            this.clear();
            this.loadCurrentUrl();
            this.loadPage();
        }
    }

    state(url, config)
    {
        this.states[url] = config;
        return this;
    }

    clear()
    {
        this.shadowRoot.innerHTML = '';
    }

    loadCurrentUrl()
    {
        let url = window.location.hash.replace('#','');
        if(!url){ url = '/';}
        this.currentUrl = url;
    }

    loadPage()
    {
        let itens = [
            { titulo : 'Título 1', descricao: 'Descrição 1' },
            { titulo : 'Título 2', descricao: 'Descrição 2' },
            { titulo : 'Título 3', descricao: 'Descrição 3' },
            { titulo : 'Título 4', descricao: 'Descrição 4' },
            { titulo : 'Título 5', descricao: 'Descrição 5' },
            { titulo : 'Título 6', descricao: 'Descrição 6' },
            { titulo : 'Título 7', descricao: 'Descrição 7' }
        ];

        var singleTest = ce('h1','.test').text('Simple Teste');
        this.shadowRoot.append(singleTest);

        var container = ce('div','.box')
            .html(
                ce('h1','.title').text('LIST HEADER'),
                ce('ul','#list-container').var('list-itens'),
                ce('div','.footer').text('LIST FOOTER')
            );

        this.shadowRoot.append(container);

        container.ref('list-itens').append(
            ce('p').text('Texto do container, pós bind')
        );

        let listItem = ce('li', '.item-card')
            .html(
                ce('span','.item-titulo').text('Jooj').var('titulo'),
                ce('span','.item-descricao').text('Descrição').var('descricao'),
            );

        this.shadowRoot.append(listItem);


        for(let index in itens)
        {
            let element = itens[index];
            let inner = listItem.clone();

            // inner.ref('titulo').text(element.titulo);
            // inner.ref('descricao').innerText = element.descricao;

            console.log(element.titulo);
            container.ref('list-itens').html(inner);
        }

        this.shadowRoot.append(container);
    }

});