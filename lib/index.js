import Juan from './Juan';

const App = () => {
  return Juan.createElement("div", {
    id: "someId"
  }, Juan.createElement("div", null, "A"), Juan.createElement("div", null, "B"));
};

console.log(Juan.createElement(App, null));
Juan.render(Juan.createElement(App, null), document.getElementById("root"));