import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CreateLoan from './components/CreateLoan';
import MakePayment from './components/MakePayment';
import LoanLedger from './components/LoanLedger';
import CustomerOverview from './components/CustomerOverview';

function App() {
  const [page, setPage] = useState('create-loan');

  let content;
  if (page === 'create-loan') content = <CreateLoan />;
  else if (page === 'make-payment') content = <MakePayment />;
  else if (page === 'loan-ledger') content = <LoanLedger />;
  else if (page === 'customer-overview') content = <CustomerOverview />;

  return (
    <div>
      <Navbar onNavigate={setPage} currentPage={page} />
      {content}
    </div>
  );
}

export default App;
