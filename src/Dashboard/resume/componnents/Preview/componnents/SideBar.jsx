import LanguagesSection from "./LanguagesVercel"
import SkillsSection from "./SkillsVercel"
function Sidebar({resumeInfo}) {
    return (
      <div>
        <LanguagesSection resumeInfo={resumeInfo} />
        <SkillsSection resumeInfo={resumeInfo} />
      </div>
    )
  }
export default Sidebar