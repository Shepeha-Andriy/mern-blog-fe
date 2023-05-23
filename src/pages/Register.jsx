import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {checkIsAuth} from '../redux/features/auth/authSlice'
import { registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (status) {
      toast(status)
    }

    if (isAuth) {
      navigate('/')
    }
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-ls text-white text-center"> Regisration </h1>

      <label className="text-xs text-gray-400">
        Username:
        <input type="text" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-500">
        </input>
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input type="password" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-500">
        </input>
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button type="submit" onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">Register
        </button>
        <Link
          className="flex justify-center items-center text-xs text-white"
          to={'/login'}>
          already have an account?
        </Link>
      </div>

      <Link
          className="flex justify-center items-center text-xs text-white"
          to={'/'}>
          go back
        </Link>
      
   </form>
  )
}