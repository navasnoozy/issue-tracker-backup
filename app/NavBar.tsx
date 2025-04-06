"use client";
import Link from "next/link";
import { VscDebugAll } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Flex, Avatar, Box } from "@radix-ui/themes";
import AuthButton from "./components/AuthButton";

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const NavLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const handleClick = () => {
    if (status === "unauthenticated") {
      signIn();
    }
    signOut();
  };
  return (
    <Flex justify={"between"} className="flex justify-between w-full  border-b   border-gray-200  shadow-2xs px-6 h-14   ">
      <Flex className="gap-6 items-center">
        <Box className="hover:scale-210 transition-all ">
          <VscDebugAll />
        </Box>
        <ul className="flex gap-6   text-gray-600 items-center">
          {NavLinks.map((link) => (
            <li
              key={link.href}
              className={`${
                currentPath === link.href
                  ? "text-black underline underline-offset-6"
                  : ""
              }  hover:text-black ease-in-out  hover:scale-120 transition-all items-center `}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </Flex>

      <Flex className="items-center gap-6">
        {session && (
          <Avatar
            size="2"
            referrerPolicy="no-referrer"
            src={session?.user?.image!}
            radius="full"
            fallback="A"
          />
        )}

        <AuthButton />
      </Flex>
    </Flex>
  );
};

export default NavBar;
