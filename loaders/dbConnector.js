const mongoose = require("mongoose");

async function ConnectToMongoDb(connectionString) {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected To MongoDB");
  } catch (err) {
    console.log(err);
  }
  return mongoose;
}
async function mongoConnect(connectionString) {
  await ConnectToMongoDb(connectionString);
}
module.exports = { mongoConnect };
