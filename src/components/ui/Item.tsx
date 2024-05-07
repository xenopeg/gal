import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import type { Prisma } from "@prisma/client";
import prisma from "@/db";
import path from "path";
import Tag from "./Tag";

export type ItemWithInfo = Prisma.PromiseReturnType<typeof getItem>;

export async function getItem(uri: string) {
  try{
    const item = await prisma.item.findFirstOrThrow({
      where: {
        uri
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
  }catch(e){
    console.log(e);
    throw e;
  }
}

export async function getFileContent(item: ItemWithInfo) {
  const basePath = (await prisma.appSettings.findFirstOrThrow()).basePath;
  const fullPath = path.join(basePath, item.filePath);
  console.log(fullPath);
  if (item.type.type === "Markdown") {
    return await fs.readFile(fullPath, "utf-8");
  }

  return Buffer.from([]);
}

const Item: React.FC<{ item: ItemWithInfo; content: string | Buffer }> = ({
  item,
  content,
}) => {
  return (
    <div className="py-2 px-4">
      <div className=" bg-zinc-800/40 overflow-auto rounded-xl border-zinc-600 border">
        <div className="p-2 border-zinc-600 border-b">
          <div>
            {item.tags.map((tag) => (
              <Tag key={`${tag.type.type}:${tag.name}`} tag={tag} />
            ))}
          </div>
        </div>
        <div className="py-2 px-4 border-zinc-800 border-b flex flex-row items-center">
          <h2 className="text-2xl flex-1">{item.title}</h2>
          <span className="italic">{item.type.type}</span>
        </div>
        <div className="py-2 px-4 bg-zinc-900/50 ">
          {item.type.type === "Markdown" && (
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{content as string}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
