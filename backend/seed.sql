-- Insert demo user
INSERT INTO users (name, email, password)
VALUES ('Kishor', 'kishor@test.com', '$2b$10$abcdefghijklmnopqrstuv'); 
-- (the password here is a fake bcrypt hash, you’ll usually create it via register API)

-- Insert sample transactions
INSERT INTO transactions (user_id, type, category, amount, date)
VALUES
  (1, 'income', 'Salary', 50000, '2025-09-01'),
  (1, 'expense', 'Food', 2000, '2025-09-02'),
  (1, 'expense', 'Transport', 800, '2025-09-03');

-- Insert sample goals
INSERT INTO goals (user_id, goal_name, target_amount, deadline, status, current_amount)
VALUES
  (1, 'Buy a new Laptop', 60000, '2025-12-31', 'in-progress', 10000),
  (1, 'Emergency Fund', 100000, '2026-06-30', 'in-progress', 25000);
