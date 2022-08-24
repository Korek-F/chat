import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewChat, getFriendList } from '../../actions/chatActions'

export const NewChat = ({ setShowAddMenu }) => {
    const dispatch = useDispatch()
    const authData = useSelector(state => state.authData)
    const { userId } = authData
    const chatData = useSelector(state => state.chatData)
    const { friends } = chatData

    const [selectedUsers, setSelectedUsers] = useState([])
    const [chatName, setChatName] = useState("")

    const addOrRemoveUser = (user) => {
        if (selectedUsers.find(u => u.id === user.id)) {
            setSelectedUsers(prevState => prevState.filter(u => u.id !== user.id))
        } else {
            setSelectedUsers(prevState => [...prevState, user])
        }
        console.log(selectedUsers)
    }

    const createChat = () => {
        dispatch(createNewChat(selectedUsers, chatName))
        setShowAddMenu(false)
    }

    useEffect(() => {
        dispatch(getFriendList(userId))
    }, [dispatch, userId])

    return (
        <div className="add_new_chat">
            <span onClick={() => setShowAddMenu(false)}>x</span>
            NewChat
            <input type="text"
                placeholder='New chat name'
                onChange={(e) => setChatName(e.target.value)} />

            {friends && friends.map(f =>
                <div key={f.id}>

                    <span onClick={() => addOrRemoveUser(f)}>
                        {selectedUsers.find(user => user.id === f.id) ? "x " : "+ "}
                    </span>
                    {f.username}

                </div>
            )}
            <button onClick={createChat}>
                Create new chat
            </button>
        </div>
    )
}
