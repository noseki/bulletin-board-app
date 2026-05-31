'use server';

import { updateTag } from "next/cache";

export async function revalidatePost(id: string) {
    updateTag(`post-${id}`);
    updateTag("categories");
}
