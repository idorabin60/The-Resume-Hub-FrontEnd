import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

function PersonalDetailForm({ enableNavigationButtons }) {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const params = useParams();

  useEffect(() => {
    setFormData({
      firstName: resumeInfo?.firstName || '',
      lastName: resumeInfo?.lastName || '',
      jobTitle: resumeInfo?.jobTitle || '',
      phone: resumeInfo?.phone || '',
      email: resumeInfo?.email || '',
      linkdin: resumeInfo?.linkdin || '',
      address: resumeInfo?.address || '',
    });
  }, [resumeInfo]);

  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = formData;
    GlobalApi.updateResumePersonalDetail(params?.resumeId, data)
      .then((res) => {
        toast({
          description: "Your Personal Details have been saved.",
        });
      })
      .catch((err) => {
        console.error("Error during PUT request:", err.response ? err.response.data : err.message);
        toast({
          description: "Failed to save personal details. Please try again.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    enableNavigationButtons(true);
  };

  const handleInputOnChange = (e) => {
    enableNavigationButtons(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value, // Dynamically update the respective field
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Personal Details</h2>
        <p className="text-xs">Fill in your personal details</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-5">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">LinkedIn</label>
            <Input
              name="linkdin"
              value={formData.linkdin}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-gray-800 font-semibold">Address</label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputOnChange}
              required
              className="w-full"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default PersonalDetailForm;
