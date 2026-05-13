import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    });
    const prisma = new PrismaClient({ adapter });

    try {
        const users = await prisma.users.findMany();
        console.log("接続成功！");
        console.log(`users テーブルの件数: ${users.length}`);
        console.log(users);
    } catch (error) {
        console.error("接続失敗:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
