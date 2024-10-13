import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../componnents/FormSection";
import ResumePreview from "../../componnents/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Loader2 } from "lucide-react";

// import dummy from "@/data/dummy";
import GlobalApi from "../../../../../service/GlobalApi";
function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (params?.resumeId) {
      GlobalApi.getResumeById(params.resumeId)
        .then((res) => {
          setIsLoading(true);
          setResumeInfo(res.data.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params.resumeId]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[297mm]">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  } else {
    return (
      <ResumeInfoContext.Provider value={[resumeInfo, setResumeInfo]}>
        <div className=" grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
          <div>
            <FormSection />
          </div>
          <div>
            <ResumePreview />
          </div>
        </div>
      </ResumeInfoContext.Provider>
    );
  }
}

export default EditResume;
