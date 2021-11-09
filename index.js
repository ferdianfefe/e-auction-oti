require("dotenv").config();

const express = require("express");
const cors = require("cors");

/* Create express app */
const app = express();

/* Body parser */
app.use(express.json());

/* Enable CORS */
app.use(cors());

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
