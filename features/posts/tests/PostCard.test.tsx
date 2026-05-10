import { describe, test, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import { Post } from '@/features/posts/types';
import PostCard from '@/features/posts/components/PostCard';

vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

const mockPost: Post = {
    id: "1",
    user: "テスト太郎",
    category: "announcements",
    title: "掲示板アプリへようこそ",
    content: "新しい掲示板アプリを開設しました",
    post_at: "2026/05/01 23:59:59",
}

describe("PostCard", () => {
    test("タイトル、投稿内容、投稿日時、投稿者名が表示されていること", async () => {
        render(<PostCard post={mockPost} />);
        expect(await screen.findByText("掲示板アプリへようこそ")).toBeInTheDocument(); // タイトル
        expect(screen.getByText('新しい掲示板アプリを開設しました')).toBeInTheDocument(); // 投稿内容
        expect(screen.getByText('投稿日：2026/05/01 23:59:59')).toBeInTheDocument(); // 投稿日時
        expect(screen.getByText("テスト太郎さん")).toBeInTheDocument(); // 投稿者名
    });

    test("リンクが存在すること", () => {
        render(<PostCard post={mockPost} />);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    })
})