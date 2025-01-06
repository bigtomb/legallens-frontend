'use client'

import { useState } from 'react'
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import useAuth  from "../../hooks/useAuth.ts";

export default function ProfilePage() {
    // @ts-ignore
    const {auth} = useAuth()
    // @ts-ignore
    const [user, setUser] = useState({
        name: auth.first_name + " " + auth.last_name,
        email: auth.email,
        avatar: '/placeholder.svg?height=100&width=100',
        role: auth.role || "",
        company: auth.company || "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the updated user data to your backend
        console.log('Profile updated', user)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedNavbar />
            <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={user.role}
                                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={user.company}
                                        onChange={(e) => setUser({ ...user, company: e.target.value })}
                                    />
                                </div>
                                <Button type="submit">Update Profile</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="w-32 h-32 mb-4">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline">Change Picture</Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Two-Factor Authentication</span>
                            <Button variant="outline">Enable</Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Change Password</span>
                            <Button variant="outline">Update</Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-red-600">Delete Account</span>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

