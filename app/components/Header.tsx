"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Music2Icon, LogInIcon } from "lucide-react";
import { Button } from "../../components/ui/button"; // Ensure correct path to your Button component
import { IconHome, IconSpace, IconUser } from "@tabler/icons-react";

const IconButton = ({ icon, name, href }: { icon: React.ReactNode; name: string; href: string }) => {
  return (
    <Link href={href} className="relative flex flex-col items-center cursor-pointer group">
      <div className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
        {icon}
      </div>
      {/* Text that appears below on hover */}
      <div className="absolute mt-2 text-center px-2 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-900 text-xs opacity-0 group-hover:opacity-100">
        {name}
      </div>
    </Link>
  );
};

export function Header() {
  const { data: session } = useSession();

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-4 w-4 text-neutral-900" />,
      href: "/",
    },
    {
      title: "My Space",
      icon: <IconSpace className="h-4 w-4 text-neutral-900" />,
      href: "/streams",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-4 w-4 text-neutral-900" />,
      href: "/profile",
    },
  ];

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-muted border-b">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <Music2Icon className="h-6 w-6" />
        <span className="sr-only">Soundscape</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {links.map((link) => (
          <IconButton key={link.title} icon={link.icon} name={link.title} href={link.href} />
        ))}
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
