import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

// 仮のデータ
const MONTHLY_DATA = [
  { month: "1月", income: 320000, expense: 220000, balance: 100000 },
  { month: "2月", income: 310000, expense: 215000, balance: 95000 },
  { month: "3月", income: 330000, expense: 225000, balance: 105000 },
  { month: "4月", income: 340000, expense: 230000, balance: 110000 },
  { month: "5月", income: 345000, expense: 235000, balance: 110000 },
  { month: "6月", income: 350000, expense: 240000, balance: 110000 },
  { month: "7月", income: 355000, expense: 245000, balance: 110000 },
  { month: "8月", income: 360000, expense: 250000, balance: 110000 },
  { month: "9月", income: 365000, expense: 255000, balance: 110000 },
  { month: "10月", income: 370000, expense: 260000, balance: 110000 },
  { month: "11月", income: 375000, expense: 265000, balance: 110000 },
  { month: "12月", income: 380000, expense: 270000, balance: 110000 },
];

const CATEGORY_TREND_DATA = [
  { month: "1月", 食費: 45000, 住居費: 85000, 水道光熱費: 15000, 通信費: 12000 },
  { month: "2月", 食費: 42000, 住居費: 85000, 水道光熱費: 14000, 通信費: 12000 },
  { month: "3月", 食費: 44000, 住居費: 85000, 水道光熱費: 16000, 通信費: 12000 },
  { month: "4月", 食費: 46000, 住居費: 85000, 水道光熱費: 15000, 通信費: 12000 },
  { month: "5月", 食費: 43000, 住居費: 85000, 水道光熱費: 14500, 通信費: 12000 },
  { month: "6月", 食費: 45000, 住居費: 85000, 水道光熱費: 15200, 通信費: 12000 },
];

export default function FinancialReports() {
  const [reportType, setReportType] = useState("monthly");
  const [period, setPeriod] = useState("6months");

  // 期間に基づいてデータをフィルタリング
  const getFilteredData = () => {
    switch (period) {
      case "3months":
        return MONTHLY_DATA.slice(-3);
      case "6months":
        return MONTHLY_DATA.slice(-6);
      case "1year":
        return MONTHLY_DATA;
      default:
        return MONTHLY_DATA.slice(-6);
    }
  };

  const filteredData = getFilteredData();
  
  // 収支バランスの計算
  const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
  const totalBalance = totalIncome - totalExpense;
  const averageMonthlyBalance = totalBalance / filteredData.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>家計レポート</CardTitle>
        <CardDescription>
          収支の推移や傾向を分析できます
        </CardDescription>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <Tabs defaultValue="monthly" className="w-[300px]" onValueChange={setReportType}>
            <TabsList>
              <TabsTrigger value="monthly">月次推移</TabsTrigger>
              <TabsTrigger value="category">カテゴリ分析</TabsTrigger>
              <TabsTrigger value="assets">資産推移</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button 
              variant={period === "3months" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("3months")}
            >
              3ヶ月
            </Button>
            <Button 
              variant={period === "6months" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("6months")}
            >
              6ヶ月
            </Button>
            <Button 
              variant={period === "1year" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("1year")}
            >
              1年
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="monthly" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">総収入</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">¥{totalIncome.toLocaleString()}</div>
                <p className="text-sm text-gray-500">期間: {filteredData.length}ヶ月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">総支出</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">¥{totalExpense.toLocaleString()}</div>
                <p className="text-sm text-gray-500">期間: {filteredData.length}ヶ月</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">平均月間収支</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">¥{averageMonthlyBalance.toLocaleString()}</div>
                <p className="text-sm text-gray-500">月平均貯蓄額</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="income" name="収入" fill="#4CAF50" />
                <Bar dataKey="expense" name="支出" fill="#FF6384" />
                <Bar dataKey="balance" name="収支" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="category" className="mt-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={CATEGORY_TREND_DATA}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="食費" stroke="#FF6384" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="住居費" stroke="#36A2EB" />
                <Line type="monotone" dataKey="水道光熱費" stroke="#FFCE56" />
                <Line type="monotone" dataKey="通信費" stroke="#4BC0C0" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">カテゴリ別分析</h3>
            <p className="text-sm text-gray-500">
              「食費」は月によって変動がありますが、平均して約44,000円程度で推移しています。
              「住居費」は固定費として毎月85,000円で安定しています。
              「水道光熱費」は季節によって若干の変動があり、夏場や冬場に上昇する傾向があります。
              「通信費」は契約プランが変わらないため、毎月12,000円で一定しています。
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">節約のヒント</h4>
              <ul className="text-sm space-y-2">
                <li>食費は週末にまとめ買いすることで約10%の節約が可能です。</li>
                <li>水道光熱費は使用していない電化製品のプラグを抜くことで節約できます。</li>
                <li>通信費は家族割引プランに変更することで月額約2,000円の節約が可能です。</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assets" className="mt-0">
          <div className="flex justify-center items-center h-[400px]">
            <p className="text-muted-foreground">資産推移レポートは開発中です</p>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
}
