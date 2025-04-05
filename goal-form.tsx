import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "@/lib/validations";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export default function GoalForm({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [targetDate, setTargetDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
  const [currentAmount, setCurrentAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(1000000);

  const form = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      targetAmount: 1000000,
      currentAmount: 0,
      startDate: format(startDate, "yyyy-MM-dd"),
      targetDate: format(targetDate, "yyyy-MM-dd"),
      description: "",
      icon: "target",
      color: "#4CAF50",
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
      console.error("目標登録エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 開始日が変更されたときの処理
  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setValue("startDate", format(date, "yyyy-MM-dd"));
  };

  // 目標日が変更されたときの処理
  const handleTargetDateChange = (date) => {
    setTargetDate(date);
    form.setValue("targetDate", format(date, "yyyy-MM-dd"));
  };

  // 現在の金額が変更されたときの処理
  const handleCurrentAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setCurrentAmount(value);
    form.setValue("currentAmount", value);
  };

  // 目標金額が変更されたときの処理
  const handleTargetAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTargetAmount(value);
    form.setValue("targetAmount", value);
  };

  // 進捗率の計算
  const progressPercentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

  // 月間必要貯金額の計算
  const calculateMonthlyRequirement = () => {
    if (!startDate || !targetDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(targetDate);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (diffMonths <= 0) return 0;
    
    const remainingAmount = targetAmount - currentAmount;
    return remainingAmount / diffMonths;
  };

  const monthlyRequirement = calculateMonthlyRequirement();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>目標設定</CardTitle>
        <CardDescription>
          貯金や投資の目標を設定します
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">目標名</Label>
            <Input
              id="name"
              placeholder="例: マイホーム購入"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">詳細</Label>
            <Input
              id="description"
              placeholder="目標の詳細"
              {...form.register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">目標金額</Label>
            <Input
              id="targetAmount"
              type="number"
              placeholder="1000000"
              value={targetAmount}
              onChange={handleTargetAmountChange}
            />
            {form.formState.errors.targetAmount && (
              <p className="text-sm text-red-500">
                {form.formState.errors.targetAmount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAmount">現在の金額</Label>
            <Input
              id="currentAmount"
              type="number"
              placeholder="0"
              value={currentAmount}
              onChange={handleCurrentAmountChange}
            />
          </div>

          <div className="space-y-2">
            <Label>進捗状況</Label>
            <div className="space-y-2">
              <Slider
                value={[progressPercentage]}
                max={100}
                step={1}
                disabled
              />
              <div className="flex justify-between text-sm">
                <span>{progressPercentage.toFixed(1)}%</span>
                <span>¥{currentAmount.toLocaleString()} / ¥{targetAmount.toLocaleString()}</span>
              </div>
            </div>
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
              <Label>目標日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !targetDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {targetDate ? format(targetDate, "yyyy年MM月dd日", { locale: ja }) : "目標日を選択"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={handleTargetDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">月間必要貯金額</h3>
            <p className="text-2xl font-bold">¥{monthlyRequirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              目標達成のために毎月必要な金額
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登録中..." : "目標を設定する"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
