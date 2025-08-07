import Header from "@/components/Layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, CheckCircle, AlertTriangle, TrendingDown, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const financialData = {
  AAPL: {
    company: "Apple Inc.",
    revenue: [
      { quarter: 'Q1', value: 394.3 },
      { quarter: 'Q2', value: 383.3 },
      { quarter: 'Q3', value: 394.3 },
      { quarter: 'Q4', value: 394.3 }
    ],
    netIncome: [
      { quarter: 'Q1', value: 99.8 },
      { quarter: 'Q2', value: 95.2 },
      { quarter: 'Q3', value: 99.8 },
      { quarter: 'Q4', value: 99.8 }
    ],
    currentData: {
      revenue: 394328000000,
      netIncome: 99803000000,
      totalAssets: 352755000000,
      totalDebt: 123930000000,
      cashAndEquivalents: 29965000000,
      analysis: {
        profitability: "excellent",
        liquidity: "good",
        leverage: "moderate",
        overall: "strong"
      }
    }
  },
  TSLA: {
    company: "Tesla Inc.",
    revenue: [
      { quarter: 'Q1', value: 96.8 },
      { quarter: 'Q2', value: 85.3 },
      { quarter: 'Q3', value: 96.8 },
      { quarter: 'Q4', value: 96.8 }
    ],
    netIncome: [
      { quarter: 'Q1', value: 15.0 },
      { quarter: 'Q2', value: 12.5 },
      { quarter: 'Q3', value: 15.0 },
      { quarter: 'Q4', value: 15.0 }
    ],
    currentData: {
      revenue: 96773000000,
      netIncome: 15000000000,
      totalAssets: 106618000000,
      totalDebt: 9548000000,
      cashAndEquivalents: 29094000000,
      analysis: {
        profitability: "good",
        liquidity: "excellent",
        leverage: "low",
        overall: "strong"
      }
    }
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "excellent": return "text-success";
    case "good": return "text-primary";
    case "moderate": return "text-warning";
    case "poor": return "text-destructive";
    default: return "text-muted-foreground";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "excellent": case "good": return <CheckCircle className="h-4 w-4" />;
    case "moderate": return <AlertTriangle className="h-4 w-4" />;
    case "poor": return <TrendingDown className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

const Financials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("AAPL");

  const data = financialData[selectedCompany];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-glass-morph"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <Header />
      
      <main className="p-4 space-y-6 relative z-10">
        {/* Hero Section */}
        <div className="glass-card p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-primary-glow bg-clip-text text-transparent">
            기업 재무제표 분석
          </h1>
          <p className="text-lg text-muted-foreground">재무제표를 쉽게 이해하고 기업의 재정 상태를 분석해보세요</p>
        </div>

        {/* Search Section */}
        <div className="glass-card p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="기업명 또는 종목코드 검색 (예: AAPL, Tesla)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-button border-0"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant={selectedCompany === "AAPL" ? "default" : "outline"}
              onClick={() => setSelectedCompany("AAPL")}
              className={selectedCompany === "AAPL" ? "glass-button bg-primary text-primary-foreground" : "glass-button"}
            >
              Apple (AAPL)
            </Button>
            <Button
              variant={selectedCompany === "TSLA" ? "default" : "outline"}
              onClick={() => setSelectedCompany("TSLA")}
              className={selectedCompany === "TSLA" ? "glass-button bg-primary text-primary-foreground" : "glass-button"}
            >
              Tesla (TSLA)
            </Button>
          </div>
        </div>

        {data && (
          <div className="space-y-6">
            {/* Company Overview */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-primary/20">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{data.company}</h2>
                  <p className="text-muted-foreground">재무 분석 대시보드</p>
                </div>
              </div>
              
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass">
                  <TabsTrigger value="charts" className="glass-button">차트 분석</TabsTrigger>
                  <TabsTrigger value="data" className="glass-button">상세 데이터</TabsTrigger>
                </TabsList>
                
                <TabsContent value="charts" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <div className="glass p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4 text-primary">분기별 매출액 (Billions)</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.revenue}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="quarter" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={8} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Net Income Chart */}
                    <div className="glass p-6 rounded-xl">
                      <h3 className="text-xl font-bold mb-4 text-success">분기별 순이익 (Billions)</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data.netIncome}>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                            <XAxis dataKey="quarter" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="data" className="space-y-6 mt-6">
                  <div className="grid gap-4">
                    {[
                      { key: "revenue", label: "매출액", value: data.currentData.revenue, desc: "기업이 제품이나 서비스 판매로 얻은 총 수익" },
                      { key: "netIncome", label: "순이익", value: data.currentData.netIncome, desc: "모든 비용과 세금을 차감한 후 남은 최종 이익" },
                      { key: "totalAssets", label: "총자산", value: data.currentData.totalAssets, desc: "기업이 소유한 모든 자산의 가치" },
                      { key: "totalDebt", label: "총부채", value: data.currentData.totalDebt, desc: "기업이 갚아야 할 모든 빚의 총액" },
                      { key: "cashAndEquivalents", label: "현금성자산", value: data.currentData.cashAndEquivalents, desc: "즉시 사용 가능한 유동성 자금" }
                    ].map((item) => (
                      <div key={item.key} className="glass p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-lg">{item.label}</h4>
                          <p className="text-2xl font-bold text-primary">
                            ${(item.value / 1000000000).toFixed(1)}B
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Financial Analysis */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                재정 상태 종합 분석
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 glass rounded-xl">
                    <span className="font-medium">수익성</span>
                    <div className={`flex items-center gap-2 ${getStatusColor(data.currentData.analysis.profitability)}`}>
                      {getStatusIcon(data.currentData.analysis.profitability)}
                      <span className="capitalize font-bold">{data.currentData.analysis.profitability}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 glass rounded-xl">
                    <span className="font-medium">유동성</span>
                    <div className={`flex items-center gap-2 ${getStatusColor(data.currentData.analysis.liquidity)}`}>
                      {getStatusIcon(data.currentData.analysis.liquidity)}
                      <span className="capitalize font-bold">{data.currentData.analysis.liquidity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 glass rounded-xl">
                    <span className="font-medium">레버리지</span>
                    <div className={`flex items-center gap-2 ${getStatusColor(data.currentData.analysis.leverage)}`}>
                      {getStatusIcon(data.currentData.analysis.leverage)}
                      <span className="capitalize font-bold">{data.currentData.analysis.leverage}</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass p-6 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`flex items-center gap-2 ${getStatusColor(data.currentData.analysis.overall)}`}>
                      {getStatusIcon(data.currentData.analysis.overall)}
                      <span className="font-bold text-lg">종합 평가: {data.currentData.analysis.overall}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCompany === "AAPL" 
                      ? "Apple은 높은 수익성과 안정적인 현금 흐름을 바탕으로 매우 건전한 재정 상태를 유지하고 있습니다. 혁신적인 제품과 강력한 브랜드를 통해 지속적인 성장이 기대됩니다."
                      : "Tesla는 급속한 성장과 함께 강력한 현금 보유로 건전한 재정 구조를 보여주고 있습니다. 전기차 시장의 선두주자로서 미래 성장 잠재력이 매우 높습니다."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Financials;