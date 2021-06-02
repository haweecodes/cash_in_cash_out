import {
    CommissionCalc,
    SupportedCurrency
} from '../helper.js';
import moment from 'moment';

let userHistoryMapper = new Map();

const cashOutFee = {
    percents: 0.3,
    week_limit: {
        amount: 1000,
        currency: "EUR"
    }
};

/**
 * CashOut() returns the final commssion fee
 * param is a single transaction object
 */
const CashOut = (transaction) => {
    if (transaction.type !== 'cash_out') return 'CASH OUT ONLY';
    if (!SupportedCurrency.includes(transaction.operation.currency)) return 'CURRENCY NOT SUPPORTED';

    let fee = 0;
    switch (transaction.user_type) {
        case 'natural':
            fee = naturalCashout(transaction)
            break;
        case 'juridical':
            fee = legalCashout(transaction);
            break;
    }
    return fee;
};

/**
 * naturalCashout() returns the commssion fee for natural user type
 * param is a single transaction object
 */
const naturalCashout = (transaction) => {
    let dateFormat = new Date(transaction.date)
    let commissionFee = 0.00;
    let dayIndex = dateFormat.getDay();

    let userHistory = userHistoryMapper.get(transaction.user_id);
    //check if user has history
    if (userHistory) {
        const totalAmount = userHistory.amount + transaction.operation.amount;
        if ((totalAmount) > cashOutFee.week_limit.amount) {
            //if the amount exceeds the total
            commissionFee = CommissionCalc(transaction.operation.amount, cashOutFee.percents);
            setUserHistory(transaction.user_id, dayIndex, 0, true, transaction.date)
        } else if (isSameWeek(transaction, dateFormat) && userHistory.isCommissioned) {
            //if same week and user already have been issued a commission
            commissionFee = CommissionCalc(transaction.operation.amount, cashOutFee.percents);
            setUserHistory(transaction.user_id, dayIndex, totalAmount, true, transaction.date)
        } else {
            //reseting a user history
            setUserHistory(transaction.user_id, dayIndex, 0, false, transaction.date)
        }
    } else {
        if (transaction.operation.amount > cashOutFee.week_limit.amount) {
            // no history but transaction exceeds the limit
            commissionFee = CommissionCalc(transaction.operation.amount - cashOutFee.week_limit.amount, cashOutFee.percents);
            setUserHistory(transaction.user_id, dayIndex, transaction.operation.amount, true, transaction.date)
        } else {
            // set user history
            setUserHistory(transaction.user_id, dayIndex, transaction.operation.amount, false, transaction.date)
        }
    }

    return Number.parseFloat(commissionFee).toFixed(2);
};

/**
 * legalCashout() returns the commssion fee for legal user type
 * param is a single transaction object
 */
const legalCashout = (transaction) => {
    let commissionFee = CommissionCalc(transaction.operation.amount, cashOutFee.percents);
    if (commissionFee < 0.50) return Number.parseFloat(0.50);
    return Number.parseFloat(commissionFee).toFixed(2);
};

/**
 * setUserHistory() sets the user history 
 * params are user_id, day_index, amount_of_transaction, commission, transaction_date
 */
const setUserHistory = (id, day, amount, isCommissioned, transactionDate) => {
    userHistoryMapper.set(id, {
        day: day,
        amount: amount,
        isCommissioned: isCommissioned,
        prevDate: transactionDate,
    });
}

/**
 * isSameWeek() returns boolean if the dates are in the same week
 * params are transaction object and formatted transaction date
 */
const isSameWeek = (transaction, transactionDate) => {
    let start;
    let end;
    const userData = {...userHistoryMapper.get(transaction.user_id)};
    if(userData.prevDate) {
        start = moment(transactionDate).subtract(1, 'days').week();
        end = moment(userData.prevDate).subtract(1, 'days').week();
    }
    userHistoryMapper.set(transaction.user_id, {...userData, prevDate: transactionDate});
    return start === end;
}

export {
    CashOut
}