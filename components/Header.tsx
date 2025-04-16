"use client"
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggler } from './ui/ThemeToggler';
import { Button } from './ui/button';

const Header = () => {
    const {isSignedIn} = useUser();
  return (
    <header className="flex items-center justify-between">
        <Link href="/" className='flex items-center space-x-2'>
        <div className='bg-white dark:bg-[#030a12ec] w-fit'> 
    <Image 
        src="/CelestialBoxLogo.png"  
        alt="cloud cube logo"
        height={50}
        width={50}
    />
</div>

            <h1 className='font-bold text-2xl'>CelestialBox</h1>
        </Link>
        <div className='px-5 flex space-x-2 items-center'>
            <ThemeToggler />
            {
                isSignedIn ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <SignInButton afterSignInUrl="/dashboard" mode="modal">
                        <Button className="font-semibold text-lg">Sign In</Button>
                    </SignInButton>
                )
            }
        </div>
    </header>
  )
}

export default Header