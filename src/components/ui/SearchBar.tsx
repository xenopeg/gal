"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import plug from "@/lib/TailPlug";
import { useRouter } from "next/navigation";

const Form = plug.form`
  flex flex-row 
  rounded-xl px-3 py-1 
  bg-violet-500/20 focus-within:bg-violet-500/40 
  focus-within:outline outline-2 outline-violet-300/30 
`;

const Input = plug.input`
  flex-1 bg-transparent outline-none
`;

function trimSearch(query:string){
  return query.split(",")
    .map(i => i.trim().replace( /  +/g, ' ' ))
    .filter(i => i.length)
    .join(", ")
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const q = Object.fromEntries(Array.from(searchParams.entries())).q;
  const [query, setQuery] = useState(q);
  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();
        router.push(
          `${pathname}?${createQueryString("q", trimSearch(query))}`,
        );
        return false;
      }}
    >
      <Input
        value={query}
        name="q"
        type="text"
        onChange={(ev) => setQuery(ev.currentTarget.value)}
      />
      <button type="submit" className="bg-transparent">
        <IconSearch />
      </button>
    </Form>
  );
}
