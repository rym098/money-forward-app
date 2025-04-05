import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// 仮のデータ
const CATEGORIES = {
  income: [
    { id: 1, name: "給与", icon: "briefcase", color: "#4CAF50" },
    { id: 2, name: "ボーナス", icon: "gift", color: "#8BC34A" },
    { id: 3, name: "副業", icon: "tool", color: "#CDDC39" },
    { id: 4, name: "投資", icon: "trending-up", color: "#FFC107" },
    { id: 5, name: "お小遣い", icon: "wallet", color: "#FF9800" },
    { id: 6, name: "臨時収入", icon: "zap", color: "#FF5722" },
    { id: 7, name: "その他収入", icon: "plus-circle", color: "#795548" },
  ],
  expense: [
    { id: 8, name: "食費", icon: "utensils", color: "#F44336" },
    { id: 9, name: "日用品", icon: "shopping-bag", color: "#E91E63" },
    { id: 10, name: "住居費", icon: "home", color: "#9C27B0" },
    { id: 11, name: "水道光熱費", icon: "droplet", color: "#673AB7" },
    { id: 12, name: "通信費", icon: "smartphone", color: "#3F51B5" },
    { id: 13, name: "交通費", icon: "map", color: "#2196F3" },
    { id: 14, name: "医療費", icon: "activity", color: "#03A9F4" },
    { id: 15, name: "衣服・美容", icon: "scissors", color: "#00BCD4" },
    { id: 16, name: "娯楽・レジャー", icon: "music", color: "#009688" },
    { id: 17, name: "教育・教養", icon: "book", color: "#4CAF50" },
    { id: 18, name: "その他支出", icon: "more-horizontal", color: "#FFC107" },
  ],
};

// 食費のサブカテゴリ
const SUBCATEGORIES = [
  { id: 19, parentId: 8, name: "食料品", icon: "shopping-cart", color: "#F44336" },
  { id: 20, parentId: 8, name: "外食", icon: "coffee", color: "#F44336" },
  { id: 21, parentId: 8, name: "カフェ", icon: "coffee", color: "#F44336" },
];

export default function CategoryManager() {
  const [activeTab, setActiveTab] = useState("expense");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#4CAF50");
  const [showSubcategories, setShowSubcategories] = useState({});

  // サブカテゴリの表示/非表示を切り替える
  const toggleSubcategories = (categoryId) => {
    setShowSubcategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // カテゴリ編集ダイアログを開く
  const openEditDialog = (category) => {
    setSelectedCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryColor(category.color);
    setIsEditDialogOpen(true);
  };

  // 新規カテゴリ追加ダイアログを開く
  const openAddDialog = () => {
    setNewCategoryName("");
    setNewCategoryColor(activeTab === "income" ? "#4CAF50" : "#F44336");
    setIsAddDialogOpen(true);
  };

  // カテゴリを追加する処理
  const handleAddCategory = () => {
    // 実際の実装では、APIリクエストを送信してカテゴリを追加する
    console.log("新規カテゴリを追加:", {
      name: newCategoryName,
      color: newCategoryColor,
      type: activeTab
    });
    setIsAddDialogOpen(false);
  };

  // カテゴリを編集する処理
  const handleEditCategory = () => {
    // 実際の実装では、APIリクエストを送信してカテゴリを編集する
    console.log("カテゴリを編集:", {
      id: selectedCategory.id,
      name: newCategoryName,
      color: newCategoryColor
    });
    setIsEditDialogOpen(false);
  };

  // カテゴリを削除する処理
  const handleDeleteCategory = (category) => {
    // 実際の実装では、確認ダイアログを表示してから削除する
    if (window.confirm(`「${category.name}」カテゴリを削除してもよろしいですか？`)) {
      console.log("カテゴリを削除:", category);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>カテゴリ管理</CardTitle>
        <CardDescription>
          収入・支出のカテゴリを管理します
        </CardDescription>
        <Tabs defaultValue="expense" className="w-[400px] mt-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="expense">支出カテゴリ</TabsTrigger>
            <TabsTrigger value="income">収入カテゴリ</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            新規カテゴリ
          </Button>
        </div>
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {CATEGORIES[activeTab].map((category) => {
              // このカテゴリのサブカテゴリを取得
              const subcategories = SUBCATEGORIES.filter(sub => sub.parentId === category.id);
              const hasSubcategories = subcategories.length > 0;
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                      {hasSubcategories && (
                        <Badge variant="outline" className="ml-2 cursor-pointer" onClick={() => toggleSubcategories(category.id)}>
                          {showSubcategories[category.id] ? "▼" : "▶"} サブカテゴリ ({subcategories.length})
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(category)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* サブカテゴリの表示 */}
                  {hasSubcategories && showSubcategories[category.id] && (
                    <div className="pl-6 space-y-2 mt-2">
                      {subcategories.map(sub => (
                        <div key={sub.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: sub.color }}
                            />
                            <span>{sub.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(sub)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(sub)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="mt-2">
                        <PlusCircle className="mr-2 h-3 w-3" />
                        サブカテゴリを追加
                      </Button>
                    </div>
                  )}
                  
                  <Separator />
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {/* 新規カテゴリ追加ダイアログ */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新規カテゴリの追加</DialogTitle>
              <DialogDescription>
                {activeTab === "income" ? "収入" : "支出"}カテゴリを追加します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">カテゴリ名</Label>
                <Input
                  id="name"
                  placeholder="カテゴリ名を入力"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">カラー</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={newCategoryColor}
                    onChange={(e) => setNewCategoryColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: newCategoryColor }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>キャンセル</Button>
              <Button onClick={handleAddCategory} disabled={!newCategoryName}>追加</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* カテゴリ編集ダイアログ */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>カテゴリの編集</DialogTitle>
              <DialogDescription>
                カテゴリ情報を編集します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">カテゴリ名</Label>
                <Input
                  id="edit-name"
                  placeholder="カテゴリ名を入力"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-color">カラー</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="edit-color"
                    type="color"
                    value={newCategoryColor}
                    onChange={(e) => setNewCategoryColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <div 
                    className="w-8 h-8 rounded-full border"
                    style={{ backgroundColor: newCategoryColor }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>キャンセル</Button>
              <Button onClick={handleEditCategory} disabled={!newCategoryName}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
