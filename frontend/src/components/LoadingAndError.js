import React from 'react'
import { useDispatch } from 'react-redux'
import "../css/main.css"
import { ERROR } from '../types'
export const LoadingAndError = ({ loading, error }) => {

    const dispatch = useDispatch()




    return (
        <>

            {(loading || error) &&

                <div className='loading_and_error'>
                    {loading ? <h1>Loading</h1> : ""}
                    {error ?
                        <div>{Object.keys(error).map(e =>
                            <>
                                {Array.isArray(error[e]) ?
                                    error[e].map(d => <p key={d}> {d} </p>) :
                                    <p>{error[e]}</p>
                                }
                            </>
                        )}</div> : ""
                    }



                    <button onClick={() => dispatch({ type: ERROR, payload: false })}>Close</button>
                </div>
            }
        </>
    )
}
