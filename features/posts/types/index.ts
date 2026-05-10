export type Post = {
    id: string;
    user: string;
    category: "announcements" | "questionnaire";
    title: string;
    content: string;
    post_at: string;
}