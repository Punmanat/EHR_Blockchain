if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
const Express = require("express");
const app = Express();
const port = process.env.PORT | 4000;
const encounterRouter = require("./router/encounter");
const observationRouter = require("./router/observation");
const allergyIntoleranceRouter = require("./router/allergyIntolerance");
// const practitionerRouter = require("./router/practitioner");
const cors = require("cors");

// use to convert all object to json
app.use(Express.json());
// add router to middleware
app.use("/api/health/encounter", encounterRouter);
app.use("/api/health/observation", observationRouter);
app.use("/api/health/allergyIntolerance", allergyIntoleranceRouter);

// allows restricted resources on a web page to
// be requested from another domain outside the domain
app.use(cors());

// starting server
app.listen(port, () => {
  console.log("Server starting at port " + port);
});