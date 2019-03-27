import Juan from './Juan'

const App = (props) => {
  return (
    <div id="someId">
      <div>{props.value}</div>
      <div>B</div>
      {props.children}
    </div>
  )
}

class SomeComponent extends Juan.Component {
  constructor(props){
    super(props);
    this.state = { count: 0 }
  }

  handleClick = () => {
    this.setState({ count : this.state.count + 1})
  }

  render(){
    const { count } = this.state
    return (
      <App value={this.props.value}>
        <div>{`${count}`}</div>
        <button onClick={this.handleClick}>Click me</button>
      </App>
    )
  }
}


Juan.render(
  <SomeComponent value={"F"}/>,
  document.getElementById("root")
);
