"use client";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Flex, Avatar, Box, DropdownMenu } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <Flex
      justify={"between"}
      className="flex justify-between w-full  border-b   border-gray-200  shadow-2xs px-6 h-14">
      <Flex className="gap-6 items-center">
        <LogoIcon />
        <NavLinks />
      </Flex>
      <Flex className="items-center gap-6">
        <UserProfile />
      </Flex>
    </Flex>
  );
};

export default NavBar;

//Logo icon////
const LogoIcon = () => {
  return (
    <Box className="hover:scale-210 transition-all cursor-pointer ">
      <FaBug />
    </Box>
  );
};

//NavLinks
const NavLinks = () => {
  const currentPath = usePathname();

  const NavLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex gap-6 text-gray-600 items-center">
    {NavLinks.map((link) => {
      const isActive = currentPath === link.href;
      return (
        <li key={link.href} className="relative">
          <Link
            href={link.href}
            className={`nav-link ${
              isActive ? "active text-black" : ""
            } transition-all duration-300`}
          >
            {link.label}
          </Link>
        </li>
      );
    })}
  </ul>
  
  );
};

//User profile/////
const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated")
    return <Link className=" text-gray-600" href={`/api/auth/signin`}>Signin</Link>;

  return (
    <>
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
    </>
  );
};
