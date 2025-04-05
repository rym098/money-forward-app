# デプロイ手順書

## 概要
このドキュメントでは、マネーフォワード風家計簿アプリケーションのデプロイ手順について説明します。このアプリケーションはNext.jsで構築されており、Cloudflare Workersを使用してデプロイします。

## 前提条件
- Node.js 18.0.0以上
- npm 9.0.0以上
- Cloudflareアカウント
- Wranglerコマンドラインツール

## 必要なパッケージのインストール

以下のパッケージをインストールする必要があります：

```bash
npm install @radix-ui/react-tabs @radix-ui/react-slot class-variance-authority next-themes
npm install @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-switch
npm install @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-separator
npm install tailwindcss postcss autoprefixer
```

## 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定します：

```
# 認証関連
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-app-domain.com

# データベース関連
DATABASE_URL=your_database_url

# その他の設定
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## ビルドプロセス

アプリケーションをビルドするには、以下のコマンドを実行します：

```bash
# 依存関係のインストール
npm install

# アプリケーションのビルド
npm run build
```

## Cloudflare Workersへのデプロイ

1. Cloudflareアカウントにログインし、Workersを有効化します。

2. Wranglerをインストールします：
   ```bash
   npm install -g wrangler
   ```

3. Wranglerでログインします：
   ```bash
   wrangler login
   ```

4. D1データベースを作成します：
   ```bash
   wrangler d1 create money-forward-clone
   ```

5. `wrangler.toml`ファイルを更新して、D1データベースのIDを設定します。

6. マイグレーションを適用します：
   ```bash
   wrangler d1 migrations apply DB --local
   ```

7. アプリケーションをデプロイします：
   ```bash
   npm run deploy
   ```

## デプロイ後の確認

デプロイ後、以下の点を確認してください：

1. アプリケーションが正常に表示されるか
2. 認証機能が正常に動作するか
3. データベース操作（取引の追加、予算の設定など）が正常に行えるか
4. レスポンシブデザインが正常に機能するか

## トラブルシューティング

デプロイ中に問題が発生した場合は、以下を確認してください：

1. 環境変数が正しく設定されているか
2. 必要なパッケージがすべてインストールされているか
3. Cloudflareの設定が正しいか
4. ビルドエラーがないか

## 定期的なメンテナンス

アプリケーションを最新の状態に保つために、以下を定期的に行ってください：

1. 依存パッケージの更新
2. セキュリティパッチの適用
3. データベースのバックアップ
4. パフォーマンスの監視

## カスタマイズ

アプリケーションをカスタマイズする場合は、以下のファイルを編集してください：

- テーマ設定: `src/styles/globals.css`
- ロゴ変更: `src/components/layout/sidebar.tsx`
- 機能追加: 適切なコンポーネントとAPIエンドポイントを追加
