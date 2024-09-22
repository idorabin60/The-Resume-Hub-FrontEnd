/* eslint-disable react/prop-types */

function Summery({resumeInfo}) {
    console.log(resumeInfo?.summery);

  return (
    <p className="text-xs">{resumeInfo?.summery}</p>
  )
}

export default Summery