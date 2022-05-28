import React, { useEffect, useRef, useState } from 'react'
import { Message } from './Message'
import { MessageInput } from './MessageInput'

export const Chat = ({ currentChat }) => {
    const [messagesArr, setMessageArr] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [ws, setWs] = useState()
    const token = JSON.parse(localStorage.getItem("user_tokens")).access

    const allMessagesBoxRef = useRef(null)


    useEffect(() => {
        let ws = new WebSocket(`ws://localhost:8000/ws/chat/${currentChat}/?token=${token}`)

        setWs(ws)
        ws.onclose = function (e) {
            console.error("chat socket closed")
        }
        ws.onmessage = function (e) {
            const data = JSON.parse(e.data);
            if (data instanceof Array) {
                setMessageArr(data.reverse())
            } else {
                setMessageArr(state => [...state, data.message])
            }
        }


        setIsReady(true)
        //Disconnecting on unmout component
        return () => {
            setMessageArr([])
            ws.close()
        }
    }, [currentChat])



    useEffect(() => {
        allMessagesBoxRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messagesArr])



    return (
        <div>
            <div className='chat_header'>
                {currentChat}
            </div>
            <div className='all_messages'>
                {messagesArr.map(m => <Message key={m.id} message={m} />)}
                <div ref={allMessagesBoxRef}></div>
            </div>
            <div className='message_input_box'>
                {isReady && <MessageInput ws={ws} />}
            </div>
        </div>
    )
}
