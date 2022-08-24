import axios from "axios";
import { BASE_URL, GET_FRIEND_LIST_SUCCESS, GET_INVITATIONS_SUCCESS, ACCEPT_INVITATION_SUCCESS, SEND_FRIEND_REQUEST_SUCCESS, GET_CHATS_SUCCESS, SEARCH_FRIENDS_SUCCESS, ERROR, LOADING, STOP_LOADING, CREATE_NEW_CHAT_SUCCESS } from "../types";

export const getFriendList = (userId) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`${BASE_URL}chat/friend-list/${userId}`, {
            "headers": authHeader()
        })
        dispatch({
            type: GET_FRIEND_LIST_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const getInvitations = () => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`${BASE_URL}chat/friend-request-to-user`, {
            "headers": authHeader()
        })
        dispatch({
            type: GET_INVITATIONS_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const acceptInvitation = (invitationId) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.put(`${BASE_URL}chat/accept-request`,
            { "id": invitationId },
            { "headers": authHeader() })
        dispatch({
            type: ACCEPT_INVITATION_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const sendInvitation = (userName) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        await axios.post(`${BASE_URL}chat/add-friend`,
            { "username": userName },
            { "headers": authHeader() }
        )
        dispatch({
            type: SEND_FRIEND_REQUEST_SUCCESS,
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const getChats = () => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`${BASE_URL}chat/chats`, { "headers": authHeader() })
        dispatch({
            type: GET_CHATS_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const searchFriends = (username, page_id) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.get(`${BASE_URL}chat/search-friend/${username}?p=${page_id}`, { "headers": authHeader() })
        dispatch({
            type: SEARCH_FRIENDS_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const createNewChat = (ids, name) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        })
        const res = await axios.post(`${BASE_URL}chat/create-chat`,
            { "name": name, "ids": ids },
            { "headers": authHeader() }
        )
        dispatch({
            type: CREATE_NEW_CHAT_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}


const get_error = (e) => {
    console.log(e)
    if (e.request.status === 404) {
        return { "data": "Not Found" }
    }
    return e.response?.data || { "CONNECTION": "CONNECTION LOST." }
}


export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user_tokens'))
    if (user && user.access) {
        return { "Authorization": 'Bearer ' + user.access };
    } else {
        return {}
    }
}