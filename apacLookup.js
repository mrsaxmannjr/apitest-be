const dotenv = require("dotenv");

let result = {};
if (process.env.NODE_ENV !== "production") {
  result = dotenv.config();
}

const amazon = require("amazon-product-api");
const request = require("request");
const throttledRequest = require("throttled-request")(request);

// throttledRequest.configure({
//   requests: 1,
//   milliseconds: 1000,
// });

if (result.error) {
  throw result.error;
}

// console.log("config result.parsed", result.parsed);

// console.log(process.env);

const client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
});

function itemSearch({ keywords = "S.H. Figuarts", searchIndex = "Toys", responseGroup = "Images" } = {}) {
  return client.itemSearch({
    request: throttledRequest.configure({
      requests: 1,
      milliseconds: 1000,
    }),
    keywords,
    searchIndex,
    responseGroup,
  }).then(results =>
    // console.log(results, null, 2);
    results,
  ).catch(err => {
    console.log(err);
  });
}

function itemLookup() {
  return client.itemLookup({
    request: throttledRequest.configure({
      requests: 1,
      milliseconds: 1000,
    }),
    idType: "ASIN",
    itemId: "B078K3YWN3",
  }).then(results =>
    // console.log(JSON.stringify(results, null, 2));
    results,
  ).catch(err => {
    console.log(err);
  });
}

module.exports = {
  itemSearch, itemLookup,
};
