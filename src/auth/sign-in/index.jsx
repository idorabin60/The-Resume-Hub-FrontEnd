/* eslint-disable no-unused-vars */
import { SignIn } from '@clerk/clerk-react';
import React from 'react';

function SignInPage() {
  return (
    <div className>
      <div className='flex justify-center my-20 items-center'>
        <SignIn />
      </div>
    </div>
  );
}

export default SignInPage;
