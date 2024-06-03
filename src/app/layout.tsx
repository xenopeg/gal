import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";
import SidebarButton from "@/components/ui/SidebarButton";
import {
  IconHome,
  IconList,
  IconQuestionMark,
  IconSquares,
} from "@tabler/icons-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gal",
  description: "a",
};

const themeLoader = `
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    if(!localStorage.theme){
      localStorage.setItem("theme", "dark");
    }
    document.documentElement.classList.add('dark')
  } else {
    if(!localStorage.theme){
      localStorage.setItem("theme", "light");
    }
    document.documentElement.classList.remove('dark')
  }
`;

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeLoader,
          }}
        />
        <div className="h-screen w-screen flex flex-col">
          <Header />
          <div className="flex flex-row overflow-hidden flex-1 w-screen">
            <Sidebar>
              <SidebarButton href="/home" icon={<IconHome />}>
                Home
              </SidebarButton>
              <SidebarButton href="/gal" icon={<IconSquares />}>
                Galleries
              </SidebarButton>
              <SidebarButton href="/items" icon={<IconList />}>
                Items
              </SidebarButton>
              <SidebarButton href="/about" icon={<IconQuestionMark />}>
                About
              </SidebarButton>
            </Sidebar>
            <div className="flex-1 overflow-auto">{props.children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
