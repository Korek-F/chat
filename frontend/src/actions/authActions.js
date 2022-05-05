import { TRY_LOGIN, BASE_URL, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../types";
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
        })
    }

}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}