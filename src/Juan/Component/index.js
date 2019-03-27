class Component {
    constructor(props){
        this.props = props || {}
        this.state = {};
    }

    setState( newState , callback=()=>{} ){
        this.state = Object.assign(this.state , newState)
        callback(this.state);
    }

    render(){}
}

export default Component;