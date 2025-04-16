//app/signup/verify-Email/page.tsx
"use client";
import useUser from "@/app/hooks/userUser";
import { Card } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import VerifyEmail from "./SendMail";

const page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  return <VerifyEmail userId={userId} />;
};

export default page;
