import { combineReducers } from "redux";
import authReducer from './authReducer'
import chatReducer from "./chatReducer";

export default combineReducers({
    authData: authReducer,
    chatData: chatReducer,
})