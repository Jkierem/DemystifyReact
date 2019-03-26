import { createElement , updateElement , createDomElement } from './Dom';
import { inject } from './Inject'
const Juan = {
    createElement,
    updateElement,
    render(vnode,domNode){
      const element = createDomElement(vnode);
      inject(domNode,element);
    }
}

export default Juan;
