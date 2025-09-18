import { useState } from "react";
import API from "../api";

function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/transactions/add", { type, category, amount, date });
      onAdd();
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default TransactionForm;
