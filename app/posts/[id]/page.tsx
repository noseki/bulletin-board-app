async function PostContent({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    return (
        <div>
            <h1>詳細ページ</h1>
            <p>ID: {id}</p>
        </div>
    )
};

export default function PostDetail({ params }: { params: Promise<{ id: string }>}) {
    return <PostContent params={params} />
}