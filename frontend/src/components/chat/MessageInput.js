import React, { useEffect, useRef, useState } from 'react'

export const MessageInput = ({ ws }) => {
    const [myMessage, setMyMessage] = useState("")
    const sendInputRef = useRef()

    const createMessage = () => {
        if (!myMessage) return;
        console.log(myMessage)
        ws.send(JSON.stringify({
            'message': myMessage
        }))
        setMyMessage("")
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            createMessage();
        }
    }

    useEffect(() => {
        sendInputRef.current.focus()
    }, [ws])

    return (
        <div onKeyDown={handleKeyPress}>
            <input type="text" onChange={(e) => setMyMessage(e.target.value)}
                value={myMessage} className="message_input"
                ref={sendInputRef} />
            <button onClick={createMessage}
                className="message_send_btn"
            >Send</button>
        </div>
    )
}
