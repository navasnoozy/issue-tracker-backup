//app/signup/verify-Email/page.tsx
"use client";
import useUser from "@/app/hooks/userUser";
import { Card } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import SendMail from "./SendMail";
import VerifyEamil from "./VerifyEmail";

const page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  return (
    <>
    <VerifyEamil />
    <SendMail userId={userId} />
    </>
  )
};

export default page;
