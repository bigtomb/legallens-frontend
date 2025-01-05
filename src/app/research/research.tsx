'use client'

import { useState } from 'react'
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Search, BookOpen, FileText, Clock } from 'lucide-react'

interface ResearchItem {
    id: string;
    title: string;
    type: string;
    lastAccessed: string;
}

export default function LegalResearchDashboard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [recentResearch] = useState<ResearchItem[]>([
        { id: '1', title: 'Smith v. Johnson Case Law', type: 'Case Law', lastAccessed: '2023-06-15' },
        { id: '2', title: 'Intellectual Property Statutes', type: 'Statute', lastAccessed: '2023-06-14' },
        { id: '3', title: 'Contract Law Principles', type: 'Legal Article', lastAccessed: '2023-06-13' },
    ])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Searching for:', searchQuery)
        // Here you would typically send the search query to your backend or AI service
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedNavbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Legal Research Dashboard</h1>

                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search case law, statutes, legal articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow"
                            />
                            <Button type="submit">
                                <Search className="mr-2 h-4 w-4" /> Search
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-20">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    Browse Case Law
                                </Button>
                                <Button variant="outline" className="h-20">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Explore Statutes
                                </Button>
                                <Button variant="outline" className="h-20">
                                    <Clock className="mr-2 h-5 w-5" />
                                    View Research History
                                </Button>
                                <Button variant="outline" className="h-20">
                                    AI-Assisted Research
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Research</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Last Accessed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentResearch.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.lastAccessed}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Research Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="caselaw">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="caselaw">Case Law</TabsTrigger>
                                <TabsTrigger value="statutes">Statutes</TabsTrigger>
                                <TabsTrigger value="articles">Legal Articles</TabsTrigger>
                            </TabsList>
                            <TabsContent value="caselaw">
                                <p className="text-sm text-gray-500 mt-2">
                                    Search and analyze case law from various jurisdictions. Use our AI-powered tools to find relevant precedents and legal arguments.
                                </p>
                                <Button className="mt-4">Explore Case Law</Button>
                            </TabsContent>
                            <TabsContent value="statutes">
                                <p className="text-sm text-gray-500 mt-2">
                                    Access up-to-date statutes and regulations. Our tools help you track changes and understand the implications of legal codes.
                                </p>
                                <Button className="mt-4">Browse Statutes</Button>
                            </TabsContent>
                            <TabsContent value="articles">
                                <p className="text-sm text-gray-500 mt-2">
                                    Read expert analysis and commentary on various legal topics. Stay informed about the latest developments in your practice areas.
                                </p>
                                <Button className="mt-4">Read Legal Articles</Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

