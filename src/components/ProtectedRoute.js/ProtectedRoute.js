import React from 'react';
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const currentUser = React.useContext(CurrentUserContext);

    return (
      currentUser ? <Component {...props} /> : <Navigate to="/" replace/>
  )
}

export default ProtectedRoute;