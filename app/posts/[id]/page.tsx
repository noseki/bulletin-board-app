import BackButton from "@/components/elements/backButton";
import PostDetail from "@/features/posts/components/PostDetail";
import { Suspense } from "react";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <div className="relative my-auto mx-auto w-full max-w-sm space-y-4 overflow-visible">
            <BackButton />
            <Suspense fallback={<p className="text-center text-muted-foreground">読み込み中...</p>}>
                <PostDetail params={params} />
            </Suspense>
        </div>
    );
}
