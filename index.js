const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const port = 3001;
const hostname = "localhost";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("public", express.static(path.join(__dirname, "/public")));

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//   /users/register
app.use("/users", require("./routes/user"));

app.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
  db.connect((err) => {
    if (err) {
      console.log("Database error:" + err);
    } else {
      console.log("DB connected");
    }
  });
});
