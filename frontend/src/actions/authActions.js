import { TRY_LOGIN, BASE_URL, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, TRY_REGISTER, REGISTER_SUCCESS, REGISTER_ERROR, } from "../types";
import axios from 'axios'

export const login = (email, password) => async dispatch => {
    dispatch({
        type: TRY_LOGIN
    })
    try {
        const res = await axios.post(`${BASE_URL}auth/api/token/`, { email, password })

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        console.log("Tokens", res.data)
        if (res.data.refresh) {
            localStorage.setItem('user_tokens', JSON.stringify(res.data))
        }

    }
    catch (e) {
        console.log("ERROR", e)
        dispatch({
            type: LOGIN_ERROR,
            payload: e.response?.data
        })

    }

}

export const register = (email, username, password) => async dispatch => {
    dispatch({
        type: TRY_REGISTER
    })
    try {
        const res = await axios.post(`${BASE_URL}auth/registration`, { email, username, password })
        dispatch({
            type: REGISTER_SUCCESS
        })
    } catch (e) {
        console.log("ERROR1", e)
        console.log("ERROR2", e.response?.data)
        dispatch({
            type: REGISTER_ERROR,
            payload: e.response?.data
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

