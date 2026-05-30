import { cacheLife } from "next/cache";
import Link from "next/link";
import {
    Megaphone,
    MessageCircle,
    HelpCircle,
    CalendarDays,
    Tag,
    ArrowLeft,
    ArrowRight,
    FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoriesWithCount } from "@/features/categories/api/getCategoriesWithCount";
import { CATEGORY_COLOR, DEFAULT_CATEGORY_COLOR } from "@/features/posts/types";

const CATEGORY_ICON: Record<string, LucideIcon> = {
    announcements: Megaphone,
    general: MessageCircle,
    questions: HelpCircle,
    events: CalendarDays,
};

const CATEGORY_BG: Record<string, string> = {
    announcements: "bg-blue-50 border-blue-200 hover:border-blue-300",
    general: "bg-green-50 border-green-200 hover:border-green-300",
    questions: "bg-pink-50 border-pink-200 hover:border-pink-300",
    events: "bg-yellow-50 border-yellow-200 hover:border-yellow-300",
};
const DEFAULT_CATEGORY_BG = "bg-gray-50 border-gray-200 hover:border-gray-300";

export default async function CategoryPage() {
    "use cache";
    cacheLife("max");

    const categories = await getCategoriesWithCount();
    const totalPosts = categories.reduce((sum, c) => sum + c._count.posts, 0);

    return (
        <div className="px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
                <Link
                    href="/posts"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-xl font-semibold">カテゴリー一覧</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-8 pl-8">
                {categories.length}カテゴリー・計{totalPosts}件の投稿
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => {
                    const Icon = CATEGORY_ICON[category.slug] ?? Tag;
                    const color =
                        CATEGORY_COLOR[category.slug] ?? DEFAULT_CATEGORY_COLOR;
                    const bg =
                        CATEGORY_BG[category.slug] ?? DEFAULT_CATEGORY_BG;
                    return (
                        <Link
                            key={category.id}
                            href={`/posts?category=${category.slug}`}
                        >
                            <Card className={`border-2 hover:shadow-md transition-all h-full group ${bg}`}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                                    </div>
                                    <h2 className="font-semibold text-base mb-1">
                                        {category.name}
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <FileText className="h-3.5 w-3.5" />
                                        <span>
                                            {category._count.posts}件の投稿
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
