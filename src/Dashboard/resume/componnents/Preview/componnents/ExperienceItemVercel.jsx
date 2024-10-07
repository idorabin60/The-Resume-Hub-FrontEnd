/* eslint-disable react/prop-types */

function ExperienceItemVercel({exp}) {
    return (
        <div>
          <h3 className="font-semibold">{exp?.title}- {exp.companyName}</h3>
          <p className="text-sm text-gray-600">{exp?.startDate} - {exp?.currentlyWorking?"present":exp.endDate} | {exp?.city}</p>
          <p className="list-disc list-inside mt-2 space-y-1">
            {exp.workSummery}
          </p>
        </div>
      )
}

export default ExperienceItemVercel