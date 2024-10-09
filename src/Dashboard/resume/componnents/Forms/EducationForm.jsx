import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import "draft-js/dist/Draft.css";
function EducationalForm() {
  const [educationList, setEducationList] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();

  const AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        institute: "",
        degree: "",
        city: "",
        startDate: "",
        endDate: "",
        summery: "",
      },
    ]);
  };
  useEffect(() => {
    console.log(resumeInfo);
    console.log(resumeInfo.Experience);
    if (resumeInfo?.Educations && resumeInfo.Educations.length > 0) {
      //HI CHAT GPT THIS LIKE WONT RUN I DONT SEE IT RUN EVEN THOUGH IT HAS AN EXPERICNR
      console.log(resumeInfo.Educations);
      setEducationList(resumeInfo.Educations);
    }
  }, []);

  const RemoveEducation = () => {
    setEducationList((prevEducationList) => {
      const updatedList = prevEducationList.slice(0, -1);

      // Update the resumeInfo context after removing an experience
      setResumeInfo((prevState) => ({
        ...prevState,
        Educations: updatedList,
      }));

      return updatedList;
    });
  };

  const handleChange = (index, event) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Educations: newEntries,
    }));

    // const handleRichTextEditor = (e, name, index) => {
    //   const newEntries = experinceList.slice();
    //   newEntries[index][name] = e.target.value;

    //   setExperinceList(newEntries);
    // };
  };
  const onSave = () => {
    setIsLoading(true);

    // Sanitize experience list by providing default values for missing fields
    const sanitizedExperienceList = educationList.map((education) => ({
      institute: education.institute || "Unknown Title",
      degree: education.degree || "Unknown Company",
      startDate: education.startDate || "2000-01-01", // Assuming date format is required
      endDate: education.endDate || "2000-01-01",
      summery: education.summery || "No summary provided",
    }));

    // Create the data payload with the sanitized experience list
    const data = { Educations: sanitizedExperienceList };

    // Log data to verify what is being sent

    // Make the API call to update the resume with the sanitized data
    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        setIsLoading(false);
        toast({
          description: "Your Education Details have been saved.",
        });
        setResumeInfo((prevState) => ({
          ...prevState,
          Educations: data.Educations,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(
          "Error saving Experience:",
          error?.response?.data || error
        );
        toast({
          description: "Failed to save Education. Please try again.",
        });
      });
  };

  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Educations
        <p className="text-xs">Fill in your Education</p>
      </h2>
      <div>
        {educationList.map((educationField, index) => {
          return (
            <div key={index}>
              <div className="grid grid-cols-2">
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                  institute
                  </label>
                  <Input
                    name="institute"
                    placeholder="enter institute"
                    onChange={(event) => handleChange(index, event)}
                    value={educationField.institute}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    degree     
                  </label>
                  <Input
                    name="degree"
                    placeholder="enter degree"
                    onChange={(event) => handleChange(index, event)}
                    value={educationField.degree}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Start date
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
                    value={educationField.startDate}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                {/* <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    Currently working
                  </label>
                  <Input
                    name="currentlyWorking"
                    placeholder="enter Work Title"
                    onChange={(event) => handleChange(index, event)}
                    value={expField.currentlyWorking}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div> */}
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2">
                    End date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    placeholder="End date"
                    onChange={(event) => handleChange(index, event)}
                    value={educationField.endDate}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
                <div className="p-5 mt-10">
                  <label className="text-gray-800 font-semibold tracking-wide mb-2 width-full">
                    <summary></summary>
                  </label>
                  <Input
                    name="summery"
                    placeholder="enter Summery"
                    onChange={(event) => handleChange(index, event)}
                    value={educationField.summery}
                    className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          onClick={AddNewEducation}
        >
          Add new Education
        </Button>
        <Button
          onClick={onSave}
          type="submit"
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
      <div className="mt-4">
        <Button
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          onClick={RemoveEducation}
        >Delete job Education</Button>
      </div>
    </div>
  );
}

export default EducationalForm;
