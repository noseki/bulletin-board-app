import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from "@testing-library/react";
import { PostWithCategory } from '@/features/posts/types';
import PostContent from '@/features/posts/components/PostContent';

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

describe("PostContent", () => {
    beforeEach(() => {
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date(2026, 4, 15)); // 2026/05/15 00:00:00 に固定
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("カテゴリー、タイトル、投稿者名、投稿日時（相対日時）、投稿内容が表示されていること", async () => {
        render(<PostContent post={mockPost} />);
        expect(await screen.findByText("お知らせ")).toBeInTheDocument();
        expect(screen.getByText("掲示板アプリへようこそ")).toBeInTheDocument(); // タイトル
        expect(screen.getByText("テスト太郎")).toBeInTheDocument(); // 投稿者名
        expect(screen.getByText('13日前')).toBeInTheDocument(); // 投稿日時（固定時刻なので常に同じ値）
        expect(screen.getByText('新しい掲示板アプリを開設しました')).toBeInTheDocument(); // 投稿内容
    });

    test("投稿者名の頭文字がアバターに表示されること", async () => {
        render(<PostContent post={mockPost} />);
        expect(await screen.findByText("テ")).toBeInTheDocument(); // "テスト太郎" の1文字目
    });

    test("未知のカテゴリスラッグにはデフォルト色が適用されること", async () => {
        const unknownCategoryPost = {
            ...mockPost,
            category: { id: "99", slug: "unknown", name: "不明" },
        };
        render(<PostContent post={unknownCategoryPost} />);
        const badge = await screen.findByText("不明");
        expect(badge.className).toContain("bg-gray"); // DEFAULT_CATEGORY_COLOR のクラスが含まれていることを確認
    });
})
