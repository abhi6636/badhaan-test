import axios from "axios"
import { getUserData} from './Storage'

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

export const RegisterApi = (inputs)=>{
    let data  = {displayName:inputs.name,email:inputs.email,password:inputs.password }
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQX5cwuZTxBM9mDq7ktVgCwd_pB04ph1A",data)
}
export const LoginApi = (inputs)=>{
    let data  = {email:inputs.email,password:inputs.password }
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQX5cwuZTxBM9mDq7ktVgCwd_pB04ph1A",data)
}
export const UserDetailsApi = ()=>{
    let data = {idToken:getUserData()}
    return axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQX5cwuZTxBM9mDq7ktVgCwd_pB04ph1A",data)
}

export const PasswordApi = (inputs) => {
    let data = {password:inputs.password}
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyAQX5cwuZTxBM9mDq7ktVgCwd_pB04ph1A',data)
}

export const UpdateApi = (inputs) => {
    let data = {password:inputs.password}
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key==AIzaSyAQX5cwuZTxBM9mDq7ktVgCwd_pB04ph1A',data)
}