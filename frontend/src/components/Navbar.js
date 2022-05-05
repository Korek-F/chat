import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../css/main.css"

export const Navbar = () => {
    const authData = useSelector(state => state.authData)
    const { isLogged, userEmail, userId } = authData

    return (
        <div className='navbar'>
            <Link to="/">Main Page</Link>
            {isLogged ?
                <>
                    <Link to="/add-friend">Add friend</Link>
                    <Link to="/invitations">Invitations</Link>
                    <Link to="/logout">Logout</Link>
                    <span> {userEmail} </span>
                </>
                :
                <Link to="/login">Login</Link>
            }
        </div>
    )
}
