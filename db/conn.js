const mongoose = require("mongoose");
const { MONGODB_URL } = process.env

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.yivzir7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("DB connected!!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
