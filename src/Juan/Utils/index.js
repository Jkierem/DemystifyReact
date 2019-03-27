export const TEXT_NODE = "TEXT_NODE";
const customProps = ["className"];

const getEventName = (name) => name.slice(2).toLowerCase();
const isEventProp = (name) => name.startsWith("on");
const isCustomProp = (name) => customProps.includes(name);
const isCommonProp = (name) => !isEventProp(name) && !isCustomProp(name);
const getEventNameTuple = (name) => [getEventName(name) , name];

export const zip = ( a, b ) => {
    if( a.length == 0 || b.length == 0 ){
        return []
    }
    const [aHead, ...aTail] = a;
    const [bHead, ...bTail] = b;
    return [ [aHead , bHead] , ...zip(aTail,bTail) ];
}

export const setProps = ( domNode , props ) => {
    Object.keys(props)
        .filter(isCommonProp)
        .forEach( key => {
            domNode.setAttribute(key , props[key]);
        })
}

const setCustomProp = (domNode, key , value) => {
    if( key == "className" ){
        domNode.setAttribute("class",value);
    }
}

export const setCustomProps = ( domNode , props ) => {
    Object.keys(props)
        .filter(isCustomProp)
        .forEach((key) => setCustomProp( domNode , key , props[key]))
}

export const setEvents = ( domNode , props ) => {
    Object.keys(props)
        .filter(isEventProp)
        .map(getEventNameTuple)
        .forEach( ([event , key]) => domNode.addEventListener(event,props[key]) )
}


export const removeProps = (domNode , keys) => {
  keys
    .filter(isCommonProp)
    .forEach( key => {
        domNode.removeAttribute(key);
    })
}

const removeCustomProp = (domNode , key) => {
  if( key == "className" ){
      domNode.removeAttribute("class");
  }
}

export const removeCustomProps = (domNode,keys) => {
    keys
      .filter(isCustomProp)
      .forEach((key) => removeCustomProp(domNode,key))
}

export const removeEvents = ( domNode , props ) => {
  Object.keys(props)
      .filter(isEventProp)
      .map(getEventNameTuple)
      .forEach( ([event , key]) => domNode.removeEventListener(event,props[key]) )
}
