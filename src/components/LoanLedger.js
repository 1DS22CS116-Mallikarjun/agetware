import React, { useState } from 'react';

export default function LoanLedger() {
  const [loanId, setLoanId] = useState('');
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState('');

  const cardStyle = {
    maxWidth: 500,
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
  const txListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginTop: 8,
  };
  const txItemStyle = {
    background: '#f6f8fa',
    borderRadius: 4,
    padding: '0.5rem',
    marginBottom: 4,
    fontSize: 15,
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLedger(null);
    try {
      const res = await fetch(`/api/v1/loans/${loanId}/ledger`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error fetching ledger');
      setLedger(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{textAlign:'center', marginBottom:'1.5rem'}}>Loan Ledger</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Loan ID" value={loanId} onChange={e => setLoanId(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnStyle}>View Ledger</button>
      </form>
      {ledger && (
        <div style={{ marginTop: '1rem' }}>
          <div><b>Customer ID:</b> {ledger.customer_id}</div>
          <div><b>Principal:</b> {ledger.principal}</div>
          <div><b>Total Amount:</b> {ledger.total_amount}</div>
          <div><b>Monthly EMI:</b> {ledger.monthly_emi}</div>
          <div><b>Amount Paid:</b> {ledger.amount_paid}</div>
          <div><b>Balance Amount:</b> {ledger.balance_amount}</div>
          <div><b>EMIs Left:</b> {ledger.emis_left}</div>
          <h4 style={{marginTop:'1rem'}}>Transactions</h4>
          <ul style={txListStyle}>
            {ledger.transactions.map(tx => (
              <li key={tx.transaction_id} style={txItemStyle}>
                <b>{tx.date.split('T')[0]}</b>: {tx.amount} <span style={{color:'#888'}}>({tx.type})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <div style={{ color: 'red', marginTop: '1rem', textAlign:'center' }}>{error}</div>}
    </div>
  );
} 