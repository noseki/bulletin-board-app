import { connection } from "next/server";
import { Suspense } from "react";
import AddButton from "@/components/elements/addButton";
import { getPosts } from "@/features/posts/api/getPosts";
import PostList from "@/features/posts/components/PostList";

async function PostsContent() {
    await connection();
    const posts = await getPosts();
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

export default function PostsPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl">投稿一覧</h1>
                <AddButton />
            </div>
            <Suspense fallback={<PostListSkeleton />}>
                <PostsContent />
            </Suspense>
        </div>
    );
}
