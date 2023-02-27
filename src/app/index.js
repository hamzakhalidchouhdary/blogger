const express = require("express");

const PORT = 8700;

const app = express();

app.listen(PORT, () => {
  console.log(`APP STARTED AT ${PORT}`);
});

module.exports = app;