import { prisma } from "@/lib/prisma";

export async function getCategoriesWithCount() {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
    });
}
