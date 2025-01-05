import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
// import {Button} from "../components/ui/button.tsx";
import {AuthenticatedNavbar} from "../components/AuthenticatedNavbar.tsx";
import {AuthenticatedHome} from "../components/AuthenticatedHome.tsx";
// import {useState} from "react";
import useAuth  from "../hooks/useAuth.ts";

export default function HomePage() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // @ts-ignore
    const {auth} = useAuth()

    return (
        <div className="min-h-screen bg-gray-100">
            {auth.email ? <AuthenticatedNavbar /> : <Navbar />}
            {auth.email ? <AuthenticatedHome /> : <Hero />}
            {/*<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">*/}
            {/*    /!* This button is just for demonstration purposes *!/*/}
            {/*    <Button onClick={() => setIsLoggedIn(!isLoggedIn)} className="mt-4">*/}
            {/*        {isLoggedIn ? 'Logout' : 'Login'}*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    )
}


