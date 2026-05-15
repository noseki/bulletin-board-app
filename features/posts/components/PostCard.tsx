import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
import { CATEGORY_COLOR, DEFAULT_CATEGORY_COLOR, PostWithCategory } from "../types";
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
        <div className="space-y-4">
            <PostLink id={post.id}>
                <Card className="border-2 hover:border-gray-300 transition-colors">
                    <CardHeader>
                        <Badge className={ CATEGORY_COLOR[post.category.slug] ?? DEFAULT_CATEGORY_COLOR}>{post.category.name}</Badge>
                        <CardTitle className="mt-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="font-medium line-clamp-1">{post.content}</p>

                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <p className="text-sm text-muted-foreground">投稿日：{formatDateTime(post.post_at)}</p>
                                    <p className="text-sm text-muted-foreground">{post.user}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </PostLink>
        </div>
    )
};
