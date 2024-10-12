import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ResumeInfoContext } from "@/context/ResumeInfoContext"
import ResumePreview from "@/Dashboard/resume/componnents/ResumePreview"
import GlobalApi from "../../../service/GlobalApi"
import { Loader2, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DownloadView() {
  const params = useParams()
  const navigate = useNavigate()
  const [resumeInfo, setResumeInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params?.resumeId) {
      setIsLoading(true)
      GlobalApi.getResumeById(params.resumeId)
        .then((res) => {
          setResumeInfo(res.data.data)
        })
        .catch((error) => {
          console.error("Error fetching resume:", error)
          // You might want to show an error message to the user here
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [params?.resumeId])
  
  const handleDownload = () => {
    window.print()
  }

  const handleGoBack = () => {
    navigate(-1) 
  }

  return (
    <ResumeInfoContext.Provider value={[resumeInfo, setResumeInfo]}>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleGoBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-[297mm]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : resumeInfo ? (
            <div id="resume-preview" className="bg-white shadow-lg w-[210mm] h-[297mm] mx-auto">
              <ResumePreview />
            </div>
          ) : (
            <div className="text-center text-red-500">
              Failed to load resume. Please try again.
            </div>
          )}
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}