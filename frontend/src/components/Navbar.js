import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../css/main.css"

export const Navbar = () => {
    const authData = useSelector(state => state.authData)
    const { isLogged, userEmail, userId } = authData

    return (
        <>
            <div className='navbar'>
                <Link to="/" className='navbar_link'>Main Page</Link>
                {isLogged ?
                    <>
                        <Link to="/add-friend"
                            className='navbar_link'>Add friend</Link>
                        <Link to="/invitations"
                            className='navbar_link'>Invitations</Link>
                        <Link to="/chats"
                            className='navbar_link'>Chats</Link>
                        <Link to="/logout"
                            className='navbar_link'>Logout</Link>
                        <span className='navbar_link'> {userEmail} </span>
                    </>
                    :
                    <Link to="/login"
                        className='navbar_link'>Login</Link>
                }
            </div>
            <hr />
        </>
    )
}
