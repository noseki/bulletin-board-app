import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from "@testing-library/react";
import CategoryList from '@/features/categories/components/CategoryList';
import { getCategories } from '@/features/categories/api/getCategories';

vi.mock('next/server', () => ({
    connection: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('next/link', () => ({
    default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
        <a href={href} className={className}>{children}</a>
    ),
}));

vi.mock('@/features/categories/api/getCategories');

const mockCategories = [
    { id: "1", slug: "announcements", name: "お知らせ" },
    { id: "2", slug: "general",       name: "一般" },
    { id: "3", slug: "questions",     name: "質問" },
    { id: "4", slug: "events",        name: "イベント" },
];

describe("CategoryList", () => {
    beforeEach(() => {
        vi.mocked(getCategories).mockResolvedValue(mockCategories);
    });

    test("「すべて」リンクが表示されること", async () => {
        render(await CategoryList({}));
        expect(screen.getByRole("link", { name: /すべて/ })).toBeInTheDocument();
    });

    test("カテゴリー一覧が全件表示されること", async () => {
        render(await CategoryList({}));
        expect(screen.getByText("お知らせ")).toBeInTheDocument();
        expect(screen.getByText("一般")).toBeInTheDocument();
        expect(screen.getByText("質問")).toBeInTheDocument();
        expect(screen.getByText("イベント")).toBeInTheDocument();
    });

    test("「すべて」リンクが /posts のhrefを持つこと", async () => {
        render(await CategoryList({}));
        expect(screen.getByRole("link", { name: /すべて/ })).toHaveAttribute("href", "/posts");
    });

    test("各カテゴリーリンクが /posts?category=<slug> のhrefを持つこと", async () => {
        render(await CategoryList({}));
        expect(screen.getByRole("link", { name: /一般/ })).toHaveAttribute("href", "/posts?category=general");
        expect(screen.getByRole("link", { name: /質問/ })).toHaveAttribute("href", "/posts?category=questions");
    });

    test("activeSlugが未指定のとき「すべて」がアクティブスタイルを持つこと", async () => {
        render(await CategoryList({}));
        expect(screen.getByRole("link", { name: /すべて/ }).className).toContain("font-medium");
    });

    test("activeSlugが未指定のとき各カテゴリーはアクティブスタイルを持たないこと", async () => {
        render(await CategoryList({}));
        expect(screen.getByRole("link", { name: /一般/ }).className).not.toContain("font-medium");
    });

    test("activeSlugが指定されたとき該当カテゴリーがアクティブスタイルを持つこと", async () => {
        render(await CategoryList({ activeSlug: "general" }));
        expect(screen.getByRole("link", { name: /一般/ }).className).toContain("font-medium");
    });

    test("activeSlugが指定されたとき「すべて」はアクティブスタイルを持たないこと", async () => {
        render(await CategoryList({ activeSlug: "general" }));
        expect(screen.getByRole("link", { name: /すべて/ }).className).not.toContain("font-medium");
    });

    test("activeSlugと一致しないカテゴリーはアクティブスタイルを持たないこと", async () => {
        render(await CategoryList({ activeSlug: "general" }));
        expect(screen.getByRole("link", { name: /お知らせ/ }).className).not.toContain("font-medium");
    });
});
