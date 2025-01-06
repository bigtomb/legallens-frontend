import './App.css'
import Home from "./app/home.tsx"
import Layout from './components/Layout';
import RequireAuth from "./components/RequireAuth.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./app/login/page.tsx";
import SignupPage from "./app/signup/page.tsx";
import AboutPage from "./app/about/page.tsx";
import ProfilePage from "./app/profile/profile.tsx";
import SettingsPage from "./app/settings/settings.tsx";
import MyCasesPage from "./app/cases/cases.tsx";
import Dashboard from "@/app/dashboard/dashboard.tsx";
import LegalResearchDashboard from "./app/research/research.tsx";
import DocumentAnalysisPage from "./app/analysis/analysis.tsx";
import UnauthorizedPage from "./app/unauthorized/unauthorized.tsx";
import AdminDashboard from "./app/admin/dashboard/page.tsx";
import PersistLogin from "@/components/PersistLogin.tsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignupPage/>}/>
                    <Route path="about" element={<AboutPage/>}/>


                    <Route element={<PersistLogin/>}>

                        {/* PROTECTED ROUTES*/}
                        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]}/>}>
                            <Route path="dashboard" element={<Dashboard/>}/>
                            <Route path="profile" element={<ProfilePage/>}/>
                            <Route path="settings" element={<SettingsPage/>}/>
                            <Route path="cases" element={<MyCasesPage/>}/>
                            <Route path="research" element={<LegalResearchDashboard/>}/>
                            <Route path="analysis" element={<DocumentAnalysisPage/>}/>
                        </Route>

                        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                            <Route path="admin/dashboard" element={<AdminDashboard/>}/>
                        </Route>
                    </Route>
                    <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
