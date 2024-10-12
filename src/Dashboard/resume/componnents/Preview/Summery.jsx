/* eslint-disable react/prop-types */

function Summery({resumeInfo}) {
  // if (resumeInfo?.summery=='') {
  //   return null; // Return null if the summary is null or an empty string
  // }
  return (
    <p className="text-xs">{resumeInfo.summery}</p>
  )
}

export default Summery;
