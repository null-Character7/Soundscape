"use client"

import { useSession } from "next-auth/react";
import { Space } from "../components/space";


export default function Streams() {
  // Use the session hook to get session data
  const { data: session, status } = useSession();

  // Retrieve the user ID from the session
  const creatorId = session?.user.id
  console.log("creator id in streams ",creatorId);
  return (
    <main>
      <Space creatorId={creatorId} />
    </main>
  );
}
