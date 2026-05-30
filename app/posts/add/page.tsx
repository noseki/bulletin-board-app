import { connection } from "next/server";
import { Suspense } from "react";
import BackButton from "@/components/elements/backButton";
import { getCategories } from "@/features/categories/api/getCategories";
import PostForm from "@/features/posts/components/PostForm";

async function AddPostForm() {
    await connection();
    const categories = await getCategories();
    return <PostForm categories={categories} />;
}

export default function Add() {
    return (
        <div className="relative my-auto mx-auto w-full max-w-sm space-y-4 overflow-visible">
            <BackButton />
            <Suspense fallback={<p className="text-center text-muted-foreground">読み込み中...</p>}>
                <AddPostForm />
            </Suspense>
        </div>
    );
}
