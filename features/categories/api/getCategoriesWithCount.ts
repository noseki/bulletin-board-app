import { cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getCategoriesWithCount() {
    "use cache";
    cacheTag("categories");
    return prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
    });
}
