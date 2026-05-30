import { describe, test, expect, vi } from 'vitest';
import { render, screen } from "@testing-library/react";
import PostList from '@/features/posts/components/PostList';
import { PostWithCategory } from '@/features/posts/types';

vi.mock('@/features/posts/components/PostCard', () => ({
    default: ({ post }: { post: PostWithCategory }) => (
        <div data-testid="post-card">{post.title}</div>
    ),
}));

const makePost = (id: string): PostWithCategory => ({
    id,
    user: "テスト太郎",
    title: `投稿${id}`,
    content: "テスト内容",
    post_at: new Date(2026, 4, 1),
    categoryId: "1",
    category: { id: "1", slug: "general", name: "一般" },
});

describe("PostList", () => {
    test("postsが空のときempty stateメッセージが表示されること", () => {
        render(<PostList posts={[]} />);
        expect(screen.getByText("このカテゴリーにはまだ投稿がありません。")).toBeInTheDocument();
    });

    test("postsが空のときPostCardが表示されないこと", () => {
        render(<PostList posts={[]} />);
        expect(screen.queryAllByTestId("post-card")).toHaveLength(0);
    });

    test("投稿が正しい件数だけ表示されること", () => {
        render(<PostList posts={[makePost("1"), makePost("2"), makePost("3")]} />);
        expect(screen.getAllByTestId("post-card")).toHaveLength(3);
    });

    test("各投稿のタイトルが表示されること", () => {
        render(<PostList posts={[makePost("1"), makePost("2")]} />);
        expect(screen.getByText("投稿1")).toBeInTheDocument();
        expect(screen.getByText("投稿2")).toBeInTheDocument();
    });
});
