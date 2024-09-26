/* eslint-disable react/prop-types */
function ProfessionalExp({resumeInfo}) {
    if (!resumeInfo?.experience?.length) {
        return null; // Return null if no skills are present
      }
  return (
    <div className="my-6">
        <h2 className="text-center font-bold text-sm mb-2">Proffesional Exp</h2>
        <hr></hr>
        {resumeInfo?.experience.map((exp,index)=>{
          return  (<div key={index}>
                <h2 className="text-sm font-bold my-3">{exp?.title}</h2>
                <h2 className="text-xs flex justify-between">{exp?.companyName} {exp?.city}
                {exp?.state}
                <span className="my-1">{exp?.startDate} - {exp?.currentlyWorking?"present":exp.endDate}</span></h2>
                <p>{exp.workSummery}</p>
                <hr></hr>

           
            </div>)
        })}
    </div>

  )
}


export default ProfessionalExp