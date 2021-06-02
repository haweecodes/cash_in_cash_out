import { CommissionCalc, SupportedCurrency } from "../helper.js";

const cashInFee = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: "EUR",
  },
};


/**
 * CashIn() returns commission fee amount
 * param is a transaction object
 */
const CashIn = (transaction) => {
  if (transaction.type !== "cash_in") return "CASH IN ONLY";
  if (!SupportedCurrency.includes(transaction.operation.currency))
    return "CURRENCY NOT SUPPORTED";

  let commissionFee = CommissionCalc(
    transaction.operation.amount,
    cashInFee.percents
  );

  if (commissionFee > cashInFee.max.amount)
    return Number.parseFloat(cashInFee.max.amount).toFixed(2);

  return Number.parseFloat(commissionFee).toFixed(2);
};

export { CashIn };
