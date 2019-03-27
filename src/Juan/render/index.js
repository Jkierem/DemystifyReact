import Component from '../Component'
import {
  TEXT_NODE ,
  setCustomProps , setEvents ,  setProps,
  removeCustomProps , removeEvents, removeProps
} from '../Utils'

let rootInstance = null;

export const render = ( _node, domNode) => {
  const vnode = _node instanceof Component ? _node.render() : _node;
  const prevInstance = rootInstance;
  const nextInstance = reconcile(domNode, prevInstance, vnode);
  if( _node instanceof Component ){ 
    _node.setInstance(nextInstance) 
  }
  rootInstance = nextInstance;
}

const instantiate = (vnode) => {
  const { props={} , type , children } = vnode;
  if( type == TEXT_NODE ){
    return { dom: document.createTextNode(props.__value__) , vDom:vnode , childInstances:[] }
  }

  const element = document.createElement(type);

  updateProps( element , {} , props )

  const childInstances = children.map(instantiate)
  const childDoms = childInstances.map( c => c.dom);
  childDoms.forEach(x => element.appendChild(x) );

  return { dom: element , vDom: vnode , childInstances };
}

export const reconcile = ( parent , oldDom , newDom ) => {
  if( !oldDom ){
    const newInstance = instantiate(newDom);
    parent.appendChild(newInstance.dom);
    return newInstance
  } else if (oldDom.vDom.type === newDom.type) {
    updateProps(oldDom.dom, oldDom.vDom.props, newDom.props);
    oldDom.vDom = newDom;
    oldDom.childInstances = newDom.children.map(instantiate)
    while( oldDom.dom.firstChild ){
      oldDom.dom.removeChild(oldDom.dom.firstChild)
    }
    oldDom.childInstances.forEach( x => oldDom.dom.appendChild(x.dom) )
    return oldDom;
  } else {
    const newInstance = instantiate(newDom);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}

const updateProps = ( domNode , oldProps , newProps ) => {
  const removedProps = Object.keys(oldProps).filter( key => !newProps[key])

  removeProps(domNode , removedProps)
  removeCustomProps(domNode , removedProps)
  removeEvents(domNode , oldProps)

  setProps( domNode , newProps )
  setCustomProps( domNode , newProps )
  setEvents( domNode , newProps )
}
