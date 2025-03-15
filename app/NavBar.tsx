import Link from "next/link";
import { VscDebugAll } from "react-icons/vsc";

const NavBar = () => {
  const NavLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-6 border border-gray-300 shadow-2xs px-6 h-14 items-center">
      <div className="hover:scale-210 transition-all"><VscDebugAll /></div>
      <ul className="flex gap-6 text-gray-600">
        {NavLinks.map((link) => (
          <li key={link.href} className=" hover:text-black ease-in-out  hover:scale-120 transition-all">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
