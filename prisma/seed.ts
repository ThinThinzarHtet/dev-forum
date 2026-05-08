import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });

export const dummyPosts = [
  {
    title: "First Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "qa5FZP18TrtXrG5ehanQAPpFKnJ0rH8T",
  },
  {
    title: "Second Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "qa5FZP18TrtXrG5ehanQAPpFKnJ0rH8T",
  },
  {
    title: "Third Post",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "qa5FZP18TrtXrG5ehanQAPpFKnJ0rH8T",
  },
];

const seed = async () => {
  await prisma.post.deleteMany();

  await prisma.post.createMany({ data: dummyPosts });
  console.log("Database seeded successfully.");
};

seed();
