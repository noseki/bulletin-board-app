import { connection } from "next/server";
import Link from "next/link";
import {
    LayoutList,
    Megaphone,
    MessageCircle,
    HelpCircle,
    CalendarDays,
    Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getCategories } from "@/features/categories/api/getCategories";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<string, LucideIcon> = {
    announcements: Megaphone,
    general: MessageCircle,
    questions: HelpCircle,
    events: CalendarDays,
};

export default async function CategoryList({
    activeSlug,
}: {
    activeSlug?: string;
}) {
    await connection();
    const categories = await getCategories();

    return (
        <nav className="space-y-1">
            <p className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                カテゴリー
            </p>
            <Link
                href="/posts"
                className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-300",
                    !activeSlug && "bg-muted font-medium",
                )}
            >
                <LayoutList className="h-4 w-4 shrink-0" />
                すべて
            </Link>
            {categories.map((category) => {
                const Icon = CATEGORY_ICON[category.slug] ?? Tag;
                return (
                    <Link
                        key={category.id}
                        href={`/posts?category=${category.slug}`}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-300",
                            activeSlug === category.slug &&
                                "bg-muted font-medium",
                        )}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        {category.name}
                    </Link>
                );
            })}
            <Link
                href="/categories"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-gray-300 mt-2 border-t pt-3"
            >
                <Tag className="h-4 w-4 shrink-0" />
                カテゴリー一覧
            </Link>
        </nav>
    );
}
