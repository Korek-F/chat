import { BASE_URL, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS, LOADING, ERROR, STOP_LOADING, } from "../types";
import axios from 'axios'

export const login = (email, password) => async dispatch => {
    localStorage.removeItem("user_tokens");
    dispatch({
        type: LOADING
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
            type: ERROR,
            payload: get_error(e)
        })
    }
    dispatch({
        type: STOP_LOADING
    })

}

export const register = (email, username, password) => async dispatch => {
    dispatch({
        type: LOADING
    })
    try {
        await axios.post(`${BASE_URL}auth/registration`, { email, username, password })
        dispatch({
            type: REGISTER_SUCCESS
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: get_error(e)
        })
    }

    dispatch({
        type: STOP_LOADING
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

const get_error = (e) => {
    console.log(e)
    if (e.request.status === 404) {
        return { "data": "Not Found" }
    }
    return e.response?.data || { "CONNECTION": "CONNECTION LOST." }
}
