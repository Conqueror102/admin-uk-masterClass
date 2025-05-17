import React, { useState } from "react";
import {  useNavigate } from "react-router-dom"; // assuming you're using React Router
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
 const handleSubmit = async (e) => {
  e.preventDefault();
    setLoading(true);
  try {
    const response = await axios.post("https://ukmasterclassbackend.onrender.com/api/admin/login", {
      email,
      password,
    });

    setMessage("Login successful!");
    console.log(response.data);

    // Save token to localStorage
    localStorage.setItem("token", response.data.token);

    // Set default Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    // Redirect to admin dashboard
    navigate("/"); 

  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    setMessage(error.response?.data?.message || "Login failed.");
  }finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="px-6 py-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">Login</h2>
          <p className="mb-8 text-center text-sm text-gray-600">Enter your email and password to sign in</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

          
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading ? (
    <>
      <svg className="h-8 w-8 animate-spin" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </>
  ) : (
    "Sign in"
  )}
              </button>
            </div>

            {message && (
              <p className="text-center text-sm text-red-500 mt-4">
                {message}
              </p>
            )}
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default LoginPage;
