import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext } from "react";
import Header from "./Preview/componnents/Header";
import SummeryVercel from "./Preview/componnents/SummeryVercel";
import ExperienceVercel from "./Preview/componnents/ExperienceVercel";

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
    </div>
  );
}

export default ResumePreview;
