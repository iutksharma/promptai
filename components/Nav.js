"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className="w-full mb-16 pt-3 px-4 flex justfy-between items-center">
      <Link href="/" className="flex gap-2 flex-center items-center">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text pr-2 text-xl">
          Promptia
        </p>
      </Link>

      {/* Desktop navigation */}

      <div className="sm:flex hidden ml-auto">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              signOut
            </button>

            <Link href="/profile">
              <Image
                src="/logo.png"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                >
                  signIn
                </button>
              ))}
          </>
        )}
      </div>


      
      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/logo.png"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(false); // Close the dropdown first
                    signOut();
                  }}
                  className=""
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                >
                  signIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
