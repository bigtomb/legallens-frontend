import {Link} from 'react-router'
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "../hooks/use-toast.ts"
import { Upload, FileText, AlertCircle } from 'lucide-react'
import {useState} from "react";
// @ts-ignore
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";

const UPLOAD_URL = "api/process-document/"
export function AuthenticatedHome() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUploadAndAnalyze = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload and analyze.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate file upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    let analysis
    var formData = new FormData();
    formData.append("document", file);
    // Simulate file upload and processing
    try {
      const response = await axiosPrivate.post(UPLOAD_URL, formData
          , {
            headers: {'content-type': 'multipart/form-data'},
            withCredentials: true
          }
      );
      analysis = response.data;
      console.log(analysis)
    } catch (err) {
      console.log(err)
    }

    // Simulate successful upload and analysis initiation
    setIsUploading(false)

    // Navigate to the analysis page
    navigate(`/analysis`, {state: {file, analysis}})
  }

  return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to LegalLens</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="text-left">
              <CardTitle>Upload Legal Document</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <form onSubmit={handleUploadAndAnalyze} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="document">Document</Label>
                  <Input
                      id="document"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt"
                  />
                </div>
                <Button type="submit" disabled={!file || isUploading}>
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload and Analyze'}
                </Button>
              </form>
              <div className="mt-4 text-sm text-gray-500">
                Supported formats: PDF, DOCX, TXT (Max size: 10MB)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-left">
              <CardTitle>Recent Analyses</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
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
            <CardHeader className="text-left">
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
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
