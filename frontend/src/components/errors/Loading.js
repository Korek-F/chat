import React from 'react'
import { useDispatch } from 'react-redux'
import "../../css/main.css"
import { ERROR } from '../../types'
export const Loading = ({ loading, error }) => {

    const dispatch = useDispatch()

    return (
        <>

            {loading &&
                <div className='loading'>
                    <h1>Loading</h1>
                </div>
            }
        </>
    )
}
