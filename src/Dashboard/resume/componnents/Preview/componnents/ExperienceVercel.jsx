/* eslint-disable react/prop-types */
import ExperienceItemVercel from "./ExperienceItemVercel"
function ExperienceVercel({resumeInfo}) {
    return (
    <div className="col-span-2">
    <section className="mb-8">
      <h2 className="text-3xl font-serif mb-4">Professional Experience</h2>
      <div className="space-y-6">
        {resumeInfo?.Experience.map((exp,index)=>{
           return (<ExperienceItemVercel key={index} exp={exp} />)
        })}
        </div>
    </section>
  </div>
)
}

export default ExperienceVercel