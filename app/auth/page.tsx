//app/auth/page.tsx file
"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SigninForm from "./components/SigningForm";
import SignupForm from "./components/SignupForm";
import LoadingAuthPage from "./loading";

const AuthPage = () => {


  const searchParams = useSearchParams();
  const params = searchParams.get("formType");
  const { status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      route.push("/");
    }
  }, [status,route]);

  if (status === "authenticated") {
    return <LoadingAuthPage />;
  }

  return <>{params === "signin" ? <SigninForm /> : <SignupForm />}</>;
};

export default AuthPage;
