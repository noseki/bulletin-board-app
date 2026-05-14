import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
import { CATEGORY_COLOR, DEFAULT_CATEGORY_COLOR, PostWithCategory,  } from "../types";
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "../lib/utils";

function PostLink({ id, children }: { id: string, children: React.ReactNode }) {
    return (
        <Link href={`/posts/${id}`}>
            {children}
        </Link>
    );
}

export default function PostCard({ post }: { post: PostWithCategory }) {
    return (
        <PostLink id={post.id}>
            <Card className="relative mx-auto my-4 w-full max-w-sm">
                <CardHeader>
                    <Badge className={ CATEGORY_COLOR[post.category.slug] ?? DEFAULT_CATEGORY_COLOR}>{post.category.name}</Badge>
                    <CardTitle className="mt-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="font-medium line-clamp-1">{post.content}</p>
                        <p className="text-sm text-muted-foreground">投稿日：{formatDateTime(post.post_at)}</p>
                        <p className="text-sm text-muted-foreground">{post.user}さん</p>
                    </div>
                </CardContent>
            </Card>
        </PostLink>
    )
};
