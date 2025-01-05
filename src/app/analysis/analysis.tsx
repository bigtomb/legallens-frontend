'use client'

import { useState, useEffect } from 'react'
import {useLocation} from "react-router-dom"
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar'
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { FileText, Download, Share2 } from 'lucide-react'




interface AnalysisResult {
    summary: string;
    keyPoints: string[];
    relevantCases: string[];
    legalIssues: string[];
}

interface Document {
    id: string;
    name: string;
    uploadDate: string;
}

export default function DocumentAnalysisPage() {
    const [progress, setProgress] = useState(0)
    const [analysisComplete, setAnalysisComplete] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
    const [document, setDocument] = useState<Document | null>(null)

    const location = useLocation()
    const {analysis} = location.state || {};
    const {file} = location.state || {};




    useEffect(() => {
        // Simulating fetching document information
        setDocument({
            id: '123',
            name: file.name,
            uploadDate: 'June 20, 2023'
        })

        // Simulating analysis progress
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(timer)
                    setAnalysisComplete(true)
                    return 100
                }
                const diff = Math.random() * 10
                return Math.min(oldProgress + diff, 100)
            })
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (analysisComplete) {
            // Simulating API call to get analysis results
            setTimeout(() => {
                setAnalysisResult({
                    summary: analysis.summary,
                    keyPoints: analysis.key_points,
                    // [
                    //     "Sale of 1000 units of Product X",
                    //     "Price: $50 per unit",
                    //     "Delivery within 30 days",
                    //     "Payment due within 45 days of delivery"
                    // ],
                    relevantCases: analysis.relevant_cases,
                    // [
                    //     "Smith v. Jones (2019) - Similar contract dispute",
                    //     "ABC Corp v. XYZ Inc (2020) - Interpretation of delivery terms"
                    // ],
                    legalIssues: analysis.legal_issues,
                    //     [
                    //     "Potential ambiguity in force majeure clause",
                    //     "Jurisdiction for dispute resolution not clearly specified"
                    // ]
                })
            }, 1000)
        }
    }, [analysisComplete])

    return (

        <div className="min-h-screen bg-gray-100 text-left">
            <AuthenticatedNavbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Document Analysis</h1>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="mr-2" />
                                Document: {document?.name || 'Loading...'}
                            </CardTitle>
                            <CardDescription>Uploaded on {document?.uploadDate || 'Loading...'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!analysisComplete ? (
                                <div className="space-y-2">
                                    <Progress value={progress} className="w-full" />
                                    <p className="text-sm text-gray-500">Analysis in progress... {Math.round(progress)}% complete</p>
                                </div>
                            ) : (
                                <p className="text-sm text-green-600">Analysis complete</p>
                            )}
                        </CardContent>
                    </Card>

                    {analysisResult && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Analysis Results</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="summary">
                                    <TabsList>
                                        <TabsTrigger value="summary">Summary</TabsTrigger>
                                        <TabsTrigger value="keyPoints">Key Points</TabsTrigger>
                                        <TabsTrigger value="relevantCases">Relevant Cases</TabsTrigger>
                                        <TabsTrigger value="legalIssues">Legal Issues</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="summary" className="mt-4">
                                        <p>{analysisResult.summary}</p>
                                    </TabsContent>
                                    <TabsContent value="keyPoints" className="mt-4">
                                        <ul className="list-disc pl-5 space-y-2">
                                            {analysisResult.keyPoints.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </TabsContent>
                                    <TabsContent value="relevantCases" className="mt-4">
                                        <ul className="list-disc pl-5 space-y-2">
                                            {analysisResult.relevantCases.map((case_, index) => (
                                                <li key={index}>{case_}</li>
                                            ))}
                                        </ul>
                                    </TabsContent>
                                    <TabsContent value="legalIssues" className="mt-4">
                                        <ul className="list-disc pl-5 space-y-2">
                                            {analysisResult.legalIssues.map((issue, index) => (
                                                <li key={index}>{issue}</li>
                                            ))}
                                        </ul>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    )}

                    <div className="mt-6 flex space-x-4">
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Download Full Report
                        </Button>
                        <Button variant="outline">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Analysis
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

