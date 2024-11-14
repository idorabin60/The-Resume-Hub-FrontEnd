import { useState, useContext, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const israeliUniversities = {
  technion: "Technion - Israel Institute of Technology",
  hebrewu: "Hebrew University of Jerusalem",
  telaviv: "Tel Aviv University",
  bgu: "Ben-Gurion University of the Negev",
  haifa: "University of Haifa",
  biu: "Bar-Ilan University",
  weizmann: "Weizmann Institute of Science",
  openu: "Open University of Israel",
  idc: "Reichman University (IDC Herzliya)",
  ariel: "Ariel University",
  tau: "Tel Aviv University",
  afeka: "Afeka Tel Aviv Academic College of Engineering",
};

function EducationalForm() {
  const [educationList, setEducationList] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();
  const [openIndex, setOpenIndex] = useState(null); // Changed

  useEffect(() => {
    if (resumeInfo?.Educations && resumeInfo.Educations.length > 0) {
      setEducationList(resumeInfo.Educations);
    }
  }, [resumeInfo]);
  const RemoveEducational = () => {
    setEducationList((prevEducationalList) => {
      const updatedList = prevEducationalList.slice(0, -1);
      setResumeInfo((prevState) => ({
        ...prevState,
        Educations: updatedList,
      }));
      return updatedList;
    });
  };
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

  const handleChange = (index, event) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Educations: newEntries,
    }));
  };

  const handleInstituteSelect = (index, instituteName) => {
    const newEntries = educationList.slice();
    newEntries[index].institute = instituteName;
    setEducationList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Educations: newEntries,
    }));
    setOpenIndex(null); // Changed
  };

  const onSave = () => {
    setIsLoading(true);
    const sanitizedEducationList = educationList.map((education) => ({
      institute: education.institute || "Unknown Institute",
      degree: education.degree || "Unknown Degree",
      startDate: education.startDate || "2000-01-01",
      endDate: education.endDate || "2000-01-01",
      summery: education.summery || "No summary provided",
    }));

    const data = { Educations: sanitizedEducationList };

    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        setIsLoading(false);
        toast({ description: "Your Education Details have been saved." });
        setResumeInfo((prevState) => ({
          ...prevState,
          Educations: data.Educations,
        }));
      })
      .catch((error) => {
        setIsLoading(false);
        toast({ description: "Failed to save Education. Please try again." });
      });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Educations</h2>
        <p className="text-xs">Fill in your Education</p>
      </CardHeader>
      <CardContent>
        {educationList.map((educationField, index) => (
          <Card className="mb-6" key={index}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institute Dropdown */}
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">Institute</label>

                <Select
                  value={educationField.institute}
                  onValueChange={(value) => handleInstituteSelect(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a university">
                      {educationField.institute || "Select a university"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Israeli Universities</SelectLabel>
                      <ScrollArea className="h-[200px] w-full rounded-md border">
                        {Object.entries(israeliUniversities).map(
                          ([key, label]) => (
                            <SelectItem key={key} value={label}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </ScrollArea>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Degree */}
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">Degree</label>
                <Input
                  name="degree"
                  placeholder="Enter Degree"
                  value={educationField.degree}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">
                  Start Date
                </label>
                <Input
                  type="date"
                  name="startDate"
                  value={educationField.startDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              {/* End Date */}
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={educationField.endDate}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              {/* Summary */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-800 font-semibold">Summary</label>
                <Input
                  name="summery"
                  placeholder="Enter Summary"
                  value={educationField.summery}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={AddNewEducation}
          >
            Add New Education
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={RemoveEducational}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Remove Last Experience
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onSave}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationalForm;
