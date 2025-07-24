import express from "express";
import ansiColors from "ansi-colors";
import bodyParser from "body-parser";

import connectDB from "./connectDB";
import artController from "./control/art";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/art", artController);

connectDB()
  .then(() => {
    console.log(ansiColors.green("Database connected successfully✅"));
    app.listen(3000, () => {
      console.log(ansiColors.green("Server is running on port 3000✅"));
    });
  })
  .catch((err) => {
    console.log(ansiColors.red("Database connection failed❌"), err);
  });
