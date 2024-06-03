import prisma from "@/db";
import Item, { ItemWithInfo } from "./Item";

export async function getItems({
  filter,
  pageSize = 20,
  page = 1,
}: {
  filter?: string;
  pageSize?: number;
  page?: number;
}) {
  return await prisma.item.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      tags: {
        include: {
          type: true,
        },
      },
      type: true,
    },
  });
}

export default async function ItemsList({
  items,
  contents,
  view,
}: {
  items: ItemWithInfo[];
  contents: (string | Buffer)[];
  view: string;
}) {
  if (!view) {
    // get from gallery options
    view = "grid";
  }
  return (
    <>
      <div className="flex items-center justify-center align-middle">
        <div className="inline-block">
          {items.map((item, i) => (
            <Item view={view} key={item.id} item={item} content={contents[i]} />
          ))}
        </div>
      </div>
    </>
  );
}
