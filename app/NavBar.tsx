"use client";
import Link from "next/link";
import { VscDebugAll } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Flex, Avatar, Box, DropdownMenu } from "@radix-ui/themes";

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
    <Flex
      justify={"between"}
      className="flex justify-between w-full  border-b   border-gray-200  shadow-2xs px-6 h-14   "
    >
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
        {/* signout button */}
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="cursor-pointer">
              <Avatar
                size="2"
                referrerPolicy="no-referrer"
                src={session?.user?.image!}
                radius="full"
                fallback="A"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content variant="soft">
              <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
              <DropdownMenu.Item color="red">
                <Link href={`/api/auth/signout`}>Signout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

        {/* Sigin button */}
        {status === "unauthenticated" && (
          <Link href={`/api/auth/signin`}>Signin</Link>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
