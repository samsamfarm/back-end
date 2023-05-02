require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");

const port = process.env.APP_PORT;

const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connectiong to database", err);
  } else {
    console.log("Connectd to Database!");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/TEST", (req, res) => {
  connection.query("SELECT * FROM Users", (error, result) => {
    if (error) {
      console.error("디비 쿼리 에러", error);
      res.status(500).send("삐~~ 에러");
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

const articleRouter = require("./routes/article");

app.get("article", articleRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
