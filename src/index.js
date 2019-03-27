import Juan from './Juan'

const App = () => {
  return (
    <div id="someId">
      <div>A</div>
      <div>B</div>
    </div>
  )
}

class Bpp extends Juan.Component {
  render(){
    return <App></App>
  }
}


Juan.render( 
  <Bpp/>, 
  document.getElementById("root") 
);