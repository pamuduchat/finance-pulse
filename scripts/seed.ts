import { config } from "dotenv";
import { eachDayOfInterval, subDays, format } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema";
import { convertAmountToMilliunits } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

const SEED_USER_ID = process.env.SEED_USER_ID!;

const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID },
  { id: "category_7", name: "Clothing", userId: SEED_USER_ID },
];

const SEED_ACCOUNTS = [
  {
    id: "account_1",
    name: "Checking",
    plaidId: null,
    userId: SEED_USER_ID,
  },
  {
    id: "account_2",
    name: "Savings",
    plaidId: null,
    userId: SEED_USER_ID,
  },
];
const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.floor(Math.random() * 400) + 90;

    case "Utilities":
      return Math.floor(Math.random() * 100) + 20;

    case "Food":
      return Math.floor(Math.random() * 50) + 10;
    case "Transportation":
    case "Health":
      return Math.floor(Math.random() * 30) + 5;

    case "Entertainment":
    case "Clothing":
    case "Miscellaneous":
      return Math.floor(Math.random() * 100) + 5;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1; // 1 to 4 transactions per day

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() >= 0.6; // 60% chance of being an expense
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMilliunits(
      isExpense ? -amount : amount
    ); // Negative for expenses

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id, // Assuming always using the first account for simplicity
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    // Reset database
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();
    // Seed categories
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    // Seed accounts
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    // Seed transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  }
};

main();
