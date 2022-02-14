import { useContext, useState } from "react"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import Divider from "../../Components/Divider"
import UserContext from "../../Context/UserContext"
import project from "../../services/project.service"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
const CreateProject = ({onClose, addProject}) => {
    const [title, setTitle] = useState("")
    const [newTask, setTask] = useState({description: "", done: false, deadline: new Date() })
    const [tasks, setTasks] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const user = useContext(UserContext)

    const createProject = () => {
        project.createProject(title, tasks,user.id)
            .then(response => {
                console.log(response)
                if(response) {
                    setTitle("")
                    setTasks([])
                    setTask({description: "", done: false, deadline: "" })
                    onClose()
                    addProject(response)
                } else {
                    setErrorMessage(response)
                }
            })
    }

    const addTask = () => {
        const createdAt = new Date()
        setTasks(prev => {
            return [
                ...prev,
                {...newTask,createdAt}
            ]
        })
        setTask({description: "", done: false, deadline: "" })
    }
    return <div className="new-project-container">
        <span className="close" onClick={onClose}>x</span>
        <h2 className="new-project-title">Create Project</h2>
        <Divider />
        <Input label="title" type="text" value={title} onChange={setTitle}/>
        <Divider />
        <h2 className="new-project-add-title">Add tasks</h2>
        <Input label="task description" type="text" value={newTask.description} onChange={(e) => setTask(prev => {return {...prev,description: e}})} />
        <ReactDatePicker selected={newTask.deadline} onChange={(date) => setTask(prev =>{ return {...prev, deadline: date}})} />
        <Button value="add" action={addTask} />
        <Divider />
        <Button value="create" action={createProject} />
        {errorMessage.length > 0 ? <p>{errorMessage}</p> : null}
    </div>
}

export default CreateProject