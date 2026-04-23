"use client";
import { signOut, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    const {data,isPending} = useSession();
    
    if(isPending){
        return <div className="">Loading....</div>
    }
    console.log(data);

    const user = data?.user

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
  <header className="flex h-16 items-center justify-between px-6">
    <div className="flex items-center gap-3">
     
      <p className="font-bold">ACME</p>
    </div>
    <ul className="flex items-center gap-4">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/dashboard">DashBoard</Link></li>
      <li><Link href="/about">About</Link></li>
    </ul>
     <div>
          {user ? (
            <>
              <p>Welcome, {user?.name || "User"}</p>
              <button onClick={async () => await signOut()}>
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link href="/auth/singup">
                <Button>Sign Up</Button>
              </Link>
              <Link href="/auth/singin">
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
  </header>
</nav>
    );
};

export default Navbar;