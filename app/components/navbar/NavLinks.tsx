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
    <ul className="flex gap-6 items-center">
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`nav-link transition-all duration-300`}
              style={{ 
                color: isActive 
                  ? 'var(--md-sys-color-primary)' 
                  : 'var(--md-sys-color-on-surface-variant)' 
              }}
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