import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const dispatch = useDispatch()
    const authData = useSelector(state => state.authData)
    const { loading, error, isLogged } = authData
    const [userPassword, setUserPassword] = useState("filip@onet.pl")
    const [userEmail, setUserEmail] = useState("ZAQ!2wsx")
    let navigate = useNavigate();

    const onClickLogin = (e) => {
        e.preventDefault()
        dispatch(login(userEmail, userPassword))

    }

    useEffect(() => {
        if (isLogged) {
            navigate("/")
        }
    }, [isLogged])


    return (
        <div>
            <hr />
            <h1>Login</h1>
            <form>
                <label htmlFor="eml">Email</label>
                <input type="email"
                    id="eml"
                    onChange={(e) => setUserEmail(e.target.value)} />


                <label htmlFor="psw">Password</label>
                <input type="password"
                    id="psw"
                    onChange={(e) => setUserPassword(e.target.value)} />

                <button onClick={onClickLogin}>
                    Login
                </button>
            </form>
            <div>
                {loading ? "Loading" : ""}
                {error ? "Error" : ""}
            </div>
        </div>
    )
}
