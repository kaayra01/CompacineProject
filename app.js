const express = require("express");
const cors = require("cors");
const conn = require("./db/conn");
const routes = require("./routes/router");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

conn();

app.use("/api", routes);

app.listen(PORT, function () {
  console.log('Servidor rodando na porta %s ', PORT);
});
