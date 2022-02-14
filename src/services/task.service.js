import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/task/"

const createTask = (projectId, task) => {
    return axios
        .post(API_URL + "create", {projectId, task},{headers: authHeader()})
        .then(response => {
            console.log(response.message)
            return response.data.task
        })
        .catch(err => {
            console.error(err.message)
            return err
        })
}

const updateTask = task => {
    return axios
        .put(API_URL + "update", { task}, {headers: authHeader()})
        .then(response => {
            console.log(response.message)
            return response
        })
        .catch(err => {
            console.error(err.message)
            return err
        })
}

const deleteTask = (projectId, taskId) => {
    console.log(projectId)
    return axios
        .put(API_URL + "delete", { projectId, taskId}, {headers: authHeader()})
        .then(response => {
            if(response.status === 200) {
                return true
            }
        })
        .catch(err => {
            console.error(err)
            return err
        })
}

export default {
    createTask,
    deleteTask,
    updateTask
}