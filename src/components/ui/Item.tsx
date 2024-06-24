import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import type { Prisma } from "@prisma/client";
import prisma from "@/db";
import path from "path";
import Tag from "./Tag";
import plug from "@/lib/TailPlug";
import Link from "next/link";
import Spacer from "./Spacer";
import { IconMarkdown } from "@tabler/icons-react";

export type ItemWithInfo = Prisma.PromiseReturnType<typeof getItem>;

export async function getItem(uri: string) {
  try {
    const item = await prisma.item.findFirstOrThrow({
      where: {
        uri,
      },
      include: {
        tags: {
          include: {
            type: true,
          },
        },
        type: true,
      },
    });
    return item;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getFileContent(item: ItemWithInfo) {
  const basePath = (await prisma.appSettings.findFirstOrThrow()).basePath;
  const fullPath = path.join(basePath, item.filePath);

  if (item.type.type === "Markdown") {
    return await fs.readFile(fullPath, "utf-8");
  }

  return Buffer.from([]);
}

const ItemContainer = plug.div`
  container overflow-auto rounded-md 
  bg-violet-900/10 shadow
  dark:shadow-violet-200/10
`;
const ItemHeader = plug.div`
  flex flex-row items-center 
  border-b border-zinc-900 px-4 py-2
`;

function RenderItemBlog(item: ItemWithInfo, content: string | Buffer) {
  return (
    <div className="px-4 py-2">
      <ItemContainer>
        <ItemHeader>
          <Link
            href={"/items/" + item.uri}
            className="text-2xl hover:underline"
          >
            {item.title}
          </Link>
          <Spacer />
          <span className="italic">{item.type.type}</span>
        </ItemHeader>
        <div className="bg-zinc-900/50 px-4 py-2 ">
          {item.type.type === "Markdown" && (
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{content as string}</ReactMarkdown>
            </div>
          )}
          {item.type.type === "Image" && (
            <div className="">
              <img src={`api/getItem/${item.filePath}`} />
            </div>
          )}
        </div>
        <div className="p-2">
          <div>
            {item.tags.map((tag) => (
              <Tag key={`${tag.type.type}:${tag.name}`} tag={tag} />
            ))}
          </div>
        </div>
      </ItemContainer>
    </div>
  );
}
function RenderItemList(item: ItemWithInfo, content: string | Buffer) {
  return (
    <div className="px-4 py-2">
      <div className="h-20  flex flex-row">
        <div className="bg-zinc-800 w-20 overflow-hidden">
        {item.type.type === "Image" && (
          <img
            className="object-cover h-full w-full"
            src={`api/getItem/${item.filePath}`}
          />
        )}
        {item.type.type === "Markdown" && (
          <IconMarkdown className="object-cover h-full w-full" />
        )}
        </div>
        <div className="flex-1 bg-violet-900/10 py-1 px-2">

        <div>
            <Link href={`/items/${item.uri}`} className="hover:underline">
              {item.title}
            </Link>
          </div>
          <div className="text-right italic text-xs">
            <Link href={`/items/${item.uri}`} className="hover:underline">
              {item.uri}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
function RenderItemGrid(item: ItemWithInfo, content: string | Buffer) {
  return (
    <>
      <div
        // href={`/items/${item.uri}`}
        className="group bg-zinc-900 inline-block m-4 shadow-xl shadow-black/20
          rounded-md overflow-hidden w-48 h-72 relative cursor-pointer"
      >
        <div
          className="z-10 shadow-inner shadow-white/20 absolute top-0 left-0 right-0
            bottom-0 w-full h-full group-hover:shadow-white/70 pointer-events-none"
        ></div>
        {item.type.type === "Image" && (
          <img
            className="object-cover h-full w-full"
            src={`api/getItem/${item.filePath}`}
          />
        )}
        {item.type.type === "Markdown" && (
          <div className="prose prose-sm dark:prose-invert p-3">
            <ReactMarkdown>{content as string}</ReactMarkdown>
          </div>
        )}

        <div
          className="p-2 bg-slate-900/60 text-white absolute left-0 right-0
            bottom-0 w-full backdrop-blur-sm"
        >
          <div>
            <Link href={`/items/${item.uri}`} className="hover:underline">
              {item.title}
            </Link>
          </div>
          <div className="text-right italic text-xs">
            <Link href={`/items/${item.uri}`} className="hover:underline">
              {item.uri}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const Item: React.FC<{
  item: ItemWithInfo;
  content: string | Buffer;
  view: string;
}> = ({ item, content, view }) => {
  if (view === "blog") {
    return RenderItemBlog(item, content);
  } else if (view === "list") {
    return RenderItemList(item, content);
  } else if (view === "grid") {
    return RenderItemGrid(item, content);
  }
  // default to Grid
  return RenderItemGrid(item, content);
};

export default Item;
