import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className='flex w-32 justify-end gap-3'>
      <SignedIn>
          <UserButton afterSignOutUrl='/' />
      </SignedIn>

      <SignedOut>
          <Button asChild className='rounded-full' size="lg">
              <Link href="/sign-in">
                  Login
              </Link>
          </Button>
      </SignedOut>
    </div>
  );
}
