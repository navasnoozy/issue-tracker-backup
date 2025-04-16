//app/signup/verify-Email/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import SendMail from "./SendMail";
import VerifyEamil from "./VerifyEmail";

const page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  return (
    <>
    <VerifyEamil token={token} />
    <SendMail userId={userId} />
    </>
  )
};

export default page;
