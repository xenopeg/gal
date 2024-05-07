import React from "react";
import ReactMarkdown from "react-markdown";
import type { Item as ItemProps, Prisma } from "@prisma/client";
import prisma from "@/db";

export type ItemWithTags = Prisma.PromiseReturnType<typeof getItem>;

export async function getItem(id: number) {
  return await prisma.item.findFirstOrThrow({
    where: {
      id: parseInt(String(id)),
    },
    include: {
      tags: {
        include: {
          type: true,
        },
      },
    },
  });
}

const Item: React.FC<{ item: ItemWithTags }> = ({ item }) => {
  return (
    <div>
      <h2>{item.title}</h2>
      <ReactMarkdown>{item.content}</ReactMarkdown>
      {item.tags.map((t) => (
        <div key={t.id}>
          {t.type.showType ? `${t.type.type}:` : ""}
          {t.name}
        </div>
      ))}
    </div>
  );
};

export default Item;
