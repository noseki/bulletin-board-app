import BackButton from "@/components/elements/backButton";
import { getCategories } from "@/features/categories/api/getCategories";
import PostForm from "@/features/posts/components/PostForm";

export default async function Add() {
    const categories = await getCategories();

    return (
        <main className="relative my-auto mx-auto w-full max-w-sm space-y-4 overflow-visible">
            <BackButton />
            <PostForm categories={categories} />
        </main>
    )
}
