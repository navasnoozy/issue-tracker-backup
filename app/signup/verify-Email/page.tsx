"use client";
import { Card } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";

const VerifyEmail = () => {
  return (
    <Card className="max-w-md bg-green-200">
      <Heading size='3' >
        The verification link has been sent to your email. Please check your
        inbox and complete the verification.
      </Heading>
    </Card>
  );
};

export default VerifyEmail;
