import { Prisma } from "@prisma/client";
import Link from "next/link";

const TagTypes = {
  author: "bg-yellow-700 hover:bg-yellow-800"
}

function getTagColor(type:string){
  return TagTypes[type as keyof typeof TagTypes] ?? "bg-zinc-600";
}

type TagWithType = Prisma.ItemTagsGetPayload<{
  include: {
    type: true;
  }
}>

export default function Tag({tag}: {
  tag:TagWithType;
}) {
  return (
    <Link
      className={`${getTagColor(tag.type.type)} inline-block text-sm px-1 rounded text-slate-300`}
      href={`/tags/${tag.type.type}:${tag.name}`}
    >
      {(tag.type.showType)?`${tag.type.type}:`:""}{tag.name}
    </Link>
  );
}