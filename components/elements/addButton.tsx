import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddButton() {
    return (
        <Button asChild className="font-semibold bg-blue-300 hover:bg-blue-400">
            <Link href="/posts/add">
                <Plus className="w-4 h-4 mr-2" />
                新規投稿
            </Link>
        </Button>
    );
}
