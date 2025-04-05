# 技術スタック選定

## 選定基準
- ユーザー要件（クラシカルモダンなデザイン、個人向け、データのインポート/エクスポート機能）
- デプロイのしやすさ
- 開発効率
- パフォーマンス
- 将来的な拡張性

## 選定結果

### フロントエンド
- **フレームワーク**: Next.js
  - 理由: 
    - サーバーサイドレンダリング(SSR)によるパフォーマンス向上
    - ファイルベースのルーティング
    - APIルートの組み込みサポート
    - Cloudflare Workersとの互換性
    - SEO対策が容易

- **UIライブラリ**: Tailwind CSS + shadcn/ui
  - 理由:
    - 高いカスタマイズ性
    - クラシカルモダンなデザインの実現が容易
    - コンポーネントの再利用性
    - 開発効率の向上

- **状態管理**: Zustand
  - 理由:
    - シンプルなAPI
    - Reduxより軽量
    - TypeScriptとの相性が良い
    - デバッグが容易

- **グラフ/可視化**: Recharts
  - 理由:
    - Reactとの統合が容易
    - カスタマイズ性が高い
    - レスポンシブ対応
    - アニメーション効果

- **アイコン**: Lucide icons
  - 理由:
    - 軽量
    - 豊富なアイコンセット
    - カスタマイズ性

### バックエンド
- **データベース**: Cloudflare D1 (SQLite互換)
  - 理由:
    - Next.jsのCloudflare Workersデプロイとの相性
    - SQLiteの使いやすさ
    - スケーラビリティ
    - コスト効率

- **認証**: NextAuth.js
  - 理由:
    - Next.jsとの統合が容易
    - 複数の認証プロバイダーをサポート
    - セッション管理の簡素化

- **ファイル処理**: multer (CSVインポート/エクスポート用)
  - 理由:
    - ファイルアップロード処理の簡素化
    - 多様なファイル形式のサポート

### 開発ツール
- **言語**: TypeScript
  - 理由:
    - 型安全性
    - コード品質の向上
    - エディタのサポート
    - バグの早期発見

- **パッケージマネージャー**: pnpm
  - 理由:
    - 高速なインストール
    - ディスク容量の節約
    - 依存関係の一貫性

- **リンター/フォーマッター**: ESLint + Prettier
  - 理由:
    - コード品質の維持
    - 一貫したコードスタイル
    - 自動修正機能

- **テスト**: Jest + React Testing Library
  - 理由:
    - Reactコンポーネントのテストが容易
    - スナップショットテスト
    - モックの容易さ

## プロジェクト構造
```
money-forward-clone/
├── migrations/           # D1データベースマイグレーション
├── public/               # 静的ファイル
├── src/
│   ├── app/              # Next.jsアプリケーションルート
│   │   ├── api/          # APIエンドポイント
│   │   ├── auth/         # 認証関連ページ
│   │   ├── dashboard/    # ダッシュボード
│   │   ├── settings/     # 設定ページ
│   │   ├── transactions/ # 取引管理
│   │   ├── budgets/      # 予算管理
│   │   ├── goals/        # 目標管理
│   │   ├── reports/      # レポート
│   │   ├── import/       # データインポート
│   │   ├── export/       # データエクスポート
│   │   └── ...
│   ├── components/       # 再利用可能なコンポーネント
│   │   ├── ui/           # 基本UIコンポーネント
│   │   ├── forms/        # フォームコンポーネント
│   │   ├── charts/       # グラフコンポーネント
│   │   ├── layout/       # レイアウトコンポーネント
│   │   └── ...
│   ├── hooks/            # カスタムReactフック
│   ├── lib/              # ユーティリティ関数
│   │   ├── db/           # データベース関連
│   │   ├── api/          # API関連
│   │   ├── auth/         # 認証関連
│   │   ├── utils/        # 汎用ユーティリティ
│   │   └── ...
│   ├── store/            # Zustandストア
│   └── types/            # TypeScript型定義
├── .eslintrc.js          # ESLint設定
├── .prettierrc           # Prettier設定
├── jest.config.js        # Jest設定
├── next.config.js        # Next.js設定
├── package.json          # 依存関係
├── tailwind.config.js    # Tailwind CSS設定
├── tsconfig.json         # TypeScript設定
└── wrangler.toml         # Cloudflare Workers設定
```

## 実装計画
1. プロジェクトの初期設定
2. データベースマイグレーションの作成
3. 認証システムの実装
4. 基本的なUIコンポーネントの作成
5. コアモデルとAPIの実装
6. 各機能ページの実装
7. データのインポート/エクスポート機能の実装
8. テストの作成
9. デプロイ準備
