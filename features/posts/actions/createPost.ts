// ServerActions
'use server';
import { createPostSchema, createPostValues } from "@/features/posts/schema";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export type SubmitResult = 
    | { ok: true; message: string }
    | {
        ok: false;
        message: string;
        fieldErrors?: Record<string, string[] | undefined>;
    }

export async function createPost(input: createPostValues ): Promise<SubmitResult> {
    const parsed = createPostSchema.safeParse(input);

    if (!parsed.success) {
        const flattened = z.flattenError(parsed.error);
        return {
            ok: false,
            message: "投稿に失敗しました。再度お試しください。",
            fieldErrors: flattened.fieldErrors,
        }
    }

    await prisma.post.create({ data: parsed.data });
    
    return {
        ok: true,
        message: "投稿完了しました",
    }
}
