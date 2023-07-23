"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      toast.success("Sign up success", { duration: 3000 });
      console.log("SignUp", res.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isFormValid = user.email && user.password && user.username;
    setButtonDisabled(!isFormValid);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-2xl font-semibold">
        {loading ? "Processing" : "Sign Up"}
      </h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={user.username}
        onChange={handleInputChange}
        placeholder="Username"
        className="px-4 py-2 mb-4 leading-normal text-black placeholder-gray-300 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="px-4 py-2 mb-4 leading-normal text-black placeholder-gray-400 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="px-4 py-2 mb-4 leading-normal text-black placeholder-gray-400 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      />
      <button
        className="px-6 py-2 mt-4 font-semibold text-black transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
        onClick={onSignup}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
      <button
        className="px-6 py-2 mt-6 font-semibold text-black transition-colors duration-200 bg-white rounded-2xl hover:bg-gray-200"
        onClick={() => signIn("google")}
      >
        Sign Up with Google
      </button>
      <Link
        href="/login"
        className="mt-4 hover:underline hover:underline-offset-4"
      >
        Visit the Login page
      </Link>
    </div>
  );
};

export default Signup;
