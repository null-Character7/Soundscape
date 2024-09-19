"use client"

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Music2Icon, LogInIcon } from "lucide-react";
import { Button } from "../../components/ui/button"; // Ensure correct path to your Button component

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-muted border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <Music2Icon className="h-6 w-6" />
        <span className="sr-only">Soundscape</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-muted-foreground/10">
          Explore
        </Button>
        <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-muted-foreground/10">
          My Spaces
        </Button>
        <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-muted-foreground/10">
          Settings
        </Button>
        {session?.user ? (
          <Button variant="outline" className="px-4 py-2 rounded-md" onClick={() => signOut()}>
            <LogInIcon className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <Button variant="outline" className="px-4 py-2 rounded-md" onClick={() => signIn("google")}>
            <LogInIcon className="h-4 w-4 mr-2" />
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
