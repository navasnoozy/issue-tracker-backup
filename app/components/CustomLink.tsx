import NextLink from "next/link";
import { Link as RedixLink } from "@radix-ui/themes";

interface PropsType {
  href: string;
  children: string;
}

const CustomLink = ({ href, children }: PropsType) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RedixLink>{children}</RedixLink>
    </NextLink>
  );
};

export default CustomLink;
