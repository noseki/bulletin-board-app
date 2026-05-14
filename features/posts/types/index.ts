import type { Prisma } from "@/app/generated/prisma/client";

export type PostWithCategory = Prisma.PostGetPayload<{ include: { category: true }}>;

export const CATEGORY_COLOR: Record<string, string> = {
    announcements: "bg-blue-100 text-blue-700",
    general: "bg-green-100 text-green-700",
    questions: "bg-pink-100 text-pink-700",
    events: "bg-yellow-100 text-yellow-700",
};

export const DEFAULT_CATEGORY_COLOR = "bg-gray-100 text-gray-700";
