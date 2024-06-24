import prisma from "@/db";
import Item, { ItemWithInfo } from "./Item";
import { ReactNode } from "react";

export async function getItems({
  tags = [],
  pageSize = 20,
  page = 1,
}: {
  tags?: string[];
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
    where:
      tags.length === 0
        ? undefined
        : {
            AND: [
              ...tags.map((tag) => ({
                tags: {
                  some: {
                    name: tag.indexOf(":") > 0 ? tag.split(":")[1] : tag,
                    type:
                      tag.indexOf(":") > 0
                        ? {
                            type: tag.split(":")[0],
                          }
                        : undefined,
                  },
                },
              })),
            ],
          },
  });
}

function LayoutContainer({
  view,
  children,
}: {
  view: string;
  children: ReactNode;
}) {
  if (view === "grid") {
    return (
      <div
        className="grid justify-center flex-1"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, max-content))",
          gridGap: "16px",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    );
  }

  return <div className="inline-block">{children}</div>;
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
        <LayoutContainer view={view}>
          {items.map((item, i) => (
            <Item view={view} key={item.id} item={item} content={contents[i]} />
          ))}
        </LayoutContainer>
      </div>
    </>
  );
}
