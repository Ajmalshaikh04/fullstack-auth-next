"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/login", user);

      console.log(res);
      router.push("/profile");

      toast.success("LogIn Successfully", { duration: 3000 });
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-8 text-2xl font-semibold">
        {loading ? "Processing" : "Log In"}
      </h1>

      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="px-4 py-2 mb-4 leading-normal text-black placeholder-gray-400 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="px-4 py-2 mb-4 mb-8 leading-normal text-black placeholder-gray-400 border border-yellow-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      />

      <button
        className="px-6 py-2 mt-4 font-semibold text-black transition-colors duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
        onClick={onLogin}
      >
        Log In
      </button>
      <button
        className="px-6 py-2 mt-6 font-semibold text-black transition-colors duration-200 bg-white rounded-2xl hover:bg-gray-200"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <Link
        href={"/signup"}
        className="mt-4 hover:underline hover:underline-offset-4"
      >
        Visit Sign up page
      </Link>
    </div>
  );
};

export default Login;
