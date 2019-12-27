const mongoose = require("mongoose");

async function mongoConnect(connectionString) {
  try {
    await mongoose.connect(ConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.log(err);
  }
  return mongoose;
}
module.export = { mongoConnect };
