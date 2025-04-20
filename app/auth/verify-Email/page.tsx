//app/signup/verify-Email/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import SendMail from "../components/SendMail";
import VerifyEmail from "../components/VerifyEmail";

const Page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  return (
    <>
      {token && <VerifyEmail token={token} userId={userId} />}
      {!token && <SendMail userId={userId} />}
    </>
  );
};

export default Page;
