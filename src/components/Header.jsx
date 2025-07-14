import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center bg-black text-white p-5 shadow-sm">
      <Link to="/">
        <img src="/logo 1.svg" width={150} height={100} alt="Logo" />
      </Link>

      <ul className="hidden md:flex gap-16 text-2xl">
        <li>
          <Link
            to="/"
            className="font-medium transition-all hover:text-blue-800"
          >
            Početna
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="font-medium transition-all hover:text-blue-800"
          >
            Pretraži
          </Link>
        </li>
        <li>
          <Link
            to="/add-listing"
            className="font-medium transition-all hover:text-blue-800"
          >
            Dodaj oglas
          </Link>
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5 text-2xl">
          <UserButton />
          <Link to="/profile">
            <Button className="text-2xl">Moj profil</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" fallbackRedirectUrl="/profile">
          <Button className="text-2xl">Dodaj oglas</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;
