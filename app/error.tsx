'use client'

import { Button } from "@/components/ui/button";
import { useEffect } from "react"

export default function Error({ 
    error, 
    reset 
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>何か問題が発生しました！</h2>
            <Button onClick={() => reset()}>
                もう一度試す
            </Button>
        </div>
    );
} 