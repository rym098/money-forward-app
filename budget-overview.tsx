import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// 仮のデータ
const BUDGET_DATA = [
  { name: "食費", budget: 45000, spent: 32000, color: "#FF6384" },
  { name: "住居費", budget: 85000, spent: 85000, color: "#36A2EB" },
  { name: "水道光熱費", budget: 15000, spent: 12000, color: "#FFCE56" },
  { name: "通信費", budget: 12000, spent: 10000, color: "#4BC0C0" },
  { name: "交通費", budget: 18000, spent: 15000, color: "#9966FF" },
  { name: "娯楽費", budget: 25000, spent: 30000, color: "#FF9F40" },
  { name: "その他", budget: 20000, spent: 18000, color: "#C9CBCF" },
];

export default function BudgetOverview() {
  const [period, setPeriod] = useState("current");

  // 総予算と総支出を計算
  const totalBudget = BUDGET_DATA.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = BUDGET_DATA.reduce((sum, item) => sum + item.spent, 0);
  
  // 予算消化率
  const spentPercentage = (totalSpent / totalBudget) * 100;
  
  // 円グラフ用のデータ
  const chartData = BUDGET_DATA.map(item => ({
    name: item.name,
    value: item.spent,
    color: item.color
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>予算管理</CardTitle>
        <CardDescription>
          設定した予算と実際の支出を比較できます
        </CardDescription>
        <Tabs defaultValue="current" className="w-[400px] mt-4" onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="current">今月</TabsTrigger>
            <TabsTrigger value="last">先月</TabsTrigger>
            <TabsTrigger value="year">年間</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">総予算消化率</h3>
                  <span className="font-medium">{spentPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={spentPercentage} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>¥{totalSpent.toLocaleString()}</span>
                  <span>¥{totalBudget.toLocaleString()}</span>
                </div>
              </div>
              
              {BUDGET_DATA.map((item, index) => {
                const percentage = (item.spent / item.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className={isOverBudget ? 'text-red-500' : ''}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={`h-2 ${isOverBudget ? 'bg-red-200' : ''}`}
                      indicatorClassName={isOverBudget ? 'bg-red-500' : ''}
                    />
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>¥{item.spent.toLocaleString()}</span>
                      <span>¥{item.budget.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">支出内訳</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                予算を編集
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
