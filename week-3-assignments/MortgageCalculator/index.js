import React, { useState } from "react";

import './styles.css'

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("300000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const validate = () => {
    const newErrors = {};

    const amount = Number(loanAmount);
    const rate = Number(interestRate);
    const term = Number(loanTerm);

    if (
      loanAmount.trim() === "" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      newErrors.loanAmount =
        "Enter a valid loan amount greater than 0.";
    }

    if (
      interestRate.trim() === "" ||
      !Number.isFinite(rate) ||
      rate < 0
    ) {
      newErrors.interestRate =
        "Enter a valid interest rate (0 or greater).";
    }

    if (
      loanTerm.trim() === "" ||
      !Number.isFinite(term) ||
      term <= 0
    ) {
      newErrors.loanTerm =
        "Enter a valid loan term greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const calculateMortgage = (e) => {
    e.preventDefault();

    setResults(null);

    if (!validate()) return;

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanTerm);

    const i = annualRate / 100 / 12;
    const n = years * 12;

    let monthlyPayment;

    // Handle zero interest separately to avoid division by zero.
    if (i === 0) {
      monthlyPayment = P / n;
    } else {
      const factor = Math.pow(1 + i, n);

      monthlyPayment =
        (P * i * factor) / (factor - 1);
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    if (
      !Number.isFinite(monthlyPayment) ||
      !Number.isFinite(totalPayment) ||
      !Number.isFinite(totalInterest)
    ) {
      setErrors({
        general: "Unable to calculate. Please check your inputs."
      });
      return;
    }

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setErrors({});
    setResults(null);
  };

  return (
    <div className="calculator">
      <h2>Mortgage Calculator</h2>

      <form onSubmit={calculateMortgage}>
        <div className="form-group">
          <label>Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => {
              setLoanAmount(e.target.value);
              setResults(null);
              setErrors({});
            }}
            placeholder="Enter loan amount"
            min="0"
            step="any"
          />
          {errors.loanAmount && (
            <p className="error">{errors.loanAmount}</p>
          )}
        </div>

        <div className="form-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => {
              setInterestRate(e.target.value);
              setResults(null);
              setErrors({});
            }}
            placeholder="Enter annual interest rate"
            min="0"
            step="any"
          />
          {errors.interestRate && (
            <p className="error">{errors.interestRate}</p>
          )}
        </div>

        <div className="form-group">
          <label>Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => {
              setLoanTerm(e.target.value);
              setResults(null);
              setErrors({});
            }}
            placeholder="Enter loan term"
            min="0"
            step="any"
          />
          {errors.loanTerm && (
            <p className="error">{errors.loanTerm}</p>
          )}
        </div>

        {errors.general && (
          <p className="error">{errors.general}</p>
        )}

        <button type="submit">
          Calculate
        </button>

        <button type="button" onClick={resetCalculator}>
          Reset
        </button>
      </form>

      {results && (
        <div className="results">
          <h3>Mortgage Summary</h3>

          <p>
            Monthly Payment: $
            {results.monthlyPayment}
          </p>

          <p>
            Total Payment: $
            {results.totalPayment}
          </p>

          <p>
            Total Interest: $
            {results.totalInterest}
          </p>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator