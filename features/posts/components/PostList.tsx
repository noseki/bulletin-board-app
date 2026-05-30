import { PostWithCategory } from "../types";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostWithCategory[] }) {
    if (posts.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-12">
                このカテゴリーにはまだ投稿がありません。
            </p>
        );
    }
    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
