/* eslint-disable react/prop-types */
import React from 'react'

function EducationComponnent({education}) {
    return (
        <section className="mb-8">
          <div className="space-y-2">
            <h3 className="font-semibold">{education.institute}</h3>
            <p className="text-sm text-gray-600">{education.startDate}-{education.endDate}</p>
            <p>{education.degree}</p>
            <p className="text-sm">
              {education.summery}
            </p>
          </div>
        </section>
      )
}

export default EducationComponnent