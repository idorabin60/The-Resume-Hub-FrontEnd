import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetail from "./Preview/PersonalDetail";
import Summery from "./Preview/Summery";
import ProfessionalExp from "./Preview/ProfessionalExp";
import Educational from "./Preview/Educational";
import Skils from "./Preview/Skils";
import Header from "./Preview/componnents/Header";
import SummeryVercel from "./Preview/componnents/SummeryVercel";
import ExperienceVercel from "./Preview/componnents/ExperienceVercel";
import SkillsSection from "./Preview/componnents/SkillsVercel";
import LanguagesSection from "./Preview/componnents/LanguagesVercel";
import Sidebar from "./Preview/componnents/SideBar";
function ResumePreview() {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]">
      {/* personnal de exp */}
      <Header resumeInfo={resumeInfo} />
      <SummeryVercel resmeInfo={resumeInfo} />
      <div className="grid grid-cols-3 gap-8">
        <ExperienceVercel resumeInfo={resumeInfo} />
        <Sidebar resumeInfo={resumeInfo} />
      </div>
      {/* <PersonalDetail resumeInfo = {resumeInfo} />
        <Summery resumeInfo={resumeInfo}/>
        <ProfessionalExp resumeInfo={resumeInfo} />
        <Educational resumeInfo={resumeInfo} />
        <Skils resumeInfo={resumeInfo}/> */}
      {/* profeesinal exp */}
      {/*Sumery*/}
      {/*Edujcation*/}
      {/*skills*/}
    </div>
  );
}

export default ResumePreview;
