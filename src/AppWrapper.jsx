import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function AppWrapper() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-zinc-100">
      <Outlet />
    </div>
  );
}

export default AppWrapper;