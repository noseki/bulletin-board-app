import BackButton from "@/components/elements/backButton";
import PostDetail from "@/features/posts/components/PostDetail";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export async function generateStaticParams() {
    const posts = await prisma.post.findMany({ select: { id: true } });
    // Cache Components (Next.js 16) requires at least one result; PostDetail calls notFound() for invalid IDs.
    if (posts.length === 0) return [{ id: "_placeholder" }];
    return posts.map((p) => ({ id: p.id }));
}

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="relative my-auto mx-auto w-full max-w-2xl space-y-4 overflow-visible px-6 py-8">
            <BackButton />
            <Suspense fallback={<p className="text-center text-muted-foreground">読み込み中...</p>}>
                <PostDetail params={params} />
            </Suspense>
        </div>
    );
}
