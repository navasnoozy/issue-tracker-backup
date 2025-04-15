'use client'
import useUser from "@/app/hooks/userUser";
import { Card } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";

const VerifyEmail = () => {
   const {data:user} = useUser("cm9i9nva20006s8xx8c183qhe")
  return (
    <Card className="max-w-md bg-green-200 !space-y-2">
      <Heading color="gray">Welcome {user?.name?.toUpperCase()}</Heading>
      <Heading size='3' >
        The verification link has been sent to your email. Please check your
        inbox and complete the verification.
        
      </Heading>

      
    </Card>
  );
};

export default VerifyEmail;
