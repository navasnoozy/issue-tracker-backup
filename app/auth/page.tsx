//app/auth/page.tsx file
'use client'
import { usePathname, useSearchParams } from "next/navigation";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";


const authPage = () => {
    const searchParams = useSearchParams();
    const params = searchParams.get('formType');
    
  

  return (
    <>
   {params=== 'signin' ?  <SigninForm />: <SignupForm />}
    
    </>
  )
};

export default authPage;
