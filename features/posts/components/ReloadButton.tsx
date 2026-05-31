"use client";

import { Button } from "@/components/ui/button";
import { revalidatePost } from "../actions/revalidatePost";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ReloadButton({ id }: { id: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            await revalidatePost(id);
            router.refresh();
        });
    };

    return (
        <Button
            onClick={handleClick}
            variant="outline"
            className="w-full"
            disabled={isPending}
        >
            {isPending ? "更新中..." : "更新する"}
        </Button>
    );
}
