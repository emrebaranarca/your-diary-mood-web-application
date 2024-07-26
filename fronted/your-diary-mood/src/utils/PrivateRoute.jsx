import { Outlet,Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if(accessToken){
        return <Outlet />
    }else{
        return <Navigate to='/' />
    }
    }
export default PrivateRoute