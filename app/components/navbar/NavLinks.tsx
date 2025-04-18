'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-6 text-gray-600 items-center">
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`nav-link ${
                isActive ? 'active text-black' : ''
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

export default NavLinks;
