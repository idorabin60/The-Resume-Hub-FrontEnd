import { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import axios from "axios";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";

function EducationalForm() {
  const [educationList, setEducationList] = useState([]);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const fetchUniversities = async () => {
      if (search.length >= 3) {
        try {
          const response = await axios.get(
            `http://universities.hipolabs.com/search?name=${search}`
          );
          if (Array.isArray(response.data)) {
            const filtered = response.data.map((uni) => uni.name);
            setFilteredUniversities(filtered);
            console.log(filtered); // Log the filtered list directly after setting it
  
            // Add a delay of 2 seconds before logging the next line
            await delay(2000);
            
            // Use `useEffect` for logging updated state
            setOpen(true); // Keep it open when searching
          } else {
            setFilteredUniversities([]);
          }
        } catch (error) {
          console.error("Error fetching universities:", error);
        }
      } else {
        setFilteredUniversities([]); // Reset the university list, but don't close
      }
    };
  
    fetchUniversities();
  }, [search]);
  
  // Additional useEffect to log when `filteredUniversities` actually changes
  
  
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
    if (resumeInfo?.Educations && resumeInfo.Educations.length > 0) {
      setEducationList(resumeInfo.Educations);
    }
  }, [resumeInfo]);

  const RemoveEducation = () => {
    setEducationList((prevEducationList) => {
      const updatedList = prevEducationList.slice(0, -1);
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
  };
  const handleInstituteSelect = (index, institute) => {
    const newEntries = educationList.slice();
    newEntries[index].institute = institute;
    setEducationList(newEntries);
    setResumeInfo((prevState) => ({
      ...prevState,
      Educations: newEntries,
    }));
    setOpen(false); // Close the dropdown only after selection
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
              {/* Institute Search */}
              <div className="space-y-2">
                <label className="text-gray-800 font-semibold">Institute</label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {educationField.institute || "Select university..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" key={filteredUniversities.join(",")}>
  <Command>
    <CommandInput
      placeholder="Search university..."
      value={search}
      onValueChange={setSearch}
    />
    <CommandList>
      {filteredUniversities.length > 0 ? (
        filteredUniversities.map((university, i) => (
          <CommandItem
            key={`${university}-${i}`} // Ensure unique keys
            onSelect={() => handleInstituteSelect(index, university)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                educationField.institute === university
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
            {university}
          </CommandItem>
        ))
      ) : (
        <CommandEmpty>No university found.</CommandEmpty>
      )}
    </CommandList>
  </Command>
</PopoverContent>

                </Popover>
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
            onClick={RemoveEducation}
          >
            Delete Last Education
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSave}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationalForm;
