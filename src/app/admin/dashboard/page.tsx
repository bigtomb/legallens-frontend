'use client'

import { useState } from 'react'
import { AuthenticatedNavbar } from '../../../components/AuthenticatedNavbar'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../..//components/ui/tabs"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, FileText, Activity, Search, DollarSign, Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"

// Mock data for the dashboard
const userActivityData = [
    { name: 'Mon', users: 120 },
    { name: 'Tue', users: 150 },
    { name: 'Wed', users: 180 },
    { name: 'Thu', users: 190 },
    { name: 'Fri', users: 160 },
    { name: 'Sat', users: 100 },
    { name: 'Sun', users: 90 },
]

const documentAnalysisData = [
    { name: 'Jan', documents: 65 },
    { name: 'Feb', documents: 85 },
    { name: 'Mar', documents: 110 },
    { name: 'Apr', documents: 95 },
    { name: 'May', documents: 130 },
    { name: 'Jun', documents: 150 },
]

const userTypeData = [
    { name: 'Attorneys', value: 400 },
    { name: 'Paralegals', value: 300 },
    { name: 'Researchers', value: 200 },
    { name: 'Admins', value: 50 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const recentUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Attorney', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Paralegal', status: 'Active' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Researcher', status: 'Inactive' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Attorney', status: 'Active' },
    { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active' },
]

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('All')
    const [statusFilter, setStatusFilter] = useState('All')

    const filteredUsers = recentUsers.filter(user =>
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (roleFilter === 'All' || user.role === roleFilter) &&
        (statusFilter === 'All' || user.status === statusFilter)
    )

    return (
        <div className="min-h-screen bg-gray-100 text-left">
            <AuthenticatedNavbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                                <p className="text-xs text-muted-foreground">+10% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Documents Analyzed</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5,678</div>
                                <p className="text-xs text-muted-foreground">+23% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">892</div>
                                <p className="text-xs text-muted-foreground">+5% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$89,432</div>
                                <p className="text-xs text-muted-foreground">+15% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>User Activity</CardTitle>
                                        <CardDescription>Daily active users over the past week</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={userActivityData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="users" fill="#3b82f6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Document Analysis Trend</CardTitle>
                                        <CardDescription>Monthly document analysis count</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={documentAnalysisData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="documents" stroke="#8884d8" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Distribution</CardTitle>
                                    <CardDescription>Breakdown of user types</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={userTypeData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {userTypeData.map((_entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="users" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>Manage and filter users</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                                        <div className="flex-1">
                                            <Label htmlFor="search" className="sr-only">Search users</Label>
                                            <div className="relative">
                                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="search"
                                                    placeholder="Search users..."
                                                    className="pl-8"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 md:max-w-[200px]">
                                            <Label htmlFor="role-filter" className="sr-only">Filter by role</Label>
                                            <Select value={roleFilter} onValueChange={setRoleFilter}>
                                                <SelectTrigger id="role-filter">
                                                    <SelectValue placeholder="Filter by role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="All">All Roles</SelectItem>
                                                    <SelectItem value="Attorney">Attorney</SelectItem>
                                                    <SelectItem value="Paralegal">Paralegal</SelectItem>
                                                    <SelectItem value="Researcher">Researcher</SelectItem>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex-1 md:max-w-[200px]">
                                            <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
                                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                <SelectTrigger id="status-filter">
                                                    <SelectValue placeholder="Filter by status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="All">All Statuses</SelectItem>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredUsers.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.role}</TableCell>
                                                    <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.status}
                            </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                                        <Button variant="outline" size="sm">Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="documents" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Document Management</CardTitle>
                                    <CardDescription>Manage and analyze legal documents</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center mb-4">
                                        <Input placeholder="Search documents..." className="max-w-sm" />
                                        <Button>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload New Document
                                        </Button>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Document Name</TableHead>
                                                <TableHead>Uploaded By</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Contract_A.pdf</TableCell>
                                                <TableCell>Alice Johnson</TableCell>
                                                <TableCell>2023-06-15</TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Analyzed</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                                                    <Button variant="outline" size="sm">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Case_Brief_123.docx</TableCell>
                                                <TableCell>Bob Smith</TableCell>
                                                <TableCell>2023-06-14</TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Processing</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                                                    <Button variant="outline" size="sm">Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="settings" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>System Settings</CardTitle>
                                    <CardDescription>Configure system-wide settings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                                                <p className="text-sm text-gray-500">Enable maintenance mode to prevent user access</p>
                                            </div>
                                            <Switch id="maintenance-mode" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label htmlFor="user-registration">User Registration</Label>
                                                <p className="text-sm text-gray-500">Allow new user registrations</p>
                                            </div>
                                            <Switch id="user-registration" defaultChecked />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="max-upload-size">Maximum Upload Size (MB)</Label>
                                            <Input id="max-upload-size" type="number" defaultValue={10} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="default-user-role">Default User Role</Label>
                                            <Select defaultValue="researcher">
                                                <SelectTrigger id="default-user-role">
                                                    <SelectValue placeholder="Select default role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="attorney">Attorney</SelectItem>
                                                    <SelectItem value="paralegal">Paralegal</SelectItem>
                                                    <SelectItem value="researcher">Researcher</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button>Save Settings</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

