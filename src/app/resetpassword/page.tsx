'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
        confirmPassword,
      });

      setMessage(response.data.message);
      setError(false);
    } catch (error:any) {
      setMessage(error.response.data.error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-24">
      <div className="text-4xl">Reset Password</div>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
        <label htmlFor="password" className="text-lg">
          New Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="p-2 mt-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <label htmlFor="confirmPassword" className="mt-4 text-lg">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          className="p-2 mt-1 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          className="px-4 py-2 mt-4 font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          Reset Password
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-2xl ${error ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <Link href="/login" className="mt-4 text-blue-400">
        Login
      </Link>
    </div>
  );
};

export default ResetPassword;
