import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AddButton from "@/components/elements/addButton";

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

describe("AddButton", () => {
    test("「新規投稿」テキストが表示されること", () => {
        render(<AddButton />);
        expect(screen.getByText("新規投稿")).toBeInTheDocument();
    });

    test("リンクが /posts/add のhrefを持つこと", () => {
        render(<AddButton />);
        expect(screen.getByRole("link")).toHaveAttribute("href", "/posts/add");
    });
});
