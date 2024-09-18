const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongo DB connected!");
  });
};

connect();
