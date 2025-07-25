import React, { useState } from 'react';

export default function CustomerOverview() {
  const [customerId, setCustomerId] = useState('');
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState('');

  const cardStyle = {
    maxWidth: 700,
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
    marginLeft: 8,
  };
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    fontSize: 15,
  };
  const thtdStyle = {
    border: '1px solid #eee',
    padding: '0.5rem',
    textAlign: 'center',
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setOverview(null);
    try {
      const res = await fetch(`/api/v1/customers/${customerId}/overview`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error fetching overview');
      setOverview(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{textAlign:'center', marginBottom:'1.5rem'}}>Customer Overview</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent:'center' }}>
        <input placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnStyle}>View Overview</button>
      </form>
      {overview && (
        <div style={{ marginTop: '1rem' }}>
          <div><b>Total Loans:</b> {overview.total_loans}</div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thtdStyle}>Loan ID</th>
                <th style={thtdStyle}>Principal</th>
                <th style={thtdStyle}>Total Amount</th>
                <th style={thtdStyle}>Total Interest</th>
                <th style={thtdStyle}>EMI Amount</th>
                <th style={thtdStyle}>Amount Paid</th>
                <th style={thtdStyle}>EMIs Left</th>
              </tr>
            </thead>
            <tbody>
              {overview.loans.map(loan => (
                <tr key={loan.loan_id}>
                  <td style={thtdStyle}>{loan.loan_id}</td>
                  <td style={thtdStyle}>{loan.principal}</td>
                  <td style={thtdStyle}>{loan.total_amount}</td>
                  <td style={thtdStyle}>{loan.total_interest}</td>
                  <td style={thtdStyle}>{loan.emi_amount}</td>
                  <td style={thtdStyle}>{loan.amount_paid}</td>
                  <td style={thtdStyle}>{loan.emis_left}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '1rem', textAlign:'center' }}>{error}</div>}
    </div>
  );
} 