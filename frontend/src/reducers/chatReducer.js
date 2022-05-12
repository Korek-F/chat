import { ACCEPT_INVITATION, ACCEPT_INVITATION_ERROR, ACCEPT_INVITATION_SUCCESS, DELETE_ERRORS, GET_CHATS, GET_CHATS_ERROR, GET_CHATS_SUCCESS, GET_FRIEND_LIST, GET_FRIEND_LIST_ERROR, GET_FRIEND_LIST_SUCCESS, GET_INVITATIONS, GET_INVITATIONS_ERROR, GET_INVITATIONS_SUCCESS, SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST_ERROR, SEND_FRIEND_REQUEST_SUCCESS } from "../types";

const initalState = {
    chatLoading: false,
    friends: [],
    error: [],
    invitations: [],
    chats: []
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
        case GET_INVITATIONS_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: [action.payload],
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
        case GET_CHATS:
            return {
                ...state,
                chats: [],
                error: [],
                chatLoading: true,
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                error: [],
                chats: action.payload,
                chatLoading: false,
            }
        case GET_CHATS_ERROR:
            return {
                ...state,
                error: action.payload,
                chats: [],
                chatLoading: false
            }
        case DELETE_ERRORS:
            return {
                ...state,
                error: [],
                chatLoading: false
            }
        default: return state
    }
}