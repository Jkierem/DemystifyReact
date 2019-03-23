const attachObeserver = ( node ) => {

}

const inject = (domNode , vNode) => {
    domNode.appendChild(vNode);
    return domNode
}

const injectAll = ( domNode , elements ) => {
    elements.forEach(e => inject(domNode, e) );
    return domeNode 
}

const injectToDom = ( domNode , element ) => {
    attachObeserver( node );
    inject( domNode , node );
}