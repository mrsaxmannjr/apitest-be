const path = require("path");
const result = require("dotenv").config({ path: path.resolve("../.env") });
const test = require("tape");
const { itemSearch } = require("../apacLookup");

test("itemLookup", t => {
  t.plan(2);
  itemSearch({})
    .then(results => {
      t.ok(results);
      t.ok(results.length > 0);
    }).catch(t.end);
  // t.equal(typeof Date.now, "function");
  // const start = Date.now();

  // setTimeout(() => {
  //   t.equal(Date.now() - start, 100);
  // }, 100);
});
