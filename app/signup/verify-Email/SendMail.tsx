//app/signup/verify-Email/page.tsx
import useUser from "@/app/hooks/userUser";
import { Button, Card, Heading, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";

const SendMail = ({ userId }: { userId: string | null }) => {
  const { data: user } = useUser(userId);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);

   useEffect (()=> {
    if (!user) {
        setMessage("User data not available.");
        return;
      }else{
        setMessage(initialMessage)
      }
   },[user])

  const handleClick = async () => {
    try {
      setLoading(true);
     await axios.post("/api/users/emailVerification", user);
      setLoading(false);
      setMessage(successMessage);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md bg-green-200  !space-y-3">
      <Heading color="gray">Welcome {user?.name?.toUpperCase()}</Heading>
      <Heading size="3">{message}</Heading>
      <Button disabled={loading} onClick={handleClick} className="w-sm">
        {loading ? (
          <>
            <span>Sending...</span>
            <Spinner />
          </>
        ) : (
          "Verify Email"
        )}
      </Button>
    </Card>
  );
};

export default SendMail;
const successMessage = `The verification link has been sent to your email. Please check your
        inbox and complete the verification.`;
const initialMessage = ` Click the button below to send a verification link to your email address.`;
