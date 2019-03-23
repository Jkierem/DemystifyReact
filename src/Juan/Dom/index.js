const zip = ( a, b ) => {
    if( a.length == 0 || b.length == 0 ){
        return []
    }
    const [aHead, ...aTail] = a;
    const [bHead, ...bTail] = b;
    return [ [aHead , bHead] , ...zip(aTail,bTail) ];
}
const isTextNode = (node) => typeof node === "string";
const areNodeTypesEqual = (n1,n2) => n1.type === n2.type;
const isSameType = (t1,t2) => typeof t1 === typeof t2;
const hasChanged = (n1,n2) => {
    return !isSameType(n1,n2) ||
           !areNodeTypesEqual(n1,n2) ||
           (isTextNode(n1) && n1 !== n2 )
}
const getChildAt = (at) => (domNode) => domNode.childNodes[at];
const getChildFrom = (domNode) => (at) => getChildAt(at)(domNode);
const removeFrom = (domNode) => (vIndex) => { domNode.removeChild(getChildNodeFrom(domNode)(vIndex)); }
const injectInto = (domNode) => (vnode) => { domNode.appendChild(vnode); }
const replaceIn = (domNode) => (oldNode , newNode) => { domNode.replaceChild(newNode,oldNode) }

const updateElement = (parent  , newNode , oldNode, index=0) => {
    if( !oldNode ){
        injectInto(parent)(
            createElement(newNode)
        );
    } else if( !newNode ){
        removeFrom(parent)(index)
    } else if( hasChanged(newNode,oldNode) ){
        replaceIn(parent)( 
            getChildNodeFrom(parent)(index), 
            createElement(newNode)
        );
    } else if( !isTextNode(newNode) ){
        zip( 
            Array.from(newNode.children),
            Array.from(oldNode.children)
        ).map(
            ([newNode,oldNode],index) => {
                const getCurrentChild = getChildNodeAt(index);
                updateElement(
                    getCurrentChild(parent),
                    getCurrentChild(newNode),
                    getCurrentChild(oldNode),
                    index
                )
            }
        )
    }
}

const createElement = (vnode) => {
    if( isTextNode(vnode) ){
        return document.createTextNode(vnode);
    }
    const element = document.createElement(vnode.type);
    vnode.children
        .map(createElement)
        .forEach(injectInto(element));
    return element;
}