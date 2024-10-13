import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import {
  LoaderCircle,
  PlusCircle,
  FileText,
  Users,
  Briefcase,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { GetCurrentDate } from "../../service/GetCurrentDate";

export default function ResumeViewList() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setIsLoading(true);
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      lastUpdated: GetCurrentDate(),
    };

    GlobalApi.createNewResume(data).then(
      (res) => {
        console.log(res);
        if (res) {
          setIsLoading(false);
          navigation("/dashboard/resume/" + res.data.data.documentId + "/edit");
        }
      },
      (error) => {
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  const GetResumeList = async () => {
    try {
      setLoading(true);
      const resp = await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      setResumeList(resp.data.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center"></div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="#"
                  className="border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <FileText className="mr-2" size={18} />
                  CVs
                </Link>
                <Link
                  to="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Users className="mr-2" size={18} />
                  Contacts
                </Link>
                <Link
                  to="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Briefcase className="mr-2" size={18} />
                  Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>CV List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center">
              <Input
                type="text"
                placeholder="Enter new CV name"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="mr-2"
              />
              <Button onClick={() => onCreate()} disabled={!resumeTitle}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create new CV"
                )}
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : resumeList.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No CVs created yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first CV.
                </p>
                <div className="mt-6">
                  <Button onClick={() => onCreate()} disabled={!resumeTitle}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create new CV
                  </Button>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">CV Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Posting</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumeList.map((cv) => (
                    <TableRow key={cv.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/dashboard/resume/${cv.documentId}/edit`}
                          className="text-primary hover:underline"
                        >
                          {cv.title}
                        </Link>
                      </TableCell>
                      <TableCell>{cv.company}</TableCell>
                      <TableCell>
                        {cv.jobLink ? (
                          <Link
                            to={cv.jobLink}
                            className="text-blue-600 hover:underline inline-flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Job
                            <ExternalLink className="ml-1" size={14} />
                          </Link>
                        ) : (
                          <span className="text-gray-500">
                            No link has been given yet
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{cv.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
