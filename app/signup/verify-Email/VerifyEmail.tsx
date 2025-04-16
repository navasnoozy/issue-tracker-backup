import { Card, Button, Spinner, Heading } from "@radix-ui/themes";
import { useState } from "react";

const VerifyEamil = ({ token }: { token: string | null }) => {
  const [loading, setLoading] = useState(true);

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
