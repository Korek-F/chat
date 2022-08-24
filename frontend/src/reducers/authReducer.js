import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../types";
import jwt_decode from 'jwt-decode'

const tokens = JSON.parse(localStorage.getItem("user_tokens"))

const initalState = tokens ? {
    isLogged: true,
    userId: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || null,
    userEmail: jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_email || null,
    registered: false
} : {
    isLogged: false,
    userId: null,
    userEmail: null,
    registered: false
}

export default function (state = initalState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                userId: jwt_decode(action.payload.access).user_id,
                userEmail: jwt_decode(action.payload.access).user_email,
            }
        case LOGIN_ERROR:
            localStorage.removeItem("user_tokens");
            return {
                ...state,
                isLogged: false,
                userId: null,
                userEmail: null
            }
        case LOGOUT:
            localStorage.removeItem("user_tokens");
            return {
                ...state,
                isLogged: false,
                userId: null,
                userEmail: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registered: true,

            }
        default: return state
    }
}

//jwt_decode(JSON.parse(localStorage.getItem("user_tokens")).access).user_id || {},