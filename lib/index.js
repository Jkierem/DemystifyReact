const Juan = {
  Dom(type, props, ...children) {
    console.log(type);
    console.log(props);
  }

};
const a = Juan.Dom("div", {
  name: "test"
});