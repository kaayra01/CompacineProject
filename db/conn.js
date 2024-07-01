const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect("mongodb://127.0.0.1:27017/compacine");
    console.log("Banco de dados conectado com sucesso");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
