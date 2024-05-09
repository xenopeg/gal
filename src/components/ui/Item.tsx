import React from "react";
import { promises as fs } from "fs";
import ReactMarkdown from "react-markdown";
import type { Prisma } from "@prisma/client";
import prisma from "@/db";
import path from "path";
import Tag from "./Tag";
import tailplug from "@/lib/TailPlug";

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
  console.log(fullPath);
  if (item.type.type === "Markdown") {
    return await fs.readFile(fullPath, "utf-8");
  }

  return Buffer.from([]);
}

const ItemContainer = tailplug.div`
  container overflow-auto rounded-md 
  bg-violet-900/10 shadow
  dark:shadow-violet-200/10
`;
const ItemHeader = tailplug.div`
  flex flex-row items-center 
  border-b border-zinc-900 px-4 py-2
`;

const Item: React.FC<{ item: ItemWithInfo; content: string | Buffer }> = ({
  item,
  content,
}) => {
  return (
    <div className="px-4 py-2">
      <ItemContainer>
        <ItemHeader>
          <h2 className="flex-1 text-2xl">{item.title}</h2>
          <span className="italic">{item.type.type}</span>
        </ItemHeader>
        <div className="bg-zinc-900/50 px-4 py-2 ">
          {item.type.type === "Markdown" && (
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{content as string}</ReactMarkdown>
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
};

export default Item;
