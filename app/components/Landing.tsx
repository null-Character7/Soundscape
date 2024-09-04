"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import hero from "../images/hero.jpg"
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


export function Landing() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-muted border-b">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Music2Icon className="h-6 w-6" />
          <span className="sr-only">Soundscape</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-muted-foreground/10"
          >
            Explore
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-muted-foreground/10"
          >
            My Spaces
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-2 rounded-md hover:bg-muted-foreground/10"
          >
            Settings
          </Button>
          {session?.user ? (
            <Button
              variant="outline"
              className="px-4 py-2 rounded-md"
              onClick={() => signOut()}
            >
              <LogInIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              className="px-4 py-2 rounded-md"
              onClick={() => signIn("google")}
            >
              <LogInIcon className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#FF6B6B] to-[#FFA500]">
          <div className="container px-4 md:px-6 text-primary-foreground">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Soundscape: Your Personal Music Hub
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Create your own music spaces, share your favorite songs, and
                    let your friends contribute to the vibe.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
  {!session?.user && (
    <Button
      onClick={() => signIn("google")}
      className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors hover:bg-[#FF6B6B]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      <FaGoogle className="h-4 w-4 mr-2" />
      Sign Up with Google
    </Button>
  )}

  {session?.user && (
    <Button
    onClick={() => router.push('/streams')} // Assuming you have a route for "stream"
      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-muted px-8 text-sm font-medium shadow-sm text-black transition-colors hover:bg-muted-foreground/10 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      Go to My Space
    </Button>
  )}

  <Button
    variant="outline"
    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-muted px-8 text-sm font-medium shadow-sm text-black transition-colors hover:bg-muted-foreground/10 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  >
    Learn More
  </Button>
</div>
              </div>
              <div className="flex justify-center">
                <Image
                  src={hero} // Use the imported image here
                  width="650"
                  height="650"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FFCDD2]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#FFA500] px-3 py-1 text-sm text-[#FF6B6B]">
                  Create Your Own Spaces
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Curate Your Musical Oasis
                </h2>
                <p className="max-w-[900px] text-[#757575] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Build your own personal music spaces, where you and your
                  friends can discover, share, and upvote songs. Customize the
                  look and feel to match your unique vibe.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {/* <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              /> */}
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Personalize Your Space
                      </h3>
                      <p className="text-[#757575]">
                        Customize the look and feel of your music space to match
                        your personal style.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Collaborative Playlists
                      </h3>
                      <p className="text-[#757575]">
                        Invite your friends to add songs and upvote their
                        favorites, creating a dynamic and shared music
                        experience.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Seamless Integration
                      </h3>
                      <p className="text-[#757575]">
                        Easily import songs from YouTube, Spotify, and other
                        platforms to build your perfect playlist.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Discover New Music, Together
              </h2>
              <p className="mx-auto max-w-[600px] text-[#757575] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore music spaces created by your friends and the Soundscape
                community. Upvote your favorite songs and contribute to the
                collective vibe.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Discover Premium</Button>
              </form>
              <p className="text-xs text-[#757575]">
                Sign up to be notified {" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-[#757575]">
          &copy; 2024 Soundscape. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12l4.595 7.5c-3.003 2.595-7.495 2.595-10.5 0s-3.004-7.006 0-10.5l3.5 5.5c1-2 4-2 5 0zm6.5 7c3.002-2.596 3.003-7.006 0-10.5h-7v6l3.5-5.5c1 1.996.999 4.504 0 6.5s-3.495 3.001-5.5 2.5zm-1-15.501c-2.598-1.997-7.007-1.996-10.501 0l3.501 6c1-2 4-2 5 0h-7c-1.003 2 0 5 2.5 7.5 1.5 1.501 3.5 2.5 5.5 2.5 5.5 0 9.5-5 9.5-9.5s-2.002-6.501-5.5-8.5z" />
    </svg>
  );
}

function Music2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19V6l12-2v13m-9 4a3 3 0 100-6 3 3 0 000 6z"
      />
    </svg>
  );
}

function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14M12 5l7 7-7 7"
      />
    </svg>
  );
}
