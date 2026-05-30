import { cacheLife } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getCategoriesWithCount() {
    "use cache";
    cacheLife("max");
    return prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { posts: true } } },
    });
}
