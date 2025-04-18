'use client'
import { usePathname, useSearchParams } from "next/navigation";
import SigninForm from "./components/SigninForm";
import SignupForm from "./components/SignupForm";


const authPage = () => {
    const searchParams = useSearchParams();
    const params = searchParams.get('formType');
    console.log(params);
    
  

  return (
    <>
   {params=== 'signin' ?  <SigninForm />: <SignupForm />}
    
    </>
  )
};

export default authPage;
