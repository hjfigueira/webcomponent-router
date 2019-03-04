
export default function register(tagName, className, extraConfig)
{
    tagName = tagName.replace(new RegExp('[^a-z|A-Z|0-9|\-]','g'),'');
    if(!window.customElements.get(tagName))
    {
        console.log('registering element '+tagName);
        window.customElements.define(tagName, className, extraConfig);
    }
    return tagName;
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

export function ce(tag, config)
{

    let el = document.createElement(tag);
    BaseElement(el,config);
    return el;
}

function BaseElement(el, config){

    el.structChildren = [];
    el.references = [];
    el.selfReference = null;
    el.config = config;

    el.parse = function()
    {
        let classList = [];

        if(!!this.config)
        {
            let elements = this.config.split('.');
            let firstChar = elements[0].charAt(0);
            classList = elements.splice(1);
            this.classList = classList;

            if( firstChar === '#')
            {
                this.id = elements[0].substr(1);
            }
        }

        return this;
    };

    el.html = function(...children)
    {
        this.structChildren = this.structChildren.concat(children);

        for(let index in this.structChildren)
        {
            let item = this.structChildren[index].clone();

            if(!!item.selfReference)
            {
                this.references[item.selfReference] = item;
            }

            this.append(item);
        }

        return this;
    };

    el.text = function(string)
    {
        this.innerText = string;
        return this;
    };

    el.var = function(identifier)
    {
        this.selfReference = identifier;
        return this;
    };

    el.ref = function(identifier)
    {
        if(this.references.hasOwnProperty(identifier))
        {
            return this.references[identifier];
        }
        else{
            return false
        }
    };

    el.clone = function()
    {
        let clone = this.cloneNode(true);

        BaseElement(clone,this.config);

        return clone
    };

    el.parse();
}

export function block(tag, config)
{
    return new BlockBuilder(tag, config);
}

class BaseBuilder {

    constructor(tag, idClass)
    {
        this.node = this.parse(tag, idClass);
    }

    parse(tag, idClass)
    {
        let node = document.createElement(tag);
        let classList = [];

        if(!!idClass)
        {
            let elements = idClass.split('.');
            let firstChar = elements[0].charAt(0);
            classList = elements.splice(1);
            node.classList = classList;

            if( firstChar === '#')
            {
                node.id = elements[0];
            }
        }

        return node;
    }

}

class BlockBuilder extends BaseBuilder{

    constructor(tag, idClass)
    {
        super(tag, idClass);
        this.children = [];
        this.variables = {};

    }

    html(...children)
    {
        this.children = this.children.concat(children);
        return this;
    }

    appendChildren()
    {
        for(let childIndex in this.children)
        {
            let child = this.children[childIndex];

            if(child instanceof ElementBuilder)
            {
                // child.appendChildren();
                this.node.append(child.node);
            }
            else{
                this.node.append(child)
            }

        }

        return this.node;
    }

    render()
    {
        this.appendChildren();
        return this.node;
    }

    loadReferences()
    {
        for(let childIndex in this.children)
        {
            if(!!this.children[childIndex].reference)
            {
                let refString = this.children[childIndex].reference;
                if(this.references.hasOwnProperty(refString))
                {
                    if(!this.references[refString].push)
                    {
                        this.reference[refString] = [this.reference[refString]];
                    }

                    this.references[refString].push(this.children[childIndex]);

                }else{
                    this.references[refString] = this.children[childIndex];
                }
            }
        }
        return this;
    }
}

class ElementBuilder extends HTMLElement{


    var(reference)
    {
        this.reference = reference;
        return this;
    }

    text(string)
    {
        this.node.innerText = string;
        return this;
    }

    toString()
    {
        return this.node;
    }

}

