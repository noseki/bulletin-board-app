import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
    await prisma.category.createMany({
        data: [
            { slug: "announcements", name: "お知らせ" },
            { slug: "general",       name: "雑談" },
            { slug: "questions",     name: "質問・相談" },
            { slug: "events",        name: "イベント" },
        ],
        skipDuplicates: true,
    });
    console.log("シード完了");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());