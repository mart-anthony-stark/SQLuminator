const { Model } = require("./dist/lib/es5");
const { SQL } = require("./dist/lib/es5");

SQL.createConnection("mysql", {
  user: "root",
  host: "localhost",
  password: "",
  database: "orm",
  port: 3306,
});
const User = new Model("user");
const server = async () => {
  // const newUser = await User.save({ name: "mart" });
  // console.log({ newUser });
  const users = await User.find({ lean: true });
  console.log(users);
};
server();
