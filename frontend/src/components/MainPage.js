import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFriendList } from '../actions/chatActions';
import { LoadingAndError } from './LoadingAndError';
export const MainPage = () => {
    const dispatch = useDispatch()

    const authData = useSelector(state => state.authData)
    const chatData = useSelector(state => state.chatData)

    const { isLogged, userEmail, userId } = authData
    const { chatLoading, friends, error } = chatData

    useEffect(() => {
        if (isLogged && userId) {
            dispatch(getFriendList(userId))
        }
    }, [isLogged])

    return (
        <div>
            <h1>Chat With me! </h1>
            <>
                <h2>Friends:</h2>
                {isLogged ?
                    <>
                        {!chatLoading &&
                            <div>
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
            </>
            <LoadingAndError loading={chatLoading} error={error} />
        </div>
    )
}
