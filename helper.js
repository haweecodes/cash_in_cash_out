import { CashIn } from "./src/CashIn.js";
import { CashOut } from "./src/CashOut.js";

export const SupportedCurrency = ["EUR"];

/**
 * CommissionCalc() returns commission fee amount after calculating
 * params are amount to be commissioned and percentage to commission
 */
export const CommissionCalc = (amount, percent) => {
  return (amount * percent) / 100;
};

/**
 * Rounding() returns commission fee amount after rounding
 * params are amount to be rounded
 */
export const Rounding = (amount) => {
  return (Math.ceil(amount * 100) / 100).toFixed(2);
};

/**
 * CheckOperationType() returns the a funtion depending on transaction type
 * param is type of transaction
 */
export const CheckOperationType = (type) => {
  let cbFunc;

  switch (type) {
    case "cash_in":
      cbFunc = CashIn;
      break;
    case "cash_out":
      cbFunc = CashOut;
      break;
    default:
      cbFunc = null;
  }
  return cbFunc;
};
