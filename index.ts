import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

// D1データベースインスタンスを取得
export const createDb = (dbBinding: D1Database) => {
  return drizzle(dbBinding, { schema });
};

// グローバルなDBインスタンス
// @ts-ignore - D1データベースはCloudflare Workersの環境で自動的に提供される
export const db = createDb(DB);

// ユーザー関連の操作
export async function getUserById(id: number) {
  return await db.query.users.findFirst({
    where: eq(schema.users.id, id),
  });
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(schema.users.email, email),
  });
}

// 口座関連の操作
export async function getAccountsByUserId(userId: number) {
  return await db.query.accounts.findMany({
    where: eq(schema.accounts.userId, userId),
    orderBy: schema.accounts.displayOrder,
  });
}

// 取引関連の操作
export async function getTransactionsByUserId(userId: number, limit = 50) {
  return await db.query.transactions.findMany({
    where: eq(schema.transactions.userId, userId),
    orderBy: schema.transactions.transactionDate,
    limit,
  });
}

// カテゴリ関連の操作
export async function getCategoriesByType(type: string) {
  return await db.query.categories.findMany({
    where: eq(schema.categories.type, type),
  });
}

// 予算関連の操作
export async function getBudgetsByUserId(userId: number) {
  return await db.query.budgets.findMany({
    where: eq(schema.budgets.userId, userId),
  });
}
