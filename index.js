require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* Create express app */
const app = express();

/* Body parser */
app.use(express.json({limit: '25mb'}));

/* Enable CORS */
app.use(cors());

/* MongoDB connection */
mongoose.connect(process.env.MONGOURI, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

/* Routes */
const userRouter = require("./routes/user");
const auctionRouter = require("./routes/auction");
const coinRouter = require("./routes/coin");

app.use("/api/user", userRouter);
app.use("/api/auction", auctionRouter);
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
