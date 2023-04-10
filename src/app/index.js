require("dotenv").config();
const express = require("express");
const router = require("./routers/index");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`APP STARTED AT ${PORT}`);
});

module.exports = app;
