import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layouts/header";

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

describe("Header", () => {
    test("アプリ名が表示されること", () => {
        render(<Header />);
        expect(screen.getByText("掲示板アプリ")).toBeInTheDocument();
    });

    test("ロゴリンクが /posts のhrefを持つこと", () => {
        render(<Header />);
        expect(screen.getByRole("link")).toHaveAttribute("href", "/posts");
    });

    test("アクセントの「#」が表示されること", () => {
        render(<Header />);
        expect(screen.getByText("#")).toBeInTheDocument();
    });
});
