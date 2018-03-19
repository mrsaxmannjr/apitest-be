const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const amazon = require("amazon-product-api");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
});

client.itemSearch({
  keywords: "S.H. Figuarts",
  searchIndex: "Toys",
  responseGroup: "ItemAttributes,Offers,Images",
}).then(results => {
  console.log(results, null, 2);
}).catch(err => {
  console.log(err);
});

// app.get("/amazon/:index", function* () {
//   this.body = yield client.itemSearch({
//     keywords: this.query.title,
//     searchIndex: this.params.index,
//     responseGroup: "Images",
//     // responseGroup: "ItemAttributes,Offers,Images",
//   });
// });

// client.itemLookup({
//   idType: "ASIN",
//   itemId: "B078K3YWN3",
// }).then(results => {
//   console.log(JSON.stringify(results, null, 2));
// }).catch(err => {
//   console.log(err);
// });


// app.get("/amazon/:index", function* () {
//   this.body = yield client.itemLookup({
//     idType: this.query.idType,
//     itemId: this.params.index,
//     responseGroup: "Images",
//     // responseGroup: "ItemAttributes,Offers,Images",
//   });
//   console.log(this.body);
// });


app.get("/", (req, res) => {
  res.send(
    client.itemSearch({
      keywords: "S.H. Figuarts",
      searchIndex: "Toys",
      responseGroup: "ItemAttributes,Offers,Images",
    }).then(results => results).catch(err => {
      console.log(err);
    }),
  );
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: req.app.get("env") === "development" ? err.stack : {},
  });
});

module.exports = app;
