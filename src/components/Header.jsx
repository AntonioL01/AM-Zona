import React, { useState, useEffect } from 'react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch(`/api/get-user-role?userId=${user.id}`);
          if (!response.ok) {
            throw new Error(`Greška pri dohvatu role: ${response.status}`);
          }
          const data = await response.json();
          console.log("✅ User role:", data.role);
          setUserRole(data.role);
        } catch (error) {
          console.error("❌ Greška kod fetchUserRole:", error);
        }
      };
      fetchUserRole();
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="flex justify-between items-center bg-black text-white p-5 shadow-sm">
      <Link to="/">
        <img src="/logo 1.svg" width={150} height={100} alt="Logo" />
      </Link>

      <ul className="hidden md:flex gap-16 text-2xl">
        <li>
          <Link to="/" className="font-medium transition-all hover:text-blue-800">Početna</Link>
        </li>
        <li>
          <Link to="/search" className="font-medium transition-all hover:text-blue-800">Pretraži</Link>
        </li>
        <li>
          <Link to="/add-listing" className="font-medium transition-all hover:text-blue-800">Dodaj oglas</Link>
        </li>
      </ul>

      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black flex flex-col items-center gap-4 py-4">
          <Link to="/" className="text-white text-2xl" onClick={toggleMobileMenu}>Početna</Link>
          <Link to="/search" className="text-white text-2xl" onClick={toggleMobileMenu}>Pretraži</Link>
          <Link to="/add-listing" className="text-white text-2xl" onClick={toggleMobileMenu}>Dodaj oglas</Link>
          
          {isSignedIn ? (
            <>
              <Link to="/profile" className="text-white text-2xl" onClick={toggleMobileMenu}>Moj profil</Link>
              <UserButton afterSignOutUrl="/" />
              {userRole === 'admin' && (
                <Link to="/admin">
                  <Button className="text-2xl" onClick={toggleMobileMenu}>Admin Panel</Button>
                </Link>
              )}
            </>
          ) : (
            <SignInButton mode="modal">
              <Button className="text-2xl" onClick={toggleMobileMenu}>Prijava</Button>
            </SignInButton>
          )}
        </div>
      )}

      {/* Desktop user actions */}
      <div className="hidden md:flex items-center gap-5 text-2xl">
        {isSignedIn ? (
          <>
            <UserButton afterSignOutUrl="/" />
            <Link to="/profile">
              <Button className="text-2xl">Moj profil</Button>
            </Link>
            {userRole === 'admin' && (
              <Link to="/admin">
                <Button className="text-2xl">Admin Panel</Button>
              </Link>
            )}
          </>
        ) : (
          <SignInButton mode="modal">
            <Button className="text-2xl">Prijava</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;
