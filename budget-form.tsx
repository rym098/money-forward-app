import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "@/lib/validations";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// 仮のデータ
const CATEGORIES = [
  { id: 8, name: "食費", color: "#FF6384" },
  { id: 9, name: "日用品", color: "#E91E63" },
  { id: 10, name: "住居費", color: "#9C27B0" },
  { id: 11, name: "水道光熱費", color: "#673AB7" },
  { id: 12, name: "通信費", color: "#3F51B5" },
  { id: 13, name: "交通費", color: "#2196F3" },
  { id: 14, name: "医療費", color: "#03A9F4" },
  { id: 15, name: "衣服・美容", color: "#00BCD4" },
  { id: 16, name: "娯楽・レジャー", color: "#009688" },
  { id: 17, name: "教育・教養", color: "#4CAF50" },
  { id: 18, name: "その他支出", color: "#8BC34A" },
];

export default function BudgetForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryAmount, setCategoryAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: "",
      amount: "",
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      periodType: "monthly",
      categories: [],
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // カテゴリ予算を追加
      data.categories = selectedCategories;
      
      // APIリクエスト（実際の実装時に追加）
      console.log("送信データ:", data);
      
      // 成功時の処理
      form.reset();
      setSelectedCategories([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("予算登録エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 開始日が変更されたときの処理
  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setValue("startDate", format(date, "yyyy-MM-dd"));
  };

  // 終了日が変更されたときの処理
  const handleEndDateChange = (date) => {
    setEndDate(date);
    form.setValue("endDate", format(date, "yyyy-MM-dd"));
  };

  // カテゴリを追加
  const addCategory = () => {
    if (selectedCategory && categoryAmount) {
      const category = CATEGORIES.find(c => c.id.toString() === selectedCategory);
      if (category) {
        const newCategory = {
          categoryId: parseInt(selectedCategory),
          name: category.name,
          amount: parseFloat(categoryAmount),
          color: category.color,
        };
        
        setSelectedCategories([...selectedCategories, newCategory]);
        setSelectedCategory(null);
        setCategoryAmount("");
      }
    }
  };

  // カテゴリを削除
  const removeCategory = (categoryId) => {
    setSelectedCategories(selectedCategories.filter(c => c.categoryId !== categoryId));
  };

  // 選択されたカテゴリの合計金額
  const totalCategoryAmount = selectedCategories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>予算設定</CardTitle>
        <CardDescription>
          期間ごとの予算を設定します
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">予算名</Label>
            <Input
              id="name"
              placeholder="例: 4月の予算"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">総予算額</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100000"
              {...form.register("amount")}
            />
            {form.formState.errors.amount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>開始日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "yyyy年MM月dd日", { locale: ja }) : "開始日を選択"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>終了日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "yyyy年MM月dd日", { locale: ja }) : "終了日を選択"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodType">期間タイプ</Label>
            <Select 
              defaultValue="monthly"
              onValueChange={(value) => form.setValue("periodType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="期間タイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">月次</SelectItem>
                <SelectItem value="yearly">年次</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">カテゴリ別予算</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <Label>カテゴリ</Label>
                <Select 
                  value={selectedCategory || ""}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>金額</Label>
                <Input
                  type="number"
                  placeholder="30000"
                  value={categoryAmount}
                  onChange={(e) => setCategoryAmount(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  type="button" 
                  onClick={addCategory} 
                  disabled={!selectedCategory || !categoryAmount}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> 追加
                </Button>
              </div>
            </div>

            {selectedCategories.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>カテゴリ別予算合計</span>
                  <span>¥{totalCategoryAmount.toLocaleString()}</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                  {selectedCategories.map((cat) => (
                    <div key={cat.categoryId} className="flex justify-between items-center">
                      <Badge style={{ backgroundColor: cat.color }}>
                        {cat.name}
                      </Badge>
                      <div className="flex items-center">
                        <span className="mr-2">¥{cat.amount.toLocaleString()}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCategory(cat.categoryId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登録中..." : "予算を設定する"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
