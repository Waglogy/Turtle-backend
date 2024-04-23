const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log("Databese connected");
    console.log(`Connection Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB");
  }
};

module.exports = { connectDb };
