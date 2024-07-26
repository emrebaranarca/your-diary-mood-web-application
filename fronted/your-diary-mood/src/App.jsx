import Register from "./pages/Register";
import Login from "./pages/Login"
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route element={<PrivateRoute/>}>
              <Route path="/profile" element={<Profile/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
