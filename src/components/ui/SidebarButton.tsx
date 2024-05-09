import Link from "next/link";
import { ReactNode } from "react";

export default function SidebarButton(props: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={props.href}
        className=" transition-colors duration-100 rounded-md p-2 group flex
          items-center text-gray-900 dark:text-white border-transparent border-2
          hover:border-violet-100 dark:hover:border-violet-950
          hover:bg-violet-100/10 dark:hover:bg-violet-950/10"
      >
        {props.icon}
        <span className="ms-3">{props.children}</span>
      </Link>
    </li>
  );
}
