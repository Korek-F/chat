import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendInvitation } from '../actions/chatActions'

export const AddFriend = () => {
    const [userName, setUserName] = useState("")
    const chatData = useSelector(state => state.chatData)
    const dispatch = useDispatch()
    const { chatLoading, error } = chatData

    const AddFriendClick = () => {
        dispatch(sendInvitation(userName))
    }
    return (
        <div>
            <h1>Add a Friend </h1>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />

            <button onClick={AddFriendClick}
                disabled={chatLoading ? true : false}
            >Add</button>

            <>
                {error ? <div>{error}</div> : ""}
            </>
        </div>
    )
}
