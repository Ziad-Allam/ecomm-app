import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../features/auth-admin/authSlice'
import { toast } from 'react-toastify';

const dispatch = useDispatch()
useEffect(() => {
    dispatch(checkAuth()).catch(() => {
        toast.success("User is not authenticated. Redirecting to login...")
    });
}, [dispatch]);


function CheckAuth({ isAuthenticated, user, children }) {

    const location = useLocation()

    if (!isAuthenticated && !(location.pathname.includes('/login-admin'))) {
        return <Navigate to={"/auth/login-admin"} />
    }
    if (isAuthenticated && (location.pathname.includes('/login-admin'))) {
        if (user.role === "user") {
            return <div>Error</div>
        } else {
            return <Navigate to={"/admin/dashboard"} />
        }
    }
    return <>{children}</>
}

export default CheckAuth
