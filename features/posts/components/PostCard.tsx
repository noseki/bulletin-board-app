import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
import { CATEGORY_COLOR, CATEGORY_LABEL, Post } from "../types";
import { Badge } from "@/components/ui/badge"

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
            <Card className="relative mx-auto my-4 w-full max-w-sm">
                <CardHeader>
                    <Badge className={CATEGORY_COLOR[post.category]}>{CATEGORY_LABEL[post.category]}</Badge>
                    <CardTitle className="mt-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="font-medium">{post.content}</p> {/* TODO:ある程度の文字数で...にする */}
                        <p className="text-sm text-muted-foreground">投稿日：{post.post_at}</p>
                        <p className="text-sm text-muted-foreground">{post.user}さん</p>
                    </div>
                </CardContent>
            </Card>
        </PostLink>
    )
};
