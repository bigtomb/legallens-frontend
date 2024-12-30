import {Link} from 'react-router'
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Upload, FileText, AlertCircle } from 'lucide-react'

export function AuthenticatedHome() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-left">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to LegalLens</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload Legal Document</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="document">Document</Label>
                <Input id="document" type="file" />
              </div>
              <Button type="submit">
                <Upload className="mr-2 h-4 w-4" /> Upload and Analyze
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-500">
              Supported formats: PDF, DOCX, TXT (Max size: 10MB)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link to="/analysis/1" className="flex items-center text-blue-600 hover:underline">
                  <FileText className="mr-2 h-4 w-4" />
                  Smith Contract.pdf
                </Link>
              </li>
              <li>
                <Link to="/analysis/2" className="flex items-center text-blue-600 hover:underline">
                  <FileText className="mr-2 h-4 w-4" />
                  Johnson v. City Case Brief.docx
                </Link>
              </li>
              <li>
                <Link to="/analysis/3" className="flex items-center text-blue-600 hover:underline">
                  <FileText className="mr-2 h-4 w-4" />
                  Intellectual Property Agreement.pdf
                </Link>
              </li>
            </ul>
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link to="/analyses">View All Analyses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload your legal document using the form above.</li>
              <li>Our AI will analyze the document, extracting key information and generating a summary.</li>
              <li>Review the AI-generated analysis, including summaries, key points, and potential issues.</li>
              <li>Use the insights to streamline your legal research and decision-making process.</li>
            </ol>
            <div className="mt-4 flex items-start p-4 bg-blue-50 rounded-md">
              <AlertCircle className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                LegalLens AI is designed to assist legal professionals, but it does not replace professional legal advice. Always review AI-generated content carefully and consult with qualified legal experts for critical decisions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

