const createVirtualNode = ( type , props={} , ...children ) => {
    return {
        type, 
        props, 
        children
    }
}