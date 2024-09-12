"use client"

import { useRouter } from "next/navigation";
import { Space } from "../../components/space";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Streams({ params }: { params: { userId: string } }) {

  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize the router

  // Redirect to home if not logged in
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

  // Retrieve the user ID from the session

  // Render the Space component only if creatorId is defined
  const isStreamer=false;
  return (
    <main>
      {params.userId ? (
        <Space creatorId={params.userId} isStreamer={isStreamer} />
      ) : (
        <p>Loading...</p> // Or any other fallback UI
      )}
    </main>
  );
}
