"use client";

import { useSession } from "next-auth/react";
import { Profile } from "../components/Profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the router
  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/"); // Redirect to home if no session
    }
  }, [session, status, router]); // Dependency array ensures it runs when session/status changes

  // Show a loading message while checking session
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main >
      <Profile/>
    </main>

  );
}

