/* eslint-disable react/prop-types */
import EducationComponnent from "./EducationComponnent";

function EducationVercel({resumeInfo}) {
  return (
    <div>
      <section className="mb-8">
      <h2 className="text-3xl font-serif mb-4">Education</h2>
      <div className="space-y-2">
      {resumeInfo?.Educations.map((education,index)=>{
           return (<EducationComponnent key={index} education={education} />)
        })}
      </div>

      </section>
    </div>
  );
}

export default EducationVercel;
