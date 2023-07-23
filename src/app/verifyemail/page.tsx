"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false); 
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center min-h-screen p-24">
      <div className="text-4xl">Verify Email</div>
      <h2 className="p-2 mt-4 font-semibold text-black bg-yellow-500 rounded-xl">
        {token ? `${token}` : "no token found"}
      </h2>
      {verified && (
        <>
          <h1 className="text-2xl">Email verified</h1>
          <Link href="/login" className="text-blue-400">
            Login
          </Link>
        </>
      )}
      {error && (
        <>
          <h1 className="p-2 text-2xl text-white bg-red-500 rounded-xl">Error</h1>
          <Link href="/login" className="text-blue-400">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
