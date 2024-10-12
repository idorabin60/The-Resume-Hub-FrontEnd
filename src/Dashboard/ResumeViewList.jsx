/* eslint-disable no-unused-vars */
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import {
  PlusCircle,
  FileText,
  Users,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";

function ResumeViewList() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [openDialog, setOpenDialog] = useState(false); // Fixed spelling
  const [resumeTitle, setResumeTitle] = useState();
  const [isLoading, setIsLoading] = useState(false); // Fixed casing
  const navigation = useNavigate();
  const onCreate = async () => {
    setIsLoading(true); // Fixed casing
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
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
  }, []);

  const GetResumeList = async () => {
    try {
      setLoading(true); // Start loading
      const resp = await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      setResumeList(resp.data.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">CV Manager</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="#"
                  className="border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <FileText className="mr-2" size={18} />
                  CVs
                </Link>
                <Link
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Users className="mr-2" size={18} />
                  Contacts
                </Link>
                <Link
                  href="#"
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>CV List</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Create new CV section */}
            <div className="mb-6 flex items-center">
              <Input
                type="text"
                placeholder="Enter new CV name"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="mr-2"
              />
              <Button onClick={() => onCreate()} disabled={!resumeTitle}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New CV
              </Button>
            </div>

            {/* CV Table */}
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
                        style={{ color: "inherit", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                        onMouseLeave={(e) => (e.target.style.color = "inherit")}
                      >
                        {cv.title}
                      </Link>
                    </TableCell>

                    <TableCell>{cv.company}</TableCell>
                    <TableCell>
                      <Link
                        href={cv.companyName}
                        className="text-blue-600 hover:underline inline-flex items-center"
                        target="_blank"
                      >
                        View Job
                        <ExternalLink className="ml-1" size={14} />
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">{"sdas"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default ResumeViewList;
