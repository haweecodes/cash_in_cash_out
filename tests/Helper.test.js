import { CashIn } from "../src/CashIn.js";
import { CashOut } from "../src/CashOut";
import { CommissionCalc, CheckOperationType } from "../helper";

test("Commission Calculation correct", () => {
  expect(CommissionCalc(100, 10)).toBe(10);
});

test("Type Check for operation type", () => {
  expect(CheckOperationType("cash_in")).toBe(CashIn);

  expect(CheckOperationType("cash_out")).toBe(CashOut);

  expect(CheckOperationType("cash_outs")).toBe(null);
});
