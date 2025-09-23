import { useState, useEffect } from "react";
import API from "../api";
import TransactionForm from "../components/TransactionForm";
import "../styles/Dashboard.css";

function Dashboard() {
  useEffect(() => {
    document.title = "Finance Manager | Dashboard";
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
    type: ""
  });
  const [editTransaction, setEditTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await API.get(`/transactions?${queryParams}`);
      console.log('Received transactions:', res.data);
      setTransactions(res.data || []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch transactions");
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleDelete = async (txn_id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await API.delete(`/transactions/${txn_id}`);
        fetchTransactions(); // Refresh the list after deletion
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete transaction");
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditTransaction({...transaction});
  };

  const handleUpdate = () => {
    setEditTransaction(null);
    fetchTransactions();
  };

  return (
    <div className="dashboard">
      <h2>Financial Dashboard</h2>
      
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p>₹{transactions
              .filter(t => t.type === 'income')
              .reduce((sum, t) => sum + Number(t.amount), 0)
              .toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
          </p>
        </div>
        <div className="summary-card expense">
          <h3>Total Expenses</h3>
          <p>₹{transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + Number(t.amount), 0)
              .toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
          </p>
        </div>
        <div className="summary-card balance">
          <h3>Balance</h3>
          <p>₹{transactions
              .reduce((sum, t) => sum + (t.type === 'income' ? Number(t.amount) : -Number(t.amount)), 0)
              .toLocaleString('en-IN', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
          </p>
        </div>
      </div>

      <div className="filters">
        <h3>Filters</h3>
        <div className="filters-grid">
          <input
            type="date"
            placeholder="Start Date"
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})}
          />
          <input
            type="date"
            placeholder="End Date"
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})}
          />
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">All Types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="transactions-list">
        <h3>Transactions</h3>
        {isLoading ? (
          <div className="loading">Loading transactions...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : transactions.length === 0 ? (
          <p className="no-transactions">No transactions found</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.txn_id} className={`transaction-row ${t.type}`}>
                  <td>{t.date ? new Date(t.date).toLocaleDateString('en-IN') : 'N/A'}</td>
                  <td className="capitalize">{t.type || 'N/A'}</td>
                  <td>{t.category || 'N/A'}</td>
                  <td className={`amount ${t.type}`}>
                    <span>
                      {t.type === 'expense' ? '-' : '+'}₹{Number(t.amount || 0).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </td>
                  <td className="capitalize">{t.payment_method || 'Cash'}</td>
                  <td>{t.description || '-'}</td>
                  <td className="actions">
                    <button 
                      onClick={() => handleEdit(t)} 
                      className="edit-btn"
                      disabled={isLoading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(t.txn_id)} 
                      className="delete-btn"
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editTransaction ? (
        <div className="edit-form">
          <h3>Edit Transaction</h3>
          <TransactionForm 
            editData={editTransaction} 
            onUpdate={handleUpdate} 
          />
          <button className="cancel-button" onClick={() => setEditTransaction(null)}>
            Cancel Edit
          </button>
        </div>
      ) : (
        <div className="transaction-form">
          <h3>Add New Transaction</h3>
          <TransactionForm onAdd={fetchTransactions} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;