import getHash, { ITERATIONS, getSalt } from "@/lib/passwords";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const salt = getSalt();
  const settings = await prisma.appSettings.upsert({
    where: { id: 0 },
    update: {},
    create: {
      id: 0,
      basePath: "./sampleData",
    },
  });
  const type = await prisma.itemType.upsert({
    where: { type: "Markdown" },
    update:{},
    create: {
      type: "Markdown",
      description: "A Markdown file",
    },
  });
  const typePNG = await prisma.itemType.upsert({
    where: { type: "Image" },
    update:{},
    create: {
      type: "Image",
      description: "An image file",
    },
  });
  const author = await prisma.itemTags.upsert({
    where: { name: "Admin" },
    update:{},
    create: {
        name: "Admin",
        type: {
          create: {
            type: "author",
            description: "Author of an item",
            showType: true,
          },
        },
    },
  });
  const admin = await prisma.user.upsert({
    where: { email: "admin@example" },
    update: {},
    create: {
      id:0,
      email: "admin@example",
      username: "Admin",
      passwordHashIterations: ITERATIONS,
      passwordHashSalt: salt,
      passwordHash: await getHash("changethis", salt, ITERATIONS),
      roles: {
        create: [
          {
            name: "Admin",
            description: "Admin role",
            rolePermissions: {
              create: [
                {
                  positive: true,
                  permission: {
                    create: {
                      id: "admin",
                      description: "Full access to everything",
                    },
                  },
                },
              ],
            },
          },
          {
            name: "Mod",
            description: "Mod role",
            rolePermissions: {
              create: [
                {
                  positive: true,
                  permission: {
                    create: {
                      id: "post",
                      description: "Posting",
                    },
                  },
                },
                {
                  positive: true,
                  permission: {
                    create: {
                      id: "delete",
                      description: "Deleting",
                    },
                  },
                },
                {
                  positive: true,
                  permission: {
                    create: {
                      id: "permissions",
                      description: "Edit Permissions",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      items: {
        create: [
          {
            title: "Sample note",
            filePath: "notes/sample.md",
            uri: "sample.md",
            uploadDate: new Date(),
            tags: {connect:[author]},
            type: {connect:type},
          },{
            title: "Sample note 2",
            filePath: "notes/sample2.md",
            uri: "sample2.md",
            uploadDate: new Date(),
            tags: {connect:[author]},
            type: {connect:type},
          },{
            title: "Sample Image",
            filePath: "notes/sample.png",
            uri: "sample.png",
            uploadDate: new Date(),
            tags: {connect:[author]},
            type: {connect:typePNG},
          },{
            title: "Sample Image",
            filePath: "notes/sample2.png",
            uri: "sample2.png",
            uploadDate: new Date(),
            tags: {connect:[author]},
            type: {connect:typePNG},
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
