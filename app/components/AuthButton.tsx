import { Button } from "@radix-ui/themes";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
  const { status } = useSession();

  const handleClick = () => {
    if (status === "unauthenticated") {
      signIn();
    } else {
      signOut();
    }
  };

  return (
    <Button variant="outline"  onClick={handleClick}>
      {status === "authenticated" ? "Logout" : "Login"}
    </Button>
  );
};

export default AuthButton;
