import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { getFriendList } from '../actions/chatActions';
export const MainPage = () => {
    const dispatch = useDispatch()

    const authData = useSelector(state => state.authData)
    const chatData = useSelector(state => state.chatData)

    const { isLogged, userEmail, userId } = authData
    const { chatLoading, friends } = chatData

    useEffect(() => {
        if (isLogged && userId) {
            dispatch(getFriendList(userId))
        }
    }, [isLogged])

    return (
        <div>
            MainPage
            <div>
                {isLogged ?
                    <>
                        {chatLoading ? <span>Loading</span>
                            : <div>
                                {friends.map(friend =>
                                    <div key={friend.id}>
                                        {friend.username}
                                    </div>
                                )}
                            </div>}
                    </>
                    :
                    <span>Login to see your friends</span>
                }
            </div>
        </div>
    )
}
