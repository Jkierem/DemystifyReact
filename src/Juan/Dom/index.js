
const isConstructable = (funk) => {
    try {
        new funk();
    } catch (err) {
        if (err.message.indexOf('is not a constructor') >= 0) {
          return false;
        }
    }
    return true;
}

export const createElement = (type, props, ...children) =>{
    props = !props ? {} : props ;
    console.log( typeof type );
    if( typeof type == "function" ){
        if( isConstructable(type) ){
            return new type();
        }
        return type();
    } else {
        return {
            type,
            props,
            children: children.map( x => typeof x == "string" ? { type: TEXT_NODE , props:{} , children:[x] } : x ),
        }
    }
}
