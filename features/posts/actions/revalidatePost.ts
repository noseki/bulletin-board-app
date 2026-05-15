'use server';

import { updateTag } from "next/cache";

export async function revalidatePost(formData: FormData) {
    const id = formData.get("id") as string;
    updateTag(`post-${id}`); // キャッシュ無効化
}
