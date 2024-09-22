import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetail from "./Preview/PersonalDetail";
import Summery from "./Preview/Summery";
import ProfessionalExp from "./Preview/ProfessionalExp";
import Educational from "./Preview/Educational";
import Skils from "./Preview/Skils";

function ResumePreview() {
    const [resumeInfo,setResumeInfo] = useContext(ResumeInfoContext);
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]" style={{
        borderColor: resumeInfo?.themeColor
    }}> 
        {/* personnal de exp */}
        <PersonalDetail resumeInfo = {resumeInfo} />
        <Summery resumeInfo={resumeInfo}/>
        <ProfessionalExp resumeInfo={resumeInfo} />
        <Educational resumeInfo={resumeInfo} />
        <Skils resumeInfo={resumeInfo}/>
        {/* profeesinal exp */}
        {/*Sumery*/}
        {/*Edujcation*/}
        {/*skills*/}

        



    </div>
  )
}

export default ResumePreview