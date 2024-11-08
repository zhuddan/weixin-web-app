import { Metadata } from "next";
import { ClientAuth } from "@/app/ui/client-auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: '客户端授权'
}

export default function Page() {
  return <Suspense fallback={'loading'}>
    <ClientAuth />
  </Suspense>
}
