import { CashOut } from "../src/CashOut";

test("Gives the commission of 200 EURO on CASH OUT for natural", () => {
  const input = {
    date: "2016-01-06",
    user_id: 2,
    user_type: "natural",
    type: "cash_out",
    operation: {
      amount: 30000.0,
      currency: "EUR",
    },
  };

  expect(CashOut(input)).toBe("87.00");
});

test("Gives the commission of 200 EURO on CASH OUT for juridical", () => {
  const input = {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: {
      amount: 300.0,
      currency: "EUR",
    },
  };

  expect(CashOut(input)).toBe("0.90");
});

test("Gives the commission of 100 EURO on CASH OUT for juridical", () => {
  const input = {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: {
      amount: 100.0,
      currency: "EUR",
    },
  };

  expect(CashOut(input)).toBe("0.50");
});

test("Throws error if the currency is not in EUR", () => {
  const input = {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_out",
    operation: {
      amount: 300.0,
      currency: "USD",
    },
  };

  expect(CashOut(input)).toBe("CURRENCY NOT SUPPORTED");
});

test("Throws error if the transaction type is not CASH OUT", () => {
  const input = {
    date: "2016-01-06",
    user_id: 2,
    user_type: "juridical",
    type: "cash_in",
    operation: {
      amount: 300.0,
      currency: "EUR",
    },
  };

  expect(CashOut(input)).toBe("CASH OUT ONLY");
});
