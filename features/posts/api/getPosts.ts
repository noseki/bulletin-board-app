import { prisma } from "@/lib/prisma";

export async function getPosts() {
    return prisma.post.findMany({
        include: { category: true },
        orderBy: { post_at: "desc" },
        take: 50, // 取得件数を制限
    });
}
