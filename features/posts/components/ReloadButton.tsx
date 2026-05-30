"use client";

import { Button } from "@/components/ui/button";
import { revalidatePost } from "../actions/revalidatePost";

export default function ReloadButton({ id }: { id: string }) {
    return (
        <form action={revalidatePost}>
            <input type="hidden" name="id" value={id} />
            <Button
                type="submit"
                variant="outline"
                className="w-full"
            >
                更新する
            </Button>
        </form>
    );
}
