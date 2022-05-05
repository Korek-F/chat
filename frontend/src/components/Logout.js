import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/authActions'
export const Logout = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const userActionLogout = () => {
        dispatch(logout())
        navigate("/")
    }
    return (
        <div>
            Are you sure you want to log out?
            <button onClick={userActionLogout}>Yes</button>
            <button onClick={() => navigate("/")}>No</button>
        </div>
    )
}
