import {Navbar} from '../../components/Navbar'
import {Button} from "../../components/ui/button"
import {Input} from "../../components/ui/input"
import {Label} from "../../components/ui/label"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "../../components/ui/card"
import {Link} from "react-router";
import {useRef, useState, useEffect, useContext} from "react";
import {useNavigate, useLocation} from "react-router-dom";
// @ts-ignore
import axios from "../../api/axios"
import {jwtDecode} from "jwt-decode";
import useAuth  from "../../hooks/useAuth.ts";

const LOGIN_URL = "/auth/login/"


export default function LoginPage() {
    // @ts-ignore
    const {setAuth} = useAuth()
    const userRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(LOGIN_URL,
                { email: email, password: pwd},
                {
                    headers: { 'content-type': 'application/json'},
                    withCredentials: true
                },
            );

            const accessToken = response?.data?.access;
            const decodedAccessToken = jwtDecode(accessToken);
            const role = decodedAccessToken.role;

            setAuth({email, role, accessToken});
            setEmail("");
            setPwd("");
            navigate(from, {replace: true});

        } catch (err)
        {
            // @ts-ignore
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Email or Password")
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg("Login Failed")
            }
            // @ts-ignore
            errRef.current.focus();
        }


    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live={"assertive"}>{errMsg}
            </p>
            <div className="min-h-screen bg-gray-100">
                <Navbar/>
                <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Log in to LegalLens</CardTitle>
                            <CardDescription className="text-center">Enter your credentials to access your
                                account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        ref={userRef}
                                        placeholder="you@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        value={email}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Log in</Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}

