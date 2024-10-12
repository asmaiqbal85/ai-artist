 "use client"
import Image from 'next/image';
import Link from 'next/link';
import ailogo from '@/ailogo.png';
import { useEffect, useState } from 'react';
import { ModeToggle } from '../ui/toggle';
import { Button } from '../ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { BiLoaderCircle } from 'react-icons/bi';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Header = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-[rgb(123,55,139)] via-[#1A1D23]-40% to-[#455A64]-60% h-16 flex justify-center items-center text-white ">
      <nav className="container mx-auto flex justify-between items-center p-5">
        <div className="text-lg font-bold">
          <Link href="/profile">
            <Image
              src={ailogo}
              alt='ailogo'
              width={100}
              height={100}
              className='w-14 h-14 rounded-full'
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/create" className="hover:text-gray-300">Create</Link>
          

          <div>
            {initialLoading && status === "loading" ? (
              <BiLoaderCircle className="animate-spin" />
            ) : !session ? (
              <Button onClick={() => signIn("google")}>Login</Button>
            ) : (
              <div className="flex gap-3 justify-center items-center">
                <Button onClick={() => signOut()} variant="default">Logout</Button>
                <Link href="/profile">
                  <Avatar>
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            )}
          </div>

          <ModeToggle />
        </div>

        <button onClick={toggleMenu} className="md:hidden p-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <Link href="/" className="block py-2 hover:text-gray-300">Home</Link>
          <Link href="/create" className="block py-2 hover:text-gray-300">Create</Link>
       
        </div>
      )}
    </header>
  );
};

export default Header;
