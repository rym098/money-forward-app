import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart3, 
  CreditCard, 
  Settings, 
  PieChart, 
  Target, 
  Calendar, 
  Tags, 
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "取引",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "予算",
    href: "/budgets",
    icon: PieChart,
  },
  {
    title: "目標",
    href: "/goals",
    icon: Target,
  },
  {
    title: "カレンダー",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "カテゴリ",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "レポート",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "資産分析",
    href: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "金融戦略",
    href: "/strategy",
    icon: Sparkles,
  },
  {
    title: "ポイント",
    href: "/points",
    icon: Award,
  },
  {
    title: "設定",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            <PieChart className="h-6 w-6" />
            <span className="text-lg font-bold">MoneyApp</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  "hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            取引を追加
          </Button>
        </div>
      </div>
    </div>
  );
}
