import { cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getPost(id: string) {
    "use cache";
    cacheTag(`post-${id}`);
    return prisma.post.findUnique({
        include: { category: true },
        where: { id },
    });
}
