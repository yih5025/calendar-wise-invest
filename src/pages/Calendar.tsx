import Header from "@/components/Layout/Header";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar as CalendarIcon, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

const eventData = {
  "2025-01-15": [
    { type: "earnings", company: "Apple", icon: "🍎", time: "16:30", importance: "high" },
    { type: "meeting", company: "Tesla", icon: "🚗", time: "10:00", importance: "medium" }
  ],
  "2025-01-16": [
    { type: "dividend", company: "Microsoft", icon: "💰", time: "09:00", importance: "low" }
  ],
  "2025-01-17": [
    { type: "product", company: "Google", icon: "🔍", time: "11:00", importance: "high" },
    { type: "earnings", company: "Netflix", icon: "📺", time: "17:00", importance: "medium" }
  ],
  "2025-01-18": [
    { type: "meeting", company: "Amazon", icon: "📦", time: "14:00", importance: "medium" }
  ],
  "2025-01-20": [
    { type: "earnings", company: "Meta", icon: "👥", time: "16:00", importance: "high" }
  ]
};

const eventTypes = {
  earnings: { label: "실적", color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white", icon: TrendingUp },
  meeting: { label: "총회", color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white", icon: Building2 },
  dividend: { label: "배당", color: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white", icon: Clock },
  product: { label: "발표", color: "bg-gradient-to-r from-purple-500 to-purple-600 text-white", icon: CalendarIcon }
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const selectedDateStr = selectedDate?.toISOString().split('T')[0];
  const dayEvents = selectedDateStr ? eventData[selectedDateStr] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Header />
      
      {/* Header Section */}
      <div className="px-4 py-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          기업 이벤트 캘린더
        </h1>
        <p className="text-center text-muted-foreground">중요한 기업 일정을 한눈에 확인하세요</p>
      </div>

      <main className="px-2 pb-6">
        {/* Calendar Section */}
        <div className="mb-6">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border/50">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full [&_table]:w-full [&_td]:p-2 [&_button]:w-full [&_button]:h-12"
              modifiers={{
                hasEvents: (date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  return dateStr in eventData;
                }
              }}
              modifiersStyles={{
                hasEvents: {
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary))/0.8)',
                  color: 'hsl(var(--primary-foreground))',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  position: 'relative'
                }
              }}
            />
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 px-2 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정
            </h2>
            
            {dayEvents.length > 0 ? (
              <div className="space-y-3 px-2">
                {dayEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className="bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.icon}</span>
                        <div>
                          <p className="font-semibold text-lg">{event.company}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge className={`${eventTypes[event.type].color} px-3 py-1`}>
                          {eventTypes[event.type].label}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${
                          event.importance === 'high' ? 'bg-red-500' : 
                          event.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-2">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground text-lg">선택한 날짜에 일정이 없습니다</p>
              </div>
            )}
          </div>
        )}

        {/* Event Types Legend */}
        <div className="px-2">
          <h3 className="text-lg font-semibold mb-3">이벤트 유형</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(eventTypes).map(([key, type]) => {
              const IconComponent = type.icon;
              return (
                <div 
                  key={key} 
                  className="bg-background/90 backdrop-blur-sm rounded-xl p-4 text-center shadow-md border border-border/50"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 ${type.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-sm">{type.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {key === 'earnings' && '분기별 실적'}
                    {key === 'meeting' && '주주총회'}
                    {key === 'dividend' && '배당금 지급'}
                    {key === 'product' && '신제품 발표'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;