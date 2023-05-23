import React from "react";
import { Navbar } from "./Navbar";
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation()

  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <React.Fragment>
        <div className="container mx-auto">
          {children}
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Navbar></Navbar>
        {children}
      </div>
    </React.Fragment>
  )
}