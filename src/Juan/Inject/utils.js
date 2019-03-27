export const TEXT_NODE = "TEXT_NODE";
const customProps = ["className"];
const getEventName = (name) => name.slice(2).toLowerCase();
const isEventProp = (name) => name.startsWith("on");
const isCustomProp = (name) => customProps.includes(name);
const isCommonProp = (name) => !isEventProp(name) && !isCustomProp(name);
const getEventNameTuple = (name) => [getEventName(name) , name];

export const setProps = ( domNode , props ) => {
    Object.keys(props)
        .filter(isCommonProp)
        .forEach( key => {
            domNode.setAttribute(key , props[key]);
        })
}

export const setCustomProp = (domNode, key , value) => {
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