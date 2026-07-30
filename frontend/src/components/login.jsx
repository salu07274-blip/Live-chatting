import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-300">Sign in to continue your conversations</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="text"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full rounded-lg border border-white/20 bg-slate-900/50 px-4 py-3 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-600"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-300">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-sky-300 hover:text-sky-200">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login