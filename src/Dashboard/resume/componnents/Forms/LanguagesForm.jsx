import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function LanguagesForm() {
  const [languagesList, setLanguagesLists] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();

  const AddNewLanguage = () => {
    setLanguagesLists([
      ...languagesList,
      {
        title: "",
      },
    ]);
  };

  useEffect(() => {
    // Ensure resumeInfo is available before trying to access Languages
    if (resumeInfo?.Languages && resumeInfo.Languages.length > 0) {
      setLanguagesLists(resumeInfo.Languages);
    }
  }, [resumeInfo]); // Add resumeInfo to dependency array to trigger when it's updated

  const removeLanguage = () => {
    setLanguagesLists((prevLanguagesList) => {
      const updatedList = prevLanguagesList.slice(0, -1);
      setResumeInfo((prevState) => ({
        ...prevState,
        Languages: updatedList,
      }));
      return updatedList;
    });
  };

  const handleChange = (index, event) => {
    console.log("bla")
    const newEntries = [...languagesList]; // Make a shallow copy of the state
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setLanguagesLists(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Languages: newEntries,
    }));
  };

  const onSave = () => {
    setIsLoading(true);

    const sanitizedLanguageList = languagesList.map((language) => ({
      title: language.title || "Unknown Language",
    }));

    const data = { Languages: sanitizedLanguageList };

    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        setIsLoading(false);
        toast({
          description: "Your Languages Details have been saved.",
        });
        setResumeInfo((prevState) => ({
          ...prevState,
          Languages: data.Languages,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error saving Languages:", error?.response?.data || error);
        toast({
          description: "Failed to save Languages. Please try again.",
        });
      });
  };

  return (
    <div className="p-5 shadow-md">
      <h2 className="p-5 shadow-md rounded-lg border-t-2 border-t-gray-300 mt-6 bg-gradient-to-r from-white to-blue-100 text-gray-800 text-xl font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg">
        Languages
        <p className="text-xs">Fill in your Languages</p>
      </h2>
      <div>
        {languagesList.map((language, index) => (
          <div key={index}>
            <div className="grid grid-cols-2">
              <div className="p-5 mt-10">
                <label className="text-gray-800 font-semibold tracking-wide mb-2">
                  Language title name
                </label>
                <Input
                  name="title"
                  placeholder="enter language title"
                  onChange={(event) => handleChange(index, event)}
                  value={language.title}
                  className="p-3 mt-5 shadow-md rounded-lg bg-gradient-to-r from-white to-blue-100 text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-100 hover:to-white hover:shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          className="p-3 shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-white text-gray-800 font-semibold tracking-wide transition duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-white hover:to-blue-100 hover:shadow-lg"
          onClick={AddNewLanguage}
        >
          Add new Language
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
          onClick={removeLanguage}
        >
          Delete Language
        </Button>
      </div>
    </div>
  );
}

export default LanguagesForm;
