//utility
export const zip = ( a, b ) => {
    if( a.length == 0 || b.length == 0 ){
        return []
    }
    const [aHead, ...aTail] = a;
    const [bHead, ...bTail] = b;
    return [ [aHead , bHead] , ...zip(aTail,bTail) ];
}
export const prop = (attr) => (obj) => obj ? obj[attr] : undefined;
export const keysOf = (obj) => Object.keys(obj);

//Virtual node functions
export const isTextNode = (node) => typeof node === "string";
export const areNodeTypesEqual = (n1,n2) => n1.type === n2.type;
export const isSameType = (t1,t2) => typeof t1 === typeof t2;
export const hasChanged = (n1,n2) => {
    return !isSameType(n1,n2) ||
           !areNodeTypesEqual(n1,n2) ||
           (isTextNode(n1) && n1 !== n2 )
}

//DOM manipulation functions
export const getChildAt = (at) => (domNode) => domNode.childNodes[at];
export const getChildFrom = (domNode) => (at) => getChildAt(at)(domNode);
export const removeFrom = (domNode) => (vIndex) => { domNode.removeChild(getChildNodeFrom(domNode)(vIndex)); }
export const injectInto = (domNode) => (vnode) => { domNode.appendChild(vnode); }
export const replaceIn = (domNode) => (oldNode , newNode) => { domNode.replaceChild(newNode,oldNode) }
export const setAttributeOf = (domNode) => (attr, value) => { domNode.setAttribute(attr,value) }
