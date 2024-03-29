// import library
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const Express = require("express");
const app = Express();
const port = process.env.PORT | 3503;
const patientRouter = require("./router/patient");
const practitionerRouter = require("./router/practitioner");
const cors = require("cors");

// allows restricted resources on a web page to
// be requested from another domain outside the domain
app.use(cors());
// use to convert all object to json
app.use(Express.json());
// add router to middleware
app.use("/api/patient", patientRouter);
app.use("/api/practitioner", practitionerRouter);

// starting server
app.listen(port, () => {
  console.log("Server starting at port " + port);
});
