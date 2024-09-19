"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import hero from "../images/hero.jpg";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { WobbleCard } from "./ui/wobble-card";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { AuroraBackground } from "./ui/aurora-background";
import { motion } from "framer-motion";

export function Landing() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleRedirect = () => {
    const userId = session?.user?.id; // Extract userId from the session

    if (userId) {
      // Redirect to /streams/userId
      console.log(userId);

      router.push(`/streams`);
    } else {
      console.error("User is not logged in");
    }
  };

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
                    Create your own music space, add your favorite songs, and
                    let your friends contribute to the vibe.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {!session?.user && (
                    <Button
                      onClick={() => signIn("google")}
                      className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-100"
                      >
                      <FaGoogle className="h-4 w-4 mr-2" />
                      Sign Up with Google
                    </Button>
                  )}

                  {session?.user && (
                    <Button
                      onClick={handleRedirect} // Assuming you have a route for "stream"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-muted px-8 text-sm font-medium shadow-sm text-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:bg-muted-foreground/20 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
          </div>
        </section>
        <section className="w-full py-4 md:py-6 lg:py-12 bg-[#FFCDD2]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-0 lg:grid-cols-2 lg:gap-12">
              <CardContainer className="inter-var">
                <CardBody className="bg-zinc-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-500 dark:via-blue-500 dark:to-purple-500"
                  >
                    Curate Your Musical Oasis
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-xl font text-indigo-600 dark:text-pink-300 mt-4"
                  >
                    Build your own personal music spaces, where you and your
                    friends can discover, share, and upvote songs. Customize the
                    look and feel to match your unique vibe.
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="/mySpace"
                      target="__blank"
                      onClick={() => signIn("google")}
                      className="px-4 py-2 rounded-xl text-xs font-normal text-blue-600 dark:text-emerald-400"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => signIn("google")}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-black via-gray-800 to-black dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
              <CardContainer className="inter-var">
                <CardBody className="bg-zinc-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-10 border">
                  <CardItem
                    as="h2"
                    translateZ="50"
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-500 dark:via-blue-500 dark:to-purple-500"
                  >
                    Discover New Music, Together
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-xl font text-pink-600 dark:text-indigo-300 mt-4"
                  >
                    Explore music spaces created by your friends and the
                    Soundscape community. Upvote your favorite songs and
                    contribute to the collective vibe.
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href="/mySpace"
                      target="__blank"
                      onClick={() => signIn("google")}
                      className="px-4 py-2 rounded-xl text-xs font-normal text-blue-600 dark:text-emerald-400"
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      onClick={() => signIn("google")}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-black via-gray-800 to-black dark:bg-gradient-to-r dark:from-white dark:via-gray-200 dark:to-white dark:text-black text-white text-xs font-bold"
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <section className="w-full py-12 md:py-24 lg:py-32 border-t">
              <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                    Join Premium
                  </h2>
                  <p className="mx-auto max-w-[600px] text-[#757575] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join premium to get early Beta access and other premium
                    features
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <form className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1 text-teal-50"
                    />
                    <Button type="submit">Discover Premium</Button>
                  </form>
                  <p className="text-xs text-[#757575]">
                    Sign up to be notified{" "}
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
          </motion.div>
        </AuroraBackground>
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
