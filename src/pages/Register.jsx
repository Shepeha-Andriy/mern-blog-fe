import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {checkIsAuth} from '../redux/features/auth/authSlice'
import { registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form'

export const Register = () => {
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({
    mode: 'onBlur'
  })

  useEffect(() => {
    if (status) {
      toast(status)
    }

    if (isAuth) {
      navigate('/')
    }
  }, [status, isAuth, navigate])

  const handleSubmit2 = (data) => {
    try {
      const {username, password} = data
      dispatch(registerUser({ username, password }))
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-ls text-white text-center"> Regisration </h1>

      <label className="text-xs text-gray-400">
        Username:
        <input placeholder="username" {...register('username', {
          required: 'username is required',
          minLength: {value: 5, message: 'min length is 5'}
        })}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-500"
        ></input>
        <div style={{marginTop: '3px'}}>
          {errors?.username && <p>{ errors?.username?.message }</p>}
        </div>
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input type="password" placeholder="password" {...register('password', {
          required: 'username is required',
          minLength: {value: 6, message: 'min length is 5'},
          maxLength : {value: 16, message: 'max length is 16'}
        })}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-500"
        ></input>
        <div style={{marginTop: '3px'}}>
          {errors?.password && <p>{ errors?.password?.message }</p>}
        </div>
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button type="submit" disabled={!isValid} onClick={handleSubmit(handleSubmit2)}
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
        to={'/'}
      >
        go back
      </Link>
      
   </form>
  )
}