import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import FormSection from "../../componnents/FormSection";
import ResumePreview from "../../componnents/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import dummy from "@/data/dummy";
import GlobalApi from "../../../../../service/GlobalApi";
import dummy from "@/data/dummy";
function EditResume() {
    const params = useParams();
    const [resumeInfo,setResumeInfo] = useState(null);
    useEffect(() => {
        if (params?.resumeId) {
          GlobalApi.getResumeById(params.resumeId).then((res) => {
            setResumeInfo(dummy);
          });
        }
      }, [params.resumeId]);
      if (!resumeInfo) {
        return <div>Loading...</div>; // Optional: You can use a spinner or other loading UI here
      }
  return (
    <ResumeInfoContext.Provider value={[resumeInfo,setResumeInfo]}>
    <div className=" grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <div><FormSection/></div>
        <div><ResumePreview/></div>
       

    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume