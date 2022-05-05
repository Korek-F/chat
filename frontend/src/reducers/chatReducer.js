import { ACCEPT_INVITATION, ACCEPT_INVITATION_ERROR, ACCEPT_INVITATION_SUCCESS, GET_FRIEND_LIST, GET_FRIEND_LIST_ERROR, GET_FRIEND_LIST_SUCCESS, GET_INVITATIONS, GET_INVITATIONS_SUCCESS, SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST_ERROR, SEND_FRIEND_REQUEST_SUCCESS } from "../types";

const initalState = {
    chatLoading: false,
    friends: [],
    error: [],
    invitations: []
}

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_FRIEND_LIST:
            return {
                ...state,
                chatLoading: true,
                error: [],
                friends: []
            }
        case GET_FRIEND_LIST_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: [],
                friends: action.payload
            }
        case GET_FRIEND_LIST_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: [true],
                friends: []
            }
        case GET_INVITATIONS:
            return {
                ...state,
                chatLoading: true,
                error: [],
                invitations: [],
            }
        case GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: [],
                invitations: action.payload
            }
        case GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: [true],
                invitations: [],
            }
        case ACCEPT_INVITATION:
            return {
                ...state,
                chatLoading: true,
                error: [],
                invitations: [],
            }
        case ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: [],
                invitations: action.payload
            }
        case ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: [true],
                invitations: []
            }
        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                chatLoading: true,
                error: [],
            }
        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: [],
            }
        case SEND_FRIEND_REQUEST_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload,
            }
        default: return state
    }
}