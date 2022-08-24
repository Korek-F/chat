import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/authActions'

export const Registration = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userUsername, setUserUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const dispatch = useDispatch()
    const authData = useSelector(state => state.authData)
    const { registered } = authData

    const onClickRegister = (e) => {
        e.preventDefault(e)
        dispatch(register(userEmail, userUsername, userPassword))

        console.log(userEmail, userUsername, userPassword)
    }

    return (
        <>
            <hr />
            <h1>Register</h1>
            <form>
                <label htmlFor="eml">Email</label>
                <input type="email"
                    id="eml"
                    onChange={(e) => setUserEmail(e.target.value)} />

                <label htmlFor="eml">Username</label>
                <input type="text"
                    id="username"
                    onChange={(e) => setUserUsername(e.target.value)} />

                <label htmlFor="psw">Password</label>
                <input type="password"
                    id="psw"
                    onChange={(e) => setUserPassword(e.target.value)} />

                <button onClick={onClickRegister}>
                    Register
                </button>
                {registered &&
                    <div className='info_box'>
                        Sucessfully registered!
                        <Link to="/login"
                            className='navbar_link'>Login</Link>
                    </div>
                }
            </form>


        </>
    )
}
