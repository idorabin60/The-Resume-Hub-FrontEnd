import { useState } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from "@/components/ui/toaster"
import Header from './components/ui/custom/header'

function App() {
  const [count, setCount] = useState(0)
  const { user, isLoaded, isSignedIn } = useUser();
  
  // Show a loading spinner until Clerk has loaded the authentication info
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-200"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={'/auth/sign-in'} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
