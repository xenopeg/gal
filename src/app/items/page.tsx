import Breadcrumb from "@/components/ui/Breadcrumb";
import { getFileContent } from "@/components/ui/Item";
import ItemsList, { getItems } from "@/components/ui/ItemsList";
import Spacer from "@/components/ui/Spacer";
import {
  IconLayoutGrid,
  IconLayoutRows,
  IconListDetails,
} from "@tabler/icons-react";
import Link from "next/link";
import plug from "@/lib/TailPlug";

const ViewButton = plug(Link)`
 px-2 cursor-pointer hover:text-white
 ${(props) => (props.href.indexOf(props.view) > -1 ? "text-white cursor-default" : "")}
`;

export default async function Page({
  searchParams,
}: {
  searchParams?: any|{ [key: string]: string | string[] | undefined };
}) {
  const view = searchParams?.view as string;
  const query = searchParams?.q as string;
  const tags = query?.split(",").map(q => q.trim()).filter(q => q.length);
  const data = await getItems({tags});
  const content = await Promise.all(data.map((d) => getFileContent(d)));
  return (
    <>
      <div
        className="p-2 px-4 flex flex-row bg-indigo-400/5 items-center
          justify-center align-middle"
      >
        <div>
          <Breadcrumb url="/items">All Items</Breadcrumb>
        </div>
        <Spacer />
        <div className="flex">
          <ViewButton view={view} href="?view=blog">
            <IconLayoutRows />
          </ViewButton>
          <ViewButton view={view} href="?view=list">
            <IconListDetails />
          </ViewButton>
          <ViewButton view={view} href="?view=grid">
            <IconLayoutGrid />
          </ViewButton>
        </div>
      </div>
      <div className="">
        <ItemsList view={view} items={data} contents={content} searchParams={(new URLSearchParams(searchParams)).toString()} />
      </div>
    </>
  );
}
