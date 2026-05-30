import { describe, test, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import { PostWithCategory } from '@/features/posts/types';
import PostCard from '@/features/posts/components/PostCard';

vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

const mockPost: PostWithCategory = {
    id: "1",
    user: "テスト太郎",
    title: "掲示板アプリへようこそ",
    content: "新しい掲示板アプリを開設しました",
    post_at: new Date(2026, 4, 1, 23, 59, 59), // 2026/05/01 23:59:59（ローカル時刻）
    categoryId: "1",
    category: {
        id: "1",
        slug: "announcements",
        name: "お知らせ",
    },
};

describe("PostCard", () => {
    test("カテゴリー、タイトル、投稿内容、投稿日時、投稿者名が表示されていること", async () => {
        render(<PostCard post={mockPost} />);
        expect(await screen.findByText("お知らせ")).toBeInTheDocument();
        expect(screen.getByText("掲示板アプリへようこそ")).toBeInTheDocument(); // タイトル
        expect(screen.getByText('新しい掲示板アプリを開設しました')).toBeInTheDocument(); // 投稿内容
        expect(screen.getByText('投稿日：2026/05/01 23:59:59')).toBeInTheDocument(); // 投稿日時
        expect(screen.getByText("テスト太郎")).toBeInTheDocument(); // 投稿者名
    });

    test("リンクが存在すること", () => {
        render(<PostCard post={mockPost} />);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    });
})
