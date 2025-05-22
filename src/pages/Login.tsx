import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/"); // redirect ke halaman utama setelah login sukses
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="mb-8">
        <img
          src="/logo192.png"
          alt="App Logo"
          className="w-24 h-24 mx-auto"
        />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Login
        </h1>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
