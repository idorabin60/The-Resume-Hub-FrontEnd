import { useUser } from "@clerk/clerk-react"
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItemCard from "./ResumeItemCard";

function ResumeViewList() {
    const {user} = useUser();
    const [resumeList,setResumeList] = useState([]);
    useEffect(() => {
        if (user) {
            GetResumeList();
        }
    }, [user]);
    const GetResumeList = async ()=>{
        try {
            const resp = await GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress);
            setResumeList(resp.data.data);
            console.log(resumeList)
            
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 md:px-20 lg:px-32">
            {resumeList.length > 0 &&
                resumeList.map((resume, index) => (
                    <ResumeItemCard resume={resume} key={index} />
                ))}
        </div>
    );
}

export default ResumeViewList