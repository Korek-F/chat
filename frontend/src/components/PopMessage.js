import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "../css/main.css"
import { DELETE_MESSAGES } from '../types'

export const PopMessage = ({ message }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: DELETE_MESSAGES })
        }, 3000)
    }, [])

    return (
        <div className="popup_message">
            {message}
        </div>
    )
}
