import { prisma } from "@/lib/prisma";

export async function getPosts(categorySlug?: string) {
    return prisma.post.findMany({
        where: categorySlug
            ? { category: { slug: categorySlug } }
            : undefined,
        include: { category: true },
        orderBy: { post_at: "desc" },
        take: 50,
    });
}
