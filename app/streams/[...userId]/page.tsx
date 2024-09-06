"use client"

import { Space } from "../../components/space";

export default function Streams({ params }: { params: { userId: string } }) {

  // Retrieve the user ID from the session

  // Render the Space component only if creatorId is defined
  console.log(params.userId)
  return (
    <main>
      {params.userId ? (
        <Space creatorId={params.userId[0]} />
      ) : (
        <p>Loading...</p> // Or any other fallback UI
      )}
    </main>
  );
}
