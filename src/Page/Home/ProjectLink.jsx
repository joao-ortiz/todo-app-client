import { Link } from "react-router-dom"

const ProjectLink = ({project}) => {
    return <Link className="project-link" to={`project/${project._id}`}>
        <h2>{project.title}</h2>
        <p>Tasks: {project.tasks.length}</p> 
    </Link>
}

export default ProjectLink