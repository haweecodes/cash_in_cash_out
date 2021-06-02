import { CashIn } from "../src/CashIn.js";

test("Gives the commission of 200 EURO on CASH IN ", () => {
  const input = {
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: {
      amount: 200.0,
      currency: "EUR",
    },
  };

  expect(CashIn(input)).toBe("0.06");
});

test("Throws error if the currency is not in EUR", () => {
  const input = {
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_in",
    operation: {
      amount: 200.0,
      currency: "EUROS",
    },
  };

  expect(CashIn(input)).toBe("CURRENCY NOT SUPPORTED");
});

test("Throws error if the transaction type is not CASH IN", () => {
  const input = {
    date: "2016-01-05",
    user_id: 1,
    user_type: "natural",
    type: "cash_out",
    operation: {
      amount: 200.0,
      currency: "EUR",
    },
  };

  expect(CashIn(input)).toBe("CASH IN ONLY");
});
