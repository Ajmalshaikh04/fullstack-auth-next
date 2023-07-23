"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success("Log Out successfully", { duration: 3000 });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-2 bg-green-500 rounded-lg">
        {data === null ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="px-4 py-1 mt-4 text-white transition-all duration-300 ease-in-out border border-white rounded-xl hover:bg-white hover:text-black "
      >
        Log Out
      </button>
      <button
        onClick={getUserDetails}
        className="px-4 py-1 mt-4 text-white transition-all duration-300 ease-in-out bg-purple-500 border border-white hover:text-purple-600 rounded-xl hover:bg-white hover:border-purple-600"
      >
        Get User Id
      </button>
    </div>
  );
};

export default Profile;
