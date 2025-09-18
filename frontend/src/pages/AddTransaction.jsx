// src/pages/AddTransaction.jsx
import TransactionForm from "../components/TransactionForm";
import Layout from "../components/Layout";

export default function AddTransaction() {
  const handleAdded = () => {
    // e.g. navigate back to dashboard or refresh transactions
    // location.reload(); // quick hack
  };

  return (
    <Layout>
      <h2>Add Transaction</h2>
      <TransactionForm onAdd={handleAdded} />
    </Layout>
  );
}
