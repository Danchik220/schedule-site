import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '../lib/utils';

export function CalendarWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [completedDays, setCompletedDays] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('completedDays');
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, []);

  // Save to local storage
  const toggleDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    let newCompletedDays;
    
    if (completedDays.includes(dateStr)) {
      newCompletedDays = completedDays.filter(d => d !== dateStr);
    } else {
      newCompletedDays = [...completedDays, dateStr];
    }
    
    setCompletedDays(newCompletedDays);
    localStorage.setItem('completedDays', JSON.stringify(newCompletedDays));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Calculate empty cells for start of month
  const startDay = startOfMonth(currentDate).getDay();
  // Adjust for Russian week start (Monday = 1)
  const emptyDays = startDay === 0 ? 6 : startDay - 1;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 rounded-xl bg-[#1a1d24] border border-white/10 hover:bg-[#242830] text-slate-300 hover:text-white transition-all shadow-lg"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-start p-6 pt-20 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 pointer-events-auto"
            />

            {/* Calendar Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              className="relative w-full max-w-sm bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/5">
                <h2 className="text-lg font-medium text-white capitalize">
                  {format(currentDate, 'LLLL yyyy', { locale: ru })}
                </h2>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Grid */}
              <div className="p-4">
                {/* Week days */}
                <div className="grid grid-cols-7 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-slate-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: emptyDays }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  
                  {days.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const isCompleted = completedDays.includes(dateStr);
                    const isTodayDate = isToday(day);

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-sm relative transition-all group",
                          isTodayDate && !isCompleted ? "bg-white/5 text-white border border-white/20" : "text-slate-400 hover:bg-white/5",
                          isCompleted ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : ""
                        )}
                      >
                        {format(day, 'd')}
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-full h-full absolute bg-purple-500/20 rounded-lg animate-pulse" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-4 border-t border-white/5 bg-white/5 text-xs text-slate-500 text-center">
                Отмечайте дни, когда вы полностью следовали расписанию
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
