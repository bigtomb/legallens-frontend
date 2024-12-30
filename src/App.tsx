
import './App.css'
import Home from "./app/home.tsx"
import {Route, Routes} from "react-router";
import LoginPage from "./app/login/page.tsx";
import SignupPage from "./app/signup/page.tsx";
import AboutPage from "./app/about/page.tsx";
import ProfilePage from "./app/profile/profile.tsx";
import SettingsPage from "./app/settings/settings.tsx";

function App() {
  return (
    <>
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
            <Route path="about" element={<AboutPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            <Route path="settings" element={<SettingsPage/>}/>
        </Routes>
    </>
  )
}

export default App
