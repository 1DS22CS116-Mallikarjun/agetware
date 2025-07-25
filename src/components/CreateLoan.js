import React, { useState } from 'react';

export default function CreateLoan() {
  const [form, setForm] = useState({
    customer_id: '',
    loan_amount: '',
    loan_period_years: '',
    interest_rate_yearly: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const cardStyle = {
    maxWidth: 420,
    margin: '2rem auto',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    padding: '2rem',
  };
  const inputStyle = {
    padding: '0.5rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
  };
  const btnStyle = {
    background: '#61dafb',
    color: '#222',
    border: 'none',
    borderRadius: 4,
    padding: '0.7rem 1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: 16,
    marginTop: 8,
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/v1/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: form.customer_id,
          loan_amount: Number(form.loan_amount),
          loan_period_years: Number(form.loan_period_years),
          interest_rate_yearly: Number(form.interest_rate_yearly),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creating loan');
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{textAlign:'center', marginBottom:'1.5rem'}}>Create Loan</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="customer_id" placeholder="Customer ID" value={form.customer_id} onChange={handleChange} required style={inputStyle} />
        <input name="loan_amount" type="number" placeholder="Loan Amount" value={form.loan_amount} onChange={handleChange} required style={inputStyle} />
        <input name="loan_period_years" type="number" placeholder="Loan Period (years)" value={form.loan_period_years} onChange={handleChange} required style={inputStyle} />
        <input name="interest_rate_yearly" type="number" placeholder="Interest Rate (%)" value={form.interest_rate_yearly} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Create Loan</button>
      </form>
      {result && (
        <div style={{ marginTop: '1rem', color: 'green', textAlign:'center' }}>
          <div>Loan Created! ID: {result.loan_id}</div>
          <div>Total Payable: {result.total_amount_payable}</div>
          <div>Monthly EMI: {result.monthly_emi}</div>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '1rem', textAlign:'center' }}>{error}</div>}
    </div>
  );
} 