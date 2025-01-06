'use client'

import { useState } from 'react'
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"

interface Case {
    id: string;
    name: string;
    client: string;
    status: string;
    lastUpdated: string;
}

export default function MyCasesPage() {
    const [cases, setCases] = useState<Case[]>([
        { id: '1', name: 'Smith v. Johnson', client: 'John Smith', status: 'Active', lastUpdated: '2023-06-15' },
        { id: '2', name: 'Doe v. City of Springfield', client: 'Jane Doe', status: 'Pending', lastUpdated: '2023-06-10' },
        { id: '3', name: 'In re Estate of Brown', client: 'Brown Family', status: 'Closed', lastUpdated: '2023-05-28' },
    ])

    const [newCase, setNewCase] = useState<Omit<Case, 'id' | 'lastUpdated'>>({
        name: '',
        client: '',
        status: 'Active',
    })

    const handleAddCase = () => {
        const caseToAdd: Case = {
            ...newCase,
            id: (cases.length + 1).toString(),
            lastUpdated: new Date().toISOString().split('T')[0],
        }
        setCases([...cases, caseToAdd])
        setNewCase({ name: '', client: '', status: 'Active' })
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedNavbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Cases</h1>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add New Case</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Case</DialogTitle>
                                <DialogDescription>Enter the details for the new case.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="caseName" className="text-right">Case Name</Label>
                                    <Input
                                        id="caseName"
                                        value={newCase.name}
                                        onChange={(e) => setNewCase({ ...newCase, name: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="clientName" className="text-right">Client Name</Label>
                                    <Input
                                        id="clientName"
                                        value={newCase.client}
                                        onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddCase}>Add Case</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Case Name</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cases.map((case_) => (
                                    <TableRow key={case_.id}>
                                        <TableCell>{case_.name}</TableCell>
                                        <TableCell>{case_.client}</TableCell>
                                        <TableCell>{case_.status}</TableCell>
                                        <TableCell>{case_.lastUpdated}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

