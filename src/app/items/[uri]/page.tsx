import React from "react";
import Item, { getFileContent, getItem } from "../../../components/ui/Item";
import Breadcrumb, { BreadSeparator } from "@/components/ui/Breadcrumb";

export default async function Page({ params }: { params: { uri: string } }) {
  const data = await getItem(params.uri);
  const content = await getFileContent(data);
  const title = data.title;

  return (
    <>
      <div className="pt-2 px-4">
        <Breadcrumb url="#">All Items</Breadcrumb>
        <BreadSeparator />
        <Breadcrumb url="#">{title}</Breadcrumb>
      </div>
      <div className="">
        <Item view={"blog"} item={data} content={content} />
      </div>
    </>
  );
}
