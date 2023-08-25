import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
    return (
      props.loggedIn.email ? <Component {...props} /> : <Navigate to="/signin" replace/>
  )
}

export default ProtectedRoute;