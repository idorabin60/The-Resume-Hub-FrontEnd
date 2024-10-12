/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './Home/index.jsx'
import Dashboard from './Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from "@/components/ui/toaster"
import EditResume from './Dashboard/resume/[resumeid]/edit/index.jsx'
import DownloadView from './Download/[resumeId]/DownloadView.jsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    path: '/auth/sign-in',
    element: <SignInPage/>
  },{
    element: <App />,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path: 'dashboard/',
        element: <Dashboard />
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      },
      {
        path:'/Download/:resumeId/DownloadView',
        element: <DownloadView />
      }
    ]
  }

])
createRoot(document.getElementById('root')).render(
<div>
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router }/>
    <Toaster />
    </ClerkProvider>

  </StrictMode>,
  </div>
)
