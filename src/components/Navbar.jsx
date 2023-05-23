import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import { toast } from "react-toastify";

export const Navbar = () => {
  const dispatch = useDispatch()

  const activeStyles = {
    color: 'white'
  }

  const isAuth = useSelector(checkIsAuth)

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('log out')
  }

  return (
    <div className="flex py-4 justify-between items-center">
      
      <span className="flex justify-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">B</span>

      {
        isAuth && (
          <ul className="flex gap-8">
            <li><NavLink
              to={"/"} className="text-xs text-gray-400 hover:text-white" style={({isActive}) => isActive ? activeStyles : undefined}>
              Main</NavLink></li>
            <li><NavLink
              to={"/posts"} className="text-xs text-gray-400 hover:text-white" style={({isActive}) => isActive ? activeStyles : undefined}>
              My Posts</NavLink></li>
            <li><NavLink
              to={"/new"} className="text-xs text-gray-400 hover:text-white" style={({isActive}) => isActive ? activeStyles : undefined}>
              Add Posts</NavLink></li>
          </ul>
        )
      }

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {
          isAuth ? (
            <button onClick={logoutHandler}>log out</button>
          ) : (
              <Link to={'/login'}>login</Link>
          )
        }
      </div>

    </div>
    
  )
}