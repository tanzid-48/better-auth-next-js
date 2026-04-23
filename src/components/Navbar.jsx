"use client";
import { signOut, useSession } from '@/lib/auth-client';
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
      <li><Link href="#">Features</Link></li>
      <li><Link href="#">Pricing</Link></li>
    </ul>
    <div className="">
        {
            user ? <> <p>Welcome,{user.name}</p>
            <button onClick={() => signOut()}>singOut</button></> : <>
            <Link href="/auth/singin">Sing In</Link>
            </>
        }
    </div>
  </header>
</nav>
    );
};

export default Navbar;