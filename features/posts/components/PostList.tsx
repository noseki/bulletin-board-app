import { PostWithCategory } from "../types";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostWithCategory[] }) {
    return (
        <div className="space-y-8">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
