import { PostWithCategory } from "../types";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostWithCategory[] }) {
    return (
        <div>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
