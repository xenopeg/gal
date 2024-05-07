import React from "react";
import Item, { getItem } from "../../../components/ui/Item";
import Breadcrumb, { BreadSeparator } from "@/components/ui/Breadcrumb";

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getItem(params.id);
  const title = data.title;

  return (
    <>
      <Breadcrumb url="#">Items</Breadcrumb>
      <BreadSeparator />
      <Breadcrumb url="#">{title}</Breadcrumb>
      <div className="">
        <Item item={data} />
      </div>
    </>
  );
}
