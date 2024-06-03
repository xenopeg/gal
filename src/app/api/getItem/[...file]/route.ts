export const dynamic = "force-dynamic";

import prisma from "@/db";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { ReadableOptions } from "stream";

function streamFile(
  path: string,
  options?: ReadableOptions,
): ReadableStream<Uint8Array> {
  const downloadStream = fs.createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk)),
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error),
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}
export async function GET(
  request: NextRequest,
  { params }: { params: { file: string[] } },
) {
  const basePath = (await prisma.appSettings.findFirstOrThrow()).basePath;

  const file = path.resolve(basePath, ...params.file);
  const stats = await fs.promises.stat(file); // Get the file size
  const data: ReadableStream<Uint8Array> = streamFile(file); // Stream the file with a 1kb chunk
  const res = new NextResponse(data, {
    // Create a new NextResponse for the file with the given stream from the disk
    status: 200, //STATUS 200: HTTP - Ok
    headers: new Headers({
      //Headers
      "content-disposition": `attachment; filename=${path.basename(file)}`, //State that this is a file attachment
      "content-type": "image/png", //Set the file type to an iso
      "content-length": stats.size + "", //State the file size
    }),
  });
  return res;
}
