import React from "react";
import Item, { getFileContent, getItem } from "../../../components/ui/Item";
import Breadcrumb, { BreadSeparator } from "@/components/ui/Breadcrumb";

export default async function Page({ params, searchParams }: { params: { uri: string }, searchParams: any }) {
  const data = await getItem(params.uri);
  const content = await getFileContent(data);
  const title = data.title;

  return (
    <>
      <div className="pt-2 px-4">
        <Breadcrumb url="/items">All Items</Breadcrumb>
        <BreadSeparator />
        <Breadcrumb url={`/items/${params.uri}`}>{title}</Breadcrumb>
      </div>
      <div className="">
        <Item view={"blog"} item={data} content={content} searchParams={new URLSearchParams(searchParams).toString()} />
      </div>
    </>
  );
}
