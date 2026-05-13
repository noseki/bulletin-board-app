import { z } from "zod";

export const createPostSchema = z.object({
    categoryId: z.string().min(1, { message: "カテゴリーを選択してください" }),
    user:  z.string().min(1, "投稿者名は必須です").max(50, '50文字以内で入力してください'),
    title: z.string().min(1, { message: "タイトルを入力してください" }).max(50, '50文字以内で入力してください'),
    content: z.string().min(1, { message: "投稿内容 を入力してください" }).max(200, '200文字以内で入力してください'),
})

export type createPostValues = z.infer<typeof createPostSchema>;
