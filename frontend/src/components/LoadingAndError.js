import React from 'react'
import { useDispatch } from 'react-redux'
import "../css/main.css"
import { DELETE_ERRORS } from '../types'
export const LoadingAndError = ({ loading, error }) => {

    const dispatch = useDispatch()

    const erros_array = []

    Object.keys(error).forEach(function (key) {
        erros_array.push(`${key.toUpperCase()} - ${error[key]}`)
    })

    return (
        <>

            {(loading || error) &&

                <div className='loading_and_error'>
                    {loading ? <h1>Loading</h1> : ""}

                    {erros_array.map((e, i) => <div key={i}>{e}</div>)}


                    <button onClick={() => dispatch({ type: DELETE_ERRORS })}>Close</button>
                </div>
            }
        </>
    )
}
