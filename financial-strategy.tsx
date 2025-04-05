import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Sparkles, TrendingUp, Calculator, ArrowRight, Target, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FinancialStrategy() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // 仮のデータ
  const financialHealth = {
    score: 78,
    maxScore: 100,
    status: "良好",
    recommendations: [
      "緊急用資金を3ヶ月分の生活費まで増やすことを検討してください",
      "投資ポートフォリオの多様化を検討してください",
      "固定費の見直しで月5,000円の節約が可能です"
    ]
  };
  
  const savingsGoal = {
    name: "マイホーム購入",
    targetAmount: 5000000,
    currentAmount: 2000000,
    monthlyContribution: 50000,
    targetDate: new Date(2027, 3, 1),
    strategies: [
      { name: "月々の貯金額を増やす", impact: "高", description: "月々の貯金額を10,000円増やすと、目標達成が4ヶ月早まります" },
      { name: "投資で運用する", impact: "中", description: "年利3%で運用すると、目標達成が6ヶ月早まります" },
      { name: "副収入を得る", impact: "高", description: "月に20,000円の副収入があれば、目標達成が8ヶ月早まります" }
    ]
  };
  
  const investmentSuggestions = [
    { name: "つみたてNISA", risk: "低〜中", returnRate: "年2〜5%", description: "長期的な資産形成に最適な非課税制度" },
    { name: "iDeCo（個人型確定拠出年金）", risk: "低〜中", returnRate: "年2〜5%", description: "老後資金の形成に税制優遇がある制度" },
    { name: "インデックス投資", risk: "中", returnRate: "年4〜7%", description: "市場平均のリターンを目指す低コストな投資方法" },
    { name: "高配当株投資", risk: "中〜高", returnRate: "年3〜6%", description: "定期的な配当収入が期待できる投資方法" }
  ];
  
  // 目標達成までの残り日数を計算
  const calculateDaysRemaining = () => {
    const today = new Date();
    const targetDate = savingsGoal.targetDate;
    const diffTime = Math.abs(targetDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // 目標達成率を計算
  const calculateProgressPercentage = () => {
    return (savingsGoal.currentAmount / savingsGoal.targetAmount) * 100;
  };
  
  // 目標達成までの予測を計算
  const calculateProjection = () => {
    const remainingAmount = savingsGoal.targetAmount - savingsGoal.currentAmount;
    const monthsToGoal = Math.ceil(remainingAmount / savingsGoal.monthlyContribution);
    
    const today = new Date();
    const projectedDate = new Date(today);
    projectedDate.setMonth(today.getMonth() + monthsToGoal);
    
    return {
      monthsToGoal,
      projectedDate
    };
  };
  
  const daysRemaining = calculateDaysRemaining();
  const progressPercentage = calculateProgressPercentage();
  const projection = calculateProjection();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-blue-500" />
          金融戦略アドバイザー
        </CardTitle>
        <CardDescription>
          あなたの目標達成をサポートする金融戦略を提案します
        </CardDescription>
        <Tabs defaultValue="overview" className="w-full mt-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="goals">目標戦略</TabsTrigger>
            <TabsTrigger value="investments">投資提案</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="overview" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">金融健全度スコア</h3>
                <Badge variant={financialHealth.score >= 70 ? "default" : "destructive"}>
                  {financialHealth.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={financialHealth.score} max={financialHealth.maxScore} className="h-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0</span>
                  <span>{financialHealth.score} / {financialHealth.maxScore}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">改善のためのアドバイス</h3>
              <ul className="space-y-2">
                {financialHealth.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <Lightbulb className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">今月の家計診断</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">収入</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-xl font-bold">¥320,000</div>
                    <p className="text-sm text-green-600">先月比 +2.5%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">支出</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-xl font-bold">¥220,000</div>
                    <p className="text-sm text-red-600">先月比 +3.8%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">貯蓄率</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-xl font-bold">31.3%</div>
                    <p className="text-sm text-gray-500">目標: 30%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>支出傾向の分析</AlertTitle>
              <AlertDescription>
                先月と比較して「食費」が15%増加しています。外食を週1回減らすことで約8,000円の節約が可能です。
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
        
        <TabsContent value="goals" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">{savingsGoal.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">進捗状況</span>
                  <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>¥{savingsGoal.currentAmount.toLocaleString()}</span>
                  <span>¥{savingsGoal.targetAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-500">目標日</div>
                  <div>{savingsGoal.targetDate.toLocaleDateString('ja-JP')}</div>
                  <div className="text-sm text-gray-500 mt-1">残り{daysRemaining}日</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">月々の貯金</div>
                  <div>¥{savingsGoal.monthlyContribution.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">目標達成まで約{projection.monthsToGoal}ヶ月</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">目標達成のための戦略</h3>
              <div className="space-y-4">
                {savingsGoal.strategies.map((strategy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{strategy.name}</h4>
                      <Badge variant={strategy.impact === "高" ? "default" : "outline"}>
                        効果: {strategy.impact}
                      </Badge>
                    </div>
                    <p className="text-sm">{strategy.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button>
                目標を調整する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="investments" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">投資プロファイル</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">リスク許容度</div>
                  <div>中程度</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">投資期間</div>
                  <div>5-10年</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">月々の投資可能額</div>
                  <div>¥30,000</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">目標リターン</div>
                  <div>年4-6%</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">おすすめの投資方法</h3>
              <div className="space-y-4">
                {investmentSuggestions.map((investment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{investment.name}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline">
                          リスク: {investment.risk}
                        </Badge>
                        <Badge variant="outline">
                          リターン: {investment.returnRate}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm">{investment.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Alert>
              <Calculator className="h-4 w-4" />
              <AlertTitle>複利の力</AlertTitle>
              <AlertDescription>
                月々30,000円を年利5%で20年間投資すると、約1,200万円になります。
                早く始めるほど、複利効果は大きくなります。
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center">
              <Button>
                投資シミュレーションを試す
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
}
