import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Upload, Download, FileText, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export default function DataImportExport() {
  const [importType, setImportType] = useState("csv");
  const [exportType, setExportType] = useState("csv");
  const [importFile, setImportFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState(null);
  const [exportPeriod, setExportPeriod] = useState("current_month");

  // ファイル選択時の処理
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
      setImportResult(null);
    }
  };

  // インポート処理
  const handleImport = () => {
    if (!importFile) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // 進捗をシミュレート
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          // 成功したと仮定
          setImportResult({
            success: true,
            message: "データのインポートが完了しました",
            details: {
              totalRecords: 42,
              importedRecords: 42,
              skippedRecords: 0,
              errorRecords: 0,
            }
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // エクスポート処理
  const handleExport = () => {
    // 実際の実装では、APIリクエストを送信してデータをエクスポートする
    console.log("データをエクスポート:", {
      type: exportType,
      period: exportPeriod,
    });
    
    // ダウンロードをシミュレート
    setTimeout(() => {
      alert(`${exportType.toUpperCase()}形式でデータをエクスポートしました`);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>データ管理</CardTitle>
        <CardDescription>
          データのインポート・エクスポートを行います
        </CardDescription>
        <Tabs defaultValue="import" className="w-[400px] mt-4">
          <TabsList>
            <TabsTrigger value="import">インポート</TabsTrigger>
            <TabsTrigger value="export">エクスポート</TabsTrigger>
          </TabsList>
          <TabsContent value="import">
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>インポート形式</Label>
                <Select value={importType} onValueChange={setImportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="形式を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="ofx">OFX (Open Financial Exchange)</SelectItem>
                    <SelectItem value="qif">QIF (Quicken Interchange Format)</SelectItem>
                    <SelectItem value="money_forward">マネーフォワードエクスポートデータ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>ファイルを選択</Label>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input 
                    type="file" 
                    accept={importType === "csv" ? ".csv" : importType === "ofx" ? ".ofx" : importType === "qif" ? ".qif" : ".csv"}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              
              {importFile && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>{importFile.name}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {(importFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              )}
              
              {isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>インポート中...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} />
                </div>
              )}
              
              {importResult && (
                <Alert variant={importResult.success ? "default" : "destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{importResult.success ? "成功" : "エラー"}</AlertTitle>
                  <AlertDescription>
                    {importResult.message}
                    {importResult.details && (
                      <div className="mt-2 text-sm">
                        <div>総レコード数: {importResult.details.totalRecords}</div>
                        <div>インポート成功: {importResult.details.importedRecords}</div>
                        <div>スキップ: {importResult.details.skippedRecords}</div>
                        <div>エラー: {importResult.details.errorRecords}</div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleImport} 
                disabled={!importFile || isImporting}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                インポート開始
              </Button>
              
              <div className="text-sm text-gray-500 mt-4">
                <h4 className="font-medium mb-2">インポート時の注意事項</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>CSVファイルは「日付,内容,金額,カテゴリ,口座」の形式で準備してください</li>
                  <li>日付は「YYYY/MM/DD」形式で入力してください</li>
                  <li>金額は数値のみを入力してください（例: 1000）</li>
                  <li>重複するデータはスキップされます</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="export">
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>エクスポート形式</Label>
                <Select value={exportType} onValueChange={setExportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="形式を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>期間</Label>
                <Select value={exportPeriod} onValueChange={setExportPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="期間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_month">今月</SelectItem>
                    <SelectItem value="last_month">先月</SelectItem>
                    <SelectItem value="last_3_months">過去3ヶ月</SelectItem>
                    <SelectItem value="last_6_months">過去6ヶ月</SelectItem>
                    <SelectItem value="current_year">今年</SelectItem>
                    <SelectItem value="last_year">昨年</SelectItem>
                    <SelectItem value="all">すべて</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleExport} 
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                エクスポート開始
              </Button>
              
              <div className="text-sm text-gray-500 mt-4">
                <h4 className="font-medium mb-2">エクスポート時の注意事項</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>大量のデータをエクスポートする場合、処理に時間がかかることがあります</li>
                  <li>PDFエクスポートでは、グラフや集計情報も含まれます</li>
                  <li>CSVエクスポートは他のアプリケーションへの取り込みに最適です</li>
                  <li>個人情報保護のため、エクスポートしたデータの管理にご注意ください</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}
