//app/auth/page.tsx file
"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SigninForm from "./components/SigningForm";
import SignupForm from "./components/SignupForm";

const authPage = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("formType");
  const { status} = useSession();
  const route = useRouter();

if(status === 'authenticated'){
  route.push('/');
  return
}

  return <>{params === "signin" ? <SigninForm /> : <SignupForm />}</>;
};

export default authPage;
