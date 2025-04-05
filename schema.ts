import { relations } from "drizzle-orm";
import { 
  sqliteTable, 
  text, 
  integer, 
  real, 
  primaryKey 
} from "drizzle-orm/sqlite-core";

// ユーザーテーブル
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
  lastLoginAt: text("last_login_at"),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  premiumUntil: text("premium_until"),
});

// 口座テーブル
export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 銀行、クレジットカード、電子マネー、証券など
  balance: real("balance").notNull().default(0),
  currency: text("currency").notNull().default("JPY"),
  institution: text("institution"),
  accountNumber: text("account_number"), // 暗号化して保存
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastSyncAt: text("last_sync_at"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
  icon: text("icon"),
  displayOrder: integer("display_order").notNull().default(0),
  isExcludedFromBalance: integer("is_excluded_from_balance", { mode: "boolean" }).notNull().default(false),
});

// カテゴリテーブル
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parentId: integer("parent_id").references(() => categories.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  type: text("type").notNull(), // 収入、支出
  icon: text("icon"),
  color: text("color"),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

// 取引テーブル
export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: integer("account_id").notNull().references(() => accounts.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  amount: real("amount").notNull(),
  type: text("type").notNull(), // 収入、支出、振替
  description: text("description"),
  transactionDate: text("transaction_date").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
  isReconciled: integer("is_reconciled", { mode: "boolean" }).notNull().default(false),
  isExcludedFromCalculation: integer("is_excluded_from_calculation", { mode: "boolean" }).notNull().default(false),
  memo: text("memo"),
  location: text("location"),
  receiptImagePath: text("receipt_image_path"),
});

// 予算テーブル
export const budgets = sqliteTable("budgets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  periodType: text("period_type").notNull(), // 月次、年次など
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

// カテゴリ別予算テーブル
export const budgetCategories = sqliteTable("budget_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  budgetId: integer("budget_id").notNull().references(() => budgets.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
  amount: real("amount").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
}, (table) => {
  return {
    unq: primaryKey({ columns: [table.budgetId, table.categoryId] }),
  };
});

// 目標テーブル
export const goals = sqliteTable("goals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  targetAmount: real("target_amount").notNull(),
  currentAmount: real("current_amount").notNull().default(0),
  startDate: text("start_date").notNull(),
  targetDate: text("target_date").notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
  isAchieved: integer("is_achieved", { mode: "boolean" }).notNull().default(false),
  achievedAt: text("achieved_at"),
});

// タグテーブル
export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  color: text("color"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
}, (table) => {
  return {
    unq: primaryKey({ columns: [table.userId, table.name] }),
  };
});

// 取引タグ関連テーブル
export const transactionTags = sqliteTable("transaction_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  transactionId: integer("transaction_id").notNull().references(() => transactions.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
}, (table) => {
  return {
    unq: primaryKey({ columns: [table.transactionId, table.tagId] }),
  };
});

// リレーションシップの定義
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  transactions: many(transactions),
  budgets: many(budgets),
  goals: many(goals),
  tags: many(tags),
}));

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
  transactions: many(transactions),
  budgetCategories: many(budgetCategories),
}));

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  tags: many(transactionTags),
}));

export const budgetsRelations = relations(budgets, ({ one, many }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.id],
  }),
  budgetCategories: many(budgetCategories),
}));

export const budgetCategoriesRelations = relations(budgetCategories, ({ one }) => ({
  budget: one(budgets, {
    fields: [budgetCategories.budgetId],
    references: [budgets.id],
  }),
  category: one(categories, {
    fields: [budgetCategories.categoryId],
    references: [categories.id],
  }),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  transactions: many(transactionTags),
}));

export const transactionTagsRelations = relations(transactionTags, ({ one }) => ({
  transaction: one(transactions, {
    fields: [transactionTags.transactionId],
    references: [transactions.id],
  }),
  tag: one(tags, {
    fields: [transactionTags.tagId],
    references: [tags.id],
  }),
}));
