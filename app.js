const dotenv = require("dotenv");
const express = require("express");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());

dotenv.config({ path: "./config.env" });

require("./db/connec");

// router links
app.use(require('./router/auth'))

app.use(express.static("build"))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


app.listen(5000, () => {
    console.log(`app is running 5000`);
})




