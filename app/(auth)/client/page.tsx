import { Metadata } from "next";
import { ClientAuth } from "@/app/ui/client-auth";

export const metadata: Metadata = {
  title: '客户端授权'
}

export default function Page() {
  return <ClientAuth />
}
