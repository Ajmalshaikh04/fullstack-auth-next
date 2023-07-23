"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log("ForgotPassword: ", response.data);
      // toast.success(response);
      console.log(response);
    } catch (error: any) {
      console.log("Failed : ", error);
      toast.error(error.message, { duration: 10000 });
    } finally {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-8 text-2xl font-semibold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-64">
        <label htmlFor="email" className="block mb-2 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 mb-4 leading-normal text-black placeholder-gray-400 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          required
        />
        <button
          type="submit"
          className="w-full px-6 py-2 mt-4 font-semibold text-black transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
