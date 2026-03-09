import { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Timeline } from './components/Timeline';
import { ActivePanel } from './components/ActivePanel';
import { CalendarWidget } from './components/CalendarWidget';
import { schedule, ScheduleItem } from './data/schedule';
import { addMinutes, format } from 'date-fns';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [offsetMinutes, setOffsetMinutes] = useState(0);
  const [activeItem, setActiveItem] = useState<ScheduleItem | null>(null);
  const [nextItem, setNextItem] = useState<ScheduleItem | null>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Apply offset for "Skip" functionality simulation
      const adjustedTime = addMinutes(now, offsetMinutes);
      setCurrentTime(adjustedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [offsetMinutes]);

  // Determine active item using minutes-from-midnight logic
  useEffect(() => {
    const getMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();
    const getMinutesFromString = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const currentMinutes = getMinutes(currentTime);

    const current = schedule.find(item => {
      const start = getMinutesFromString(item.startTime);
      const end = getMinutesFromString(item.endTime);

      if (end < start) {
        // Overnight task (e.g. 22:00 - 06:00)
        // Active if:
        // 1. Current time is late (>= 22:00)
        // 2. Current time is early (< 06:00)
        return currentMinutes >= start || currentMinutes < end;
      } else {
        // Normal task (e.g. 09:00 - 11:00)
        return currentMinutes >= start && currentMinutes < end;
      }
    });

    setActiveItem(current || null);

    if (current) {
      const currentIndex = schedule.findIndex(i => i.id === current.id);
      // Wrap around to first item if at the end
      setNextItem(schedule[(currentIndex + 1) % schedule.length]);
    }
  }, [currentTime]);

  const handleSkip = () => {
    if (activeItem && nextItem) {
      // Calculate minutes to add to jump to next item
      const getMinutesFromString = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      const nextStartMinutes = getMinutesFromString(nextItem.startTime);
      
      let diff = nextStartMinutes - currentMinutes;
      
      // If next start is "tomorrow" relative to now (e.g. now 23:00, next 06:00)
      if (diff <= 0) {
        diff += 24 * 60;
      }
      
      // Add a small buffer (1 minute) to ensure we land inside the next block
      setOffsetMinutes(prev => prev + diff + 1);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* <Background /> */}
      <CalendarWidget />
      
      <main className="relative z-10 h-screen flex flex-col lg:flex-row">
        {/* Left Panel: Active Task (60%) */}
        <section className="flex-1 h-[50vh] lg:h-auto lg:w-[60%] relative order-2 lg:order-1 border-t lg:border-t-0 lg:border-r border-white/5 bg-[#0f1115]/30">
          <ActivePanel 
            activeItem={activeItem} 
            nextItem={nextItem}
            currentTime={currentTime}
            onSkip={handleSkip}
          />
        </section>

        {/* Right Panel: Timeline (40%) */}
        <section className="flex-1 h-[50vh] lg:h-auto lg:w-[40%] bg-[#0f1115] order-1 lg:order-2">
          <Timeline items={schedule} activeItemId={activeItem?.id || null} />
        </section>
      </main>
    </div>
  );
}

export default App;
