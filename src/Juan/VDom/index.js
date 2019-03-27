import { TEXT_NODE } from '../Utils'

const isConstructor = (funk) => {
    try {
        new funk();
    } catch (err) {
        if (err.message.indexOf('is not a constructor') >= 0) {
          return false;
        }
    }
    return true;
}

const toTextNodeIfString = x => typeof x == "string" ? { type: TEXT_NODE , props:{ __value__: x } , children:[] } : x

export const createElement = (type, props, ...children) =>{
    props = !props ? {} : props ;
    if( typeof type == "function" ){
        const trueProps = { ...props , children:children.flat()}
        if( isConstructor(type) ){
            return new type(trueProps);
        }
        return type(trueProps);
    } else {
        return {
            type,
            props,
            children: children.map(toTextNodeIfString).flat(),
        }
    }
}
