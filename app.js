const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const { mongoConnect } = require("./loaders/dbConnector");

const app = express();

//Adding Swagger Definition
var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Test-Project RESTful API described with Swagger"
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
        description:
          "Please enter into field the word 'Bearer' following by space and JWT"
      }
    }
  },
  securityDefinitions: {
    auth: {
      type: "bearer"
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  host: "localhost:3000",
  basePath: "/"
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/*.js"]
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

//Read Config Values From the Config files
const PORT = config.get("System.Port");
const databaseServer = config.get("DBConfig.ConnectionString");
const database = config.get("DBConfig.Database");
const connectionString = `${databaseServer}/${database}`;

//Connect To the Database
mongoConnect(connectionString);

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());

//Server Swagger
app.get("/swagger.json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

//Bind The Incoming Http Requests to the Respective Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}....`);
});
