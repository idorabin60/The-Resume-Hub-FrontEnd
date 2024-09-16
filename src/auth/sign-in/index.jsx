/* eslint-disable no-unused-vars */
import Header from '@/components/ui/custom/header';
import { SignIn } from '@clerk/clerk-react';
import React from 'react';

function SignInPage() {
  return (
    <>
    <Header/>
      <div className='flex justify-center my-20 items-center'>
        <SignIn />
      </div>
    </>
  );
}

export default SignInPage;
