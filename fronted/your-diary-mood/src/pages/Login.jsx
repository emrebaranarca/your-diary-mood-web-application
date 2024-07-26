import Navbar from "../components/Navbar"
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom"

function Login() {

    return (
        <>
            <Navbar />
            <LoginForm/>
        </>
    )
}

export default Login
