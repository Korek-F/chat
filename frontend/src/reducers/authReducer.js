import { TRY_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, DELETE_ERRORS, REGISTER_SUCCESS, REGISTER_ERROR } from "../types";
import jwt_decode from 'jwt-decode'

const tokens = JSON.parse(localStorage.getItem("user_tokens"))

const initalState = tokens ? {
    error: false,
    loading: false,
    isLogged: true,
    userId: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || null,
    userEmail: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_email || null,
    registered: false
} : {
    error: false,
    loading: false,
    isLogged: false,
    userId: null,
    userEmail: null,
    registered: false
}

export default function (state = initalState, action) {
    switch (action.type) {
        case TRY_LOGIN:
            localStorage.removeItem("user_tokens");
            return {
                ...state,
                error: false,
                loading: true,
                userId: null,
                userEmail: null

            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                isLogged: true,
                userId: jwt_decode(action.payload.access).user_id,
                userEmail: jwt_decode(action.payload.access).user_email,

            }
        case LOGIN_ERROR:
            localStorage.removeItem("user_tokens");
            return {
                ...state,
                error: action.payload,
                loading: false,
                isLogged: false,
                userId: null,
                userEmail: null
            }
        case LOGOUT:
            localStorage.removeItem("user_tokens");
            return {
                ...state,
                error: false,
                loading: false,
                isLogged: false,
                userId: null,
                userEmail: null
            }
        case DELETE_ERRORS:
            return {
                ...state,
                error: false,
                loading: false
            }
        case TRY_LOGIN:
            return {
                ...state,
                loading: true,
                error: false,
                registered: false,

            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                registered: true,

            }
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                registered: false,

            }
        default: return state
    }
}

//jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || {},