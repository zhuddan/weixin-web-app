import { JsSdk } from "@/app/ui/js-sdk";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'JsSdk'
}
export default function Page() {
  return (
    <>
      <JsSdk />
    </>
  )
}
