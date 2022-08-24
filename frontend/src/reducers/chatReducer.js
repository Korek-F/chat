import { ACCEPT_INVITATION_SUCCESS, DELETE_MESSAGES, GET_CHATS_SUCCESS, GET_FRIEND_LIST_SUCCESS, GET_INVITATIONS_SUCCESS, SEARCH_FRIENDS_SUCCESS, SEND_FRIEND_REQUEST_SUCCESS, ERROR, LOADING, STOP_LOADING, CREATE_NEW_CHAT_SUCCESS } from "../types";

const initalState = {
    chatLoading: false,
    friends: [],
    error: false,
    invitations: [],
    chats: [],
    searched_friends_data: [],
    searched_users: [],
    message: false,

}

export default function (state = initalState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                chatLoading: false,
                error: action.payload
            }

        case LOADING:
            return {
                ...state,
                chatLoading: true,
                error: false,
            }
        case STOP_LOADING:
            return {
                ...state,
                chatLoading: false
            }
        case GET_FRIEND_LIST_SUCCESS:
            return {
                ...state,
                friends: action.payload
            }

        case GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                invitations: action.payload
            }

        case ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                invitations: action.payload,
                message: "Invitation accepted .You are friends now!"
            }

        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                message: "Invitation sended."
            }
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: action.payload,
            }

        case DELETE_MESSAGES:
            return {
                ...state,
                message: false,
            }
        case SEARCH_FRIENDS_SUCCESS:
            return {
                ...state,
                searched_friends_data: action.payload,
                searched_users: action.payload.results,
            }
        case CREATE_NEW_CHAT_SUCCESS:
            return {
                ...state,
                message: "Chat created successfully!",
                chats: action.payload,
            }
        default: return state
    }
}