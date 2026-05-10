import BackButton from "@/components/elements/backButton";
import PostContent from "@/features/posts/components/PostContent";

export default function PostDetailPage({ params }: { params: Promise<{ id: string }>}) {
    return (
        <div>
            <BackButton />
            <PostContent params={params} />
        </div>
    );
}
