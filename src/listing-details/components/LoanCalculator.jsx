import React, { useState } from "react";

function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [months, setMonths] = useState("");
  const [monthly, setMonthly] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setMonthly(null);
    setTotal(null);

    if (!amount || !interest || !months) {
      setError("Molimo unesite sve podatke.");
      return;
    }

    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100 / 12;
    const numPayments = parseFloat(months);

    if (isNaN(principal) || isNaN(rate) || isNaN(numPayments) || principal <= 0 || numPayments <= 0) {
      setError("Molimo unesite ispravne pozitivne brojeve za iznos kredita i broj mjeseci.");
      return;
    }

    if (rate < 0) {
      setError("Kamatna stopa ne može biti negativna.");
      return;
    }

    const payment = (principal * rate) / (1 - Math.pow(1 + rate, -numPayments));
    const totalPaid = payment * numPayments;

    setMonthly(payment.toFixed(2));
    setTotal(totalPaid.toFixed(2));
  };

  return (
    <div className="bg-neutral-100 p-4 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Kalkulator kredita</h3>
      <div className="flex flex-col gap-3">
        <input
          type="number"
          placeholder="Iznos kredita (€)"
          className="p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Kamatna stopa (%)"
          className="p-2 border rounded"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <input
          type="number"
          placeholder="Broj mjeseci"
          className="p-2 border rounded"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />
        
        {error && (
          <div className="text-red-500 font-medium text-sm mt-1">
            {error}
          </div>
        )}

        <button
          onClick={calculate}
          className="bg-neutral-700 text-white py-2 rounded hover:bg-neutral-800"
        >
          Izračunaj ratu
        </button>

        {monthly && (
          <div className="mt-2 text-blue-800 font-medium space-y-1">
            <p>Mjesečna rata: {monthly} €</p>
            <p>Ukupno plaćeno: {total} €</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanCalculator;
