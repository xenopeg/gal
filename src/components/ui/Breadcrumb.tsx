import Link from "next/link";
import { ReactNode } from "react";

export default function Breadcrumb(props: {
  url: string;
  children: ReactNode;
}) {
  const url = props.url;
  return (
    <Link
      className="font-semibold inline-block py-1 px-2 rounded text-slate-300
        hover:bg-violet-950/70 hover:underline hover:italic"
      href={url}
    >
      {props.children}
    </Link>
  );
}

export function BreadSeparator() {
  return (
    <span className="inline-block p-1 rounded text-slate-400 ">{">"}</span>
  );
}
