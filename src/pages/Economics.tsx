import Header from "@/components/Layout/Header";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const economicData = {
  cpi: [
    { month: '1월', value: 3.4 },
    { month: '2월', value: 3.2 },
    { month: '3월', value: 3.5 },
    { month: '4월', value: 3.4 },
    { month: '5월', value: 3.0 },
    { month: '6월', value: 3.2 }
  ],
  inflation: [
    { month: '1월', value: 3.7 },
    { month: '2월', value: 3.1 },
    { month: '3월', value: 3.4 },
    { month: '4월', value: 3.2 },
    { month: '5월', value: 2.8 },
    { month: '6월', value: 3.1 }
  ],
  fedRate: [
    { month: '1월', value: 5.0 },
    { month: '2월', value: 5.0 },
    { month: '3월', value: 5.25 },
    { month: '4월', value: 5.25 },
    { month: '5월', value: 5.25 },
    { month: '6월', value: 5.25 }
  ],
  treasuryYield: [
    { month: '1월', value: 4.6 },
    { month: '2월', value: 4.8 },
    { month: '3월', value: 4.3 },
    { month: '4월', value: 4.5 },
    { month: '5월', value: 4.7 },
    { month: '6월', value: 4.8 }
  ]
};

const Economics = () => {
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
            경제 지표 대시보드
          </h1>
          <p className="text-lg text-muted-foreground">핵심 경제 지표를 통해 시장 동향을 파악하세요</p>
        </div>

        {/* Economic Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CPI */}
          <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Percent className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">소비자물가지수 (CPI)</h3>
                <p className="text-sm text-muted-foreground">인플레이션 측정의 핵심 지표</p>
              </div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData.cpi}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              소비자가 구매하는 상품과 서비스의 가격 변동을 측정하여 인플레이션 수준을 파악하는 핵심 지표입니다.
            </p>
          </div>

          {/* Inflation */}
          <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-warning/20">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="text-xl font-bold">인플레이션율</h3>
                <p className="text-sm text-muted-foreground">전년 동기 대비 물가 상승률</p>
              </div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData.inflation}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              적정 수준의 인플레이션(2% 내외)은 경제 성장을 의미하지만, 과도한 인플레이션은 경제에 부담이 됩니다.
            </p>
          </div>

          {/* Fed Rate */}
          <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-destructive/20">
                <DollarSign className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold">연방기금금리</h3>
                <p className="text-sm text-muted-foreground">미국 기준금리</p>
              </div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData.fedRate}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-4))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              금리 변동은 주식, 채권, 부동산 등 모든 자산 가격에 직접적인 영향을 미치는 가장 중요한 지표입니다.
            </p>
          </div>

          {/* Treasury Yield */}
          <div className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-success/20">
                <TrendingDown className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold">10년 국채 수익률</h3>
                <p className="text-sm text-muted-foreground">장기 금리의 기준</p>
              </div>
            </div>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={economicData.treasuryYield}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              주식 시장의 밸류에이션과 부동산 시장에 큰 영향을 미치며, 안전자산으로서의 매력도를 나타냅니다.
            </p>
          </div>
        </div>

        {/* Insights Section */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            지표 분석 및 투자 전략
          </h2>
          
          <Tabs defaultValue="relationships" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass">
              <TabsTrigger value="relationships" className="glass-button">상관관계</TabsTrigger>
              <TabsTrigger value="impact" className="glass-button">투자 영향</TabsTrigger>
            </TabsList>
            
            <TabsContent value="relationships" className="space-y-6 mt-6">
              <div className="grid gap-6">
                <div className="glass p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary">📊 CPI ↔ 연방기금금리</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    물가가 오르면 연준은 인플레이션을 억제하기 위해 금리를 인상합니다. 
                    반대로 물가가 안정되면 경기 부양을 위해 금리를 인하할 수 있습니다.
                  </p>
                </div>
                <div className="glass p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary">💰 연방기금금리 ↔ 국채 수익률</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    연방기금금리가 오르면 국채 수익률도 함께 상승하는 경향이 있습니다. 
                    단기금리와 장기금리는 서로 영향을 주고받습니다.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="impact" className="space-y-6 mt-6">
              <div className="grid gap-6">
                <div className="glass p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary">📈 주식 시장에 미치는 영향</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    금리 인상은 일반적으로 주식 시장에 부정적이며, 특히 성장주에 큰 영향을 미칩니다. 
                    반면 금리 인하는 주식 시장에 긍정적으로 작용합니다.
                  </p>
                </div>
                <div className="glass p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-primary">🏠 부동산 시장에 미치는 영향</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    금리가 오르면 대출 비용이 증가해 부동산 수요가 감소하고, 
                    금리가 내리면 대출이 용이해져 부동산 시장이 활성화됩니다.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Economics;