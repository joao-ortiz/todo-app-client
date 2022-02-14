import { useState } from "react"
import taskService from "../../services/task.service"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
const CreateTask = ({projectId, onClose, pushTask}) => {
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [errorMessage, setErrorMessage] = useState("")

    const addTask = () => {
        const task = {description, createdAt: new Date(), deadline: date, done: false}
        taskService.createTask(projectId, task)
            .then(response => {
                if(response) {
                    console.log(response)
                    onClose()
                    pushTask(response)
                } else {
                    setErrorMessage(response)
                }
            })
    }

    return <div className="create-task-container">
        <span className="task-close" onClick={onClose}>x</span>
        <h2 className="create-task-tittle">Add Task</h2>
        <Input label="task description" type="text" value={description} onChange={setDescription} />
        <ReactDatePicker selected={date} onChange={(date) => setDate(date)} />
        <Button value="add" action={addTask} />
        {errorMessage.length > 0 ? <p>{errorMessage}</p> : null}
    </div>
}

export default CreateTask