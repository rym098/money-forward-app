import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, Filter, RefreshCw, TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from "lucide-react";

// 仮のデータ
const MONTHLY_TREND_DATA = [
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

const EXPENSE_CATEGORY_DATA = [
  { name: "食費", value: 45000, color: "#FF6384" },
  { name: "住居費", value: 85000, color: "#36A2EB" },
  { name: "水道光熱費", value: 15000, color: "#FFCE56" },
  { name: "通信費", value: 12000, color: "#4BC0C0" },
  { name: "交通費", value: 18000, color: "#9966FF" },
  { name: "娯楽費", value: 25000, color: "#FF9F40" },
  { name: "その他", value: 20000, color: "#C9CBCF" },
];

const INCOME_CATEGORY_DATA = [
  { name: "給与", value: 280000, color: "#4CAF50" },
  { name: "副業", value: 50000, color: "#8BC34A" },
  { name: "投資", value: 15000, color: "#CDDC39" },
];

const WEEKLY_EXPENSE_DATA = [
  { day: "月", expense: 3500 },
  { day: "火", expense: 2800 },
  { day: "水", expense: 3200 },
  { day: "木", expense: 4100 },
  { day: "金", expense: 5600 },
  { day: "土", expense: 8200 },
  { day: "日", expense: 4500 },
];

const ASSET_TREND_DATA = [
  { month: "1月", 現金: 500000, 投資: 200000, 不動産: 0 },
  { month: "2月", 現金: 550000, 投資: 210000, 不動産: 0 },
  { month: "3月", 現金: 600000, 投資: 220000, 不動産: 0 },
  { month: "4月", 現金: 650000, 投資: 230000, 不動産: 0 },
  { month: "5月", 現金: 700000, 投資: 240000, 不動産: 0 },
  { month: "6月", 現金: 750000, 投資: 250000, 不動産: 0 },
];

export default function AdvancedAnalytics() {
  const [reportType, setReportType] = useState("expense");
  const [period, setPeriod] = useState("6months");
  const [date, setDate] = useState(new Date());
  const [comparisonType, setComparisonType] = useState("previous_month");

  // 期間に基づいてデータをフィルタリング
  const getFilteredData = () => {
    switch (period) {
      case "3months":
        return MONTHLY_TREND_DATA.slice(-3);
      case "6months":
        return MONTHLY_TREND_DATA.slice(-6);
      case "1year":
        return MONTHLY_TREND_DATA;
      default:
        return MONTHLY_TREND_DATA.slice(-6);
    }
  };

  const filteredData = getFilteredData();
  
  // 収支バランスの計算
  const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
  const totalBalance = totalIncome - totalExpense;
  const averageMonthlyIncome = totalIncome / filteredData.length;
  const averageMonthlyExpense = totalExpense / filteredData.length;
  const averageMonthlyBalance = totalBalance / filteredData.length;

  // 前月比の計算（仮のデータ）
  const previousMonthIncome = 320000;
  const previousMonthExpense = 220000;
  const incomeChange = ((averageMonthlyIncome - previousMonthIncome) / previousMonthIncome) * 100;
  const expenseChange = ((averageMonthlyExpense - previousMonthExpense) / previousMonthExpense) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>高度な分析</CardTitle>
        <CardDescription>
          詳細な家計分析と将来予測
        </CardDescription>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <Tabs defaultValue="expense" className="w-[300px]" onValueChange={setReportType}>
            <TabsList>
              <TabsTrigger value="expense">支出分析</TabsTrigger>
              <TabsTrigger value="income">収入分析</TabsTrigger>
              <TabsTrigger value="assets">資産分析</TabsTrigger>
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
        <TabsContent value="expense" className="mt-0">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                    平均月間支出
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">¥{averageMonthlyExpense.toLocaleString()}</div>
                  <div className="flex items-center text-sm">
                    <span className={expenseChange > 0 ? "text-red-500" : "text-green-500"}>
                      {expenseChange > 0 ? "+" : ""}{expenseChange.toFixed(1)}%
                    </span>
                    <span className="text-gray-500 ml-1">前月比</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    平均月間収入
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">¥{averageMonthlyIncome.toLocaleString()}</div>
                  <div className="flex items-center text-sm">
                    <span className={incomeChange > 0 ? "text-green-500" : "text-red-500"}>
                      {incomeChange > 0 ? "+" : ""}{incomeChange.toFixed(1)}%
                    </span>
                    <span className="text-gray-500 ml-1">前月比</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
                    平均月間収支
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">¥{averageMonthlyBalance.toLocaleString()}</div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500">貯蓄率: </span>
                    <span className="text-blue-500 ml-1">
                      {((averageMonthlyBalance / averageMonthlyIncome) * 100).toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">カテゴリ別支出</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={EXPENSE_CATEGORY_DATA}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {EXPENSE_CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">曜日別支出傾向</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={WEEKLY_EXPENSE_DATA}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                        <Bar dataKey="expense" name="支出" fill="#FF6384" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">月間支出推移</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
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
                      <Line type="monotone" dataKey="expense" name="支出" stroke="#FF6384" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">支出分析のインサイト</h3>
              <ul className="space-y-2 text-sm">
                <li>• 週末（土曜日）の支出が最も多く、平日と比較して約2倍になっています。</li>
                <li>• 住居費が全体の支出の約37%を占めており、一般的な目安（30%以下）よりも高めです。</li>
                <li>• 過去6ヶ月間で支出は毎月約2%ずつ増加しています。インフレの影響を考慮する必要があります。</li>
                <li>• 食費は全体の約20%を占めており、適切な範囲内です。</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Filter className="mr-2 h-4 w-4" />
                フィルター
              </Button>
              <Button variant="outline" className="mr-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                更新
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                レポート出力
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="mt-0">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                    平均月間収入
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">¥{averageMonthlyIncome.toLocaleString()}</div>
                  <div className="flex items-center text-sm">
                    <span className={incomeChange > 0 ? "text-green-500" : "text-red-500"}>
                      {incomeChange > 0 ? "+" : ""}{incomeChange.toFixed(1)}%
                    </span>
                    <span className="text-gray-500 ml-1">前月比</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">主な収入源</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">給与</div>
                  <div className="text-sm text-gray-500">
                    全体の約81%を占めています
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">収入源の数</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-500">
                    前年比 +1
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">収入源の内訳</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={INCOME_CATEGORY_DATA}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${n
(Content truncated due to size limit. Use line ranges to read in chunks)