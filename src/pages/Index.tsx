import Header from "@/components/Layout/Header";
import StockBanner from "@/components/Home/StockBanner";
import EventCalendar from "@/components/Home/EventCalendar";
import SocialFeed from "@/components/Home/SocialFeed";
import NewsList from "@/components/Home/NewsList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-glass-morph"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      
      <Header />
      
      {/* Hero Section */}
      <div className="px-4 py-8 relative z-10">
        <div className="glass-card p-6 mx-2 mb-6 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-light to-primary-glow bg-clip-text text-transparent">
            W.E.I
          </h1>
          <p className="text-muted-foreground text-lg">현명하고 쉬운 투자를 위한 당신의 파트너</p>
        </div>
      </div>

      <main className="px-2 pb-8 space-y-8 relative z-10">
        <StockBanner />
        <EventCalendar />
        <SocialFeed />
        <NewsList />
      </main>
    </div>
  );
};

export default Index;