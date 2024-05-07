import { IconArrowLeft, IconHome, IconList, IconQuestionMark, IconSquares } from "@tabler/icons-react";
import SidebarButton from "./SidebarButton";
import { ReactNode } from "react";

export default function Sidebar(props: {children: ReactNode}) {
  return (
    <aside
      id="logo-sidebar"
      className="w-64 h-screen pt-2 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-zinc-900 dark:border-zinc-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {props.children}
          
        </ul>
      </div>
    </aside>
  );
}
