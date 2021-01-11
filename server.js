require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

// Set up express

const PORT = process.env.PORT || 9000;
const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // use cookie parser for secure httpOnly cookie
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // FOR_HEROKU - CLIENT_URL
    credentials: true, // set credentials true for secure httpOnly cookie
  })
);
// app.use(morgan("dev"));

// DB connection

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("MongoDB connected")
);

// API routes

app.get("/", (req, res) => res.send("Hello World"));

app.use("/auth", require("./routes/authRouter"));
app.use("/user", require("./routes/userRouter"));
app.use("/posts", require("./routes/postRouter"));
app.use("/quiz", require("./routes/quizRouter"));

// Catch all route, if requested route doesnt exist

app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// Start up server

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
