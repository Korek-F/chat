import React from 'react'
import { useDispatch } from 'react-redux'
import "../css/main.css"
import { DELETE_ERRORS } from '../types'
export const LoadingAndError = ({ loading, error }) => {

    const dispatch = useDispatch()


    return (
        <>

            {(loading || error.length > 0) &&

                <div className='loading_and_error'>
                    {loading ? "Loading" : ""}
                    {error.length > 0 ? <div>{error}</div> : ""}
                    <button onClick={() => dispatch({ type: DELETE_ERRORS })}>Close</button>
                </div>
            }
        </>
    )
}
