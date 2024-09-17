/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function Dashboard() {
  const [openDaialog,setOpenDialog] = useState(false)
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl mb-4'>My Resumes</h2>
      <p className='pb-5'>Generate CV for your next job for free</p>
      
      {/* Button with pink background */}
      <Button className='bg-pink-200 text-white hover:bg-pink-600 rounded-full p-4'
              onClick={() => setOpenDialog(true)} // Setting openDialog to true on button click
              >
        <PlusCircle className='mr-2' /> {/* Icon before text */}
        Let's Get Started
      </Button>
      <Dialog open={openDaialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle >Create Resume</DialogTitle>
      <DialogDescription>
        <p>Add job title for your CV</p>
        <Input className="mt-2" placeholder="CS student" />
      </DialogDescription>
      <div className='flex justify-end gap-6 pt-5'>
      <Button className="bg-red-300" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
      <Button className="bg-green-300" onClick={() => setOpenDialog(false)}>Create</Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
    
  )
}

export default Dashboard
