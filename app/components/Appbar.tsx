"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {

    const sesssion = useSession();
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1>Not Spotify</h1>
        </div>
        <div>
            {sesssion.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}> Log Out </button>}
            {!sesssion.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}> Sign In </button>}
        </div>
      </div>
    </div>
  );
}
