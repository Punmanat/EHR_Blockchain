// import library
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Express = require("express");
const app = Express();
const port = process.env.PORT | 3503;
const userRouter = require("./router/user");
const authRouter = require("./router/auth");
const transactionRouter = require("./router/transaction");
const cors = require("cors");
require("./db/db.config");
// use to convert all object to json
app.use(Express.json());
app.use(cors());
// add router to middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/transaction", transactionRouter);

// allows restricted resources on a web page to
// be requested from another domain outside the domain

// starting server
app.listen(port, () => {
  console.log("Server starting at port " + port);
});
