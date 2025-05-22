// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditTransaction from "./pages/EditTransaction";
import AddTransactionModal from "./components/AddTransactionModal";
import BottomNavBar from "./components/BottomNavBar";
import Status from "./pages/Status";
import Wallet from "./pages/Wallet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard onAddClick={() => setShowAddModal(true)} />}
        />
        <Route path="/edit/:id" element={<EditTransaction />} />
        <Route path="/status" element={<Status />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>

      {showAddModal && (
        <AddTransactionModal
          transaction={null}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => setShowAddModal(false)}
        />
      )}

      <BottomNavBar onAddClick={() => setShowAddModal(true)} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
