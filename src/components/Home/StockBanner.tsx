import { TrendingUp, TrendingDown } from "lucide-react";

const stocksData = [
  { symbol: "AAPL", name: "Apple", price: "$175.43", change: "+2.35", icon: "🍎" },
  { symbol: "TSLA", name: "Tesla", price: "$248.50", change: "-5.20", icon: "🚗" },
  { symbol: "NVDA", name: "NVIDIA", price: "$875.28", change: "+12.45", icon: "🎮" },
  { symbol: "AMZN", name: "Amazon", price: "$155.89", change: "+3.21", icon: "📦" },
  { symbol: "GOOGL", name: "Google", price: "$140.25", change: "-1.85", icon: "🔍" },
  { symbol: "MSFT", name: "Microsoft", price: "$420.15", change: "+8.75", icon: "💻" }
];

const StockBanner = () => {
  const duplicatedStocks = [...stocksData, ...stocksData];

  return (
    <div className="glass-card p-6 mx-2 animate-glow">
      <h2 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        실시간 주식 동향
      </h2>
      <div className="relative overflow-hidden rounded-xl">
        <div className="flex animate-slide whitespace-nowrap">
          {duplicatedStocks.map((stock, index) => (
            <div key={index} className="inline-flex items-center mx-3 p-4 glass rounded-xl min-w-fit border border-white/20">
              <span className="text-3xl mr-3">{stock.icon}</span>
              <div className="text-left">
                <p className="font-bold text-base">{stock.symbol}</p>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="ml-4 text-right">
                <p className="font-bold text-base">{stock.price}</p>
                <p className={`text-sm flex items-center ${
                  stock.change.startsWith('+') ? 'text-success' : 'text-destructive'
                }`}>
                  {stock.change.startsWith('+') ? 
                    <TrendingUp className="w-4 h-4 mr-1" /> : 
                    <TrendingDown className="w-4 h-4 mr-1" />
                  }
                  {stock.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockBanner;