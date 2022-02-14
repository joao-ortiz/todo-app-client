import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/"

const login = async (username, password) => {
    return await axios
        .post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data
        })
        .catch(err => {
            console.error(err.response)
            return err.response
        })
}

const logout = () => {
    localStorage.removeItem("user")
}

const signUp = (username, password) => {
    return axios
        .post(API_URL + "signup", {
            username,
            password
        })
        .then(response => {
            if(response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response
        })
        .catch(err => {
            console.error(err.response.data.message)
            return err.response.data.message
        })
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export default {
    login,
    logout,
    signUp,
    getUser
}