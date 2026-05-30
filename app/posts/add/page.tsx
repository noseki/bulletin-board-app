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

function PostFormSkeleton() {
    return (
        <div className="rounded-xl ring-1 ring-foreground/10 bg-card py-4 animate-pulse">
            <div className="px-4 mb-4">
                <div className="h-5 w-24 bg-muted rounded" />
            </div>
            <div className="px-4 space-y-5">
                {["w-16", "w-20", "w-16", "w-20"].map((w, i) => (
                    <div key={i} className="space-y-2">
                        <div className={`h-4 ${w} bg-muted rounded`} />
                        <div className="h-9 w-full bg-muted rounded-md" />
                    </div>
                ))}
                <div className="h-9 w-full bg-muted rounded-md mt-2" />
            </div>
        </div>
    );
}

export default function Add() {
    return (
        <div className="relative my-auto mx-auto w-full max-w-sm space-y-4 overflow-visible py-8">
            <BackButton />
            <Suspense fallback={<PostFormSkeleton />}>
                <AddPostForm />
            </Suspense>
        </div>
    );
}
