import { useState } from "react"
import Button from "../Components/Button"
import Input from "../Components/Input"
import Divider from "../Components/Divider"
import auth from "../services/auth.service"
import { Link } from "react-router-dom"
import history from "../history"
const Login = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const attemptLogin = () => {
        auth.login(username, password)
            .then(response => {
                if(response.status === 200) {
                        setUser(response.data.user)
                        history.go()
                    } else {
                        setErrorMessage(response.data.message)
                    }
            })
    }
    return <div className="login-container">
        <h1 className="login-title">Login</h1>
        <Divider />
        <Input label="username" type="text" value={username} onChange={setUsername}/>
        <Input label="senha" type="password" value={password} onChange={setPassword} />
        <Divider />
        <Button value="login" action={attemptLogin} />
        <Link to="/signup" className="login-link">SignUp</Link>
        {errorMessage.length > 0 ? <p className="error-message">{errorMessage}</p> : null}
    </div>
}

export default Login