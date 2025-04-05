-- Migration number: 0002 	 2025-04-03T13:43:00.000Z
-- 家計簿アプリのデータベーススキーマ

-- 既存のテーブルを削除（開発中のみ）
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS budget_categories;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS transaction_tags;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS recurring_transactions;
DROP TABLE IF EXISTS import_history;
DROP TABLE IF EXISTS export_history;

-- ユーザーテーブル
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME,
  is_premium BOOLEAN NOT NULL DEFAULT 0,
  premium_until DATETIME
);

-- 口座テーブル
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 銀行、クレジットカード、電子マネー、証券など
  balance REAL NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'JPY',
  institution TEXT,
  account_number TEXT, -- 暗号化して保存
  is_active BOOLEAN NOT NULL DEFAULT 1,
  last_sync_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_excluded_from_balance BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- カテゴリテーブル
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 収入、支出
  icon TEXT,
  color TEXT,
  is_system BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 取引テーブル
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  category_id INTEGER,
  amount REAL NOT NULL,
  type TEXT NOT NULL, -- 収入、支出、振替
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_reconciled BOOLEAN NOT NULL DEFAULT 0,
  is_excluded_from_calculation BOOLEAN NOT NULL DEFAULT 0,
  memo TEXT,
  location TEXT,
  receipt_image_path TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 予算テーブル
CREATE TABLE IF NOT EXISTS budgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  period_type TEXT NOT NULL, -- 月次、年次など
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- カテゴリ別予算テーブル
CREATE TABLE IF NOT EXISTS budget_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  budget_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(budget_id, category_id)
);

-- 目標テーブル
CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  target_amount REAL NOT NULL,
  current_amount REAL NOT NULL DEFAULT 0,
  start_date DATE NOT NULL,
  target_date DATE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_achieved BOOLEAN NOT NULL DEFAULT 0,
  achieved_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ポイントテーブル
CREATE TABLE IF NOT EXISTS points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  action_type TEXT NOT NULL,
  description TEXT,
  earned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  is_exchanged BOOLEAN NOT NULL DEFAULT 0,
  exchanged_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- タグテーブル
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, name)
);

-- 取引タグ関連テーブル
CREATE TABLE IF NOT EXISTS transaction_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transaction_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(transaction_id, tag_id)
);

-- 設定テーブル
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  start_day_of_month INTEGER NOT NULL DEFAULT 1,
  default_currency TEXT NOT NULL DEFAULT 'JPY',
  theme TEXT NOT NULL DEFAULT 'light',
  notification_enabled BOOLEAN NOT NULL DEFAULT 1,
  email_notification_enabled BOOLEAN NOT NULL DEFAULT 1,
  language TEXT NOT NULL DEFAULT 'ja',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id)
);

-- 定期取引テーブル
CREATE TABLE IF NOT EXISTS recurring_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  category_id INTEGER,
  amount REAL NOT NULL,
  type TEXT NOT NULL, -- 収入、支出
  description TEXT,
  frequency TEXT NOT NULL, -- 毎日、毎週、毎月、毎年
  start_date DATE NOT NULL,
  end_date DATE,
  next_date DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- インポート履歴テーブル
CREATE TABLE IF NOT EXISTS import_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- CSV, OFX, QIF など
  status TEXT NOT NULL, -- 成功、失敗、処理中
  records_count INTEGER NOT NULL DEFAULT 0,
  imported_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  error_message TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- エクスポート履歴テーブル
CREATE TABLE IF NOT EXISTS export_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- CSV, PDF など
  status TEXT NOT NULL, -- 成功、失敗、処理中
  records_count INTEGER NOT NULL DEFAULT 0,
  exported_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  error_message TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- インデックスの作成
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_type ON accounts(type);
CREATE INDEX idx_accounts_is_active ON accounts(is_active);

CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_type ON categories(type);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_user_id_transaction_date ON transactions(user_id, transaction_date);

CREATE INDEX idx_budgets_user_id ON budgets(user_id);
CREATE INDEX idx_budgets_start_date ON budgets(start_date);
CREATE INDEX idx_budgets_end_date ON budgets(end_date);
CREATE INDEX idx_budgets_user_id_start_date_end_date ON budgets(user_id, start_date, end_date);

CREATE INDEX idx_budget_categories_budget_id ON budget_categories(budget_id);
CREATE INDEX idx_budget_categories_category_id ON budget_categories(category_id);

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_target_date ON goals(target_date);

CREATE INDEX idx_points_user_id ON points(user_id);
CREATE INDEX idx_points_earned_at ON points(earned_at);
CREATE INDEX idx_points_expires_at ON points(expires_at);

CREATE INDEX idx_tags_user_id ON tags(user_id);
CREATE INDEX idx_tags_name ON tags(name);

CREATE INDEX idx_transaction_tags_transaction_id ON transaction_tags(transaction_id);
CREATE INDEX idx_transaction_tags_tag_id ON transaction_tags(tag_id);

CREATE INDEX idx_recurring_transactions_user_id ON recurring_transactions(user_id);
CREATE INDEX idx_recurring_transactions_next_date ON recurring_transactions(next_date);
CREATE INDEX idx_recurring_transactions_is_active ON recurring_transactions(is_active);

CREATE INDEX idx_import_history_user_id ON import_history(user_id);
CREATE INDEX idx_import_history_imported_at ON import_history(imported_at);

CREATE INDEX idx_export_history_user_id ON export_history(user_id);
CREATE INDEX idx_export_history_exported_at ON export_history(exported_at);

-- 初期データの挿入
-- 基本カテゴリの作成（収入）
INSERT INTO categories (name, type, icon, color, is_system) VALUES 
  ('給与', 'income', 'briefcase', '#4CAF50', 1),
  ('ボーナス', 'income', 'gift', '#8BC34A', 1),
  ('副業', 'income', 'tool', '#CDDC39', 1),
  ('投資', 'income', 'trending-up', '#FFC107', 1),
  ('お小遣い', 'income', 'wallet', '#FF9800', 1),
  ('臨時収入', 'income', 'zap', '#FF5722', 1),
  ('その他収入', 'income', 'plus-circle', '#795548', 1);

-- 基本カテゴリの作成（支出）
INSERT INTO categories (name, type, icon, color, is_system) VALUES 
  ('食費', 'expense', 'utensils', '#F44336', 1),
  ('日用品', 'expense', 'shopping-bag', '#E91E63', 1),
  ('住居費', 'expense', 'home', '#9C27B0', 1),
  ('水道光熱費', 'expense', 'droplet', '#673AB7', 1),
  ('通信費', 'expense', 'smartphone', '#3F51B5', 1),
  ('交通費', 'expense', 'map', '#2196F3', 1),
  ('医療費', 'expense', 'activity', '#03A9F4', 1),
  ('衣服・美容', 'expense', 'scissors', '#00BCD4', 1),
  ('娯楽・レジャー', 'expense', 'music', '#009688', 1),
  ('教育・教養', 'expense', 'book', '#4CAF50', 1),
  ('交際費', 'expense', 'users', '#8BC34A', 1),
  ('保険', 'expense', 'shield', '#CDDC39', 1),
  ('税金', 'expense', 'landmark', '#FFEB3B', 1),
  ('その他支出', 'expense', 'more-horizontal', '#FFC107', 1);

-- 食費のサブカテゴリ
INSERT INTO categories (parent_id, name, type, icon, color, is_system) VALUES 
  (8, '食料品', 'expense', 'shopping-cart', '#F44336', 1),
  (8, '外食', 'expense', 'coffee', '#F44336', 1),
  (8, 'カフェ', 'expense', 'coffee', '#F44336', 1);

-- 住居費のサブカテゴリ
INSERT INTO categories (parent_id, name, type, icon, color, is_system) VALUES 
  (10, '家賃', 'expense', 'home', '#9C27B0', 1),
  (10, '住宅ローン', 'expense', 'home', '#9C27B0', 1),
  (10, '修繕費', 'expense', 'tool', '#9C27B0', 1);
