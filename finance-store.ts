import { create } from "zustand";
import { persist } from "zustand/middleware";

// 取引フィルタータイプ
type TransactionFilter = {
  startDate?: string;
  endDate?: string;
  type?: "income" | "expense" | "transfer" | "all";
  categoryId?: number;
  accountId?: number;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
};

// 家計簿ストアの状態
type FinanceState = {
  // 現在選択されている期間
  currentPeriod: {
    year: number;
    month: number;
  };
  // 取引フィルター
  transactionFilter: TransactionFilter;
  // 表示設定
  displaySettings: {
    showSubcategories: boolean;
    startDayOfMonth: number;
    chartType: "pie" | "bar" | "line";
    currency: string;
    theme: "light" | "dark" | "system";
  };
  // アクション
  setCurrentPeriod: (year: number, month: number) => void;
  setTransactionFilter: (filter: Partial<TransactionFilter>) => void;
  resetTransactionFilter: () => void;
  setDisplaySettings: (settings: Partial<typeof FinanceState.prototype.displaySettings>) => void;
};

// 家計簿ストアの作成
export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => {
      // 現在の年月を取得
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;

      return {
        // 初期状態
        currentPeriod: {
          year: currentYear,
          month: currentMonth,
        },
        transactionFilter: {
          type: "all",
        },
        displaySettings: {
          showSubcategories: true,
          startDayOfMonth: 1,
          chartType: "pie",
          currency: "JPY",
          theme: "system",
        },

        // アクション
        setCurrentPeriod: (year, month) => 
          set({ currentPeriod: { year, month } }),

        setTransactionFilter: (filter) => 
          set((state) => ({ 
            transactionFilter: { ...state.transactionFilter, ...filter } 
          })),

        resetTransactionFilter: () => 
          set({ 
            transactionFilter: { type: "all" } 
          }),

        setDisplaySettings: (settings) => 
          set((state) => ({ 
            displaySettings: { ...state.displaySettings, ...settings } 
          })),
      };
    },
    {
      name: "finance-store",
    }
  )
);
