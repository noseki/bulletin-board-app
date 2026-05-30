import { connection } from "next/server";
import { Suspense } from "react";
import AddButton from "@/components/elements/addButton";
import { getPosts } from "@/features/posts/api/getPosts";
import PostList from "@/features/posts/components/PostList";
import CategoryList from "@/features/categories/components/CategoryList";

async function PostsContent({ categorySlug }: { categorySlug?: string }) {
    await connection();
    const posts = await getPosts(categorySlug);
    return <PostList posts={posts} />;
}

function PostListSkeleton() {
    return (
        <div className="space-y-8">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="border-2 rounded-lg p-6 animate-pulse">
                        <div className="h-5 w-16 bg-muted rounded mb-3" />
                        <div className="h-6 w-2/3 bg-muted rounded mb-4" />
                        <div className="h-4 w-full bg-muted rounded mb-2" />
                        <div className="flex gap-6 mt-2">
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-4 w-24 bg-muted rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function CategoryListSkeleton() {
    return (
        <div className="space-y-2 animate-pulse">
            <div className="h-4 w-20 bg-muted rounded mb-3 mx-2" />
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded-md mx-1" />
            ))}
        </div>
    );
}

export default async function PostsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { category } = await searchParams;
    const categorySlug = Array.isArray(category) ? category[0] : category;

    return (
        <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl">投稿一覧</h1>
                <AddButton />
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                <aside className="md:w-56 shrink-0">
                    <Suspense fallback={<CategoryListSkeleton />}>
                        <CategoryList activeSlug={categorySlug} />
                    </Suspense>
                </aside>
                <main className="flex-1 min-w-0">
                    <Suspense fallback={<PostListSkeleton />}>
                        <PostsContent categorySlug={categorySlug} />
                    </Suspense>
                </main>
            </div>
        </div>
    );
}
