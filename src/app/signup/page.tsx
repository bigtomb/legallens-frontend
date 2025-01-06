import {Link} from 'react-router'
import {useRef, useState, useEffect, FormEvent} from "react";
// @ts-ignore
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
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);
    const navigate = useNavigate();

    const [name] = useState("");
    const [, setValidName] = useState(false);
    const [, setNameFocus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const [email, setEmail] = useState("");
    const [validEmail] = useState(false);
    const [, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd] = useState(false);
    const [, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");

    const [validMatch] = useState(false);
    const [, setMatchFocus] = useState(false);


    const [errMsg, setErrMsg] = useState("");


    useEffect(() => {
        // @ts-expect-error
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(firstName));
    }, [name])


    useEffect(() => {
        PWD_REGEX.test(pwd);
        const match = pwd == matchPwd;
        setValidName(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [name, pwd, matchPwd])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post(REGISTER_URL,
                {
                    username: email.split('@')[0],
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: pwd,
                }, {
                    headers: {'content-type': 'application/json'},
                    withCredentials: true
                }
            );
            navigate("/login");
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response.status === 409) {
                setErrMsg("Username Taken")
            } else {
                setErrMsg("Registration Failed")
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
                                <form onSubmit={handleSubmit}
                                      className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            ref={userRef}
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            aria-describedby="uidnote"
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
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
                                        disabled={!firstName || !lastName || !email || !pwd || !matchPwd}
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

