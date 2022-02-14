import Modal from "../Components/Modal"
import Button from "../Components/Button"
import Divider from "../Components/Divider"
import CreateProject from "./Home/CreateProject"
import projectService from "../services/project.service"
import UserContext from "../Context/UserContext"
import ProjectLink from "./Home/ProjectLink"
import { useState, useContext, useEffect } from "react"
import authService from "../services/auth.service"

const Home = ({setUser}) => {
    const user = useContext(UserContext)
    const [projects, setProjects] = useState([])
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        projectService.getUserProjects(user.id)
        .then(res => {
            setProjects(res)
        })   
    }, [user.id]) 

    const addProject = (project) => {
        console.log(project)
        setProjects(prev => {
            return [...prev, project]
        })
    }

    const logout = () => {
            authService.logout() 
            setUser(undefined)
    }

    return <div className="home-container">
        <Button value="logout" action={logout} />
        <h1 className="home-title">Hello {user.username}!</h1>
        <h2 className="projects-title">Current projects</h2>
        <Divider />
        <div className="projects-container">
            {projects.length > 0 ? projects.map(proj => <ProjectLink key={proj._id} project={proj} />) : <p>There are no projects yet.</p>}
        </div>
        <Button value="create task" action={() => setVisible(true)} />
        {
            visible ? 
            <Modal>
                <CreateProject addProject={addProject} onClose={() => setVisible(false)}/>
            </Modal> 
            : null
        }
    </div>
}

export default Home