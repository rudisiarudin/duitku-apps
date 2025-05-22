import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditTransaction from "./pages/EditTransaction";
import AddTransactionModal from "./components/AddTransactionModal";
import BottomNavBar from "./components/BottomNavBar";
import Status from "./pages/Status";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  // Modal dan bottom navbar tetap jalan, walau user null
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/status"
          element={
            <PrivateRoute>
              <Status />
            </PrivateRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* Tampilkan modal AddTransaction kapanpun, karena user bisa null */}
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => setShowAddModal(false)}
        />
      )}

      {/* BottomNavBar tetap tampil supaya UI lengkap */}
      <BottomNavBar onAddClick={() => setShowAddModal(true)} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>

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
    </AuthProvider>
  );
}

export default App;
