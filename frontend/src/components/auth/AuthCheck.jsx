import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, setInitialized } from "../../store/slices/authSlice";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function AuthCheck({ children }) {
  const dispatch = useDispatch();
  const { initialized, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token && !initialized) {
      dispatch(checkAuthStatus())
        .unwrap()
        .catch(() => {
          localStorage.removeItem('token');
          dispatch(setInitialized(true));
        });
    } else if (!initialized) {
      dispatch(setInitialized(true));
    }
  }, [dispatch, initialized]);

  if (!initialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return children;
}
