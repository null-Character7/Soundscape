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
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { IconBrandGoogle } from "@tabler/icons-react";

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
      <main className="flex-1">
        <BackgroundGradientAnimation>
          {/* Main Content */}
          <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            <div className="space-y-2 text-center">
              {/* Title */}
              <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                Soundscape: Your Personal Music Hub
              </h1>
              {/* Subtitle */}
              <p className="p-5 max-w-[600px] text-primary-foreground/80 md:text-xl mx-auto">
                Create your own music space, add your favorite songs, and let
                your friends contribute to the vibe.
              </p>
            </div>
          </div>
        </BackgroundGradientAnimation>

        <section className="w-full py-4 md:py-6 lg:py-12 bg-zinc-900">
          <div className="mx-auto flex flex-col items-center max-w-5xl gap-6 py-0">
            {/* Cards Section */}
            <div className="flex gap-6 justify-center">
              <CardContainer className="inter-var flex-1">
                <CardBody className="bg-zinc-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-10 border">
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

              <CardContainer className="inter-var flex-1">
                <CardBody className="bg-zinc-900 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-10 border">
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

            {/* Sign Up with Google button */}

            <div className="flex justify-center">
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                {!session?.user && (
                  <motion.button
                    className="relative group/btn flex space-x-2 items-center justify-start px-6 w-full text-black rounded-md h-12 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button" // Changed to "button" to avoid form submission
                    onClick={() => signIn("google")}
                    initial={{ opacity: 0, y: 20 }} // Start hidden and below
                    animate={{ opacity: 1, y: 0 }} // Animate to visible position
                    transition={{ duration: 0.3 }} // Animation duration
                  >
                    <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Continue With Google
                    </span>
                    <BottomGradient />
                  </motion.button>
                )}

                {session?.user && (
                  <motion.button
                    className="relative group/btn flex space-x-2 items-center justify-start px-6 w-full text-black rounded-md h-12 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button" // Changed to "button" to avoid form submission
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/streams");
                    }}
                    initial={{ opacity: 0, y: 20 }} // Start hidden and below
                    animate={{ opacity: 1, y: 0 }} // Animate to visible position
                    transition={{ duration: 0.3 }} // Animation duration
                  >
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Go to My Space
                    </span>
                    <BottomGradient />
                  </motion.button>
                )}
              </div>
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

const BottomGradient = () => {
  return (
    <>
      {/* Main gradient line */}
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      {/* Secondary gradient line with a larger width */}
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-3/4 mx-auto -bottom-px inset-x-6 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
