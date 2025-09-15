import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/sonner';
import AppWrapper from './AppWrapper';

import Home from './home';
import Contact from './contact';
import Profile from './profile';
import AddListing from './add-listing';
import SearchByCategory from './search/[category]';
import SearchByOptions from './search';
import ListingDetails from './listing-details';
import Inbox from './profile/components/Inbox';
import AdminPanel from './components/AdminPanel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/profile', element: <Profile /> },
      { path: '/add-listing', element: <AddListing /> },
      { path: '/search/:category', element: <SearchByCategory /> },
      { path: '/search', element: <SearchByOptions /> },
      { path: '/listing-details/:id', element: <ListingDetails /> },
      { path: '/inbox', element: <Inbox /> },
      { path: '/admin', element: <AdminPanel /> }, 
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log("👉 Clerk key:", PUBLISHABLE_KEY);
console.log("👉 Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      fallbackRedirectUrl="/profile"
      afterSignOutUrl="/"
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
