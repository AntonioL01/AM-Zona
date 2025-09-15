import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchByOptions from './pages/SearchByOptions';
import AddListing from './pages/AddListing';
import Profile from './pages/Profile';
import MyListing from './pages/MyListing';
import ListingDetail from './pages/ListingDetail';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchByOptions />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        
        <Route path="/sign-in/*" element={<SignIn redirectUrl={'/add-listing'} />} />
        <Route path="/sign-up/*" element={<SignUp redirectUrl={'/'} />} />

        <Route path="/add-listing" element={<SignedIn><AddListing /></SignedIn>} />
        <Route path="/profile" element={<SignedIn><Profile /></SignedIn>} />
        <Route path="/my-listing" element={<SignedIn><MyListing /></SignedIn>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
