import { useNavigate } from "react-router-dom"
import axios from 'axios'

const LoginForm=()=>{
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const userData = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
        }
        try {
            const res=await axios.post('http://localhost:3000/api/v1/sign-in',
                userData
            )
            sessionStorage.setItem('accessToken', res.data.accessToken)
            navigate('/profile')
        } catch (error) {
            if(error.response.data.error){
                alert(error.response.data.error)
            }
            if(error.response.data.message){
                alert(error.response.data.message)
            }


            console.error('There was an error registering the user:', error)
        }

    }
    return(
        <>          
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" name="email"/>
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" name="password" />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a 
                                        className="link-danger" onClick={()=>navigate("/register")} >Register</a></p>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginForm