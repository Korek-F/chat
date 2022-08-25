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
        <>
            <div className='info'> Are you sure you want to log out? </div>
            <div className='logout_buttons'>
                <button className="logout_button logout_button_yes" onClick={userActionLogout}>Yes</button>
                <button className="logout_button logout_button_no"
                    onClick={() => navigate("/")}>No</button>
            </div>
        </>
    )
}
