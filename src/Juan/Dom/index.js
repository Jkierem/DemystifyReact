import {
  zip,
  isTextNode,
  hasChanged,
  getChildAt,
  getChildFrom,
  removeFrom,
  injectInto,
  replaceIn,
  mapKeys
} from './utility';

export const updateElement = (parent  , newNode , oldNode, index=0) => {
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

export const createElement = (type, props, ...children) =>{
  return {
    type,
    props,
    children
  }
}

export updateProps = ( domNode , oldProps , newProps ) => {
  const setProp = setAttributeOf(domNode);
  const removeProp = (key) => setProp(key,undefined);
  const addNewProp = (key) => setProp(key,prop(key)(newProps));
  
  keysOf(oldProps)
      .filter(isCommonProp)
      .map(removeProp)

  keysOf(newProps)
      .filter(isCommonProp)
      .map(addNewProp)
}

export const createDomElement = (vnode) => {
    if( isTextNode(vnode) ){
        return document.createTextNode(vnode);
    }
    const element = document.createElement(vnode.type);
    vnode.children
        .map(createDomElement)
        .forEach(injectInto(element));
    return element;
}
