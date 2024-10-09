import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
    if (resumeInfo?.Languages && resumeInfo.Languages.length > 0) {
      setLanguagesLists(resumeInfo.Languages);
    }
  }, [resumeInfo]);

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
    const newEntries = [...languagesList];
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Languages</h2>
        <p className="text-xs">Fill in your Languages</p>
      </CardHeader>
      <CardContent>
        {languagesList.map((language, index) => (
          <Card className="mb-6" key={index}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">Language Title</label>
                <Input
                  name="title"
                  placeholder="Enter Language Title"
                  value={language.title}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button variant="outline" className="w-full sm:w-auto" onClick={AddNewLanguage}>
            Add New Language
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={removeLanguage}>
            Delete Last Language
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSave}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LanguagesForm;
