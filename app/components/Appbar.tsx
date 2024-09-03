"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const { data: session } = useSession();

  return (
    <div className="p-4 bg-gray-100 flex justify-between items-center">
      {session?.user ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Welcome, {session.user.name}</span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
