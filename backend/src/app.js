const express = require("express");
const cors = require("cors");

const brewRoutes = require("./routes/brewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/brews", brewRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;