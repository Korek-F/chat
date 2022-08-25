import React from 'react'
import { useDispatch } from 'react-redux'
import "../../css/main.css"
import { ERROR } from '../../types'


export const Error = ({ error }) => {

    const dispatch = useDispatch()

    return (
        <>
            {error &&

                <div className='error'>
                    <h2>ERROR</h2>
                    {Object.keys(error).map(e =>
                        <>
                            {Array.isArray(error[e]) ?
                                error[e].map(d => <p key={d}> {d} </p>) :
                                <p>{error[e]}</p>
                            }
                        </>
                    )}


                    <button className='btn_close'
                        onClick={() => dispatch({ type: ERROR, payload: false })}>
                        X
                    </button>
                </div>
            }
        </>
    )
}
