"use client"

import { useSession } from "next-auth/react";
import { Space } from "../components/space";

export default function Streams() {
  const { data: session, status } = useSession();

  // Retrieve the user ID from the session
  const creatorId = session?.user.id;

  // Render the Space component only if creatorId is defined
  return (
    <main>
      {creatorId ? (
        <Space creatorId={creatorId} />
      ) : (
        <p>Loading...</p> // Or any other fallback UI
      )}
    </main>
  );
}
