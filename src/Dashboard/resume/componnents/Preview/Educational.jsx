/* eslint-disable react/prop-types */
function Educational({resumeInfo}) {
    if (!resumeInfo?.education?.length) {
        return null; // Return null if no skills are present
      }
  return (
    <div className="my-6">
        <h2 className="text-center font-bold text-sm mb-2">Education</h2>
        <hr></hr>
        {resumeInfo?.education.map((education,index)=>{
            return (<div className="my-5" key={index} >
                    <h2 className="text-sm font-bold">{education?.universityName}</h2>
                    <h2 className="flex justify-between text-xs">{education?.degree} in {education?.major}
                    <span>{education?.startDate} - {education?.endDate}</span></h2>
                    <p className="my-2 text-xs">{education?.description}</p>
                    
                </div>)
        })}
        <hr></hr>
        </div>
  )
}

export default Educational