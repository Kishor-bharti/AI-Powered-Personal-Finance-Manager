import { useState, useEffect } from "react";
import API from "../api";
import "../styles/TransactionForm.css";

function TransactionForm({ onAdd, editData, onUpdate }) {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    payment_method: "Cash",
    description: "",
    goal_id: ""
  });

  useEffect(() => {
    // Fetch available goals when component mounts
    const fetchGoals = async () => {
      try {
        const response = await API.get('/goals');
        setGoals(response.data);
      } catch (err) {
        console.error('Error fetching goals:', err);
      }
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type || "expense",
        category: editData.category || "",
        amount: editData.amount || "",
        date: editData.date || "",
        payment_method: editData.payment_method || "Cash",
        description: editData.description || "",
        goal_id: editData.goal_id || ""
      });
    }
  }, [editData]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const { type, category, amount, date, payment_method, goal_id } = formData;
    
    if (!category || !amount || !date || !payment_method) {
      alert("Please fill all required fields");
      return;
    }
    
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    try {
      if (editData) {
        const response = await API.put(`/transactions/${editData.txn_id}`, formData);
        if (response.data) {
          // Update goal progress if this is an income transaction and has a goal linked
          if (type === 'income' && goal_id) {
            await API.patch(`/goals/${goal_id}/progress`, { amount });
          }
          onUpdate();
        } else {
          throw new Error("Failed to update transaction");
        }
      } else {
        const response = await API.post("/transactions/add", formData);
        if (response.data) {
          // Update goal progress if this is an income transaction and has a goal linked
          if (type === 'income' && goal_id) {
            await API.patch(`/goals/${goal_id}/progress`, { amount });
          }
          onAdd();
          // Reset form after successful addition
          setFormData({
            type: "expense",
            category: "",
            amount: "",
            date: "",
            payment_method: "Cash",
            description: "",
            goal_id: ""
          });
        } else {
          throw new Error("Failed to add transaction");
        }
      }
    } catch (err) {
      alert(editData ? "Failed to update transaction" : "Failed to add transaction");
    }
  };

  return (
    <div className="transaction-form">
      <h3>{editData ? 'Edit Transaction' : 'Add Transaction'}</h3>
      <div className="form-grid">
        <select 
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Investment">Investment</option>
          <option value="Other">Other</option>
        </select>

        <input 
          name="amount"
          placeholder="Amount" 
          type="number"
          value={formData.amount}
          onChange={handleChange}
        />

        <input 
          name="date"
          type="date" 
          value={formData.date}
          onChange={handleChange}
        />

        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Other">Other</option>
        </select>

        {formData.type === 'income' && (
          <select
            name="goal_id"
            value={formData.goal_id}
            onChange={handleChange}
          >
            <option value="">Link to Goal (Optional)</option>
            {goals.map(goal => (
              <option key={goal.goal_id} value={goal.goal_id}>
                {goal.goal_name} ({((goal.current_amount / goal.target_amount) * 100).toFixed(0)}% complete)
              </option>
            ))}
          </select>
        )}

        <div className="full-width">
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          {editData ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </div>
  );
}

export default TransactionForm;
