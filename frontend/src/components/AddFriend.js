import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendList, searchFriends, sendInvitation } from '../actions/chatActions'
import "../css/main.css"
import { Pagination } from './pagination/Pagination'


export const AddFriend = () => {
    const chatData = useSelector(state => state.chatData)
    const authData = useSelector(state => state.authData)
    const dispatch = useDispatch()
    const { chatLoading, searched_friends_data, searched_users } = chatData
    const { userId } = authData

    const [userName, setUserName] = useState("")
    const [currentPage, setCurrentPage] = useState(1)




    useEffect(() => {
        dispatch(getFriendList(userId))
    }, [dispatch, userId])

    const searchFriendClick = () => {
        if (userName) {
            setCurrentPage(1)
            dispatch(searchFriends(userName, currentPage))
        }
    }

    const changePageClick = (page) => {
        dispatch(searchFriends(userName, page))
        setCurrentPage(page)
    }

    return (
        <div>
            <h1>Add a Friend </h1>
            <div className='search_box'>
                <input type="text" className='my_input'
                    placeholder='Type your friends name'
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={searchFriendClick}
                    className="my_btn search_btn"
                    disabled={chatLoading ? true : false}
                >Search</button>
            </div>

            <Pagination pagination_data={searched_friends_data}
                currentPage={currentPage} changePage={changePageClick} />

            {searched_users.map(f =>
                <div key={f.id} className="profile">
                    {f.username}
                    <button className='my_btn btn_success'
                        onClick={() => dispatch(sendInvitation(f.username))}>Add</button>
                </div>
            )}


        </div>
    )
}
