
cosnt areNodeTypesEqual = (n1,n2) => n1.type === n2.type;
const isSameType = (t1,t2) => typeof t1 === typeof t2;
const hasChanged = (n1,n2) => {
    return !isSameType(n1,n2) ||
           !areNodeTypesEqual(n1,n2) ||
           (isTextNode(n1) && n1 !== n2 )
}

const removeFrom = (domNode) => (vIndex) => {
    domNode.removeChild(
        domNode.childNodes[vIndex]
    );
}

const injectInto = (domNode) => (vnode) => {
    domNode.appendChild(vnode);
}

const updateElement = (parent  , newNode , oldNode, index=0) => {
    if( !oldNode ){
        injectInto(parent)(
            createElement(newNode)
        );
    } else if( !newNode ){
        removeFrom(parent)(index)
    } 
}

const createElement = (vnode) => {
    if( typeof vnode === "string" ){
        return document.createTextNode(vnode);
    }
    const element = document.createElement(vnode.type);
    vnode.children
        .map(createElement)
        .forEach(injectInto(element));
    return element;
}