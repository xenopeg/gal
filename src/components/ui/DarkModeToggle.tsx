"use client";

import plug from "@/lib/TailPlug";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ToggleButton = plug.button`
  relative cursor-pointer p-2 rounded-full 
  bg-violet-500/10 hover:bg-violet-500/30
  transition-colors
`

export default function DarkModeToggle() {
  return (
    <div className="flex items-center ms-3">
      <ToggleButton
        onClick={() => {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }}
        className="hidden dark:block"
      >
        <IconSun />
      </ToggleButton>
      <ToggleButton
        onClick={() => {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }}
        className="dark:hidden block"
      >
        <IconMoon />
      </ToggleButton>
    </div>
  );
}
