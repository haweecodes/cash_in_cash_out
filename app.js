import { CheckOperationType } from "./helper.js";
import { readFile } from "fs";

readFile(process.argv.slice(2)[0], "utf8", function (err, data) {
  if (err) throw err;
  let transactionList = JSON.parse(data);
  transactionList.map((transaction) => {
    console.log(CheckOperationType(transaction.type)(transaction));
  });
});
