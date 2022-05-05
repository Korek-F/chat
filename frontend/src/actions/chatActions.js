import axios from "axios";
import { GET_FRIEND_LIST, BASE_URL, GET_FRIEND_LIST_SUCCESS, GET_FRIEND_LIST_ERROR, GET_INVITATIONS, GET_INVITATIONS_SUCCESS, GET_INVITATIONS_ERROR, ACCEPT_INVITATION, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_ERROR, SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST_SUCCESS, SEND_FRIEND_REQUEST_ERROR } from "../types";

export const getFriendList = (userId) => async dispatch => {
    try {
        dispatch({
            type: GET_FRIEND_LIST
        })
        const res = await axios.get(`${BASE_URL}chat/friend-list/${userId}`, {
            "headers": authHeader()
        })
        console.log(res.data)
        dispatch({
            type: GET_FRIEND_LIST_SUCCESS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: GET_FRIEND_LIST_ERROR
        })
        console.log("ERROR", e)
    }
}

export const getInvitations = () => async dispatch => {
    try {
        dispatch({
            type: GET_INVITATIONS
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
            type: GET_INVITATIONS_ERROR
        })
        console.log("ERROR", e)
    }
}

export const acceptInvitation = (invitationId) => async dispatch => {
    try {
        dispatch({
            type: ACCEPT_INVITATION
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
            type: ACCEPT_INVITATION_ERROR
        })
        console.log("ERROR", e)
    }
}

export const sendInvitation = (userName) => async dispatch => {
    try {
        dispatch({
            type: SEND_FRIEND_REQUEST
        })
        const res = await axios.post(`${BASE_URL}chat/add-friend`,
            { "username": userName },
            { "headers": authHeader() }
        )
        dispatch({
            type: SEND_FRIEND_REQUEST_SUCCESS,

        })
    }
    catch (e) {
        dispatch({
            type: SEND_FRIEND_REQUEST_ERROR,
            payload: e.response.data.detail || e.response.data
        })
        console.log("ERROR", e)
    }
}


export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user_tokens'))
    if (user && user.access) {
        return { "Authorization": 'Bearer ' + user.access };
    } else {
        return {}
    }
}