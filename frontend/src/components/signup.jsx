import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';
import { getErrorMessage } from './authError';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Signup failed'));
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-300">Join the chat and start connecting instantly</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="text"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Confirm Password</label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Gender</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleCheckbox("male")}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${user.gender === "male" ? "border-sky-400 bg-sky-500/20 text-sky-200" : "border-white/20 bg-slate-900/40 text-slate-300"}`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => handleCheckbox("female")}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${user.gender === "female" ? "border-sky-400 bg-sky-500/20 text-sky-200" : "border-white/20 bg-slate-900/40 text-slate-300"}`}
              >
                Female
              </button>
            </div>
          </div>

          <button type="submit" className="w-full rounded-lg bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-600">
            Sign up
          </button>

          <p className="text-center text-sm text-slate-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sky-300 hover:text-sky-200">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup