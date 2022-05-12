import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChats } from '../actions/chatActions'
import { Chat } from './Chat'
import { LoadingAndError } from './LoadingAndError'
import "../css/main.css"

export const Chats = () => {
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chatData)
    const authData = useSelector(state => state.authData)
    const { chatLoading, error, chats } = chatData
    const { userId } = authData
    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        dispatch(getChats())
    }, [dispatch])


    useEffect(() => {
        if (chats.length > 0) {
            setCurrentChat(chats[0].id)
        }
    }, [chats])

    return (
        <div className='chats'>
            <div className='chat_friends'>
                {chats.map(c =>
                    <div key={c.id} onClick={() => setCurrentChat(c.id)}>
                        {c.users.find(u => u.id !== userId).username}
                    </div>
                )}
            </div>
            <hr />
            <div className='chat_left_side'>
                {currentChat && <Chat currentChat={currentChat} />}
            </div>

            <LoadingAndError loading={chatLoading} error={error} />

        </div>
    )
}
