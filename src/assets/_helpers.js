
export default function register(tagName, className, extraConfig)
{
    if(!window.customElements.get(tagName))
    {
        console.log('registering element '+tagName);
        window.customElements.define(tagName, className, extraConfig);
    }
}

// export function ce(tagName, config, content)
// {
//     let el = document.createElement(tagName);
//
//     if(!!config) {
//
//         if (!!config['class']) {
//             el.classList.add(...config['class'].split(' '))
//         }
//         if (!!config['id']) {
//             el.id = config['id'];
//         }
//         if (!!content) {
//
//             let element;
//
//             if (typeof content === "function") {
//                 element = content();
//             } else {
//                 element = content;
//             }
//
//             el.append(element);
//         }
//     }
//
//     return el;
// }

export function component(tagName, className, extraConfig)
{
    return register(tagName, className, extraConfig);
}

export function router(routerName, extraData){

    return document.getElementById(routerName);

}

export class BasePage extends HTMLElement
{

    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    append(params){
        this.shadowRoot.append(params);
    }

}

export function ce(tag, config){
    return new ElementConstructor(tag, config);
}

export function block(tag, config)
{
    return new ElementConstructor(tag, config);
}

class ElementConstructor {

    constructor(tag, idClass)
    {
        this.selfReference = null;
        this.childReferences = [];

        this.parse(tag, idClass);
    }

    parse(tag, idClass)
    {
        this.node = document.createElement(tag);

        let elements = idClass.split('.');
        let firstChar = elements[0].charAt(0);
        let id, classList;

        if( firstChar === '#')
        {
            id =  firstChar;
            this.node.id = id;
        }

        classList = elements.splice(1);
        this.node.classList = classList;
    }

    html(...children)
    {
        for(let childIndex in children)
        {
            let child = children[childIndex];
            if(!!child.selfReference){
                this.childReferences = function(){
                    this[child.selfReference] = child.node;
                }
            }
            this.node.append(child);
        }

        return this.references();
    }

    text(stringTexto)
    {
        return this;
    }

    var(reference)
    {
        this.selfReference = reference;
        return this;
    }

    references()
    {
        return this.childReferences;
    }

    render()
    {
        return this.node;
    }

}