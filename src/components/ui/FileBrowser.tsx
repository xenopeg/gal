import { lstat, readdir } from "fs/promises";
import path from "path";
import { useState } from "react";

type DirTree = {
  files: DirFile[];
  folders: DirFolder[];
};
type DirFolder = DirFile & {
  children: DirTree;
};
type DirFile = {
  name: string;
  path: string;
};

// Incomplete and broken
async function getDir(dir:string[]) {
  const basePath = (await prisma.appSettings.findFirstOrThrow()).basePath;
  const folderPath = !dir?basePath:path.join(basePath, ...dir)
  const files = await readdir(folderPath/*, { recursive: true }*/);

  const tree: DirTree = {
    folders: [],
    files: [],
  };

  for (const file of files) {
    const segments = file.split(path.sep);
    let curTree = tree;
    const isFile = (await lstat(path.join(basePath, file))).isFile();
    const stack = [];
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (i === segments.length - 1 && isFile) {
        curTree.files.push({
          name: segment,
          path: file,
        });
      } else {
        const branch = curTree.folders.find((f) => f.name === segment);
        if (branch) {
          curTree = branch.children;
        } else {
          const newBranch = {
            name: segment,
            path: path.join(...stack),
            children: {
              folders: [],
              files: [],
            },
          };
          curTree.folders.push(newBranch);
          curTree = newBranch.children;
        }
        stack.push(segment);
      }
    }
  }
  return tree;
}

export default async function FileBrowser() {
  const [currentDir, setCurrentDir] = useState([]);
  const files = await getDir(currentDir);

  return (
    <pre className="font-mono whitespace-pre">
      {JSON.stringify(files, null, 4)}
    </pre>
  );
}
