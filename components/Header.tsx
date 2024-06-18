import Image from "next/image";
import { ThemeToggler } from "./ThemeToggler";
import Link from "next/link";
import GenreDropdown from "./GenreDropdown";
import SearchInput from "./SearchInput";

function Header() {
  return (
    <header className="fixed w-full z-50 top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/25 to-gray-900">
      <Link href="/" className="mr-10">
        <Image
          src="/logo.png"
          width={200}
          height={140}
          alt="Disney Logo"
          className={"cursor-pointer rounded-md"}
        />
      </Link>

      <div className="flex space-x-2">
        {/* @ts-expect-error Server Component */}
        <GenreDropdown />
        <SearchInput />
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
