import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    const email = (await rl.question("Admin email: ")).trim().toLowerCase();
    const password = (await rl.question("Admin password (min 8 chars): ")).trim();

    if (!email || !password || password.length < 8) {
      throw new Error("A valid email and a password with at least 8 characters are required.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash }
    });

    console.log(`Admin ready: ${admin.email}`);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
