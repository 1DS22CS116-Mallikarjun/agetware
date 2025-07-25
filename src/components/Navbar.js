import React from 'react';

export default function Navbar({ onNavigate, currentPage }) {
  const navStyle = {
    background: '#222',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };
  const btnStyle = isActive => ({
    background: isActive ? '#61dafb' : '#333',
    color: isActive ? '#222' : '#fff',
    border: 'none',
    borderRadius: 4,
    padding: '0.5rem 1.2rem',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'background 0.2s, color 0.2s',
    outline: 'none',
  });
  return (
    <nav style={navStyle}>
      <button style={btnStyle(currentPage==='create-loan')} onClick={() => onNavigate('create-loan')}>Create Loan</button>
      <button style={btnStyle(currentPage==='make-payment')} onClick={() => onNavigate('make-payment')}>Make Payment</button>
      <button style={btnStyle(currentPage==='loan-ledger')} onClick={() => onNavigate('loan-ledger')}>Loan Ledger</button>
      <button style={btnStyle(currentPage==='customer-overview')} onClick={() => onNavigate('customer-overview')}>Customer Overview</button>
    </nav>
  );
} 