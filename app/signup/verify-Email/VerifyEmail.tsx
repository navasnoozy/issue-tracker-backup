import useUser from "@/app/hooks/userUser";
import { Card, Button, Spinner, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

const VerifyEamil = ({ token, userId }: { token: string | null, userId:string | null }) => {
  const user = useUser(userId)
  const [loading, setLoading] = useState(true);

  const verifyingEmail = async ()=>{
         const res = axios.patch ('/api/users/emailVerification',{token,userId})
  }

  return (
    <Card className="max-w-md bg-green-200  !space-y-3">
      <Heading color="gray">Welcome {user?.name?.toUpperCase()}</Heading>
      <Heading size="3">
        {" "}
        {loading ? (
          <>
            <span>Sending...</span>
            <Spinner />
          </>
        ) : (
          "Verify Email"
        )}
      </Heading>
    </Card>
  );
};

export default VerifyEamil;
