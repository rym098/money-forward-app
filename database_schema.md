# 家計簿アプリデータベース設計

## エンティティ関連図

```
User
 ├── Account (銀行口座、クレジットカードなど)
 ├── Transaction (取引履歴)
 │    └── Category (カテゴリ)
 ├── Budget (予算)
 │    └── BudgetCategory (カテゴリごとの予算)
 ├── Goal (目標)
 ├── Point (ポイント)
 ├── Tag (資産タグ)
 └── Setting (設定)
```

## テーブル定義

### 1. users (ユーザー)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| email | VARCHAR(255) | メールアドレス、一意 |
| password_hash | VARCHAR(255) | パスワードハッシュ |
| name | VARCHAR(100) | ユーザー名 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| last_login_at | TIMESTAMP | 最終ログイン日時 |
| is_premium | BOOLEAN | プレミアム会員フラグ |
| premium_until | TIMESTAMP | プレミアム会員期限 |

### 2. accounts (口座)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| name | VARCHAR(100) | 口座名 |
| type | VARCHAR(50) | 口座種別 (銀行、クレジットカード、電子マネー、証券など) |
| balance | DECIMAL(15,2) | 残高 |
| currency | VARCHAR(10) | 通貨 |
| institution | VARCHAR(100) | 金融機関名 |
| account_number | VARCHAR(50) | 口座番号（暗号化） |
| is_active | BOOLEAN | アクティブフラグ |
| last_sync_at | TIMESTAMP | 最終同期日時 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| icon | VARCHAR(50) | アイコン識別子 |
| display_order | INTEGER | 表示順序 |
| is_excluded_from_balance | BOOLEAN | 残高計算から除外するかどうか |

### 3. categories (カテゴリ)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| parent_id | INTEGER | 外部キー (categories.id)、親カテゴリID |
| name | VARCHAR(100) | カテゴリ名 |
| type | VARCHAR(20) | 種別 (収入、支出) |
| icon | VARCHAR(50) | アイコン識別子 |
| color | VARCHAR(20) | 色コード |
| is_system | BOOLEAN | システム定義カテゴリかどうか |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

### 4. transactions (取引)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| account_id | INTEGER | 外部キー (accounts.id) |
| category_id | INTEGER | 外部キー (categories.id) |
| amount | DECIMAL(15,2) | 金額 |
| type | VARCHAR(20) | 種別 (収入、支出、振替) |
| description | VARCHAR(255) | 説明 |
| transaction_date | DATE | 取引日 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| is_reconciled | BOOLEAN | 確定済みフラグ |
| is_excluded_from_calculation | BOOLEAN | 計算から除外するかどうか |
| memo | TEXT | メモ |
| location | VARCHAR(255) | 場所 |
| receipt_image_path | VARCHAR(255) | レシート画像パス |

### 5. budgets (予算)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| name | VARCHAR(100) | 予算名 |
| amount | DECIMAL(15,2) | 総予算額 |
| start_date | DATE | 開始日 |
| end_date | DATE | 終了日 |
| period_type | VARCHAR(20) | 期間タイプ (月次、年次など) |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| is_active | BOOLEAN | アクティブフラグ |

### 6. budget_categories (カテゴリ別予算)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| budget_id | INTEGER | 外部キー (budgets.id) |
| category_id | INTEGER | 外部キー (categories.id) |
| amount | DECIMAL(15,2) | カテゴリ別予算額 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

### 7. goals (目標)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| name | VARCHAR(100) | 目標名 |
| target_amount | DECIMAL(15,2) | 目標金額 |
| current_amount | DECIMAL(15,2) | 現在の金額 |
| start_date | DATE | 開始日 |
| target_date | DATE | 目標日 |
| description | TEXT | 説明 |
| icon | VARCHAR(50) | アイコン識別子 |
| color | VARCHAR(20) | 色コード |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| is_achieved | BOOLEAN | 達成フラグ |
| achieved_at | TIMESTAMP | 達成日時 |

### 8. points (ポイント)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| amount | INTEGER | ポイント数 |
| action_type | VARCHAR(50) | 獲得アクション種別 |
| description | VARCHAR(255) | 説明 |
| earned_at | TIMESTAMP | 獲得日時 |
| expires_at | TIMESTAMP | 有効期限 |
| is_exchanged | BOOLEAN | 交換済みフラグ |
| exchanged_at | TIMESTAMP | 交換日時 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

### 9. tags (タグ)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| name | VARCHAR(100) | タグ名 |
| color | VARCHAR(20) | 色コード |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

### 10. transaction_tags (取引タグ関連)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| transaction_id | INTEGER | 外部キー (transactions.id) |
| tag_id | INTEGER | 外部キー (tags.id) |
| created_at | TIMESTAMP | 作成日時 |

### 11. settings (設定)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| start_day_of_month | INTEGER | 月の開始日 (1-31) |
| default_currency | VARCHAR(10) | デフォルト通貨 |
| theme | VARCHAR(50) | テーマ設定 |
| notification_enabled | BOOLEAN | 通知有効フラグ |
| email_notification_enabled | BOOLEAN | メール通知有効フラグ |
| language | VARCHAR(10) | 言語設定 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |

### 12. recurring_transactions (定期取引)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| account_id | INTEGER | 外部キー (accounts.id) |
| category_id | INTEGER | 外部キー (categories.id) |
| amount | DECIMAL(15,2) | 金額 |
| type | VARCHAR(20) | 種別 (収入、支出) |
| description | VARCHAR(255) | 説明 |
| frequency | VARCHAR(50) | 頻度 (毎日、毎週、毎月、毎年) |
| start_date | DATE | 開始日 |
| end_date | DATE | 終了日 (オプション) |
| next_date | DATE | 次回実行日 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| is_active | BOOLEAN | アクティブフラグ |

### 13. import_history (インポート履歴)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| file_name | VARCHAR(255) | ファイル名 |
| file_type | VARCHAR(50) | ファイルタイプ (CSV, OFX, QIF など) |
| status | VARCHAR(50) | ステータス (成功、失敗、処理中) |
| records_count | INTEGER | 処理レコード数 |
| imported_at | TIMESTAMP | インポート日時 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| error_message | TEXT | エラーメッセージ (失敗時) |

### 14. export_history (エクスポート履歴)
| カラム名 | データ型 | 説明 |
|---------|---------|------|
| id | INTEGER | 主キー、自動増分 |
| user_id | INTEGER | 外部キー (users.id) |
| file_name | VARCHAR(255) | ファイル名 |
| file_type | VARCHAR(50) | ファイルタイプ (CSV, PDF など) |
| status | VARCHAR(50) | ステータス (成功、失敗、処理中) |
| records_count | INTEGER | 処理レコード数 |
| exported_at | TIMESTAMP | エクスポート日時 |
| created_at | TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | 更新日時 |
| error_message | TEXT | エラーメッセージ (失敗時) |

## インデックス設計

### users テーブル
- email (UNIQUE)

### accounts テーブル
- user_id
- type
- is_active

### categories テーブル
- parent_id
- type

### transactions テーブル
- user_id
- account_id
- category_id
- transaction_date
- type
- (user_id, transaction_date)

### budgets テーブル
- user_id
- start_date
- end_date
- (user_id, start_date, end_date)

### budget_categories テーブル
- budget_id
- category_id
- (budget_id, category_id) (UNIQUE)

### goals テーブル
- user_id
- target_date

### points テーブル
- user_id
- earned_at
- expires_at

### tags テーブル
- user_id
- name
- (user_id, name) (UNIQUE)

### transaction_tags テーブル
- transaction_id
- tag_id
- (transaction_id, tag_id) (UNIQUE)

### settings テーブル
- user_id (UNIQUE)

### recurring_transactions テーブル
- user_id
- next_date
- is_active

### import_history テーブル
- user_id
- imported_at

### export_history テーブル
- user_id
- exported_at

## リレーションシップ

1. users 1:N accounts
2. users 1:N transactions
3. users 1:N budgets
4. users 1:N goals
5. users 1:N points
6. users 1:N tags
7. users 1:1 settings
8. users 1:N recurring_transactions
9. users 1:N import_history
10. users 1:N export_history
11. accounts 1:N transactions
12. categories 1:N categories (自己参照 - 親子関係)
13. categories 1:N transactions
14. categories 1:N budget_categories
15. budgets 1:N budget_categories
16. transactions N:M tags (through transaction_tags)

## 特記事項

1. パスワードは必ずハッシュ化して保存
2. 口座番号などの機密情報は暗号化して保存
3. 金額は小数点以下2桁まで対応（DECIMAL(15,2)）
4. 日付と時刻は適切なタイムゾーン処理を実装
5. 論理削除を基本とし、物理削除は避ける設計
6. トランザクションテーブルは肥大化しやすいため、必要に応じてパーティショニングを検討
7. 将来の多言語対応を考慮し、カテゴリなどのマスターデータは多言語対応可能な設計を検討
