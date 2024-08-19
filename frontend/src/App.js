import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('/api/expenses')
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  }, []);

  const addExpense = (expense) => {
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((data) => setExpenses([...expenses, data]));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <Dashboard expenses={expenses} />
    </div>
  );
}

export default App;
