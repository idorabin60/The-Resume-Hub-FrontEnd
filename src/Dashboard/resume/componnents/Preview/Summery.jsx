/* eslint-disable react/prop-types */

function Summery({resumeInfo}) {
    console.log(resumeInfo?.summery);

  return (
    <p className="text-xs"> asdasd{resumeInfo?.summery}</p>
  )
}

export default Summery