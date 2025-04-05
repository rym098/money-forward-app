import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState } from "react";

// 仮のデータ
const EXPENSE_DATA = [
  { name: "食費", value: 45000, color: "#FF6384" },
  { name: "住居費", value: 85000, color: "#36A2EB" },
  { name: "水道光熱費", value: 15000, color: "#FFCE56" },
  { name: "通信費", value: 12000, color: "#4BC0C0" },
  { name: "交通費", value: 18000, color: "#9966FF" },
  { name: "娯楽費", value: 25000, color: "#FF9F40" },
  { name: "その他", value: 20000, color: "#C9CBCF" },
];

const INCOME_DATA = [
  { name: "給与", value: 280000, color: "#4CAF50" },
  { name: "副業", value: 50000, color: "#8BC34A" },
  { name: "投資", value: 15000, color: "#CDDC39" },
];

const MONTHLY_DATA = [
  { name: "1月", income: 320000, expense: 220000 },
  { name: "2月", income: 310000, expense: 215000 },
  { name: "3月", income: 330000, expense: 225000 },
  { name: "4月", income: 340000, expense: 230000 },
  { name: "5月", income: 345000, expense: 235000 },
  { name: "6月", income: 350000, expense: 240000 },
];

export default function FinancialSummary() {
  const [chartType, setChartType] = useState("pie");
  const [dataType, setDataType] = useState("expense");

  const currentData = dataType === "expense" ? EXPENSE_DATA : INCOME_DATA;
  const totalAmount = currentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>家計概要</CardTitle>
        <CardDescription>
          今月の収支状況と内訳を確認できます
        </CardDescription>
        <div className="flex justify-between items-center mt-4">
          <Tabs defaultValue="expense" className="w-[200px]" onValueChange={setDataType}>
            <TabsList>
              <TabsTrigger value="expense">支出</TabsTrigger>
              <TabsTrigger value="income">収入</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs defaultValue="pie" className="w-[200px]" onValueChange={setChartType}>
            <TabsList>
              <TabsTrigger value="pie">円グラフ</TabsTrigger>
              <TabsTrigger value="bar">棒グラフ</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {chartType === "pie" ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={MONTHLY_DATA}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="income" name="収入" fill="#4CAF50" />
                  <Bar dataKey="expense" name="支出" fill="#FF6384" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">
                {dataType === "expense" ? "今月の支出" : "今月の収入"}
              </h3>
              <p className="text-3xl font-bold">
                ¥{totalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {dataType === "expense" 
                  ? "先月比: -2.5%" 
                  : "先月比: +3.2%"}
              </p>
            </div>
            <div className="space-y-2">
              {currentData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="font-medium">
                    ¥{item.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
