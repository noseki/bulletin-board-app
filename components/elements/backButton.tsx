import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton() {
    return (
        <Button variant="ghost" asChild className="font-semibold hover:bg-gray-200">
            <Link href="/posts">
                ← TOPに戻る
            </Link>
        </Button>
    );
}