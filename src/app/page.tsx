"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "../shared/state";
import { useRouter } from "next/navigation";

export default function Home() {
  const auth = useAtomValue(authAtom)
  const router = useRouter();

  if (auth.token) {
    router.push("/applications")
  } else {
    router.push("/login")
  }

  return (
    <main>
      
    </main>
  );
}
