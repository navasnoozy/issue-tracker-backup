import { Card, Button, Spinner,Heading } from "@radix-ui/themes";

const VerifyEamil = ({token}:{token:string}) => {
      


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

export default VerifyEamil;
