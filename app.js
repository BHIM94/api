const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const app = express();
const { mongoConnect } = require("./loaders/dbConnector");

//Read Config Values From the Config files
const PORT = config.get("System.Port");
const databaseServer = config.get("DBConfig.ConnectionString");
const database = config.get("DBConfig.Database");
const connectionString = `${databaseServer}/${database}`;

//Connect To the Database
mongoConnect(connectionString);

app.use(morgan("dev"));
app.use(express.json());

//Bind The Incoming Http Requests to the Respective Routes
app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}....`);
});
