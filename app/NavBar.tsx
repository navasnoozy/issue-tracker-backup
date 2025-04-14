"use client";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signOut, useSession} from "next-auth/react";
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
    <Box className="hover:scale-210 transition-all cursor-pointer text-violet-700 ">
      <FaBug />
    </Box>
  );
};

//NavLinks
const NavLinks = () => {
 'use client'
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
  'use client'
  const { data: session, status } = useSession();
  const currentPath = usePathname();

  if (status === "unauthenticated")
    return <Link className=" text-gray-600" href={`/api/auth/signin?callbackUrl=${currentPath}`}>Signin</Link>;

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
            <DropdownMenu.Item  className="!cursor-pointer" onSelect={()=> signOut({callbackUrl:`${currentPath}`})}  color="red">
              Signout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
};
