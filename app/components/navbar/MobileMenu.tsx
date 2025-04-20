//MobileMenu.tsx file

'use client';
import { DropdownMenu, Button } from '@radix-ui/themes';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

const DropDownLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
  { label: 'Create Account', href: '/auth?formType=signup' },
  { label: 'Signin', href: '/auth?formType=signin' },
];

const MobileMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost">
          <GiHamburgerMenu size={25} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {DropDownLinks.map((link) => (
          <DropdownMenu.Item asChild key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MobileMenu;
