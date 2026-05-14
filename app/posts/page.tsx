import { connection } from "next/server";
import AddButton from "@/components/elements/addButton";
import { getPosts } from "@/features/posts/api/getPosts";
import PostList from "@/features/posts/components/PostList";

export default async function PostsPage() {
    await connection();
    const posts = await getPosts();

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl">投稿一覧</h1>
                <AddButton />
            </div>
            <PostList posts={posts}/>
        </main>
    )
}
