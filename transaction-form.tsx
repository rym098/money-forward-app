import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/lib/validations";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";

// 仮のデータ
const ACCOUNTS = [
  { id: 1, name: "三菱UFJ銀行" },
  { id: 2, name: "楽天銀行" },
  { id: 3, name: "現金" },
  { id: 4, name: "クレジットカード" },
];

const CATEGORIES = {
  income: [
    { id: 1, name: "給与" },
    { id: 2, name: "ボーナス" },
    { id: 3, name: "副業" },
    { id: 4, name: "投資" },
    { id: 5, name: "その他収入" },
  ],
  expense: [
    { id: 8, name: "食費" },
    { id: 9, name: "日用品" },
    { id: 10, name: "住居費" },
    { id: 11, name: "水道光熱費" },
    { id: 12, name: "通信費" },
    { id: 13, name: "交通費" },
    { id: 14, name: "医療費" },
    { id: 15, name: "衣服・美容" },
    { id: 16, name: "娯楽・レジャー" },
    { id: 17, name: "教育・教養" },
    { id: 18, name: "その他支出" },
  ],
};

export default function TransactionForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  const [date, setDate] = useState(new Date());

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      accountId: "",
      categoryId: "",
      amount: "",
      type: "expense",
      description: "",
      transactionDate: format(new Date(), "yyyy-MM-dd"),
      memo: "",
      location: "",
      isExcludedFromCalculation: false,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // APIリクエスト（実際の実装時に追加）
      console.log("送信データ:", data);
      
      // 成功時の処理
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("取引登録エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 取引タイプが変更されたときの処理
  const handleTypeChange = (value) => {
    setTransactionType(value);
    form.setValue("type", value);
    form.setValue("categoryId", ""); // カテゴリをリセット
  };

  // 日付が変更されたときの処理
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    form.setValue("transactionDate", format(selectedDate, "yyyy-MM-dd"));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>取引登録</CardTitle>
        <CardDescription>
          新しい収入・支出を記録します
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>取引タイプ</Label>
              <Select 
                defaultValue="expense" 
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="取引タイプを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">収入</SelectItem>
                  <SelectItem value="expense">支出</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>日付</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">金額</Label>
            <Input
              id="amount"
              type="number"
              placeholder="1000"
              {...form.register("amount")}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountId">口座</Label>
            <Select 
              onValueChange={(value) => form.setValue("accountId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="口座を選択" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNTS.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.accountId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.accountId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">カテゴリ</Label>
            <Select 
              onValueChange={(value) => form.setValue("categoryId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES[transactionType].map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.categoryId && (
              <p className="text-sm text-red-500">
                {form.formState.errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">内容</Label>
            <Input
              id="description"
              placeholder="取引の内容"
              {...form.register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">メモ</Label>
            <Input
              id="memo"
              placeholder="メモ（任意）"
              {...form.register("memo")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">場所</Label>
            <Input
              id="location"
              placeholder="場所（任意）"
              {...form.register("location")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登録中..." : "登録する"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
