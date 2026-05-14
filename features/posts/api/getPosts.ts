import { prisma } from "@/lib/prisma";

export async function getPosts() {
    return prisma.post.findMany({
        include: { category: true },
        orderBy: { post_at: "desc" }
    });
}
