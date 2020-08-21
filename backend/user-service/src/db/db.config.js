// import lib
const mongoose = require("mongoose")
// url for production mongodb
url_prod = ""
// url for development mongodb
url_dev = "mongodb://localhost:27017/user-service"
//connect mongodb
mongoose
  .connect(url_dev, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.log("Fail to connect database");
  });
