import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, Download, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 仮のデータ
const TRANSACTIONS = [
  {
    id: 1,
    date: new Date(2025, 3, 1),
    description: "スーパーでの買い物",
    amount: -5800,
    category: { id: 8, name: "食費", color: "#FF6384" },
    account: { id: 1, name: "三菱UFJ銀行" },
  },
  {
    id: 2,
    date: new Date(2025, 3, 2),
    description: "電気代",
    amount: -7200,
    category: { id: 11, name: "水道光熱費", color: "#673AB7" },
    account: { id: 1, name: "三菱UFJ銀行" },
  },
  {
    id: 3,
    date: new Date(2025, 3, 3),
    description: "給料",
    amount: 280000,
    category: { id: 1, name: "給与", color: "#4CAF50" },
    account: { id: 1, name: "三菱UFJ銀行" },
  },
  {
    id: 4,
    date: new Date(2025, 3, 5),
    description: "ランチ",
    amount: -1200,
    category: { id: 8, name: "食費", color: "#FF6384" },
    account: { id: 3, name: "現金" },
  },
  {
    id: 5,
    date: new Date(2025, 3, 7),
    description: "映画",
    amount: -1800,
    category: { id: 16, name: "娯楽・レジャー", color: "#009688" },
    account: { id: 4, name: "クレジットカード" },
  },
  {
    id: 6,
    date: new Date(2025, 3, 10),
    description: "通信費",
    amount: -5000,
    category: { id: 12, name: "通信費", color: "#3F51B5" },
    account: { id: 1, name: "三菱UFJ銀行" },
  },
  {
    id: 7,
    date: new Date(2025, 3, 15),
    description: "副業収入",
    amount: 50000,
    category: { id: 3, name: "副業", color: "#CDDC39" },
    account: { id: 2, name: "楽天銀行" },
  },
];

export default function TransactionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // 取引のフィルタリング
  const filteredTransactions = TRANSACTIONS.filter((transaction) => {
    // 検索語でフィルタリング
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // カテゴリでフィルタリング
    const matchesCategory = selectedCategory === "all" || transaction.category.id.toString() === selectedCategory;
    
    // 口座でフィルタリング
    const matchesAccount = selectedAccount === "all" || transaction.account.id.toString() === selectedAccount;
    
    // タイプでフィルタリング
    const matchesType = selectedType === "all" || 
                        (selectedType === "income" && transaction.amount > 0) || 
                        (selectedType === "expense" && transaction.amount < 0);
    
    return matchesSearch && matchesCategory && matchesAccount && matchesType;
  });

  // 取引のソート
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortDirection === "desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  // ソート方向の切り替え
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  // 一意のカテゴリリストを取得
  const uniqueCategories = Array.from(
    new Set(TRANSACTIONS.map((t) => JSON.stringify({ id: t.category.id, name: t.category.name })))
  ).map((str) => JSON.parse(str));

  // 一意の口座リストを取得
  const uniqueAccounts = Array.from(
    new Set(TRANSACTIONS.map((t) => JSON.stringify({ id: t.account.id, name: t.account.name })))
  ).map((str) => JSON.parse(str));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>取引履歴</CardTitle>
        <CardDescription>
          すべての収入と支出の記録を確認できます
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="検索..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleSortDirection}>
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="タイプ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="income">収入</SelectItem>
              <SelectItem value="expense">支出</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="カテゴリ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="口座" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {uniqueAccounts.map((account) => (
                <SelectItem key={account.id} value={account.id.toString()}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">リスト</TabsTrigger>
            <TabsTrigger value="calendar">カレンダー</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead>内容</TableHead>
                  <TableHead>カテゴリ</TableHead>
                  <TableHead>口座</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(transaction.date, "yyyy/MM/dd", { locale: ja })}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge style={{ backgroundColor: transaction.category.color }}>
                        {transaction.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.account.name}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}
                      ¥{transaction.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="calendar">
            <div className="p-4 text-center text-muted-foreground">
              カレンダービューは開発中です
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
