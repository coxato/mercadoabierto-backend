const store = require("@store/dummyDB");
const controller = require("./controller");

module.exports = controller(store);