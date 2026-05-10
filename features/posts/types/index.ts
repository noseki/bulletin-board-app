export type Post = {
    id: string;
    user: string;
    category: "announcements" | "questionnaire";
    title: string;
    content: string;
    post_at: string;
}

export const CATEGORY_LABEL: Record<string, string> = {
    announcements: "お知らせ",
    questionnaire: "アンケート",
};

export const CATEGORY_COLOR: Record<string, string> = {
    announcements: "bg-blue-100 text-blue-700",
    questionnaire: "bg-pink-100 text-pink-700",
};