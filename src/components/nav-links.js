import Link from "next/link";

function NavLinks({ path, text, icon }) {
  return (
    <Link href={path} className="flex items-center gap-3 py-2">
      {icon}
      <p className="text-xl font-light">{text}</p>
    </Link>
  );
}

export default NavLinks;
