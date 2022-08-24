import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFriendList } from '../actions/chatActions';
export const MainPage = () => {
    const dispatch = useDispatch()

    const authData = useSelector(state => state.authData)
    const chatData = useSelector(state => state.chatData)

    const { isLogged, userId } = authData
    const { chatLoading, friends } = chatData

    useEffect(() => {
        if (isLogged && userId) {
            dispatch(getFriendList(userId))
        }
    }, [dispatch, isLogged, userId])

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

        </div>
    )
}
