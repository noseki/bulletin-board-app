import AddButton from "@/components/elements/addButton";
import PostList from "@/features/posts/components/PostList";
import { Post } from "@/features/posts/types";

export default function PostsPage() {
    // ここでFetch！
    const posts: Post[] = [
        {id: "1", user: "テスト太郎", category: "announcements", title: "掲示板アプリへようこそ", content: "新しい掲示板アプリを開設しました", post_at: "2026/05/09 17:12:00" },
        {id: "2", user: "テスト花子", category: "questionnaire", title: "あなたが現在使っているプログラミング言語は？", content: "あなたが現在プロジェクトや個人開発などでメインで使っているプログラミング言語に投票してください。", post_at: "2026/05/10 13:15:03" }
    ];

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
