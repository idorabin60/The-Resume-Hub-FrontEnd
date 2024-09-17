/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false); // Fixed spelling
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false); // Fixed casing

  const onCreate = async () => {
    setIsLoading(true); // Fixed casing
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    GlobalApi.createNewResume(data).then(
      (res) => {
        console.log(res);
        if (res) {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
      }
    );
    setOpenDialog(false);
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl mb-4">My Resumes</h2>
      <p className="pb-5">Generate CV for your next job for free</p>

      {/* Button with pink background */}
      <Button
        className="bg-pink-200 text-white hover:bg-pink-600 rounded-full p-4"
        onClick={() => setOpenDialog(true)} // Setting openDialog to true on button click
      >
        <PlusCircle className="mr-2" /> {/* Icon before text */}
        Lets Get Started
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Resume</DialogTitle>
            <DialogDescription>
              <p>Add job title for your CV</p>
              <Input
                className="mt-2"
                placeholder="CS student"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-6 pt-5">
              <Button
                className="bg-red-300"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || isLoading}
                className="bg-green-300"
                onClick={onCreate}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Dashboard;

