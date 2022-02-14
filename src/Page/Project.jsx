import projectService from "../services/project.service"
import taskService from "../services/task.service"
import { Link, useParams } from "react-router-dom"
import Divider from "../Components/Divider"
import Modal from "../Components/Modal"
import Checkbox from "../Components/CheckBox"
import Button from "../Components/Button"
import { useState, useEffect, useContext } from "react"
import CreateTask from "./Project/CreateTask"
import UserContext from "../Context/UserContext"
import history from "../history"
const {getProject} = projectService
const {updateTask, deleteTask} = taskService

const Project = (props) => {
    console.log(props)
    const [visible, setVisible] = useState(false)
    const [project, setProject] = useState(undefined)
    const [ tasksDone, setTasksDone] = useState([])
    const [ tasksUndone, setTasksUndone] = useState([])
    const [showDone , setShowDone] = useState(false)
    const user = useContext(UserContext)
    const {id} = useParams()
    
    useEffect(()=> {
        getProject(id)
            .then(response => {
                setProject(response)
                setTasksDone(response.tasks.filter(task=> task.done))
                setTasksUndone(response.tasks.filter(task=> !task.done))
            })
    }, [id])

    if(project === undefined) {
        return <p>Loading...</p>
    }

    const setDone = (task) => {
        const taskDone = {...task}
        taskDone.done = true

        updateTask(taskDone)
            .then(response => {
                if(response) {
                    pullTask(task._id)
                    setTasksDone(prev => {
                        return [...prev, task]
                    })
                }
            })
    }

    const addTask = (task) => {
        setTasksUndone(prev => {
            return [...prev, task]
        })
    }
    
    const remove = (id, taskId) => {
        deleteTask(id, taskId)
            .then(response => {
                if(response) {
                    pullTask(taskId)
                }
            })
    }

    const pullTask = (taskId) => {
        const newTaskList = tasksUndone.filter(task => task._id !== taskId)
                    setTasksUndone(newTaskList)
    }

    const deleteProject = () => {
        projectService.deleteProject(user._id,id)
            .then(response => {
                if(response === 200) {
                    history.push("/")
                    history.go()
                }
            })
        
    }
    return <div className="project-container">
        <Link to="/">Go back</Link>
        <h1 className="project-title">{project.title}</h1>
        <Button value="delete project" action={deleteProject}/>
        <Divider />
        <Button value={showDone ? "Done tasks" : "Pending tasks"} action={() => setShowDone(prev => !prev)} />
        { !showDone ? <>
            <h1>Pending tasks:</h1>
            <div className="tasks-container">{
                tasksUndone.map((task, index) => {
                    return <div style={{animationDuration: `${0 + (index * 0.06)}s`}} className="task-card-container" key={task._id}>
                        <Checkbox onCheck={() => setDone(task)} label="pending"/>
                        <p className="task-description">{task.description}</p>
                        <span className="task-deadline">Task deadline: { new Date(task.deadline).toLocaleDateString()}</span>
                        <Button value="delete" action={() => remove(id ,task._id)}/>
                    </div>
                })
            }</div>
            </>
            :
            <>
            <h1>Done tasks:</h1>
            <div className="tasks-container">{
                tasksDone.map((task, index) => {
                    return <div style={{animationDuration: `${0 + (index * 0.06)}s`}} className="task-card-container done" key={task._id}>
                        <Checkbox onCheck={() => setDone(task)} label="done" value/>
                        <p className="task-description">{task.description}</p>
                    </div>
                })
            }</div>
            </>
        }
        <Divider />
        <Button value="add task" action={() => setVisible(true)} />
        {visible ? <Modal>
            <CreateTask pushTask={addTask} projectId={id} onClose={() => setVisible(false)}/>
        </Modal>
        : null    
        }
    </div>
}

export default Project