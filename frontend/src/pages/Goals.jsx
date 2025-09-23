import { useState, useEffect } from 'react';
import API from '../api';
import '../styles/Goals.css';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal_name: '',
    target_amount: '',
    deadline: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Finance Manager | Goals";
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await API.get('/goals');
      setGoals(response.data);
    } catch (err) {
      setError('Failed to fetch goals');
      console.error('Error fetching goals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting goal:', newGoal);
      const response = await API.post('/goals', newGoal);
      console.log('Goal creation response:', response.data);
      setNewGoal({ goal_name: '', target_amount: '', deadline: '' });
      fetchGoals();
    } catch (err) {
      setError('Failed to create goal');
      console.error('Error creating goal:', err);
    }
  };

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="goals-container">
      <h2>Financial Goals</h2>
      
      <form className="goal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={newGoal.goal_name}
          onChange={(e) => setNewGoal({...newGoal, goal_name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={newGoal.target_amount}
          onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
          required
        />
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <div className="goals-grid">
        {goals.map(goal => (
          <div key={goal.goal_id} className="goal-card">
            <h3>{goal.goal_name}</h3>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{width: `${calculateProgress(goal.current_amount, goal.target_amount)}%`}}
              />
            </div>
            <div className="goal-details">
              <p>Target: {formatCurrency(goal.target_amount)}</p>
              <p>Current: {formatCurrency(goal.current_amount)}</p>
              <p>Status: {goal.status}</p>
              {goal.deadline && (
                <p>Days Remaining: {getDaysRemaining(goal.deadline)}</p>
              )}
              <div className="goal-actions">
                <input
                  type="number"
                  placeholder="Amount to add"
                  className="amount-input"
                  onChange={(e) => {
                    const card = e.target.closest('.goal-card');
                    const btn = card.querySelector('.update-btn');
                    btn.dataset.amount = e.target.value;
                  }}
                />
                <button
                  className="update-btn"
                  onClick={async (e) => {
                    const amount = Number(e.target.dataset.amount);
                    if (!amount || amount <= 0) {
                      alert('Please enter a valid amount');
                      return;
                    }
                    try {
                      console.log('Updating goal progress:', { goalId: goal.goal_id, amount });
                      const response = await API.patch(`/goals/${goal.goal_id}/progress`, { amount });
                      console.log('Update response:', response.data);
                      fetchGoals();
                      e.target.closest('.goal-card').querySelector('.amount-input').value = '';
                    } catch (err) {
                      console.error('Error updating goal progress:', err);
                      alert(err.response?.data?.error || 'Failed to update goal progress');
                    }
                  }}
                >
                  Add Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;