import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Chat } from './Chat'
import "../../css/main.css"
import { getChats } from '../../actions/chatActions'
import { NewChat } from './NewChat'

export const Chats = () => {
    const [showAddMenu, setShowAddMenu] = useState(false)

    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chatData)
    const { chats } = chatData
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
                <h2>Your chats:</h2>
                <div className="create_new_chat"
                    onClick={() => setShowAddMenu(true)}>
                    +
                </div>

                {chats.map(c =>
                    <div key={c.id}
                        onClick={() => setCurrentChat(c.id)}
                        className="chat_link"
                    >
                        {c.name ? c.name :
                            c.users.map(u => u.username + " ")}
                    </div>
                )}

            </div>
            <hr />
            <div className='chat_left_side'>
                {currentChat && <Chat currentChat={currentChat} />}
            </div>



            {showAddMenu && <NewChat setShowAddMenu={setShowAddMenu} />}

        </div>
    )
}
