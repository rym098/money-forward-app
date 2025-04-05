import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Sparkles, Gift, Trophy, Star, Crown, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PointsRewards() {
  const [activeTab, setActiveTab] = useState("points");
  
  // 仮のデータ
  const pointsData = {
    currentPoints: 2450,
    thisMonth: 450,
    totalEarned: 5200,
    totalRedeemed: 2750,
    history: [
      { date: "2025/04/01", description: "4月の家計簿入力完了ボーナス", points: 100, type: "earned" },
      { date: "2025/03/28", description: "3日連続ログインボーナス", points: 50, type: "earned" },
      { date: "2025/03/25", description: "予算設定ボーナス", points: 100, type: "earned" },
      { date: "2025/03/20", description: "Amazonギフト券と交換", points: -500, type: "redeemed" },
      { date: "2025/03/15", description: "目標達成ボーナス", points: 200, type: "earned" },
    ]
  };
  
  const challenges = [
    { 
      id: 1, 
      name: "毎日ログインチャレンジ", 
      description: "7日間連続でログインする", 
      reward: 150, 
      progress: 3, 
      total: 7,
      completed: false
    },
    { 
      id: 2, 
      name: "予算マスター", 
      description: "1ヶ月間予算内で生活する", 
      reward: 300, 
      progress: 100, 
      total: 100,
      completed: true
    },
    { 
      id: 3, 
      name: "貯金の達人", 
      description: "3ヶ月連続で目標貯金額を達成する", 
      reward: 500, 
      progress: 2, 
      total: 3,
      completed: false
    },
    { 
      id: 4, 
      name: "データ入力マスター", 
      description: "30日間毎日取引を記録する", 
      reward: 400, 
      progress: 12, 
      total: 30,
      completed: false
    }
  ];
  
  const rewards = [
    { 
      id: 1, 
      name: "Amazonギフト券 500円分", 
      description: "Amazonでのお買い物に使えるギフト券", 
      points: 500, 
      image: "/rewards/amazon.png" 
    },
    { 
      id: 2, 
      name: "コンビニクーポン", 
      description: "主要コンビニで使える100円割引クーポン", 
      points: 200, 
      image: "/rewards/coupon.png" 
    },
    { 
      id: 3, 
      name: "プレミアム機能 1ヶ月無料", 
      description: "高度な分析機能などのプレミアム機能を1ヶ月間無料で利用", 
      points: 1000, 
      image: "/rewards/premium.png" 
    },
    { 
      id: 4, 
      name: "特別テーマ", 
      description: "アプリの見た目を変更できる特別テーマ", 
      points: 300, 
      image: "/rewards/theme.png" 
    }
  ];
  
  const achievements = [
    { 
      id: 1, 
      name: "家計簿初心者", 
      description: "初めて家計簿をつける", 
      completed: true, 
      date: "2025/01/15" 
    },
    { 
      id: 2, 
      name: "節約の達人", 
      description: "3ヶ月連続で支出を減らす", 
      completed: true, 
      date: "2025/03/01" 
    },
    { 
      id: 3, 
      name: "投資家デビュー", 
      description: "初めて投資を記録する", 
      completed: false, 
      date: null 
    },
    { 
      id: 4, 
      name: "貯金マスター", 
      description: "貯金目標を達成する", 
      completed: false, 
      date: null 
    },
    { 
      id: 5, 
      name: "データ分析者", 
      description: "すべてのレポート機能を使用する", 
      completed: true, 
      date: "2025/02/20" 
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          ポイント & リワード
        </CardTitle>
        <CardDescription>
          家計管理を楽しくするポイントとリワードシステム
        </CardDescription>
        <Tabs defaultValue="points" className="w-full mt-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="points">ポイント</TabsTrigger>
            <TabsTrigger value="challenges">チャレンジ</TabsTrigger>
            <TabsTrigger value="rewards">リワード</TabsTrigger>
            <TabsTrigger value="achievements">実績</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="points" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-lg text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">現在のポイント</h3>
                  <p className="text-3xl font-bold mt-1">{pointsData.currentPoints} pt</p>
                  <p className="text-sm mt-1">今月獲得: {pointsData.thisMonth} pt</p>
                </div>
                <div className="bg-white/20 p-4 rounded-full">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">累計獲得ポイント</h3>
                <p className="text-2xl font-bold">{pointsData.totalEarned} pt</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">累計交換ポイント</h3>
                <p className="text-2xl font-bold">{pointsData.totalRedeemed} pt</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">ポイント履歴</h3>
              <div className="space-y-3">
                {pointsData.history.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">{item.description}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <div className={`font-medium ${item.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.type === 'earned' ? '+' : ''}{item.points} pt
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button>
                ポイントを獲得する方法
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">進行中のチャレンジ</h3>
              <p className="text-sm text-gray-500">チャレンジを完了してポイントを獲得しましょう</p>
            </div>
            
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{challenge.name}</h4>
                      <p className="text-sm text-gray-500">{challenge.description}</p>
                    </div>
                    <Badge variant={challenge.completed ? "default" : "outline"}>
                      {challenge.completed ? "完了" : "進行中"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>進捗</span>
                      <span>{challenge.progress} / {challenge.total}</span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 mr-1 text-purple-500" />
                      <span className="text-sm font-medium">{challenge.reward} pt</span>
                    </div>
                    {challenge.completed ? (
                      <Button variant="outline" size="sm" disabled>
                        獲得済み
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        詳細
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium">交換可能ポイント</h3>
                <p className="text-2xl font-bold">{pointsData.currentPoints} pt</p>
              </div>
              <Button>
                ポイント履歴
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="border rounded-lg p-4">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <Gift className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{reward.name}</h4>
                      <p className="text-sm text-gray-500">{reward.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />
                          <span className="font-medium">{reward.points} pt</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={pointsData.currentPoints < reward.points}
                        >
                          交換する
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-medium mb-2">実績</h3>
              <p className="text-sm text-gray-500">家計管理の達成状況を確認しましょう</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`border rounded-lg p-4 ${achievement.completed ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800/30' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${achievement.completed ? 'bg-yellow-200 dark:bg-yellow-800/30' : 'bg-gray-200 dark:bg-gray-800'}`}>
                      {achievement.completed ? (
                        <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <Trophy className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                      {achievement.completed && (
                        <p className="text-sm text-gray-500 mt-1">達成日: {achievement.date}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button>
                すべての実績を見る
              </Button>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
}
