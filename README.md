# Bank Lending System

A full-stack web application for managing bank loans, payments, and customer overviews. Built with React.js (frontend), Node.js + Express (backend), and SQLite (database).

---

## Features
- Create new loans for customers
- Record EMI or lump sum payments
- View loan ledger and transaction history
- View all loans for a customer

---

## Architecture
- **Frontend:** React.js SPA (`frontend/`)
- **Backend:** Node.js + Express REST API (`backend/`)
- **Database:** SQLite (file-based, via Sequelize ORM)

---

## Project Structure
```
Agetware/
  backend/      # Express backend API
  frontend/     # React frontend app
  README.md     # Project documentation
```

---

## Setup Instructions

### 1. Clone the Repository
```
git clone <https://github.com/1DS22CS116-Mallikarjun/agetware.git>
cd Agetware
```

### 2. Backend Setup
```
cd backend
npm install
npm start
```
- Runs on [http://localhost:5000](http://localhost:5000)
- Seeds initial customers (CUST001, CUST002, CUST003)

### 3. Frontend Setup
```
cd ../frontend
npm install
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)
- Proxy is set up for API calls to backend

---

## API Endpoints

### **Create Loan**
- `POST /api/v1/loans`
- Body: `{ customer_id, loan_amount, loan_period_years, interest_rate_yearly }`

### **Record Payment**
- `POST /api/v1/loans/:loan_id/payments`
- Body: `{ amount, payment_type }` (payment_type: 'EMI' or 'LUMP_SUM')

### **Loan Ledger**
- `GET /api/v1/loans/:loan_id/ledger`

### **Customer Overview**
- `GET /api/v1/customers/:customer_id/overview`

---

## Usage
1. Start both backend and frontend servers.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Use the navigation bar to:
   - Create a loan
   - Make a payment
   - View a loan ledger
   - View customer overview

---

## Troubleshooting
- **Frontend error: Unexpected token '<', ... is not valid JSON**
  - Ensure the backend is running on port 5000.
  - Ensure the proxy is set in `frontend/package.json`.
  - Check backend terminal for errors.
- **CORS issues:**
  - Backend uses `cors` middleware; should not occur if both servers are running.
- **Database:**
  - SQLite file (`db.sqlite`) is created automatically in `backend/`.

---

## Production Deployment
- Build frontend: `cd frontend && npm run build`
- Serve static files from Express backend (see backend/index.js for instructions)

---

## Authors
- Assignment by Agetware
- Implementation by Mallikarjun 
