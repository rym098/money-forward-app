import React from "react";
import FinancialSummary from "@/components/dashboard/financial-summary";
import TransactionForm from "@/components/transactions/transaction-form";
import BudgetOverview from "@/components/budgets/budget-overview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, TrendingUp, Target, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
          <p className="text-muted-foreground">
            あなたの家計の概要と最新情報を確認できます
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            取引を追加
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="transactions">最近の取引</TabsTrigger>
          <TabsTrigger value="budgets">予算</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <FinancialSummary />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  今月の収入
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥345,000</div>
                <p className="text-xs text-muted-foreground">
                  先月比 +2.5%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  今月の支出
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥235,000</div>
                <p className="text-xs text-muted-foreground">
                  先月比 +3.8%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  今月の貯蓄
                </CardTitle>
                <Target className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥110,000</div>
                <p className="text-xs text-muted-foreground">
                  目標達成率 91.7%
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>金融戦略アドバイス</CardTitle>
                <CardDescription>
                  あなたの目標達成をサポートするアドバイス
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">支出の最適化</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        通信費を見直すことで月々約2,000円の節約が可能です。
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/strategy">
                  <Button variant="outline" className="w-full">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>目標の進捗</CardTitle>
                <CardDescription>
                  設定した目標の達成状況
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">マイホーム購入</span>
                    <span className="text-sm text-muted-foreground">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">海外旅行</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <Link href="/goals">
                  <Button variant="outline" className="w-full">
                    すべての目標を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>最近の取引</CardTitle>
                  <CardDescription>
                    直近の収支履歴
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="font-medium">スーパーでの買い物</div>
                        <div className="text-sm text-muted-foreground">2025/04/01</div>
                      </div>
                      <div className="text-red-600 font-medium">-¥5,800</div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="font-medium">電気代</div>
                        <div className="text-sm text-muted-foreground">2025/04/02</div>
                      </div>
                      <div className="text-red-600 font-medium">-¥7,200</div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="font-medium">給料</div>
                        <div className="text-sm text-muted-foreground">2025/04/03</div>
                      </div>
                      <div className="text-green-600 font-medium">+¥280,000</div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="font-medium">ランチ</div>
                        <div className="text-sm text-muted-foreground">2025/04/05</div>
                      </div>
                      <div className="text-red-600 font-medium">-¥1,200</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">映画</div>
                        <div className="text-sm text-muted-foreground">2025/04/07</div>
                      </div>
                      <div className="text-red-600 font-medium">-¥1,800</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/transactions">
                      <Button variant="outline" className="w-full">
                        すべての取引を見る
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <TransactionForm onSuccess={() => {}} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="budgets" className="space-y-4">
          <BudgetOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
