const path = require("path");
const result = require("dotenv").config({ path: path.resolve("./.env") });
const amazon = require("amazon-product-api");

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
