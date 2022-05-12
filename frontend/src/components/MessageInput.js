import React, { useState } from 'react'

export const MessageInput = ({ ws }) => {
    const [myMessage, setMyMessage] = useState("")

    const createMessage = () => {
        if (!myMessage) return;
        console.log(myMessage)
        ws.send(JSON.stringify({
            'message': myMessage
        }))
        setMyMessage("")
    }
    return (
        <div>
            <input type="text" onChange={(e) => setMyMessage(e.target.value)}
                value={myMessage} className="message_input" />
            <button onClick={createMessage}
                className="message_send_btn"
            >Send</button>
        </div>
    )
}
