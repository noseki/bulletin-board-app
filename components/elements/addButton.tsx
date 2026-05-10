import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function AddButton() {
    return (
        <Button asChild className="font-semibold bg-[#93bff2] hover:bg-[#085fcacd]">
            <Link href="/post/add">
                <Plus className="w-4 h-4 mr-2" />
                新規投稿
            </Link>
        </Button>
    );
}
