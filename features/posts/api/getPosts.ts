import { prisma } from "@/lib/prisma";

export async function getPosts() {
    return prisma.post.findMany({
        orderBy: { post_at: "desc" }
    });
}
