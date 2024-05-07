"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";

export default function DarkModeToggle() {
  return (
    <div className="flex items-center ms-3">
      <button
        onClick={() => {
          console.log("hoi light");
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }}
        className="hidden dark:block relative cursor-pointer p-2 rounded-full bg-violet-500/10 hover:bg-violet-500/30 transition-colors"
      >
        <IconSun />
      </button>
      <button
        onClick={() => {
          console.log("hoi dark");
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        }}
        className="dark:hidden block relative cursor-pointer p-2 rounded-full bg-violet-500/10 hover:bg-violet-500/30 transition-colors"
      >
        <IconMoon />
      </button>
    </div>
  );
}
