
import './App.css'
import Home from "./app/home.tsx"
import {Route, Routes} from "react-router";
import LoginPage from "./app/login/login.tsx";

function App() {
  return (
    <>
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage/>}/>
        </Routes>
    </>
  )
}

export default App
