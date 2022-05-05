import { TRY_LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../types";
import jwt_decode from 'jwt-decode'

const tokens = JSON.parse(localStorage.getItem("user_tokens"))

const initalState = tokens ? {
    error: false,
    loading: false,
    isLogged: true,
    userId: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || null,
    userEmail: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_email || null,
} : {
    error: false,
    loading: false,
    isLogged: false,
    userId: null,
    userEmail: null
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
                error: true,
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
        default: return state
    }
}

//jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || {},