import plug from "@/lib/TailPlug";
import { ReactNode } from "react";

const SidebarContainer = plug.aside`
  h-screen w-64 pt-2 transition-transform 
  border-r border-gray-200 dark:border-zinc-800
  bg-white dark:bg-zinc-900/40 
  sm:translate-x-0 -translate-x-full 
`;

export default function Sidebar(props: { children: ReactNode }) {
  return (
    <SidebarContainer
      id="logo-sidebar"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto px-3 pb-4">
        <ul className="space-y-2 font-medium">{props.children}</ul>
      </div>
    </SidebarContainer>
  );
}
