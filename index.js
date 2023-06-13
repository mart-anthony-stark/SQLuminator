const { Model } = require("./dist/lib/es5");
const { SQL } = require("./dist/lib/es5/core/sql");

const User = new Model("user");
const server = async () => {
  // const newUser = await User.save({ name: "mart" });
  // console.log({ newUser });
  // const users = await User.find();
  // console.log(users);
};
server();
