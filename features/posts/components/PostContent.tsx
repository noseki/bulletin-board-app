import {
    CATEGORY_COLOR,
    DEFAULT_CATEGORY_COLOR,
    PostWithCategory,
} from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "../lib/utils";

export default function PostContent({ post }: { post: PostWithCategory }) {
    return (
        <Card className="space-y-6">
            <CardHeader>
                <div className="mb-4">
                    <Badge
                        className={
                            CATEGORY_COLOR[post.category.slug] ??
                            DEFAULT_CATEGORY_COLOR
                        }
                    >
                        {post.category.name}
                    </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {post.title}
                </CardTitle>
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {post.user.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium text-sm">{post.user}</p>
                        <p className="text-xs text-gray-500">
                            {formatRelativeTime(post.post_at)}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="prose max-w-none mb-6">
                    <p className="whitespace-pre-line text-gray-700">
                        {post.content}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
