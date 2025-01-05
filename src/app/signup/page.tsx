import {Link} from 'react-router'
import {useRef, useState, useEffect} from "react";
import axios from "../../api/axios"
import {Navbar} from '../../components/Navbar'
import {Button} from "../../components/ui/button"
import {Input} from "../../components/ui/input"
import {Label} from "../../components/ui/label"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "../../components/ui/card"
import {useNavigate} from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register/';


export default function SignupPage() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");

    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);


    const [errMsg, seterrMsg] = useState("");
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        // @ts-expect-error
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])


    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        const match = pwd == matchPwd;
        setValidName(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        seterrMsg("");
    }, [name, pwd, matchPwd])

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                {
                    username: name,
                    email: email,
                    password: pwd,
                }, {
                    headers: {'content-type': 'application/json'},
                    withCredentials: true
                }
            );
            navigate("/login");
        } catch (err) {
            if (!err?.response) {
                seterrMsg("Np Server Response")
            } else if (err.response.status === 409) {
                seterrMsg("Username Taken")
            } else {
                seterrMsg("Registration Failed")
            }
            // @ts-ignore
            errRef.current.focus();
        }
    }


    // @ts-ignore
    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" :
                    "offscreen"} aria-live={"assertive"}>{errMsg}</p>
                <div className="min-h-screen bg-gray-100">
                    <Navbar/>
                    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-center">Sign up for LegalLens</CardTitle>
                                <CardDescription className="text-center">Create your account to get
                                    started</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            type="text"
                                            id="username"
                                            placeholder="John Doe"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            required
                                            aria-invalid={validName ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}

                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!name || !email || !pwd || !matchPwd}
                                    >Sign up</Button>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                        Log in
                                    </Link>
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

