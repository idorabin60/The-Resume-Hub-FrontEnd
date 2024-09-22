import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItemCard from "./ResumeItemCard";

function ResumeViewList() {
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (user) {
            GetResumeList();
        }
    }, []);

    const GetResumeList = async () => {
        try {
            setLoading(true); // Start loading
            const resp = await GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress);
            setResumeList(resp.data.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            {loading ? ( // Display loader if fetching
                <div className="flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 md:px-20 lg:px-32">
                    {resumeList.length > 0 ? (
                        resumeList.map((resume, index) => (
                            <ResumeItemCard resume={resume} key={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            No resumes found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ResumeViewList;
