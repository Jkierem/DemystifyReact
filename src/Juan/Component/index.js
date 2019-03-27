import { reconcile } from '../render'

class Component {
    constructor(props){
        this.props = props || {}
        this.state = {};
        this._instance = null
    }

    setState = ( newState ) => {
        this.state = Object.assign({} , this.state , newState)
        this.setInstance( reconcile( this._instance.dom , this._instance , this.render() ) )
    }

    setInstance = ( _instance ) => {
       this._instance = _instance
    }

    render(){}
}

export default Component;
