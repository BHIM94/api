const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const app = express();

//Read Config Values From the Config files
const PORT = config.get("System.Port");
const databaseServer = config.get("DBConfig.ConnectionString");
const database = config.get("DBConfig.Database");
const connectionString = `${databaseServer}/${database}`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected To the Database...");
  })
  .catch(err => console.log(err));

app.use(express.json());
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
