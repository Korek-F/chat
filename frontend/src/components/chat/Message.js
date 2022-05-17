import React from 'react'

export const Message = ({ message }) => {
    return (
        <div>
            <small>{message.author_username}</small>
            &nbsp;
            <small>{message.date.split(" ")[1]}</small>
            <br />
            {message.content}</div>
    )
}
