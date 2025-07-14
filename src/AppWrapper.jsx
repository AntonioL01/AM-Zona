import React from 'react';
import { useUser } from '@clerk/clerk-react';
import useSendbirdUser from './hooks/useSendbirdUser';

function AppWrapper({ children }) {
  const { user } = useUser();
  useSendbirdUser();

  return <>{children}</>;
}

export default AppWrapper;
