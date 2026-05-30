import { getPost } from "@/features/posts/api/getPost";
import PostContent from "./PostContent";
import ReloadButton from "./ReloadButton";
import { notFound } from "next/navigation";

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);
    if (!post) notFound();
    return (
        <>
            <PostContent post={post} />
            <ReloadButton id={id} />
        </>
    );
}
