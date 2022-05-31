import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/authActions'
import "../css/main.css"
import { DELETE_ERRORS } from '../types'
export const LoadingAndError = ({ loading, error }) => {

    const dispatch = useDispatch()



    if (error?.code === "token_not_valid") {
        dispatch(logout())
    }

    return (
        <>

            {(loading || error) &&

                <div className='loading_and_error'>
                    {loading ? <h1>Loading</h1> : ""}

                    {error ? <div>{error.detail}</div> : ""}



                    <button onClick={() => dispatch({ type: DELETE_ERRORS })}>Close</button>
                </div>
            }
        </>
    )
}
