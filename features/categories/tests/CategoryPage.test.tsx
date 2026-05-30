import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryPage from "@/app/categories/page";
import { getCategoriesWithCount } from "@/features/categories/api/getCategoriesWithCount";

vi.mock("next/cache", () => ({
    cacheLife: vi.fn(),
    cacheTag: vi.fn(),
}));

vi.mock("next/link", () => ({
    default: ({
        children,
        href,
        className,
    }: {
        children: React.ReactNode;
        href: string;
        className?: string;
    }) => (
        <a href={href} className={className}>
            {children}
        </a>
    ),
}));

vi.mock("@/features/categories/api/getCategoriesWithCount");

const mockCategories = [
    { id: "1", slug: "announcements", name: "お知らせ", _count: { posts: 5 } },
    { id: "2", slug: "general", name: "一般", _count: { posts: 10 } },
    { id: "3", slug: "questions", name: "質問", _count: { posts: 3 } },
    { id: "4", slug: "events", name: "イベント", _count: { posts: 0 } },
];

describe("CategoryPage", () => {
    beforeEach(() => {
        vi.mocked(getCategoriesWithCount).mockResolvedValue(
            mockCategories as Awaited<ReturnType<typeof getCategoriesWithCount>>,
        );
    });

    test("ページタイトルが表示されること", async () => {
        render(await CategoryPage());
        expect(
            screen.getByRole("heading", { name: "カテゴリー一覧" }),
        ).toBeInTheDocument();
    });

    test("カテゴリー数と総投稿数のサマリーが表示されること", async () => {
        render(await CategoryPage());
        // 5 + 10 + 3 + 0 = 18
        expect(screen.getByText("4カテゴリー・計18件の投稿")).toBeInTheDocument();
    });

    test("すべてのカテゴリー名が表示されること", async () => {
        render(await CategoryPage());
        expect(screen.getByText("お知らせ")).toBeInTheDocument();
        expect(screen.getByText("一般")).toBeInTheDocument();
        expect(screen.getByText("質問")).toBeInTheDocument();
        expect(screen.getByText("イベント")).toBeInTheDocument();
    });

    test("各カテゴリーの投稿数が表示されること", async () => {
        render(await CategoryPage());
        expect(screen.getByText("5件の投稿")).toBeInTheDocument();
        expect(screen.getByText("10件の投稿")).toBeInTheDocument();
        expect(screen.getByText("3件の投稿")).toBeInTheDocument();
        expect(screen.getByText("0件の投稿")).toBeInTheDocument();
    });

    test("各カテゴリーリンクが /posts?category=<slug> のhrefを持つこと", async () => {
        render(await CategoryPage());
        expect(
            screen.getByRole("link", { name: /お知らせ/ }),
        ).toHaveAttribute("href", "/posts?category=announcements");
        expect(
            screen.getByRole("link", { name: /一般/ }),
        ).toHaveAttribute("href", "/posts?category=general");
        expect(
            screen.getByRole("link", { name: /質問/ }),
        ).toHaveAttribute("href", "/posts?category=questions");
        expect(
            screen.getByRole("link", { name: /イベント/ }),
        ).toHaveAttribute("href", "/posts?category=events");
    });

    test("投稿一覧へ戻るリンクが存在すること", async () => {
        render(await CategoryPage());
        const links = screen.getAllByRole("link");
        const backLink = links.find((l) => l.getAttribute("href") === "/posts");
        expect(backLink).toBeInTheDocument();
    });

    test("未知のスラッグにはデフォルトの背景色が適用されること", async () => {
        vi.mocked(getCategoriesWithCount).mockResolvedValue([
            {
                id: "99",
                slug: "unknown",
                name: "不明",
                _count: { posts: 1 },
            },
        ] as Awaited<ReturnType<typeof getCategoriesWithCount>>);
        render(await CategoryPage());
        const card = screen
            .getByText("不明")
            .closest(".border-2") as HTMLElement;
        expect(card.className).toContain("bg-gray");
    });
});
