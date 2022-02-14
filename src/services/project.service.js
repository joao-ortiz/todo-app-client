import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/project/"


const createProject = (title, tasks, userId) => {
    return axios
        .post(API_URL + "create", {
            title,
            tasks,
            userId
        },
        {headers: authHeader()})
        .then(response => {
            console.log(response.data)
            return response.data.project
        })
        .catch(err =>{
            console.error(err.message)
            return err}
        )
}

const deleteProject = (userId, projectId) => {
    return axios
    .put(API_URL + "delete", {userId, projectId},
    {headers: authHeader()})
        .then(response => {
            console.log(response.data.message)
            return response.status
        })
        .catch(err => {
            console.error(err.message)
            return err
        })
}

const updateProject = title => {
    return axios
        .put(API_URL + "update", {title},
        {headers: authHeader()})
        .then(response => {
            console.log(response.message)
            return response
        })
        .catch(err => {
            console.error(err.essage)
            return err
        })
}

const getProject = projectId => {
    return axios
        .get(API_URL, {params:{projectId: projectId},headers: authHeader()})
        .then(response => {
            console.log(response)
            return response.data.project
        })
        .catch(err => {
            console.error(err.message)
            return err
        })
}

const getUserProjects = (userId) => {
    return axios
        .get(API_URL + "userprojects",{params: {userId}, headers: authHeader()})
        .then(response => {
            console.log(response.data, response.data.projects.length > 0)
            return response.data.projects.length > 0 ? response.data.projects : []
        })
        .catch(err => {
            console.error(err.response)
            return err.response.data.message
        })
}

export default {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getUserProjects
}