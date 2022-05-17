import { ACCEPT_INVITATION, ACCEPT_INVITATION_ERROR, ACCEPT_INVITATION_SUCCESS, DELETE_ERRORS, GET_CHATS, GET_CHATS_ERROR, GET_CHATS_SUCCESS, GET_FRIEND_LIST, GET_FRIEND_LIST_ERROR, GET_FRIEND_LIST_SUCCESS, GET_INVITATIONS, GET_INVITATIONS_ERROR, GET_INVITATIONS_SUCCESS, SEARCH_FRIENDS, SEARCH_FRIENDS_ERROR, SEARCH_FRIENDS_SUCCESS, SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST_ERROR, SEND_FRIEND_REQUEST_SUCCESS } from "../types";

const initalState = {
    chatLoading: false,
    friends: [],
    error: false,
    invitations: [],
    chats: [],
    searched_friends_data: [],
    searched_users: [],

}

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_FRIEND_LIST:
            return {
                ...state,
                chatLoading: true,
                error: false,
                friends: []
            }
        case GET_FRIEND_LIST_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: false,
                friends: action.payload
            }
        case GET_FRIEND_LIST_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload,
                friends: []
            }
        case GET_INVITATIONS:
            return {
                ...state,
                chatLoading: true,
                error: false,
                invitations: [],
            }
        case GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: false,
                invitations: action.payload
            }
        case GET_INVITATIONS_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload,
                invitations: [],
            }
        case ACCEPT_INVITATION:
            return {
                ...state,
                chatLoading: true,
                error: false,
                invitations: [],
            }
        case ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: false,
                invitations: action.payload
            }
        case ACCEPT_INVITATION_ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload,
                invitations: []
            }
        case SEND_FRIEND_REQUEST:
            return {
                ...state,
                chatLoading: true,
                error: false,
            }
        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                error: false,
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
                error: false,
                chatLoading: true,
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                error: false,
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
                error: false,
                chatLoading: false
            }
        case SEARCH_FRIENDS:
            return {
                ...state,
                error: false,
                searched_friends_data: [],
                searched_users: [],
                chatLoading: true,
            }
        case SEARCH_FRIENDS_SUCCESS:
            return {
                ...state,
                error: false,
                searched_friends_data: action.payload,
                searched_users: action.payload.results,
                chatLoading: false,
            }
        case SEARCH_FRIENDS_ERROR:
            return {
                ...state,
                error: action.payload,
                chatLoading: false,
                searched_users: [],
                searched_friends_data: [],
            }
        default: return state
    }
}