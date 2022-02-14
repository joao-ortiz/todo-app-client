import { useState } from "react"
import Button from "../Components/Button"
import Divider  from "../Components/Divider"
import Input from "../Components/Input"
import auth from "../services/auth.service"
import { Link } from "react-router-dom"
import history from "../history"

const SignUp = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const signup = () => {
        auth.signUp(username, password).then(response => {
            console.log(response)
            if(response.status === 200) {
                auth.login(username, password)
                    .then(res => {
                        setUser(res)
                        console.log(history)
                        history.push("/")
                        history.go()
                    })
            } else {
                setErrorMessage(response)
            }
        })
    }
    return <div className="login-container">
        <h1 className="login-title">SignUp</h1>
        <Divider />
        <Input label="username" type="text" value={username} onChange={setUsername}/>
        <Input label="senha" type="password" value={password} onChange={setPassword} />
        <Divider />
        <Button value="signup" action={signup} />
        <Link to="/" >Login</Link>
        {errorMessage.length > 0 ? <p>{errorMessage}</p> : null}
    </div>
}

export default SignUp