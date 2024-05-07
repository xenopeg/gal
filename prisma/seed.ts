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
  const admin = await prisma.user.upsert({
    where: { email: "admin@example" },
    update: {},
    create: {
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
            type: {
              create: {
                type: "Markdown",
                description: "A Markdown file",
              },
            },
            tags: {
              create: [
                {
                  name: "Admin",
                  type: {
                    create: {
                      type: "author",
                      description: "Author of an item",
                      showType: true,
                    },
                  },
                },
              ],
            },
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
