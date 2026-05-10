import { Post } from "../types";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[]}) {
    return (
        <div>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}
