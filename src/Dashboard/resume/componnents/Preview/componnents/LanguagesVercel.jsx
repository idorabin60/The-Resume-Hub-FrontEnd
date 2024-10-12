/* eslint-disable react/prop-types */
function LanguagesSection({ resumeInfo }) {
    // if (!resumeInfo?.Languages?.length) {
    //     return null; // Return null if no skills are present
    //   }
    return (
      <section className="mb-8">
        <h2 className="text-3xl font-serif mb-4">Languages</h2>
        <p className="text-sm">
          {resumeInfo?.Languages?.map((language, index) => (
            <span key={index}>
              {language.title}
              {index < resumeInfo.Languages.length - 1 ? " • " : ""}
            </span>
          ))}
        </p>
      </section>
    );
  }
  
  export default LanguagesSection;
  