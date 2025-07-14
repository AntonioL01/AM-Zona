import React from 'react';
import { Button } from './components/ui/button';
import { SignInButton } from '@clerk/clerk-react';
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category';
import MostSearched from './components/MostSearched';
import InfoSection from './components/InfoSection';

function Home() {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/* Hero */}
      <Hero/>
      {/* Category */}
      <Category/>
       {/* Most Searched */}
      <MostSearched/>
       {/* Info Section */}
       <InfoSection/>

    </div>
  );
}

export default Home;
