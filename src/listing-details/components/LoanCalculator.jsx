import React, { useState } from "react";

function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [months, setMonths] = useState(""); 
  const [monthly, setMonthly] = useState(null);
  const [total, setTotal] = useState(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interest) / 100 / 12;
    const numPayments = parseFloat(months);

    if (!principal || !rate || !numPayments) return;

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
