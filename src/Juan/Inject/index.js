import Component from '../Component'
import { TEXT_NODE , setCustomProps , setEvents ,  setProps } from './utils'

export const inject = (domNode , vNode) => {
    domNode.appendChild(vNode);
    return domNode
}

const prerender = (vnode) => {
    let element = {}
    let markup = ""
    if( typeof vnode == "function" ){
      markup = vnode();
    }else if( vnode instanceof Component){
      markup = vnode.render();
    }else{
      markup = vnode;
    }
    return markup
}

let rootInstance = null;

export const render = ( _node, domNode) => {
  const vnode = prerender(_node)
  const prevInstance = rootInstance;
  const nextInstance = reconcile(domNode, prevInstance, vnode);
  rootInstance = nextInstance;
}

const instantiate = (vnode) => {
  if( vnode.type == TEXT_NODE ){
    return document.createTextNode(vnode.children.join(""))
  }

  const element = document.createElement(vnode.type);
  const { props } = vnode;

  setProps( element , props )
  setCustomProps( element , props )
  setEvents( element , props )

  const childInstances = vnode.children.map(createDomElement)
  const childDoms = childInstances.map( c => c.dom);
  childDoms.forEach(x => element.appendChild(x) );

  return { dom: element , vDom: vnode , childInstances };
}

const reconcile = ( parent , oldDom , newDom ) => {
  if( oldDom == null ){
    const newInstance = instantiate(newDom);
    parent.appendChild(newInstance.dom);
    return newInstance
  } else {
    const newInstance = instantiate(newDom);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}