import { Navbar } from '../../components/Navbar'
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { AlertCircle } from 'lucide-react'
import {Link} from "react-router";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
                            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
                            Unauthorized Access
                        </CardTitle>
                        <CardDescription className="text-center">
                            You don't have permission to access this page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-gray-600 mb-4">
                            Please log in with an account that has the necessary permissions, or return to the homepage.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center space-x-4">
                        <Button asChild variant="default">
                            <Link to="/login">Log In</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/">Go to Homepage</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

