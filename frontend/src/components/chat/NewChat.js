import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendList } from '../../actions/chatActions'

export const NewChat = ({ setShowAddMenu }) => {
    const dispatch = useDispatch()
    const authData = useSelector(state => state.authData)
    const { userId } = authData


    useEffect(() => {
        dispatch(getFriendList())
    }, [dispatch])

    return (
        <div className="add_new_chat">
            <span onClick={() => setShowAddMenu(false)}>x</span>
            NewChat
        </div>
    )
}
