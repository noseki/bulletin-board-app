import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getCategories() {
    "use cache";
    cacheLife("max");
    cacheTag("categories");
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    });
}
