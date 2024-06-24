import { IconMoon, IconSun } from "@tabler/icons-react";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <nav
      className="sticky top-0 h-15 w-screen bg-white border-b border-gray-200
        bg-zinc-800/10 dark:border-violet-900 dark:bg-opacity-50
        backdrop-blur-2xl"
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a href="" className="flex ms-2 md:me-24">
              <span
                className="self-center text-xl font-semibold sm:text-2xl
                  whitespace-nowrap dark:text-white flex-row inline-flex
                  justify-center items-center"
              >
                <div className="inline leading-3 text-4xl pr-2">
                  <Logo />
                </div>
                Gal
              </span>
            </a>
          </div>
          <SearchBar />
          <div className="flex items-center">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
