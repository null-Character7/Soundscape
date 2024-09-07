"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the router hook
import { useEffect } from "react"; // UseEffect to trigger redirection
import { Space } from "../components/space";

export default function Streams() {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the router

  // Redirect to home if not logged in
  const isStreamer=true;
  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/"); // Redirect to home if no session
    }
  }, [session, status, router]); // Dependency array ensures it runs when session/status changes

  // Show a loading message while checking session
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If session exists, get the user ID from it
  const creatorId = session?.user?.id;

  return (
    <main>
      {creatorId ? (
        <Space creatorId={creatorId} isStreamer={isStreamer} />
      ) : (
        <p>Loading user data...</p>
      )}
    </main>
  );
}
