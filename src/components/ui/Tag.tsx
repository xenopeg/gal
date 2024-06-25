import plug from "@/lib/TailPlug";
import { Prisma } from "@prisma/client";
import Link from "next/link";

const TagTypes = {
  author: "bg-yellow-700 hover:bg-yellow-800 active:bg-yellow-600",
  characteristic: "bg-slate-700 hover:bg-slate-800 active:bg-slate-600",
}

function getTagColor(type:string){
  return TagTypes[type as keyof typeof TagTypes] ?? "bg-zinc-600";
}

const LinkyTag = plug(Link)`
  inline-block text-sm px-1 rounded 
  text-slate-300 mx-1
  ${props => getTagColor(props.type)} 
`;

type TagWithType = Prisma.ItemTagsGetPayload<{
  include: {
    type: true;
  }
}>

export default function Tag({tag}: {
  tag:TagWithType;
}) {
  return (
    <LinkyTag
      type={tag.type.type}
      href={`/items?view=list&q=${encodeURIComponent(tag.type.showType?tag.type.type+":":"")}${encodeURIComponent(tag.name)}`}
    >
      {(tag.type.showType)?`${tag.type.type}:`:""}{tag.name}
    </LinkyTag>
  );
}