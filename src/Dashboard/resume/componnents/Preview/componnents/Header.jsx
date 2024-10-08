/* eslint-disable react/prop-types */
import PersonalDetailsVercel from './PersonalDetailsVercel'
// eslint-disable-next-line react/prop-types
function Header({ resumeInfo }) {
    return (
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-6xl font-serif mb-4">{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
            <h2 className="text-2xl text-gray-600">{resumeInfo?.jobTitle}</h2>
          </div>
          <PersonalDetailsVercel resumeInfo={resumeInfo} /> {/* Passing resumeInfo as a prop */}
        </header>
      )
}

export default Header
