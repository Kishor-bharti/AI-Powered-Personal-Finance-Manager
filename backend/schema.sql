-- Drop tables if they exist (useful for resetting the database)
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    txn_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    date DATE NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Cash',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create financial goals table
CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    goal_name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(12,2) NOT NULL,
    current_amount DECIMAL(12,2) DEFAULT 0,
    deadline DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);

-- Add comments to tables and columns
COMMENT ON TABLE users IS 'Stores user account information';
COMMENT ON TABLE transactions IS 'Stores all financial transactions';
COMMENT ON TABLE goals IS 'Stores financial goals and their progress';

-- Example comments on columns (add more as needed)
COMMENT ON COLUMN transactions.type IS 'Type of transaction: income or expense';
COMMENT ON COLUMN transactions.amount IS 'Transaction amount in INR';
COMMENT ON COLUMN goals.status IS 'Goal status: in_progress or completed';

-- Create a function to update goal status automatically
CREATE OR REPLACE FUNCTION update_goal_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.current_amount >= NEW.target_amount THEN
        NEW.status := 'completed';
    ELSE
        NEW.status := 'in_progress';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update goal status
CREATE TRIGGER trigger_update_goal_status
    BEFORE UPDATE OF current_amount ON goals
    FOR EACH ROW
    EXECUTE FUNCTION update_goal_status();