import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layouts/footer";

describe("Footer", () => {
    test("コピーライトテキストが表示されること", () => {
        render(<Footer />);
        expect(
            screen.getByText(/掲示板アプリ\. All rights reserved\./),
        ).toBeInTheDocument();
    });
});
