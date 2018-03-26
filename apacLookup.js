const dotenv = require("dotenv");

let result = {};
if (process.env.NODE_ENV !== "production") {
  result = dotenv.config();
}

const amazon = require("amazon-product-api");
const request = require("request");
const throttledRequest = require("throttled-request")(request);

if (result.error) {
  throw result.error;
}

const client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET,
});

function itemSearch({ keywords = "S.H. Figuarts, Bandai Tamashii Nations, Action Figure", searchIndex = "Toys", responseGroup = "Images,ItemAttributes,OfferFull" } = {}) {
  return client.itemSearch({
    keywords,
    searchIndex,
    responseGroup,
  }).then(data => {
    console.log(JSON.stringify(data, null, 2));
    return data;
  }).catch(err => {
    console.log(err);
  });
}

// const itemSearchTotalPages = ({ keywords = "S.H. Figuarts, Dragon Ball", searchIndex = "Toys", responseGroup = "Images,ItemAttributes,OfferFull" } = {}) => {
//   client.itemSearch({
//     keywords,
//     searchIndex,
//     responseGroup,
//   }, (err, results, response) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log(results);
//       // console.log("Total Pages: ", response[0].TotalPages);
//       const allPages = response[0].TotalPages;

//       console.log("All Pages: ", allPages);
//     }
//   });
// };
// function getAllPages() {
//   return itemSearchTotalPages();
// }

// getAllPages();


function itemLookup() {
  return client.itemLookup({
    request: throttledRequest.configure({
      requests: 1,
      milliseconds: 1000,
    }),
    idType: "ASIN",
    itemId: "B078K3YWN3",
    responseGroup: "Images,ItemAttributes",
  }).then(results =>
    // console.log(JSON.stringify(results, null, 2));
    results,
  ).catch(err => {
    console.log(err);
  });
}

module.exports = {
  itemLookup, itemSearch,
};
