import React, { useState } from 'react';

export default function MakePayment() {
  const [form, setForm] = useState({
    loan_id: '',
    amount: '',
    payment_type: 'EMI',
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
      const res = await fetch(`/api/v1/loans/${form.loan_id}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(form.amount),
          payment_type: form.payment_type,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error making payment');
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{textAlign:'center', marginBottom:'1.5rem'}}>Make Payment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="loan_id" placeholder="Loan ID" value={form.loan_id} onChange={handleChange} required style={inputStyle} />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required style={inputStyle} />
        <select name="payment_type" value={form.payment_type} onChange={handleChange} required style={inputStyle}>
          <option value="EMI">EMI</option>
          <option value="LUMP_SUM">LUMP_SUM</option>
        </select>
        <button type="submit" style={btnStyle}>Make Payment</button>
      </form>
      {result && (
        <div style={{ marginTop: '1rem', color: 'green', textAlign:'center' }}>
          <div>Payment Successful! ID: {result.payment_id}</div>
          <div>Remaining Balance: {result.remaining_balance}</div>
          <div>EMIs Left: {result.emis_left}</div>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '1rem', textAlign:'center' }}>{error}</div>}
    </div>
  );
} 