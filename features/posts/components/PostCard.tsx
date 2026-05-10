import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
import { Post } from "../types";

function PostLink({ id, children }: { id: string, children: React.ReactNode }) {
    return (
        <Link href={`/posts/${id}`}>
            {children}
        </Link>
    );
}

export default function PostCard({ post }: { post: Post }) {
    return (
        <PostLink id={post.id}>
            <Card key={post.id} className="relative mx-auto my-4 w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="font-medium">{post.content}</p>
                        <p className="text-sm text-muted-foreground">投稿日：{post.post_at}</p>
                        <p className="text-sm text-muted-foreground">{post.user}さん</p>
                    </div>
                </CardContent>
            </Card>
        </PostLink>
    )
};
