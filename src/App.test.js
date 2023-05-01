const { App } = require("./App");

test("Project details are correct", () => {
  expect(App).toMatchInLineSnapshot();
 });

 
 module.exports = { App };