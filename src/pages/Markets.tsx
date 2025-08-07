import Header from "@/components/Layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, TrendingDown, BarChart3, Bitcoin, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 185.25, change: 2.45, changePercent: 1.34, type: "stock", open: 182.80, high: 186.50, low: 181.90, volume: "52.3M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -5.23, changePercent: -2.06, type: "stock", open: 253.73, high: 255.20, low: 247.10, volume: "78.9M" },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.90, change: 8.12, changePercent: 2.19, type: "stock", open: 370.78, high: 380.45, low: 369.50, volume: "31.2M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.45, change: 1.85, changePercent: 1.35, type: "stock", open: 136.60, high: 139.20, low: 135.80, volume: "28.7M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.60, change: 15.30, changePercent: 1.78, type: "stock", open: 860.30, high: 878.90, low: 855.40, volume: "45.1M" },
];

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 42350, change: 1250, changePercent: 3.04, type: "crypto", open: 41100, high: 43200, low: 40800, volume: "12.4B" },
  { symbol: "ETH", name: "Ethereum", price: 2580, change: -45, changePercent: -1.71, type: "crypto", open: 2625, high: 2640, low: 2560, volume: "8.7B" },
  { symbol: "BNB", name: "Binance Coin", price: 315, change: 8.5, changePercent: 2.77, type: "crypto", open: 306.5, high: 318, low: 304, volume: "890M" },
  { symbol: "SOL", name: "Solana", price: 98.5, change: 4.2, changePercent: 4.46, type: "crypto", open: 94.3, high: 99.8, low: 93.1, volume: "1.2B" },
];

const generateChartData = (symbol) => {
  const basePrice = symbol === "BTC" ? 42000 : symbol === "AAPL" ? 180 : 100;
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}일 전`,
    price: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
  }));
};

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeTab, setActiveTab] = useState("stocks");

  const allAssets = [...stockData, ...cryptoData];
  const filteredAssets = allAssets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentData = activeTab === "stocks" ? stockData : cryptoData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Header */}
      <div className="px-4 py-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          실시간 시장 데이터
        </h1>
        <p className="text-center text-muted-foreground">주식과 암호화폐 가격을 실시간으로 확인하세요</p>
      </div>

      <main className="px-2 pb-6">
        {/* Search and Tabs */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="종목명 또는 심볼 검색 (예: AAPL, BTC)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg rounded-xl bg-background/80 backdrop-blur-sm border-border/50"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={activeTab === "stocks" ? "default" : "outline"}
              onClick={() => setActiveTab("stocks")}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              주식
            </Button>
            <Button
              variant={activeTab === "crypto" ? "default" : "outline"}
              onClick={() => setActiveTab("crypto")}
              className="flex-1 h-12 rounded-xl"
            >
              <Bitcoin className="h-5 w-5 mr-2" />
              암호화폐
            </Button>
          </div>
        </div>

        {/* Asset List */}
        <div className="space-y-3 mb-6">
          {(searchTerm ? filteredAssets : currentData).map((asset) => (
            <div 
              key={asset.symbol} 
              className="bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                    asset.type === "crypto" ? "bg-gradient-to-br from-orange-500 to-yellow-500" : "bg-gradient-to-br from-blue-500 to-purple-500"
                  }`}>
                    {asset.type === "crypto" ? <Bitcoin className="h-6 w-6 text-white" /> : <DollarSign className="h-6 w-6 text-white" />}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{asset.symbol}</p>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.type === "crypto" ? 0 : 2 })}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    {asset.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-semibold ${asset.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {asset.change >= 0 ? "+" : ""}{asset.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Asset Detail */}
        {selectedAsset && (
          <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedAsset.symbol} 상세 정보</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedAsset(null)}
                className="rounded-full w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Price Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">현재가</p>
                <p className="text-2xl font-bold">${selectedAsset.price.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">변동</p>
                <p className={`text-xl font-bold ${selectedAsset.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {selectedAsset.change >= 0 ? "+" : ""}{selectedAsset.change} ({selectedAsset.changePercent.toFixed(2)}%)
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">고가</p>
                <p className="text-lg font-semibold">${selectedAsset.high.toLocaleString()}</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1">저가</p>
                <p className="text-lg font-semibold">${selectedAsset.low.toLocaleString()}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-muted/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-4">30일 가격 추이</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateChartData(selectedAsset.symbol)}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip 
                      formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, '가격']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Markets;